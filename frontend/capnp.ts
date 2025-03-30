import { Message } from "capnp-es";
import {
  MemberCasual,
  RideableType,
  ServerResponseAll as ServerResponseAllCapnp,
} from "./capnp_trip.js";
import { ServerResponseAll } from "./trip.js";
import { Deserializer } from "./deserializer.js";

export const capnp: Deserializer<ServerResponseAllCapnp> = {
  name: "capnp" as const,
  deserializeAll: (data: Uint8Array) => {
    const responseMessage = new Message(data, false, false);
    responseMessage._capnp.traversalLimit = Infinity;
    return responseMessage.getRoot(ServerResponseAllCapnp);
  },
  materializeAsPojo: (deserialized: ServerResponseAllCapnp) => {
    // These values aren't POJOs, they use a Proxy object to provide a POJO-like interface.
    // Build POJOs manually.
    return {
      trips: deserialized.trips.map((trip: any) => ({
        rideId: trip.rideId,
        rideableType: trip.rideableType,
        startedAt: new Date(Number(trip.startedAtMs)),
        endedAt: new Date(Number(trip.endedAtMs)),
        ...(trip.startStationName !== ""
          ? { startStationName: trip.startStationName }
          : {}),
        ...(trip.startStationId !== ""
          ? { startStationId: trip.startStationId }
          : {}),
        ...(trip.endStationName !== ""
          ? { endStationName: trip.endStationName }
          : {}),
        ...(trip.endStationId !== ""
          ? { endStationId: trip.endStationId }
          : {}),
        ...(trip.startLat !== 0 ? { startLat: trip.startLat.lat } : {}),
        ...(trip.startLng !== 0 ? { startLng: trip.startLng.lng } : {}),
        ...(trip.endLat !== 0 ? { endLat: trip.endLat.lat } : {}),
        ...(trip.endLng !== 0 ? { endLng: trip.endLng.lng } : {}),
        memberCasual: trip.memberCasual,
      })),
    };
  },
  scanForIdProperty: (
    deserialized: ServerResponseAllCapnp,
    targetId: string,
  ) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
  verifyServerResponse: function (
    deserialized: ServerResponseAllCapnp,
  ): boolean {
    for (const trip of deserialized.trips) {
      if (trip.rideableType === RideableType.UNKNOWN_RIDEABLE_TYPE) {
        return false;
      }
      if (trip.memberCasual === MemberCasual.UNKNOWN_MEMBER_CASUAL) {
        return false;
      }
    }
    return true;
  },
};
