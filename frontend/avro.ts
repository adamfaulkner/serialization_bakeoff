import * as avsc from "avsc";
import { MemberCasual, RideableType, ServerResponseAll, Trip } from "./trip.js";
import { Deserializer } from "./deserializer.js";
import avroSchema from './dist/avro_schema.json' with {type: 'json'};


/**
 * Copied from https://gist.github.com/mtth/1aec40375fbcb077aee7
 * 
 * Custom logical type used to encode native Date objects as longs.
 *
 * It also supports reading dates serialized as strings (by creating an
 * appropriate resolver).
 *
 */
class DateType extends avsc.types.LogicalType {
  _fromValue(val: number) {
    return new Date(val);
  }
  _toValue(date: Date) {
    return date instanceof Date ? +date : undefined;
  }
  _resolve(type: avsc.Type) {
    if (avsc.Type.isType(type, 'long', 'string', 'logical:timestamp-millis')) {
      return this._fromValue;
    }
  }
}

/**
 * Derived from https://gist.github.com/mtth/1aec40375fbcb077aee7#file-optional-js
 */
class MissingType extends avsc.types.LogicalType {
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
function typeHook(schema: avsc.Schema, opts: avsc.ForSchemaOptions) {
  if (schema instanceof Object && 'type' in schema && schema.type === 'enum') {
    return avsc.Type.forSchema('long', opts);
  }
  // Falling through will cause the default type to be used.
}

const avroType = avsc.Type.forSchema(avroSchema as any, { logicalTypes: { 'timestamp-millis': DateType, 'missing': MissingType}, typeHook, });

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

export const avro: Deserializer<ServerResponseAll> = {
  name: "avro" as const,
  endpoint: "avro",
  deserializeAll: function (data: Uint8Array): ServerResponseAll{
    performance.mark('avro-decode-start');
    const result = avroType.decode(data).value;
    performance.mark('avro-decode-end');
    performance.measure('avro-decode', 'avro-decode-start', 'avro-decode-end');
    return result;
  },

  materializeUnverifiedAsPojo: function (
    deserialized: ServerResponseAll,
  ): ServerResponseAll {
    return deserialized;
    // const serverResponseAll: ServerResponseAll = { trips: [] };
    // // The lat and lng values use null to indicate a missing value, while we expect missing
    // for (const trip of deserialized.trips) {
    //   const remappedTrip: Trip = {
    //     rideId: trip.rideId,
    //     startedAt: trip.startedAt,
    //     endedAt: trip.endedAt,
    //     startStationId: trip.startStationId ?? undefined,
    //     startStationName: trip.startStationName ?? undefined,
    //     endStationId: trip.endStationId ?? undefined,
    //     endStationName: trip.endStationName ?? undefined,
    //     memberCasual: trip.memberCasual,
    //     rideableType: trip.rideableType,
    //   };
    //   serverResponseAll.trips.push(remappedTrip);
    // }
    // return serverResponseAll;
  },
  scanForIdProperty: function (
    // deserialized: AvroServerResponseAll,
    deserialized: ServerResponseAll,
    targetId: string,
  ): boolean {
    return deserialized.trips.some((trip: any) => trip.ride_id === targetId);
  },
  materializeVerifedAsPojo: function (
    // deserialized: AvroServerResponseAll,
     deserialized: ServerResponseAll,
  ): ServerResponseAll {
    // There's no way for deserialized to be invalid. The deserializer already guarantees everything.
    return this.materializeUnverifiedAsPojo(deserialized);
  },
};
