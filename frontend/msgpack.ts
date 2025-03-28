import { unpack } from "msgpackr/unpack.js";
import { MemberCasual, RideableType, ServerResponseAll } from "./trip.js";
export const msgpack = {
  name: "msgpack",
  deserializeAll: (data: Uint8Array) => {
    return unpack(data);
  },
  materializeAsPojo: (deserialized: any) => {
    // The values deserialized by msgpackr are POJOs, except that the dates are represented as
    // strings.
    return {
      trips: deserialized.trips.map((trip: any) => ({
        ...trip,
        rideableType:
          trip.rideableType === "classic_bike"
            ? RideableType.classic
            : RideableType.electric,
        startedAt: new Date(Number(trip.startedAt)),
        endedAt: new Date(Number(trip.endedAt)),
        memberCasual:
          trip.memberCasual === "member"
            ? MemberCasual.member
            : MemberCasual.casual,
      })),
    };
  },
  scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
};
