import { Packr } from "msgpackr";
import { encode as cborEncode } from "cbor-x";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Encoder } from "@toondepauw/node-zstd";
import protobuf from "protobufjs";
import avro from "avsc";
import * as flatbuffers from "flatbuffers";
import {
	SerializerResponse,
	Trip,
	RideableType as OurRideableType,
	MemberCasual as OurMemberCasual,
	RideableType,
} from "./types.js";
import {
	ServerResponseAll as BebopServerResponseAll,
	RideableType as BebopRideableType,
	MemberCasual as BebopMemberCasual,
} from "./bops.gen.js";
import { ServerResponseAll as FlatBufferServerResponseAll } from "./flatbuffers/server-response-all.js";
import { Trip as FlatBufferTrip } from "./flatbuffers/trip.js";
import { RideableType as FlatBufferRideableType } from "./flatbuffers/rideable-type.js";
import { MemberCasual as FlatBufferMemberCasual } from "./flatbuffers/member-casual.js";
import { BebopView } from "bebop";

// Set up paths for schema files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

// Shared state for serializers that need initialization
let avroSchema: avro.Type | null = null;
let protoRoot: protobuf.Root | null = null;

// Lazy initialization of serialization schemas
function initSerializers(): void {
	if (!protoRoot) {
		// Initialize protobuf schema
		const protoPath = path.join(projectRoot, "schemas", "trip.proto");
		console.log(`Loading Protocol Buffers schema from: ${protoPath}`);
		try {
			protoRoot = protobuf.loadSync(protoPath);
			console.log("Successfully loaded Protocol Buffers schema");
		} catch (error) {
			console.error("Error loading Protocol Buffers schema:", error);
			throw error;
		}
	}

	if (!avroSchema) {
		// Initialize Avro schema
		try {
			// Using dynamic import for avsc
			const avroPath = path.join(projectRoot, "schemas", "trip.avsc");
			console.log(`Loading Avro schema from: ${avroPath}`);
			const schemaJson = JSON.parse(readFileSync(avroPath, "utf8"));
			avroSchema = avro.Type.forSchema(schemaJson);

			// We'll initialize this when needed in the avroSerialize function
			console.log("Successfully loaded Avro schema JSON");
		} catch (error) {
			console.error("Error loading Avro schema:", error);
		}
	}
}

// JSON Serializer
export function jsonSerialize(trips: Trip[]): SerializerResponse {
	const response = { trips };
	const startTime = process.hrtime.bigint();
	const serialized = JSON.stringify(response);
	const endTime = process.hrtime.bigint();

	return {
		data: serialized,
		duration: Number((endTime - startTime) / 1000000n), // Convert to milliseconds
	};
}

// MessagePack Serializer
export function msgpackSerialize(trips: Trip[]): SerializerResponse {
	const response = { trips };
	const packr = new Packr();

	const startTime = process.hrtime.bigint();
	const serialized = packr.pack(response);
	const endTime = process.hrtime.bigint();

	return {
		data: serialized,
		duration: Number((endTime - startTime) / 1000000n),
	};
}

// CBOR Serializer
export function cborSerialize(trips: Trip[]): SerializerResponse {
	const response = { trips };

	const startTime = process.hrtime.bigint();
	const serialized = cborEncode(response);
	const endTime = process.hrtime.bigint();

	return {
		data: serialized,
		duration: Number((endTime - startTime) / 1000000n),
	};
}

// Protocol Buffers Serializer
export function protoSerialize(trips: Trip[]): SerializerResponse {
	initSerializers();

	if (!protoRoot) {
		throw new Error("Protocol Buffers schema not initialized");
	}

	const TripMessage = protoRoot.lookupType("trip_protobuf.Trip");
	const ServerResponseAll = protoRoot.lookupType("trip_protobuf.ServerResponseAll");

	// Convert trips to protobuf format
	const startTime = process.hrtime.bigint();

	const protoTrips = trips.map((trip) => {
		return TripMessage.create({
			rideId: trip.rideId,
			rideableType: trip.rideableType,
			startedAtMs: trip.startedAt, // Using the new field name but proto expects startedAtMs
			endedAtMs: trip.endedAt, // Using the new field name but proto expects endedAtMs
			startStationName: trip.startStationName,
			startStationId: trip.startStationId,
			endStationName: trip.endStationName,
			endStationId: trip.endStationId,
			startLat: trip.startLat,
			startLng: trip.startLng,
			endLat: trip.endLat,
			endLng: trip.endLng,
			memberCasual: trip.memberCasual,
		});
	});

	const response = ServerResponseAll.create({ trips: protoTrips });
	const serialized = ServerResponseAll.encode(response).finish();
	const endTime = process.hrtime.bigint();

	return {
		data: Buffer.from(serialized),
		duration: Number((endTime - startTime) / 1000000n),
	};
}

