import { load, Message } from "protobufjs";
import { ServerResponseAll, Trip } from "./trip.js";
import { Deserializer } from "./deserializer.js";
import { trip_protobuf } from "./protobuf_trip.js";

export const proto: Deserializer<trip_protobuf.ServerResponseAll> = {
  name: "proto" as const,
  deserializeAll: (data: Uint8Array) => {
    return trip_protobuf.ServerResponseAll.decode(data);
  },
  materializeUnverifiedAsPojo: (
    deserialized: trip_protobuf.ServerResponseAll,
  ) => {
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
  materializeVerifedAsPojo: function (
    deserialized: trip_protobuf.ServerResponseAll,
  ): ServerResponseAll {
    const trips: Array<Trip> = [];
    for (const trip of deserialized.trips) {
      if (trip.rideId === undefined || trip.rideId === null) {
        throw new Error("Invalid rideId");
      }

      if (
        trip.rideableType === undefined ||
        trip.rideableType === null ||
        trip.rideableType === trip_protobuf.RideableType.unknown_rideable_type
      ) {
        throw new Error("Invalid rideableType");
      }

      if (trip.startedAtMs === undefined || trip.startedAtMs === null) {
        throw new Error("Invalid startedAtMs");
      }

      if (trip.endedAtMs === undefined || trip.endedAtMs === null) {
        throw new Error("Invalid endedAtMs");
      }

      if (
        trip.memberCasual === undefined ||
        trip.memberCasual === null ||
        trip.memberCasual === trip_protobuf.MemberCasual.unknown_member_casual
      ) {
        throw new Error("Invalid memberCasual");
      }
      trips.push({
        ...trip,
        startedAt: new Date(trip.startedAtMs),
        endedAt: new Date(trip.endedAtMs),
      } as unknown as Trip);
    }
    return { trips };
  },
};
