import { Buffer } from "buffer/";
import * as newAvsc from "new_avsc";
import * as productionAvsc from "production_avsc";
import type { Deserializer } from "./deserializer.js";
import avroSchema from "./dist/avro_schema.json" with { type: "json" };
import { RideableType, type ServerResponseAll, Trip } from "./trip.js";

// Sorry for the repetition here, but I'm lazy.

/**
 * Copied from https://gist.github.com/mtth/1aec40375fbcb077aee7
 *
 * Custom logical type used to encode native Date objects as longs.
 *
 * It also supports reading dates serialized as strings (by creating an
 * appropriate resolver).
 *
 */
class CurrentDateType extends productionAvsc.types.LogicalType {
	_fromValue(val: number) {
		return new Date(val);
	}
	_toValue(date: Date) {
		return date instanceof Date ? +date : undefined;
	}
	_resolve(type: productionAvsc.Type) {
		if (productionAvsc.Type.isType(type, "long", "string", "logical:timestamp-millis")) {
			return this._fromValue;
		}
	}
}

/**
 * Derived from https://gist.github.com/mtth/1aec40375fbcb077aee7#file-optional-js
 */
class CurrentMissingType extends productionAvsc.types.LogicalType {
	protected _fromValue(val: any) {
		return val === null ? undefined : val;
	}

	protected _toValue(any: any) {
		if (any === undefined) {
			return null;
		}
		return any;
	}
}

/**
 * Copied from https://gist.github.com/mtth/c0088c745de048c4e466#file-long-enum-js
 *
 * Hook which will decode/encode enums to/from integers.
 *
 * The default `EnumType` implementation represents enum values as strings
 * (consistent with the JSON representation). This hook can be used to provide
 * an alternate representation (which is for example compatible with TypeScript
 * enums).
 *
 * For simplicity, we don't do any bound checking here but we could by
 * implementing a "bounded long" logical type and returning that instead.
 *
 */
function currentTypeHook(schema: productionAvsc.Schema, opts: productionAvsc.ForSchemaOptions) {
	if (schema instanceof Object && "type" in schema && schema.type === "enum") {
		return productionAvsc.Type.forSchema("long", opts);
	}
	// Falling through will cause the default type to be used.
}

/**
 * Copied from https://gist.github.com/mtth/1aec40375fbcb077aee7
 *
 * Custom logical type used to encode native Date objects as longs.
 *
 * It also supports reading dates serialized as strings (by creating an
 * appropriate resolver).
 *
 */
class NewDateType extends newAvsc.types.LogicalType {
	_fromValue(val: number) {
		return new Date(val);
	}
	_toValue(date: Date) {
		return date instanceof Date ? +date : undefined;
	}
	_resolve(type: newAvsc.Type) {
		if (newAvsc.Type.isType(type, "long", "string", "logical:timestamp-millis")) {
			return this._fromValue;
		}
	}
}

/**
 * Derived from https://gist.github.com/mtth/1aec40375fbcb077aee7#file-optional-js
 */
class NewMissingType extends newAvsc.types.LogicalType {
	protected _fromValue(val: any) {
		return val === null ? undefined : val;
	}

	protected _toValue(any: any) {
		if (any === undefined) {
			return null;
		}
		return any;
	}
}

/**
 * Copied from https://gist.github.com/mtth/c0088c745de048c4e466#file-long-enum-js
 *
 * Hook which will decode/encode enums to/from integers.
 *
 * The default `EnumType` implementation represents enum values as strings
 * (consistent with the JSON representation). This hook can be used to provide
 * an alternate representation (which is for example compatible with TypeScript
 * enums).
 *
 * For simplicity, we don't do any bound checking here but we could by
 * implementing a "bounded long" logical type and returning that instead.
 *
 */
function newTypeHook(schema: newAvsc.Schema, opts: newAvsc.ForSchemaOptions) {
	if (schema instanceof Object && "type" in schema && schema.type === "enum") {
		return newAvsc.Type.forSchema("long", opts);
	}
	// Falling through will cause the default type to be used.
}

const currentAvroType = productionAvsc.Type.forSchema(avroSchema as any, {
	logicalTypes: { "timestamp-millis": CurrentDateType, missing: CurrentMissingType },
	typeHook: currentTypeHook,
});

const newAvroType = newAvsc.Type.forSchema(avroSchema as any, {
	logicalTypes: { "timestamp-millis": NewDateType, missing: NewMissingType },
	typeHook: newTypeHook,
});

// Trip uses missing values for unset stat/end lat/lng, avro uses null. Remap this.
// Trip uses numeric values for memberCasual and rideableType, remap this.
// export type AvroDeserializedTrip = Omit<
//   Trip,
//   | "startLat"
//   | "startLng"
//   | "endLat"
//   | "endLng"
//   | "memberCasual"
//   | "rideableType"
// > & {
//   startLat: number | null;
//   startLng: number | null;
//   endLat: number | null;
//   endLng: number | null;
//   startStationName: string | null;
//   endStationName: string | null;
//   startStationId: string | null;
//   endStationId: string | null;
//   memberCasual: MemberCasual;
//   rideableType: RideableType;
// };

// export type AvroServerResponseAll = {
//   trips: Array<AvroDeserializedTrip>;
// };

export const currentAvro: Deserializer<ServerResponseAll> = {
	name: "avro" as const,
	endpoint: "avro",
	deserializeAll: (data: Uint8Array): ServerResponseAll => {
		performance.mark("current-avro-decode-start");
		const result = currentAvroType.decode(
			Buffer.from(data.buffer as unknown as ArrayBuffer, data.byteOffset, data.byteLength),
		).value;
		performance.mark("current-avro-decode-end");
		performance.measure("current-avro-decode", "current-avro-decode-start", "current-avro-decode-end");
		return result;
	},

	materializeUnverifiedAsPojo: (deserialized: ServerResponseAll): ServerResponseAll => deserialized,
	scanForIdProperty: (
		// deserialized: AvroServerResponseAll,
		deserialized: ServerResponseAll,
		targetId: string,
	): boolean => deserialized.trips.some((trip: any) => trip.ride_id === targetId),
	materializeVerifedAsPojo: function (
		// deserialized: AvroServerResponseAll,
		deserialized: ServerResponseAll,
	): ServerResponseAll {
		// There's no way for deserialized to be invalid. The deserializer already guarantees everything.
		return this.materializeUnverifiedAsPojo(deserialized);
	},
};

export const newAvro: Deserializer<ServerResponseAll> = {
	name: "updated avro" as const,
	endpoint: "avro",
	deserializeAll: (data: Uint8Array): ServerResponseAll => {
		performance.mark("new-avro-decode-start");
		const result = newAvroType.decode(data).value;
		performance.mark("new-avro-decode-end");
		performance.measure("new-avro-decode", "new-avro-decode-start", "new-avro-decode-end");
		return result;
	},

	materializeUnverifiedAsPojo: (deserialized: ServerResponseAll): ServerResponseAll => deserialized,
	scanForIdProperty: (
		// deserialized: AvroServerResponseAll,
		deserialized: ServerResponseAll,
		targetId: string,
	): boolean => deserialized.trips.some((trip: any) => trip.ride_id === targetId),
	materializeVerifedAsPojo: function (deserialized: ServerResponseAll): ServerResponseAll {
		// There's no way for deserialized to be invalid. The deserializer already guarantees everything.
		return this.materializeUnverifiedAsPojo(deserialized);
	},
};
