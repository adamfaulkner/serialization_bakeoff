import { MemberCasual, RideableType, ServerResponseAll } from "./trip.js";

export const json = {
  name: "json",
  deserializeAll: (data: Uint8Array) => {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(data));
  },
  materializeAsPojo: (deserialized: any): ServerResponseAll => {
    // The JSON dates are represented as strings.
    return {
      trips: deserialized.trips.map((trip: any) => ({
        ...trip,
        rideableType:
          trip.rideableType === "classic_bike"
            ? RideableType.classic
            : RideableType.electric,
        memberCasual:
          trip.memberCasual === "member"
            ? MemberCasual.member
            : MemberCasual.casual,
        startedAt: new Date(trip.startedAt),
        endedAt: new Date(trip.endedAt),
      })),
    };
  },
  scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
};
