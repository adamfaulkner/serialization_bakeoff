import * as avsc from "avsc";
import { MemberCasual, RideableType, ServerResponseAll, Trip } from "./trip.js";
import { Buffer } from "buffer";
import { Deserializer } from "./deserializer.js";

const avroSchema = await (await fetch("./dist/avro_schema.json")).text();

// Trip uses missing values for unset stat/end lat/lng, avro uses null. Remap this.
// Trip uses numeric values for memberCasual and rideableType, remap this.
export type AvroDeserializedTrip = Omit<
  Trip,
  | "startLat"
  | "startLng"
  | "endLat"
  | "endLng"
  | "memberCasual"
  | "rideableType"
> & {
  startLat: number | null;
  startLng: number | null;
  endLat: number | null;
  endLng: number | null;
  startStationName: string | null;
  endStationName: string | null;
  startStationId: string | null;
  endStationId: string | null;
  memberCasual: "member" | "casual";
  rideableType: "classic" | "electric";
};

export type AvroServerResponseAll = {
  trips: Array<AvroDeserializedTrip>;
};

export const avro: Deserializer<AvroServerResponseAll> = {
  name: "avro" as const,
  deserializeAll: function (data: Uint8Array): AvroServerResponseAll {
    const schema = avsc.parse(avroSchema);
    return schema.decode(Buffer.from(data)).value;
  },
  materializeAsPojo: function (
    deserialized: AvroServerResponseAll,
  ): ServerResponseAll {
    const serverResponseAll: ServerResponseAll = { trips: [] };
    // The lat and lng values use null to indicate a missing value, while we expect missing
    for (const trip of deserialized.trips) {
      const remappedTrip: Trip = {
        rideId: trip.rideId,
        startedAt: new Date(trip.startedAt),
        endedAt: new Date(trip.endedAt),
        startStationId: trip.startStationId ?? undefined,
        startStationName: trip.startStationName ?? undefined,
        endStationId: trip.endStationId ?? undefined,
        endStationName: trip.endStationName ?? undefined,
        memberCasual:
          trip.memberCasual === "member"
            ? MemberCasual.member
            : MemberCasual.casual,
        rideableType:
          trip.rideableType === "classic"
            ? RideableType.classic
            : RideableType.electric,
      };
      serverResponseAll.trips.push(remappedTrip);
    }
    return serverResponseAll;
  },
  scanForIdProperty: function (
    deserialized: AvroServerResponseAll,
    targetId: string,
  ): boolean {
    return deserialized.trips.some((trip: any) => trip.ride_id === targetId);
  },
  // It is not possible to have an invalid value here.
  verifyServerResponse: function (
    deserialized: AvroServerResponseAll,
  ): boolean {
    return true;
  },
};
