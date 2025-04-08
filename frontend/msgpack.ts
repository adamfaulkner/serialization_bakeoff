import { Decoder, unpack } from "msgpackr/unpack.js";
import {
  MemberCasual,
  RideableType,
  ServerResponseAll,
  serverResponseAllAjvValidator,
  serverResponseAllJsonSchema,
  serverResponseAllReceivedAjvValidator,
  serverResponseAllReceivedJsonAjvSchema,
} from "./trip.js";
import { Deserializer } from "./deserializer.js";
import { Ajv } from "ajv/dist/jtd.js";

export const msgpack: Deserializer<any> = {
  name: "msgpack" as const,
  deserializeAll: (data: Uint8Array) => {
    const decoder = new Decoder({
      useRecords: false,
      mapsAsObjects: true,
      int64AsType: "number",
    });
    return decoder.decode(data);
  },
  materializeUnverifiedAsPojo: (deserialized: any) => {
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
  materializeVerifedAsPojo: function (deserialized: any): ServerResponseAll {
    const ajv = new Ajv();
    // const result = serverResponseAllReceivedAjvValidator(deserialized);
    const result = ajv.validate(
      serverResponseAllReceivedJsonAjvSchema,
      deserialized,
    );
    if (!result) {
      debugger;
      throw new Error("Invalid data");
    }
    return this.materializeUnverifiedAsPojo(deserialized);
  },
};
