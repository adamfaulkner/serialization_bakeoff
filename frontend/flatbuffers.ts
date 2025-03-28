import { ServerResponseAll } from "./trip.js";
import { ServerResponseAll as ServerResponseAllFlatbuffers } from "./flatbuffers/server-response-all.js";
import { ByteBuffer } from "flatbuffers/js/byte-buffer.js";

export const flatbuffers = {
  name: "flatbuffers",
  deserializeAll: (data: Uint8Array) => {
    const response = ServerResponseAllFlatbuffers.getRootAsServerResponseAll(
      new ByteBuffer(data),
    );
    return response;
  },
  materializeAsPojo: (deserialized: any): ServerResponseAll => {
    // These values aren't POJOs. They also don't even pretend to be :)
    const trips = [];

    for (let i = 0; i < deserialized.tripsLength(); i++) {
      const trip = deserialized.trips(i);
      trips.push({
        rideId: trip.rideId(),
        rideableType: trip.rideableType(),
        startedAt: new Date(Number(trip.startedAtMs())),
        endedAt: new Date(Number(trip.endedAtMs())),
        ...(trip.startStationName() !== null
          ? { startStationName: trip.startStationName() }
          : {}),
        ...(trip.startStationId() !== null
          ? { startStationId: trip.startStationId() }
          : {}),
        ...(trip.endStationId() !== null
          ? { endStationId: trip.endStationId() }
          : {}),
        ...(trip.endStationName() !== null
          ? { endStationName: trip.endStationName() }
          : {}),
        startLat: trip.startLat(),
        startLng: trip.startLng(),
        endLat: trip.endLat(),
        endLng: trip.endLng(),
        memberCasual: trip.memberCasual(),
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
};
