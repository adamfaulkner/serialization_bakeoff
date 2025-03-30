import { load, Message } from "protobufjs";
import { ServerResponseAll, Trip } from "./trip.js";
import { Deserializer } from "./deserializer.js";
import { trip_protobuf } from "./protobuf_trip.js";

export const proto: Deserializer<trip_protobuf.ServerResponseAll> = {
  name: "proto" as const,
  deserializeAll: (data: Uint8Array) => {
    return trip_protobuf.ServerResponseAll.decode(data);
  },
  materializeAsPojo: (deserialized: trip_protobuf.ServerResponseAll) => {
    // The values deserialized here are POJOs. The only differences from JSON are that each object
    // has a prototype that sets the default value for all fields, and dates are in milliseconds.
    return {
      trips: deserialized.trips.map((trip) => {
        return {
          ...trip,
          startedAt: new Date(trip.startedAtMs),
          endedAt: new Date(trip.endedAtMs),
        };
      }) as unknown as Array<Trip>,
    };
  },
  scanForIdProperty: (
    deserialized: trip_protobuf.ServerResponseAll,
    targetId: string,
  ) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
  verifyServerResponse: function (
    deserialized: trip_protobuf.ServerResponseAll,
  ): boolean {
    for (const trip of deserialized.trips) {
      if (trip.rideId === undefined || trip.rideId === null) {
        return false;
      }

      if (
        trip.rideableType === undefined ||
        trip.rideableType === null ||
        trip.rideableType === trip_protobuf.RideableType.unknown_rideable_type
      ) {
        return false;
      }

      if (trip.startedAtMs === undefined || trip.startedAtMs === null) {
        return false;
      }

      if (trip.startedAtMs > Date.now()) {
        return false;
      }

      if (trip.endedAtMs === undefined || trip.endedAtMs === null) {
        return false;
      }

      if (trip.endedAtMs < trip.startedAtMs) {
        return false;
      }

      if (
        trip.memberCasual === undefined ||
        trip.memberCasual === null ||
        trip.memberCasual === trip_protobuf.MemberCasual.unknown_member_casual
      ) {
        return false;
      }
    }
    return true;
  },
};
