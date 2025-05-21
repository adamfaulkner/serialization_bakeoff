import type * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace trip_protobuf. */
export namespace trip_protobuf {
	/** RideableType enum. */
	enum RideableType {
		unknown_rideable_type = 0,
		electric_bike = 1,
		classic_bike = 2,
	}

	/** MemberCasual enum. */
	enum MemberCasual {
		unknown_member_casual = 0,
		member = 1,
		casual = 2,
	}

	/** Properties of a Trip. */
	interface ITrip {
		/** Trip rideId */
		rideId?: string | null;

		/** Trip rideableType */
		rideableType?: trip_protobuf.RideableType | null;

		/** Trip startedAtMs */
		startedAtMs?: number | Long | null;

		/** Trip endedAtMs */
		endedAtMs?: number | Long | null;

		/** Trip startStationName */
		startStationName?: string | null;

		/** Trip startStationId */
		startStationId?: string | null;

		/** Trip endStationName */
		endStationName?: string | null;

		/** Trip endStationId */
		endStationId?: string | null;

		/** Trip startLat */
		startLat?: number | null;

		/** Trip startLng */
		startLng?: number | null;

		/** Trip endLat */
		endLat?: number | null;

		/** Trip endLng */
		endLng?: number | null;

		/** Trip memberCasual */
		memberCasual?: trip_protobuf.MemberCasual | null;
	}

	/** Represents a Trip. */
	class Trip implements ITrip {
		/**
		 * Constructs a new Trip.
		 * @param [properties] Properties to set
		 */
		constructor(properties?: trip_protobuf.ITrip);

		/** Trip rideId. */
		public rideId: string;

		/** Trip rideableType. */
		public rideableType: trip_protobuf.RideableType;

		/** Trip startedAtMs. */
		public startedAtMs: number | Long;

		/** Trip endedAtMs. */
		public endedAtMs: number | Long;

		/** Trip startStationName. */
		public startStationName?: string | null;

		/** Trip startStationId. */
		public startStationId?: string | null;

		/** Trip endStationName. */
		public endStationName?: string | null;

		/** Trip endStationId. */
		public endStationId?: string | null;

		/** Trip startLat. */
		public startLat?: number | null;

		/** Trip startLng. */
		public startLng?: number | null;

		/** Trip endLat. */
		public endLat?: number | null;

		/** Trip endLng. */
		public endLng?: number | null;

		/** Trip memberCasual. */
		public memberCasual: trip_protobuf.MemberCasual;

		/**
		 * Creates a new Trip instance using the specified properties.
		 * @param [properties] Properties to set
		 * @returns Trip instance
		 */
		public static create(properties?: trip_protobuf.ITrip): trip_protobuf.Trip;

		/**
		 * Encodes the specified Trip message. Does not implicitly {@link trip_protobuf.Trip.verify|verify} messages.
		 * @param message Trip message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encode(message: trip_protobuf.ITrip, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * Encodes the specified Trip message, length delimited. Does not implicitly {@link trip_protobuf.Trip.verify|verify} messages.
		 * @param message Trip message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(message: trip_protobuf.ITrip, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * Decodes a Trip message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns Trip
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): trip_protobuf.Trip;

		/**
		 * Decodes a Trip message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns Trip
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): trip_protobuf.Trip;

		/**
		 * Verifies a Trip message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a Trip message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns Trip
		 */
		public static fromObject(object: { [k: string]: any }): trip_protobuf.Trip;

		/**
		 * Creates a plain object from a Trip message. Also converts values to other types if specified.
		 * @param message Trip
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(message: trip_protobuf.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

		/**
		 * Converts this Trip to JSON.
		 * @returns JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * Gets the default type url for Trip
		 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	/** Properties of a ServerResponseAll. */
	interface IServerResponseAll {
		/** ServerResponseAll trips */
		trips?: trip_protobuf.ITrip[] | null;
	}

	/** Represents a ServerResponseAll. */
	class ServerResponseAll implements IServerResponseAll {
		/**
		 * Constructs a new ServerResponseAll.
		 * @param [properties] Properties to set
		 */
		constructor(properties?: trip_protobuf.IServerResponseAll);

		/** ServerResponseAll trips. */
		public trips: trip_protobuf.ITrip[];

		/**
		 * Creates a new ServerResponseAll instance using the specified properties.
		 * @param [properties] Properties to set
		 * @returns ServerResponseAll instance
		 */
		public static create(properties?: trip_protobuf.IServerResponseAll): trip_protobuf.ServerResponseAll;

		/**
		 * Encodes the specified ServerResponseAll message. Does not implicitly {@link trip_protobuf.ServerResponseAll.verify|verify} messages.
		 * @param message ServerResponseAll message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encode(message: trip_protobuf.IServerResponseAll, writer?: $protobuf.Writer): $protobuf.Writer;

		/**
		 * Encodes the specified ServerResponseAll message, length delimited. Does not implicitly {@link trip_protobuf.ServerResponseAll.verify|verify} messages.
		 * @param message ServerResponseAll message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: trip_protobuf.IServerResponseAll,
			writer?: $protobuf.Writer,
		): $protobuf.Writer;

		/**
		 * Decodes a ServerResponseAll message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns ServerResponseAll
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): trip_protobuf.ServerResponseAll;

		/**
		 * Decodes a ServerResponseAll message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns ServerResponseAll
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): trip_protobuf.ServerResponseAll;

		/**
		 * Verifies a ServerResponseAll message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a ServerResponseAll message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns ServerResponseAll
		 */
		public static fromObject(object: { [k: string]: any }): trip_protobuf.ServerResponseAll;

		/**
		 * Creates a plain object from a ServerResponseAll message. Also converts values to other types if specified.
		 * @param message ServerResponseAll
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(
			message: trip_protobuf.ServerResponseAll,
			options?: $protobuf.IConversionOptions,
		): { [k: string]: any };

		/**
		 * Converts this ServerResponseAll to JSON.
		 * @returns JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * Gets the default type url for ServerResponseAll
		 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}
}
