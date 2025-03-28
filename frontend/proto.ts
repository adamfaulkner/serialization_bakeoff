import { load } from "protobufjs";
import { ServerResponseAll } from "./trip.js";

const response = await load("./dist/trip.proto");
const ServerResponseAllProtobuf = response.lookupType(
  "trip_protobuf.ServerResponseAll",
);
const TripProtobuf = response.lookupType("trip_protobuf.Trip");

export const proto = {
  name: "proto",
  deserializeAll: (data: Uint8Array) => {
    return ServerResponseAllProtobuf.decode(data) as unknown as any;
  },
  materializeAsPojo: (deserialized: any) => {
    // The values deserialized here are POJOs. The only differences from JSON are that each object
    // has a prototype that sets the default value for all fields, and dates are in milliseconds.

    return {
      trips: deserialized.trips.map((trip: any) => {
        const asObject = TripProtobuf.toObject(trip);
        return {
          ...asObject,
          startedAt: new Date(asObject.startedAtMs),
          endedAt: new Date(asObject.endedAtMs),
        };
      }),
    };
  },
  scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
};
