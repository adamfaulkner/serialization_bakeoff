import { Message } from "capnp-es";
import {
	MemberCasual as CapnpMemberCasual,
	RideableType as CapnpRideableType,
	ServerResponseAll as ServerResponseAllCapnp,
} from "./capnp_trip.js";
import type { Deserializer } from "./deserializer.js";
import type { MemberCasual, RideableType, ServerResponseAll, Trip } from "./trip.js";

function materializeAsPojo(deserialized: ServerResponseAllCapnp, verify: boolean): ServerResponseAll {
	// These values aren't POJOs, they use a Proxy object to provide a POJO-like interface.
	// Build POJOs manually.
	const trips: Array<Trip> = [];
	for (const trip of deserialized.trips) {
		if (verify) {
			if (trip.rideableType === CapnpRideableType.UNKNOWN_RIDEABLE_TYPE) {
				throw new Error(`Unknown rideable type: ${trip.rideableType}`);
			}
			if (trip.memberCasual === CapnpMemberCasual.UNKNOWN_MEMBER_CASUAL) {
				throw new Error(`Unknown member casual: ${trip.memberCasual}`);
			}
		}

		trips.push({
			rideId: trip.rideId,
			rideableType: trip.rideableType as unknown as RideableType,
			startedAt: new Date(Number(trip.startedAtMs)),
			endedAt: new Date(Number(trip.endedAtMs)),
			...(trip.startStationName !== "" ? { startStationName: trip.startStationName } : {}),
			...(trip.startStationId !== "" ? { startStationId: trip.startStationId } : {}),
			...(trip.endStationName !== "" ? { endStationName: trip.endStationName } : {}),
			...(trip.endStationId !== "" ? { endStationId: trip.endStationId } : {}),
			...(trip.startLat !== 0 ? { startLat: trip.startLat } : {}),
			...(trip.startLng !== 0 ? { startLng: trip.startLng } : {}),
			...(trip.endLat !== 0 ? { endLat: trip.endLat } : {}),
			...(trip.endLng !== 0 ? { endLng: trip.endLng } : {}),
			memberCasual: trip.memberCasual as unknown as MemberCasual,
		});
	}
	return { trips };
}

export const capnp: Deserializer<ServerResponseAllCapnp> = {
	name: "capnp" as const,
	endpoint: "capnp",
	deserializeAll: (data: Uint8Array) => {
		const responseMessage = new Message(data, false, false);
		responseMessage._capnp.traversalLimit = Number.POSITIVE_INFINITY;
		return responseMessage.getRoot(ServerResponseAllCapnp);
	},
	materializeUnverifiedAsPojo: (deserialized: ServerResponseAllCapnp) => {
		return materializeAsPojo(deserialized, false);
	},
	scanForIdProperty: (deserialized: ServerResponseAllCapnp, targetId: string) => {
		const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
		return trip !== undefined;
	},
	materializeVerifedAsPojo: (deserialized: ServerResponseAllCapnp): ServerResponseAll =>
		materializeAsPojo(deserialized, true),
};
