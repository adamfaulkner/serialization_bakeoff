import { ServerResponseAll, Trip } from "./trip.js";
import { Deserializer } from "./deserializer.js";
import { fromBinary } from "@bufbuild/protobuf";
import { ServerResponseAllSchema, ServerResponseAll as ServerResponseAllPbEs, RideableType, MemberCasual } from "./protobuf_es_trip.js";

export const protobufEs: Deserializer<ServerResponseAllPbEs> = {
  name: "protobufEs" as const,
  endpoint: "proto",
  deserializeAll: (data: Uint8Array) => {
    return fromBinary(ServerResponseAllSchema, data);

  },
  materializeUnverifiedAsPojo: (
    deserialized: ServerResponseAllPbEs,
  ) => {
    // The values deserialized here are POJOs. The only differences from JSON are that each object
    // has a prototype that sets the default value for all fields, and dates are in milliseconds.
    return {
      trips: deserialized.trips.map((trip) => {
        return {
          ...trip,
          startedAt: new Date(Number(trip.startedAtMs)),
          endedAt: new Date(Number(trip.endedAtMs)),
        };
      }) as unknown as Array<Trip>,
    };
  },
  scanForIdProperty: (
    deserialized: ServerResponseAllPbEs,
    targetId: string,
  ) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
  materializeVerifedAsPojo: function (
    deserialized: ServerResponseAllPbEs,
  ): ServerResponseAll {
    const trips: Array<Trip> = [];
    for (const trip of deserialized.trips) {
      if (trip.rideId === undefined || trip.rideId === null) {
        throw new Error("Invalid rideId");
      }

      if (
        trip.rideableType === undefined ||
        trip.rideableType === null ||
        trip.rideableType === RideableType.unknown_rideable_type
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
        trip.memberCasual === MemberCasual.unknown_member_casual
      ) {
        throw new Error("Invalid memberCasual");
      }
      trips.push({
        ...trip,
        startedAt: new Date(Number(trip.startedAtMs)),
        endedAt: new Date(Number(trip.endedAtMs)),
      } as unknown as Trip);
    }
    return { trips };
  },
};
