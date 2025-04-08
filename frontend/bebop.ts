import { Deserializer } from "./deserializer.js";
import {
  ServerResponseAll as ServerResponseAllBebop,
  IServerResponseAll,
  MemberCasual,
  RideableType,
} from "./bops.gen.js";
import { ServerResponseAll, Trip } from "./trip.js";

export const bebop: Deserializer<IServerResponseAll> = {
  name: "bebop" as const,
  deserializeAll: (data: Uint8Array): IServerResponseAll => {
    return ServerResponseAllBebop.decode(data);
  },
  materializeUnverifiedAsPojo: (
    deserialized: IServerResponseAll,
  ): ServerResponseAll => {
    return deserialized as unknown as ServerResponseAll;
  },
  scanForIdProperty: (deserialized: IServerResponseAll, targetId: string) => {
    if (deserialized.trips === undefined) {
      return false;
    }
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
  materializeVerifedAsPojo: function (
    deserialized: IServerResponseAll,
  ): ServerResponseAll {
    // Any field can be undefined, so we must check for the presence of all required fields.

    if (deserialized.trips === undefined) {
      throw new Error("missing trips");
    }
    for (const trip of deserialized.trips) {
      if (trip.rideId === undefined) {
        throw new Error("missing rideId");
      }

      if (
        trip.rideableType === undefined ||
        trip.rideableType === RideableType.Unknown
      ) {
        throw new Error("missing rideableType");
      }

      if (trip.startedAt === undefined) {
        throw new Error("missing startedAt");
      }
      if (trip.endedAt === undefined) {
        throw new Error("missing endedAt");
      }

      if (
        trip.memberCasual === undefined ||
        trip.memberCasual === MemberCasual.Unknown
      ) {
        throw new Error("missing memberCasual");
      }
    }

    return this.materializeUnverifiedAsPojo(deserialized);
  },
};
