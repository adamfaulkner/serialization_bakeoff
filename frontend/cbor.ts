import { decode } from "cbor-x/decode.js";
import {
  ServerResponseAll,
  MemberCasual,
  RideableType,
  serverResponseAllJsonSchema,
} from "./trip.js";
import { Deserializer } from "./deserializer.js";
export const cbor: Deserializer<any> = {
  name: "cbor" as const,
  deserializeAll: (data: Uint8Array) => {
    return decode(data);
  },
  materializeAsPojo: (deserialized: any) => {
    // The values deserialized by cbor-x are POJOs, except that the dates are represented as strings.
    return {
      trips: deserialized.trips.map((trip: any) => ({
        ...trip,
        startedAt: new Date(Number(trip.startedAt)),
        endedAt: new Date(Number(trip.endedAt)),
        rideableType:
          trip.rideableType === "classic_bike"
            ? RideableType.classic
            : RideableType.electric,
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
  verifyServerResponse: function (deserialized: any): boolean {
    const result = serverResponseAllJsonSchema.safeParse(deserialized);
    if (!result.success) {
      console.debug(result.error);
    }
    return result.success;
  },
};
