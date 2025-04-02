import { Ajv } from "ajv/dist/jtd.js";
import { Deserializer } from "./deserializer.js";
import {
  MemberCasual,
  RideableType,
  ServerResponseAll,
  serverResponseAllJsonSchema,
  serverResponseAllReceivedAjvValidator,
  serverResponseAllReceivedJsonAjvSchema,
} from "./trip.js";

export const json: Deserializer<any> = {
  name: "json" as const,
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
  verifyServerResponse: function (deserialized: any): boolean {
    const ajv = new Ajv({ allErrors: true });
    performance.mark("json-verify-start");
    const result = ajv.validate(
      serverResponseAllReceivedJsonAjvSchema,
      deserialized,
    );
    if (!result) {
      debugger;
    }
    performance.mark("json-verify-end");
    performance.measure("json-verify", "json-verify-start", "json-verify-end");
    return result;
  },
};
