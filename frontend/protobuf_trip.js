/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const trip_protobuf = ($root.trip_protobuf = (() => {
	/**
	 * Namespace trip_protobuf.
	 * @exports trip_protobuf
	 * @namespace
	 */
	const trip_protobuf = {};

	/**
	 * RideableType enum.
	 * @name trip_protobuf.RideableType
	 * @enum {number}
	 * @property {number} unknown_rideable_type=0 unknown_rideable_type value
	 * @property {number} electric_bike=1 electric_bike value
	 * @property {number} classic_bike=2 classic_bike value
	 */
	trip_protobuf.RideableType = (() => {
		const valuesById = {},
			values = Object.create(valuesById);
		values[(valuesById[0] = "unknown_rideable_type")] = 0;
		values[(valuesById[1] = "electric_bike")] = 1;
		values[(valuesById[2] = "classic_bike")] = 2;
		return values;
	})();

	/**
	 * MemberCasual enum.
	 * @name trip_protobuf.MemberCasual
	 * @enum {number}
	 * @property {number} unknown_member_casual=0 unknown_member_casual value
	 * @property {number} member=1 member value
	 * @property {number} casual=2 casual value
	 */
	trip_protobuf.MemberCasual = (() => {
		const valuesById = {},
			values = Object.create(valuesById);
		values[(valuesById[0] = "unknown_member_casual")] = 0;
		values[(valuesById[1] = "member")] = 1;
		values[(valuesById[2] = "casual")] = 2;
		return values;
	})();

	trip_protobuf.Trip = (() => {
		/**
		 * Properties of a Trip.
		 * @memberof trip_protobuf
		 * @interface ITrip
		 * @property {string|null} [rideId] Trip rideId
		 * @property {trip_protobuf.RideableType|null} [rideableType] Trip rideableType
		 * @property {number|Long|null} [startedAtMs] Trip startedAtMs
		 * @property {number|Long|null} [endedAtMs] Trip endedAtMs
		 * @property {string|null} [startStationName] Trip startStationName
		 * @property {string|null} [startStationId] Trip startStationId
		 * @property {string|null} [endStationName] Trip endStationName
		 * @property {string|null} [endStationId] Trip endStationId
		 * @property {number|null} [startLat] Trip startLat
		 * @property {number|null} [startLng] Trip startLng
		 * @property {number|null} [endLat] Trip endLat
		 * @property {number|null} [endLng] Trip endLng
		 * @property {trip_protobuf.MemberCasual|null} [memberCasual] Trip memberCasual
		 */

		/**
		 * Constructs a new Trip.
		 * @memberof trip_protobuf
		 * @classdesc Represents a Trip.
		 * @implements ITrip
		 * @constructor
		 * @param {trip_protobuf.ITrip=} [properties] Properties to set
		 */
		function Trip(properties) {
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Trip rideId.
		 * @member {string} rideId
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.rideId = "";

		/**
		 * Trip rideableType.
		 * @member {trip_protobuf.RideableType} rideableType
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.rideableType = 0;

		/**
		 * Trip startedAtMs.
		 * @member {number|Long} startedAtMs
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.startedAtMs = 0;

		/**
		 * Trip endedAtMs.
		 * @member {number|Long} endedAtMs
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.endedAtMs = 0;

		/**
		 * Trip startStationName.
		 * @member {string|null|undefined} startStationName
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.startStationName = null;

		/**
		 * Trip startStationId.
		 * @member {string|null|undefined} startStationId
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.startStationId = null;

		/**
		 * Trip endStationName.
		 * @member {string|null|undefined} endStationName
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.endStationName = null;

		/**
		 * Trip endStationId.
		 * @member {string|null|undefined} endStationId
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.endStationId = null;

		/**
		 * Trip startLat.
		 * @member {number|null|undefined} startLat
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.startLat = null;

		/**
		 * Trip startLng.
		 * @member {number|null|undefined} startLng
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.startLng = null;

		/**
		 * Trip endLat.
		 * @member {number|null|undefined} endLat
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.endLat = null;

		/**
		 * Trip endLng.
		 * @member {number|null|undefined} endLng
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.endLng = null;

		/**
		 * Trip memberCasual.
		 * @member {trip_protobuf.MemberCasual} memberCasual
		 * @memberof trip_protobuf.Trip
		 * @instance
		 */
		Trip.prototype.memberCasual = 0;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_startStationName", {
			get: $util.oneOfGetter(($oneOfFields = ["startStationName"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_startStationId", {
			get: $util.oneOfGetter(($oneOfFields = ["startStationId"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_endStationName", {
			get: $util.oneOfGetter(($oneOfFields = ["endStationName"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_endStationId", {
			get: $util.oneOfGetter(($oneOfFields = ["endStationId"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_startLat", {
			get: $util.oneOfGetter(($oneOfFields = ["startLat"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_startLng", {
			get: $util.oneOfGetter(($oneOfFields = ["startLng"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_endLat", {
			get: $util.oneOfGetter(($oneOfFields = ["endLat"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		// Virtual OneOf for proto3 optional field
		Object.defineProperty(Trip.prototype, "_endLng", {
			get: $util.oneOfGetter(($oneOfFields = ["endLng"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		/**
		 * Creates a new Trip instance using the specified properties.
		 * @function create
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {trip_protobuf.ITrip=} [properties] Properties to set
		 * @returns {trip_protobuf.Trip} Trip instance
		 */
		Trip.create = function create(properties) {
			return new Trip(properties);
		};

		/**
		 * Encodes the specified Trip message. Does not implicitly {@link trip_protobuf.Trip.verify|verify} messages.
		 * @function encode
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {trip_protobuf.ITrip} message Trip message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Trip.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.rideId != null && Object.hasOwnProperty.call(message, "rideId"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.rideId);
			if (message.rideableType != null && Object.hasOwnProperty.call(message, "rideableType"))
				writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.rideableType);
			if (message.startedAtMs != null && Object.hasOwnProperty.call(message, "startedAtMs"))
				writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.startedAtMs);
			if (message.endedAtMs != null && Object.hasOwnProperty.call(message, "endedAtMs"))
				writer.uint32(/* id 4, wireType 0 =*/ 32).int64(message.endedAtMs);
			if (message.startStationName != null && Object.hasOwnProperty.call(message, "startStationName"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.startStationName);
			if (message.startStationId != null && Object.hasOwnProperty.call(message, "startStationId"))
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.startStationId);
			if (message.endStationName != null && Object.hasOwnProperty.call(message, "endStationName"))
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.endStationName);
			if (message.endStationId != null && Object.hasOwnProperty.call(message, "endStationId"))
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.endStationId);
			if (message.startLat != null && Object.hasOwnProperty.call(message, "startLat"))
				writer.uint32(/* id 9, wireType 1 =*/ 73).double(message.startLat);
			if (message.startLng != null && Object.hasOwnProperty.call(message, "startLng"))
				writer.uint32(/* id 10, wireType 1 =*/ 81).double(message.startLng);
			if (message.endLat != null && Object.hasOwnProperty.call(message, "endLat"))
				writer.uint32(/* id 11, wireType 1 =*/ 89).double(message.endLat);
			if (message.endLng != null && Object.hasOwnProperty.call(message, "endLng"))
				writer.uint32(/* id 12, wireType 1 =*/ 97).double(message.endLng);
			if (message.memberCasual != null && Object.hasOwnProperty.call(message, "memberCasual"))
				writer.uint32(/* id 13, wireType 0 =*/ 104).int32(message.memberCasual);
			return writer;
		};

		/**
		 * Encodes the specified Trip message, length delimited. Does not implicitly {@link trip_protobuf.Trip.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {trip_protobuf.ITrip} message Trip message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Trip.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Trip message from the specified reader or buffer.
		 * @function decode
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {trip_protobuf.Trip} Trip
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Trip.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			const end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.trip_protobuf.Trip();
			while (reader.pos < end) {
				const tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.rideId = reader.string();
						break;
					}
					case 2: {
						message.rideableType = reader.int32();
						break;
					}
					case 3: {
						message.startedAtMs = reader.int64();
						break;
					}
					case 4: {
						message.endedAtMs = reader.int64();
						break;
					}
					case 5: {
						message.startStationName = reader.string();
						break;
					}
					case 6: {
						message.startStationId = reader.string();
						break;
					}
					case 7: {
						message.endStationName = reader.string();
						break;
					}
					case 8: {
						message.endStationId = reader.string();
						break;
					}
					case 9: {
						message.startLat = reader.double();
						break;
					}
					case 10: {
						message.startLng = reader.double();
						break;
					}
					case 11: {
						message.endLat = reader.double();
						break;
					}
					case 12: {
						message.endLng = reader.double();
						break;
					}
					case 13: {
						message.memberCasual = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Trip message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {trip_protobuf.Trip} Trip
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Trip.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Trip message.
		 * @function verify
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Trip.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			const properties = {};
			if (message.rideId != null && message.hasOwnProperty("rideId"))
				if (!$util.isString(message.rideId)) return "rideId: string expected";
			if (message.rideableType != null && message.hasOwnProperty("rideableType"))
				switch (message.rideableType) {
					default:
						return "rideableType: enum value expected";
					case 0:
					case 1:
					case 2:
						break;
				}
			if (message.startedAtMs != null && message.hasOwnProperty("startedAtMs"))
				if (
					!$util.isInteger(message.startedAtMs) &&
					!(
						message.startedAtMs &&
						$util.isInteger(message.startedAtMs.low) &&
						$util.isInteger(message.startedAtMs.high)
					)
				)
					return "startedAtMs: integer|Long expected";
			if (message.endedAtMs != null && message.hasOwnProperty("endedAtMs"))
				if (
					!$util.isInteger(message.endedAtMs) &&
					!(message.endedAtMs && $util.isInteger(message.endedAtMs.low) && $util.isInteger(message.endedAtMs.high))
				)
					return "endedAtMs: integer|Long expected";
			if (message.startStationName != null && message.hasOwnProperty("startStationName")) {
				properties._startStationName = 1;
				if (!$util.isString(message.startStationName)) return "startStationName: string expected";
			}
			if (message.startStationId != null && message.hasOwnProperty("startStationId")) {
				properties._startStationId = 1;
				if (!$util.isString(message.startStationId)) return "startStationId: string expected";
			}
			if (message.endStationName != null && message.hasOwnProperty("endStationName")) {
				properties._endStationName = 1;
				if (!$util.isString(message.endStationName)) return "endStationName: string expected";
			}
			if (message.endStationId != null && message.hasOwnProperty("endStationId")) {
				properties._endStationId = 1;
				if (!$util.isString(message.endStationId)) return "endStationId: string expected";
			}
			if (message.startLat != null && message.hasOwnProperty("startLat")) {
				properties._startLat = 1;
				if (typeof message.startLat !== "number") return "startLat: number expected";
			}
			if (message.startLng != null && message.hasOwnProperty("startLng")) {
				properties._startLng = 1;
				if (typeof message.startLng !== "number") return "startLng: number expected";
			}
			if (message.endLat != null && message.hasOwnProperty("endLat")) {
				properties._endLat = 1;
				if (typeof message.endLat !== "number") return "endLat: number expected";
			}
			if (message.endLng != null && message.hasOwnProperty("endLng")) {
				properties._endLng = 1;
				if (typeof message.endLng !== "number") return "endLng: number expected";
			}
			if (message.memberCasual != null && message.hasOwnProperty("memberCasual"))
				switch (message.memberCasual) {
					default:
						return "memberCasual: enum value expected";
					case 0:
					case 1:
					case 2:
						break;
				}
			return null;
		};

		/**
		 * Creates a Trip message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {trip_protobuf.Trip} Trip
		 */
		Trip.fromObject = function fromObject(object) {
			if (object instanceof $root.trip_protobuf.Trip) return object;
			const message = new $root.trip_protobuf.Trip();
			if (object.rideId != null) message.rideId = String(object.rideId);
			switch (object.rideableType) {
				default:
					if (typeof object.rideableType === "number") {
						message.rideableType = object.rideableType;
						break;
					}
					break;
				case "unknown_rideable_type":
				case 0:
					message.rideableType = 0;
					break;
				case "electric_bike":
				case 1:
					message.rideableType = 1;
					break;
				case "classic_bike":
				case 2:
					message.rideableType = 2;
					break;
			}
			if (object.startedAtMs != null)
				if ($util.Long) (message.startedAtMs = $util.Long.fromValue(object.startedAtMs)).unsigned = false;
				else if (typeof object.startedAtMs === "string") message.startedAtMs = Number.parseInt(object.startedAtMs, 10);
				else if (typeof object.startedAtMs === "number") message.startedAtMs = object.startedAtMs;
				else if (typeof object.startedAtMs === "object")
					message.startedAtMs = new $util.LongBits(
						object.startedAtMs.low >>> 0,
						object.startedAtMs.high >>> 0,
					).toNumber();
			if (object.endedAtMs != null)
				if ($util.Long) (message.endedAtMs = $util.Long.fromValue(object.endedAtMs)).unsigned = false;
				else if (typeof object.endedAtMs === "string") message.endedAtMs = Number.parseInt(object.endedAtMs, 10);
				else if (typeof object.endedAtMs === "number") message.endedAtMs = object.endedAtMs;
				else if (typeof object.endedAtMs === "object")
					message.endedAtMs = new $util.LongBits(object.endedAtMs.low >>> 0, object.endedAtMs.high >>> 0).toNumber();
			if (object.startStationName != null) message.startStationName = String(object.startStationName);
			if (object.startStationId != null) message.startStationId = String(object.startStationId);
			if (object.endStationName != null) message.endStationName = String(object.endStationName);
			if (object.endStationId != null) message.endStationId = String(object.endStationId);
			if (object.startLat != null) message.startLat = Number(object.startLat);
			if (object.startLng != null) message.startLng = Number(object.startLng);
			if (object.endLat != null) message.endLat = Number(object.endLat);
			if (object.endLng != null) message.endLng = Number(object.endLng);
			switch (object.memberCasual) {
				default:
					if (typeof object.memberCasual === "number") {
						message.memberCasual = object.memberCasual;
						break;
					}
					break;
				case "unknown_member_casual":
				case 0:
					message.memberCasual = 0;
					break;
				case "member":
				case 1:
					message.memberCasual = 1;
					break;
				case "casual":
				case 2:
					message.memberCasual = 2;
					break;
			}
			return message;
		};

		/**
		 * Creates a plain object from a Trip message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {trip_protobuf.Trip} message Trip
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Trip.toObject = function toObject(message, options) {
			if (!options) options = {};
			const object = {};
			if (options.defaults) {
				object.rideId = "";
				object.rideableType = options.enums === String ? "unknown_rideable_type" : 0;
				object.startedAtMs = 0;
				object.endedAtMs = 0;
				object.memberCasual = options.enums === String ? "unknown_member_casual" : 0;
			}
			if (message.rideId != null && message.hasOwnProperty("rideId")) object.rideId = message.rideId;
			if (message.rideableType != null && message.hasOwnProperty("rideableType"))
				object.rideableType =
					options.enums === String
						? $root.trip_protobuf.RideableType[message.rideableType] === undefined
							? message.rideableType
							: $root.trip_protobuf.RideableType[message.rideableType]
						: message.rideableType;
			if (message.startedAtMs != null && message.hasOwnProperty("startedAtMs"))
				if (typeof message.startedAtMs === "number")
					object.startedAtMs = options.longs === String ? String(message.startedAtMs) : message.startedAtMs;
				else
					object.startedAtMs =
						options.longs === String
							? $util.Long.prototype.toString.call(message.startedAtMs)
							: options.longs === Number
								? new $util.LongBits(message.startedAtMs.low >>> 0, message.startedAtMs.high >>> 0).toNumber()
								: message.startedAtMs;
			if (message.endedAtMs != null && message.hasOwnProperty("endedAtMs"))
				if (typeof message.endedAtMs === "number")
					object.endedAtMs = options.longs === String ? String(message.endedAtMs) : message.endedAtMs;
				else
					object.endedAtMs =
						options.longs === String
							? $util.Long.prototype.toString.call(message.endedAtMs)
							: options.longs === Number
								? new $util.LongBits(message.endedAtMs.low >>> 0, message.endedAtMs.high >>> 0).toNumber()
								: message.endedAtMs;
			if (message.startStationName != null && message.hasOwnProperty("startStationName")) {
				object.startStationName = message.startStationName;
				if (options.oneofs) object._startStationName = "startStationName";
			}
			if (message.startStationId != null && message.hasOwnProperty("startStationId")) {
				object.startStationId = message.startStationId;
				if (options.oneofs) object._startStationId = "startStationId";
			}
			if (message.endStationName != null && message.hasOwnProperty("endStationName")) {
				object.endStationName = message.endStationName;
				if (options.oneofs) object._endStationName = "endStationName";
			}
			if (message.endStationId != null && message.hasOwnProperty("endStationId")) {
				object.endStationId = message.endStationId;
				if (options.oneofs) object._endStationId = "endStationId";
			}
			if (message.startLat != null && message.hasOwnProperty("startLat")) {
				object.startLat = options.json && !isFinite(message.startLat) ? String(message.startLat) : message.startLat;
				if (options.oneofs) object._startLat = "startLat";
			}
			if (message.startLng != null && message.hasOwnProperty("startLng")) {
				object.startLng = options.json && !isFinite(message.startLng) ? String(message.startLng) : message.startLng;
				if (options.oneofs) object._startLng = "startLng";
			}
			if (message.endLat != null && message.hasOwnProperty("endLat")) {
				object.endLat = options.json && !isFinite(message.endLat) ? String(message.endLat) : message.endLat;
				if (options.oneofs) object._endLat = "endLat";
			}
			if (message.endLng != null && message.hasOwnProperty("endLng")) {
				object.endLng = options.json && !isFinite(message.endLng) ? String(message.endLng) : message.endLng;
				if (options.oneofs) object._endLng = "endLng";
			}
			if (message.memberCasual != null && message.hasOwnProperty("memberCasual"))
				object.memberCasual =
					options.enums === String
						? $root.trip_protobuf.MemberCasual[message.memberCasual] === undefined
							? message.memberCasual
							: $root.trip_protobuf.MemberCasual[message.memberCasual]
						: message.memberCasual;
			return object;
		};

		/**
		 * Converts this Trip to JSON.
		 * @function toJSON
		 * @memberof trip_protobuf.Trip
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Trip.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for Trip
		 * @function getTypeUrl
		 * @memberof trip_protobuf.Trip
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Trip.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/trip_protobuf.Trip";
		};

		return Trip;
	})();

	trip_protobuf.ServerResponseAll = (() => {
		/**
		 * Properties of a ServerResponseAll.
		 * @memberof trip_protobuf
		 * @interface IServerResponseAll
		 * @property {Array.<trip_protobuf.ITrip>|null} [trips] ServerResponseAll trips
		 */

		/**
		 * Constructs a new ServerResponseAll.
		 * @memberof trip_protobuf
		 * @classdesc Represents a ServerResponseAll.
		 * @implements IServerResponseAll
		 * @constructor
		 * @param {trip_protobuf.IServerResponseAll=} [properties] Properties to set
		 */
		function ServerResponseAll(properties) {
			this.trips = [];
			if (properties)
				for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ServerResponseAll trips.
		 * @member {Array.<trip_protobuf.ITrip>} trips
		 * @memberof trip_protobuf.ServerResponseAll
		 * @instance
		 */
		ServerResponseAll.prototype.trips = $util.emptyArray;

		/**
		 * Creates a new ServerResponseAll instance using the specified properties.
		 * @function create
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {trip_protobuf.IServerResponseAll=} [properties] Properties to set
		 * @returns {trip_protobuf.ServerResponseAll} ServerResponseAll instance
		 */
		ServerResponseAll.create = function create(properties) {
			return new ServerResponseAll(properties);
		};

		/**
		 * Encodes the specified ServerResponseAll message. Does not implicitly {@link trip_protobuf.ServerResponseAll.verify|verify} messages.
		 * @function encode
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {trip_protobuf.IServerResponseAll} message ServerResponseAll message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ServerResponseAll.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.trips != null && message.trips.length)
				for (let i = 0; i < message.trips.length; ++i)
					$root.trip_protobuf.Trip.encode(message.trips[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ServerResponseAll message, length delimited. Does not implicitly {@link trip_protobuf.ServerResponseAll.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {trip_protobuf.IServerResponseAll} message ServerResponseAll message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ServerResponseAll.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ServerResponseAll message from the specified reader or buffer.
		 * @function decode
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {trip_protobuf.ServerResponseAll} ServerResponseAll
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ServerResponseAll.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			const end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.trip_protobuf.ServerResponseAll();
			while (reader.pos < end) {
				const tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						if (!(message.trips && message.trips.length)) message.trips = [];
						message.trips.push($root.trip_protobuf.Trip.decode(reader, reader.uint32()));
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ServerResponseAll message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {trip_protobuf.ServerResponseAll} ServerResponseAll
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ServerResponseAll.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ServerResponseAll message.
		 * @function verify
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ServerResponseAll.verify = function verify(message) {
			if (typeof message !== "object" || message === null) return "object expected";
			if (message.trips != null && message.hasOwnProperty("trips")) {
				if (!Array.isArray(message.trips)) return "trips: array expected";
				for (let i = 0; i < message.trips.length; ++i) {
					const error = $root.trip_protobuf.Trip.verify(message.trips[i]);
					if (error) return "trips." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ServerResponseAll message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {trip_protobuf.ServerResponseAll} ServerResponseAll
		 */
		ServerResponseAll.fromObject = function fromObject(object) {
			if (object instanceof $root.trip_protobuf.ServerResponseAll) return object;
			const message = new $root.trip_protobuf.ServerResponseAll();
			if (object.trips) {
				if (!Array.isArray(object.trips)) throw TypeError(".trip_protobuf.ServerResponseAll.trips: array expected");
				message.trips = [];
				for (let i = 0; i < object.trips.length; ++i) {
					if (typeof object.trips[i] !== "object")
						throw TypeError(".trip_protobuf.ServerResponseAll.trips: object expected");
					message.trips[i] = $root.trip_protobuf.Trip.fromObject(object.trips[i]);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a ServerResponseAll message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {trip_protobuf.ServerResponseAll} message ServerResponseAll
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ServerResponseAll.toObject = function toObject(message, options) {
			if (!options) options = {};
			const object = {};
			if (options.arrays || options.defaults) object.trips = [];
			if (message.trips && message.trips.length) {
				object.trips = [];
				for (let j = 0; j < message.trips.length; ++j)
					object.trips[j] = $root.trip_protobuf.Trip.toObject(message.trips[j], options);
			}
			return object;
		};

		/**
		 * Converts this ServerResponseAll to JSON.
		 * @function toJSON
		 * @memberof trip_protobuf.ServerResponseAll
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ServerResponseAll.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		/**
		 * Gets the default type url for ServerResponseAll
		 * @function getTypeUrl
		 * @memberof trip_protobuf.ServerResponseAll
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		ServerResponseAll.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/trip_protobuf.ServerResponseAll";
		};

		return ServerResponseAll;
	})();

	return trip_protobuf;
})());

export { $root as default };