function mapToAvroRideableType(r: RideableType): string {
	switch (r) {
		case RideableType.CLASSIC_BIKE:
			return "classic_bike";
		case RideableType.ELECTRIC_BIKE:
			return "electric_bike";
		default:
			return "unknorn";
	}
}

function mapToAvroMemberCasual(m: OurMemberCasual): string {
	switch (m) {
		case OurMemberCasual.MEMBER:
			return "member";
		case OurMemberCasual.CASUAL:
			return "casual";
		default:
			return "unknown";
	}
}

class AvroTripTransformer {
	constructor(private underlying: Trip) {}

	get rideId(): string {
		return this.underlying.rideId;
	}

	get rideableType(): string {
		return mapToAvroRideableType(this.underlying.rideableType);
	}

	get startedAt(): number {
		return this.underlying.startedAt;
	}

	get endedAt(): number {
		return this.underlying.endedAt;
	}

	get memberCasual(): string {
		return mapToAvroMemberCasual(this.underlying.memberCasual);
	}

	get startLat(): number | null {
		return this.underlying.startLat || null;
	}

	get startLng(): number | null {
		return this.underlying.startLng || null;
	}

	get endLat(): number | null {
		return this.underlying.endLat || null;
	}

	get endLng(): number | null {
		return this.underlying.endLng || null;
	}

	get startStationId(): string | null {
		return this.underlying.startStationId || null;
	}

	get endStationId(): string | null {
		return this.underlying.endStationId || null;
	}

	get startStationName(): string | null {
		return this.underlying.startStationName || null;
	}

	get endStationName(): string | null {
		return this.underlying.endStationName || null;
	}
}

class BebopTripTransformer {
	constructor(private underlying: Trip) {}

	get rideId(): string {
		return this.underlying.rideId;
	}

	get rideableType(): BebopRideableType {
		return mapRideableType(this.underlying.rideableType);
	}

	get startedAt(): Date {
		return new Date(this.underlying.startedAt);
	}

	get endedAt(): Date {
		return new Date(this.underlying.endedAt);
	}

	get startStationName(): string | undefined {
		return this.underlying.startStationName;
	}

	get startStationId(): string | undefined {
		return this.underlying.startStationId;
	}

	get endStationName(): string | undefined {
		return this.underlying.endStationName;
	}

	get endStationId(): string | undefined {
		return this.underlying.endStationId;
	}

	get startLat(): number | undefined {
		return this.underlying.startLat;
	}

	get startLng(): number | undefined {
		return this.underlying.startLng;
	}

	get endLat(): number | undefined {
		return this.underlying.endLat;
	}

	get endLng(): number | undefined {
		return this.underlying.endLng;
	}

	get memberCasual(): BebopMemberCasual {
		return mapMemberCasual(this.underlying.memberCasual);
	}
}

const s = Buffer.alloc(300 << 20);

// Avro Serializer
export function avroSerialize(trips: Trip[]): SerializerResponse {
	initSerializers();

	if (!avroSchema) {
		const avroPath = path.join(projectRoot, "schemas", "trip.avsc");
		const schemaJson = JSON.parse(readFileSync(avroPath, "utf8"));
		avroSchema = avro.Type.forSchema(schemaJson);
	}

	const startTime = process.hrtime.bigint();
	const response = {
		trips: trips.map((trip) => new AvroTripTransformer(trip)),
	};
	const p = avroSchema.encode(response, s);
	const serialized = Buffer.from(s.buffer, 0, p);

	const endTime = process.hrtime.bigint();

	return {
		data: Buffer.from(serialized.buffer, serialized.byteOffset, serialized.byteLength),
		duration: Number((endTime - startTime) / 1000000n),
	};
}

// Compression using zstd
export function compressWithZstd(data: Buffer | string): SerializerResponse {
	const startTime = process.hrtime.bigint();

	// Convert string to Buffer if needed
	const dataBuffer = typeof data === "string" ? Buffer.from(data) : data;

	// Compression level 3 to match the Rust implementation
	const encoder = new Encoder(3);
	const compressed = encoder.encodeSync(dataBuffer);
	const endTime = process.hrtime.bigint();

	return {
		data: compressed,
		duration: Number((endTime - startTime) / 1000000n),
	};
}

const bebopView = BebopView.getInstance();

