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

export const json: Deserializer<any, true> = {
  name: "json" as const,
  endpoint: "json",
  useText: true,
  deserializeAll: (data: string) => {
    return JSON.parse(data);
  },
  materializeUnverifiedAsPojo: (deserialized: any): ServerResponseAll => {
    // Convert the numeric enum values directly
    return {
      trips: deserialized.trips.map((trip: any) => ({
        ...trip,
        rideableType: trip.rideableType, // Already numeric values (1 for electric, 2 for classic)
        memberCasual: trip.memberCasual, // Already numeric values (1 for member, 2 for casual)
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
