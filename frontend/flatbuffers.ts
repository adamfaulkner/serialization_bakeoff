import { MemberCasual, RideableType, ServerResponseAll, Trip } from "./trip.js";
import { ServerResponseAll as ServerResponseAllFlatbuffers } from "./flatbuffers/server-response-all.js";
import { RideableType as RideableTypeFlatbuffers } from "./flatbuffers/rideable-type.js";
import { MemberCasual as MemberCasualFlatbuffers } from "./flatbuffers/member-casual.js";
import { ByteBuffer } from "flatbuffers/js/byte-buffer.js";
import { Deserializer } from "./deserializer.js";
import { C1 } from "msgpackr/index.js";

export const flatbuffers: Deserializer<ServerResponseAllFlatbuffers> = {
  name: "flatbuffers" as const,
  deserializeAll: (data: Uint8Array) => {
    const response = ServerResponseAllFlatbuffers.getRootAsServerResponseAll(
      new ByteBuffer(data),
    );
    return response;
  },
  materializeAsPojo: (
    deserialized: ServerResponseAllFlatbuffers,
  ): ServerResponseAll => {
    // These values aren't POJOs. They also don't even pretend to be :)
    const trips: Array<Trip> = [];

    for (let i = 0; i < deserialized.tripsLength(); i++) {
      const trip = deserialized.trips(i)!;
      trips.push({
        rideId: trip.rideId()!,
        rideableType: trip.rideableType() as unknown as RideableType,
        startedAt: new Date(Number(trip.startedAtMs())),
        endedAt: new Date(Number(trip.endedAtMs())),
        ...(trip.startStationName() !== null
          ? { startStationName: trip.startStationName()! }
          : {}),
        ...(trip.startStationId() !== null
          ? { startStationId: trip.startStationId()! }
          : {}),
        ...(trip.endStationId() !== null
          ? { endStationId: trip.endStationId()! }
          : {}),
        ...(trip.endStationName() !== null
          ? { endStationName: trip.endStationName()! }
          : {}),
        startLat: trip.startLat(),
        startLng: trip.startLng(),
        endLat: trip.endLat(),
        endLng: trip.endLng(),
        memberCasual: trip.memberCasual() as unknown as MemberCasual,
      });
    }

    return {
      trips,
    };
  },
  scanForIdProperty: (
    deserialized: ServerResponseAllFlatbuffers,
    targetId: string,
  ) => {
    // Optimization: avoid constructing one object per trip.
    let t;
    let tripsLength = deserialized.tripsLength();
    for (let i = 0; i < tripsLength; i++) {
      t = deserialized.trips(i, t) ?? undefined;
      if (t?.rideId() === targetId) {
        return true;
      }
    }
    return false;
  },
  verifyServerResponse: function (
    deserialized: ServerResponseAllFlatbuffers,
  ): boolean {
    let t;
    let tripsLength = deserialized.tripsLength();
    for (let i = 0; i < tripsLength; i++) {
      t = deserialized.trips(i, t)!;
      if (t.rideId() === null) {
        return false;
      }
      if (t.rideableType() === RideableTypeFlatbuffers.UNKNOWN_RIDEABLE_TYPE) {
        return false;
      }

      if (t.memberCasual() === MemberCasualFlatbuffers.UNKNOWN_MEMBER_CASUAL) {
        return false;
      }
    }
    return true;
  },
};
