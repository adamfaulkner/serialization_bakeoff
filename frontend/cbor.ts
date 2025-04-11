import { Decoder } from "cbor-x/decode.js";
import {
  ServerResponseAll,
  MemberCasual,
  RideableType,
  serverResponseAllJsonSchema,
  serverResponseAllReceivedAjvValidator,
  serverResponseAllReceivedJsonAjvSchema,
} from "./trip.js";
import { Deserializer } from "./deserializer.js";
import { Ajv } from "ajv/dist/jtd.js";
export const cbor: Deserializer<any> = {
  name: "cbor" as const,
  endpoint: "cbor",
  deserializeAll: (data: Uint8Array) => {
    const decoder = new Decoder({ mapsAsObjects: true, int64AsNumber: true });
    return decoder.decode(data);
  },
  materializeUnverifiedAsPojo: (deserialized: any) => {
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
  materializeVerifedAsPojo: function (deserialized: any): ServerResponseAll {
    // cbor could return anything; we need to verify every property.
    // We can just use the json type definition that we use in the
    // json deserializer.
    const ajv = new Ajv();
    const result = ajv.validate(
      serverResponseAllReceivedJsonAjvSchema,
      deserialized,
    );
    if (!result) {
      debugger;
      throw new Error("Invalid CBOR data");
    }
    return this.materializeUnverifiedAsPojo(deserialized);
  },
};
