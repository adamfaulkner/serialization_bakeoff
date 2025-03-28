import * as avsc from "avsc";
import { MemberCasual, RideableType, ServerResponseAll } from "./trip.js";
import { Buffer } from "buffer";

const avroSchema = await (await fetch("./dist/avro_schema.json")).text();
export const avro = {
  name: "avro",
  deserializeAll: function (data: Uint8Array) {
    const schema = avsc.parse(avroSchema);
    return schema.decode(Buffer.from(data)).value;
  },
  materializeAsPojo: function (deserialized: any): ServerResponseAll {
    // The lat and lng values use null to indicate a missing value, while we expect missing
    for (const trip of deserialized.trips) {
      if (trip.startLat === null) {
        delete trip.startLat;
      }
      if (trip.startLng === null) {
        delete trip.startLng;
      }
      if (trip.endLat === null) {
        delete trip.endLat;
      }
      if (trip.endLng === null) {
        delete trip.endLng;
      }
      if (trip.startStationId === null) {
        delete trip.startStationId;
      }
      if (trip.startStationName === null) {
        delete trip.startStationName;
      }
      if (trip.endStationId === null) {
        delete trip.endStationId;
      }
      if (trip.endStationName === null) {
        delete trip.endStationName;
      }
    }
    return {
      trips: deserialized.trips.map((trip: any) => ({
        ...trip,
        memberCasual:
          trip.memberCasual === "member"
            ? MemberCasual.member
            : MemberCasual.casual,
        rideableType:
          trip.rideableType === "classic_bike"
            ? RideableType.classic
            : RideableType.electric,
        startedAt: new Date(trip.startedAt),
        endedAt: new Date(trip.endedAt),
      })),
    };
  },
  scanForIdProperty: function (deserialized: any, targetId: string): boolean {
    return deserialized.trips.some((trip: any) => trip.ride_id === targetId);
  },
};
