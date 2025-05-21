import { ByteBuffer } from "flatbuffers/js/byte-buffer.js";
import { C1 } from "msgpackr/index.js";
import type { Deserializer } from "./deserializer.js";
import { MemberCasual as MemberCasualFlatbuffers } from "./flatbuffers/member-casual.js";
import { RideableType as RideableTypeFlatbuffers } from "./flatbuffers/rideable-type.js";
import { ServerResponseAll as ServerResponseAllFlatbuffers } from "./flatbuffers/server-response-all.js";
import type { MemberCasual, RideableType, ServerResponseAll, Trip } from "./trip.js";

function materializeAsPojo(deserialized: ServerResponseAllFlatbuffers, verify: boolean): ServerResponseAll {
	// These values aren't POJOs. They also don't even pretend to be :)
	const trips: Array<Trip> = [];

	for (let i = 0; i < deserialized.tripsLength(); i++) {
		const trip = deserialized.trips(i)!;

		// This property is optional in the flatbuffer, but shouldn't be.
		if (trip.rideId() === null) {
			throw new Error("Ride ID is missing");
		}
		if (trip.rideableType() === RideableTypeFlatbuffers.UNKNOWN_RIDEABLE_TYPE) {
			throw new Error("Rideable type is unknown");
		}

		if (trip.memberCasual() === MemberCasualFlatbuffers.UNKNOWN_MEMBER_CASUAL) {
			throw new Error("Member casual is unknown");
		}

		trips.push({
			rideId: trip.rideId()!,
			rideableType: trip.rideableType() as unknown as RideableType,
			startedAt: new Date(Number(trip.startedAtMs())),
			endedAt: new Date(Number(trip.endedAtMs())),
			...(trip.startStationName() !== null ? { startStationName: trip.startStationName()! } : {}),
			...(trip.startStationId() !== null ? { startStationId: trip.startStationId()! } : {}),
			...(trip.endStationId() !== null ? { endStationId: trip.endStationId()! } : {}),
			...(trip.endStationName() !== null ? { endStationName: trip.endStationName()! } : {}),
			startLat: trip.startLat(),
			startLng: trip.startLng(),
			endLat: trip.endLat(),
			endLng: trip.endLng(),
			memberCasual: trip.memberCasual() as unknown as MemberCasual,
		});
	}

	return {
		trips,
	};
}

export const flatbuffers: Deserializer<ServerResponseAllFlatbuffers> = {
	name: "flatbuffers" as const,
	endpoint: "flatbuffers",
	deserializeAll: (data: Uint8Array) => {
		const response = ServerResponseAllFlatbuffers.getRootAsServerResponseAll(new ByteBuffer(data));
		return response;
	},
	scanForIdProperty: (deserialized: ServerResponseAllFlatbuffers, targetId: string) => {
		// Optimization: avoid constructing one object per trip.
		let t;
		const tripsLength = deserialized.tripsLength();
		for (let i = 0; i < tripsLength; i++) {
			t = deserialized.trips(i, t) ?? undefined;
			if (t?.rideId() === targetId) {
				return true;
			}
		}
		return false;
	},
	materializeUnverifiedAsPojo: (deserialized: ServerResponseAllFlatbuffers): ServerResponseAll =>
		materializeAsPojo(deserialized, false),
	materializeVerifedAsPojo: (deserialized: ServerResponseAllFlatbuffers): ServerResponseAll =>
		materializeAsPojo(deserialized, true),
};
