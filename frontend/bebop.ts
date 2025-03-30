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
  materializeAsPojo: (deserialized: IServerResponseAll): ServerResponseAll => {
    return deserialized as unknown as ServerResponseAll;
  },
  scanForIdProperty: (deserialized: IServerResponseAll, targetId: string) => {
    if (deserialized.trips === undefined) {
      return false;
    }
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
  verifyServerResponse: function (deserialized: IServerResponseAll): boolean {
    if (deserialized.trips === undefined) {
      return false;
    }
    for (const trip of deserialized.trips) {
      if (trip.rideId === undefined) {
        return false;
      }

      if (
        trip.rideableType === undefined ||
        trip.rideableType === RideableType.Unknown
      ) {
        return false;
      }

      if (trip.startedAt === undefined) {
        return false;
      }
      if (trip.endedAt === undefined) {
        return false;
      }

      if (
        trip.memberCasual === undefined ||
        trip.memberCasual === MemberCasual.Unknown
      ) {
        return false;
      }
    }

    return true;
  },
};
