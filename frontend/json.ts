import { Ajv } from "ajv/dist/jtd.js";
import { Deserializer } from "./deserializer.js";
import {
  MemberCasual,
  RideableType,
  ServerResponseAll,
  serverResponseAllAjvValidator,
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
  materializeUnverifiedAsPojo: (deserialized: any): ServerResponseAll => {
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
  materializeVerifedAsPojo: function (deserialized: any): ServerResponseAll {
    // JSON could return anything; we validate everything using the ajv validator
    const ajv = new Ajv();
    performance.mark("json-verify-start");
    const result = serverResponseAllReceivedAjvValidator(deserialized);
    if (!result) {
      debugger;
      throw new Error("Invalid JSON");
    }
    performance.mark("json-verify-end");
    performance.measure("json-verify", "json-verify-start", "json-verify-end");
    return this.materializeUnverifiedAsPojo(deserialized);
  },
};
