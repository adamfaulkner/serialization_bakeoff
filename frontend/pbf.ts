import Pbf from 'pbf';
import { ServerResponseAll, Trip } from "./trip.js";
import { Deserializer } from "./deserializer.js";
import { readServerResponseAll, MemberCasual, RideableType } from "./pbf_trip.js";

export const pbf: Deserializer<any> = {
  name: "pbf" as const,
  endpoint: "proto",
  deserializeAll: (data: Uint8Array) => {
    return readServerResponseAll(new Pbf(data));
  },
  materializeUnverifiedAsPojo: (
    deserialized: any,
  ) => {
    // The values deserialized here are POJOs. The only differences from JSON are that each object
    // has a prototype that sets the default value for all fields, and dates are in milliseconds.
    return {
      trips: deserialized.trips.map((trip: any) => {
        return {
          ...trip,
          startedAt: new Date(trip.startedAtMs),
          endedAt: new Date(trip.endedAtMs),
        };
      }) as unknown as Array<Trip>,
    };
  },
  scanForIdProperty: (
    deserialized:any,
    targetId: string,
  ) => {
    const trip = deserialized.trips.find((trip: any) => trip.rideId === targetId);
    return trip !== undefined;
  },
  materializeVerifedAsPojo: function (
    deserialized: any,
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
        startedAt: new Date(trip.startedAtMs),
        endedAt: new Date(trip.endedAtMs),
      } as unknown as Trip);
    }
    return { trips };
  },
};