// Bebop Serializer
export function bebopSerialize(trips: Trip[]): SerializerResponse {
	const startTime = process.hrtime.bigint();

	// Convert trips to bebop format using transformer to avoid object allocation
	const response = new BebopServerResponseAll({
		trips: trips.map((trip) => new BebopTripTransformer(trip)),
	});

	bebopView.startWriting();
	BebopServerResponseAll.encodeInto(response, bebopView);
	const serialized = bebopView.toArray();
	const endTime = process.hrtime.bigint();

	return {
		data: Buffer.from(serialized.buffer, serialized.byteOffset, serialized.byteLength),
		duration: Number((endTime - startTime) / 1000000n),
	};
}

function mapRideableType(type: OurRideableType): BebopRideableType {
	switch (type) {
		case OurRideableType.UNKNOWN_RIDEABLE_TYPE:
			return BebopRideableType.Unknown;
		case OurRideableType.ELECTRIC_BIKE:
			return BebopRideableType.Ebicycle;
		case OurRideableType.CLASSIC_BIKE:
			return BebopRideableType.Bicycle;
		default:
			return BebopRideableType.Unknown;
	}
}

function mapMemberCasual(type: OurMemberCasual): BebopMemberCasual {
	switch (type) {
		case OurMemberCasual.UNKNOWN_MEMBER_CASUAL:
			return BebopMemberCasual.Unknown;
		case OurMemberCasual.MEMBER:
			return BebopMemberCasual.Member;
		case OurMemberCasual.CASUAL:
			return BebopMemberCasual.Casual;
		default:
			return BebopMemberCasual.Unknown;
	}
}

// FlatBuffers Serializer
export function flatbuffersSerialize(trips: Trip[]): SerializerResponse {
	const startTime = process.hrtime.bigint();

	const builder = new flatbuffers.Builder(1024);

	// Create the trips array
	const tripOffsets: flatbuffers.Offset[] = trips.map((trip) => {
		// Create string offsets
		const rideIdOffset = trip.rideId ? builder.createString(trip.rideId) : 0;
		const startStationNameOffset = trip.startStationName ? builder.createString(trip.startStationName) : 0;
		const startStationIdOffset = trip.startStationId ? builder.createString(trip.startStationId) : 0;
		const endStationNameOffset = trip.endStationName ? builder.createString(trip.endStationName) : 0;
		const endStationIdOffset = trip.endStationId ? builder.createString(trip.endStationId) : 0;

		// Start building Trip
		FlatBufferTrip.startTrip(builder);

		// Add all fields
		if (trip.rideId) {
			FlatBufferTrip.addRideId(builder, rideIdOffset);
		}

		// Map enums to FlatBuffer enums
		FlatBufferTrip.addRideableType(builder, trip.rideableType);

		// Convert Date to milliseconds bigint
		FlatBufferTrip.addStartedAtMs(builder, BigInt(trip.startedAt));
		FlatBufferTrip.addEndedAtMs(builder, BigInt(trip.endedAt));

		// Add optional string fields only if they exist
		if (trip.startStationName) {
			FlatBufferTrip.addStartStationName(builder, startStationNameOffset);
		}
		if (trip.startStationId) {
			FlatBufferTrip.addStartStationId(builder, startStationIdOffset);
		}
		if (trip.endStationName) {
			FlatBufferTrip.addEndStationName(builder, endStationNameOffset);
		}
		if (trip.endStationId) {
			FlatBufferTrip.addEndStationId(builder, endStationIdOffset);
		}

		// Add numeric fields
		if (trip.startLat !== undefined) {
			FlatBufferTrip.addStartLat(builder, trip.startLat);
		}
		if (trip.startLng !== undefined) {
			FlatBufferTrip.addStartLng(builder, trip.startLng);
		}
		if (trip.endLat !== undefined) {
			FlatBufferTrip.addEndLat(builder, trip.endLat);
		}
		if (trip.endLng !== undefined) {
			FlatBufferTrip.addEndLng(builder, trip.endLng);
		}

		// Add memberCasual enum
		FlatBufferTrip.addMemberCasual(builder, trip.memberCasual);

		// End and return offset
		return FlatBufferTrip.endTrip(builder);
	});

	// Create vector of trips
	const tripsVector = FlatBufferServerResponseAll.createTripsVector(builder, tripOffsets);

	// Create the root object
	FlatBufferServerResponseAll.startServerResponseAll(builder);
	FlatBufferServerResponseAll.addTrips(builder, tripsVector);
	const serverResponseOffset = FlatBufferServerResponseAll.endServerResponseAll(builder);

	// Finish the buffer
	builder.finish(serverResponseOffset);

	// Get the serialized data
	const serialized = builder.asUint8Array();
	const endTime = process.hrtime.bigint();

	return {
		data: Buffer.from(serialized),
		duration: Number((endTime - startTime) / 1000000n), // Convert to milliseconds
	};
}
