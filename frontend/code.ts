import * as protobufjs from "protobufjs";
import * as msgpackr from "msgpackr";
import * as cbor from "cbor-x";
import { ServerResponseAll as ServerResponseAllBebop } from "./bops.gen.js";
import { ServerResponseAll as ServerResponseAllCapnp } from "./capnp_trip.js";
import { ServerResponseAll as ServerResponseAllFlatbuffers } from "./flatbuffers/server-response-all.js";
import * as capnp from "capnp-es";
import * as flatbuffers from "flatbuffers";

const response = await protobufjs.load("./dist/trip.proto");
const ServerResponseAllProtobuf = response.lookupType("trip_protobuf.ServerResponseAll");

enum RideableType {
  electric = "electric_bike",
  classic = "classic_bike",
}

enum MemberCasual {
  member = "member",
  casual = "casual",
}

// This is the same trip that we use on the backend.
// The header row of the csv is:
// "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
type Trip = {
  rideId: string;
  rideableType: RideableType;
  startedAt: Date;
  endedAt: Date;
  startStationName: string;
  startStationId: string;
  endStationName: string;
  endStationId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  memberCasual: MemberCasual;
};

// TODO: eventually we want to serialize streams as well; the `all` suffix here means we serialize all trips at once
type ServerResponseAll = {
  trips: Array<Trip>;
};

interface Deserializer {
  name: string;
  deserializeAll: (data: Uint8Array) => any;
  materializeAsPojo: (deserialized: any) => ServerResponseAll;
  scanForIdProperty: (deserialized: any, targetId: string) => boolean;
}

const DESERIALIZERS: Array<Deserializer> = [
  {
    name: "json",
    deserializeAll: (data: Uint8Array) => {
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(data));
    },
    materializeAsPojo: (deserialized: any) => {
      return deserialized;
    },
    scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "proto",
    deserializeAll: (data: Uint8Array) => {
      return ServerResponseAllProtobuf.decode(data) as unknown as any;
    },
    materializeAsPojo: (deserialized: any) => {
      // The values deserialized here are POJOs. The only difference from JSON is that each object
      // has a prototype that sets the default value for all fields.

      // Actually, what about the dates? We should make this apples to apples
      return deserialized;
    },
    scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "msgpack",
    deserializeAll: (data: Uint8Array) => {
      return msgpackr.unpack(data);
    },
    materializeAsPojo: (deserialized: any) => {
      // The values deserialized by msgpackr are POJOs.
      return deserialized;
    },
    scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "cbor",
    deserializeAll: (data: Uint8Array) => {
      return cbor.decode(data);
    },
    materializeAsPojo: (deserialized: any) => {
      // The values deserialized by cbor-x are POJOs.
      return deserialized;
    },
    scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "bebop",
    deserializeAll: (data: Uint8Array) => {
      return ServerResponseAllBebop.decode(data);
    },
    materializeAsPojo: (deserialized: any) => {
      // The values deserialized by bebop are POJOs. The only differences from JSON are:
      // 1. they have a prototype that includes some methods around validating the object and encoding it.
      // 2. they use Date objects instead of strings for timestamps. This seems strictly harder and more useful than JSON.
      return deserialized;
    },
    scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "capnp",
    deserializeAll: (data: Uint8Array) => {
      const responseMessage = new capnp.Message(data, false, false);
      responseMessage._capnp.traversalLimit = Infinity;
      return responseMessage.getRoot(ServerResponseAllCapnp);
    },
    materializeAsPojo: (deserialized: any) => {
      // These values aren't POJOs, they use a Proxy object to provide a POJO-like interface.
      // Build POJOs manually.

      return {
        trips: deserialized.trips.map((trip: any) => ({
          rideId: trip.rideId,
          rideableType: trip.rideableType,
          startedAt: trip.startedAtMs,
          endedAt: trip.endedAtMs,
          startStationName: trip.startStationName,
          startStationId: trip.startStationId,
          endStationName: trip.endStationName,
          endStationId: trip.endStationId,
          startLat: trip.startLat,
          startLng: trip.startLng,
          endLat: trip.endLat,
          endLng: trip.endLng,
          memberCasual: trip.memberCasual,
        })),
      };
    },
    scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "flatbuffers",
    deserializeAll: (data: Uint8Array) => {
      const response = ServerResponseAllFlatbuffers.getRootAsServerResponseAll(
        new flatbuffers.ByteBuffer(data),
      );
      return response;
    },
    materializeAsPojo: (deserialized: any) => {
      // These values aren't POJOs. They don't even pretend to be :)
      const trips = [];

      for (let i = 0; i < deserialized.tripsLength(); i++) {
        const trip = deserialized.trips(i);
        trips.push({
          rideId: trip.rideId(),
          rideableType: trip.rideableType(),
          startedAt: trip.startedAtMs(),
          endedAt: trip.endedAtMs(),
          startStationName: trip.startStationName(),
          startStationId: trip.startStationId(),
          endStationName: trip.endStationName(),
          endStationId: trip.endStationId(),
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
    scanForIdProperty: (deserialized: ServerResponseAllFlatbuffers, targetId: string) => {
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
  },
];

type SerializedSizeStats = {
  name: string;
  size: number;
  zstdCompressedSize: number;
};

type SerializePerformanceStats = {
  name: string;
  deserializeDuration: number;
  serializeDuration: number;
  scanForIdPropertyDuration: number;
  materializeAsPojoDuration: number;
};

async function serializeSizeTests(d: Deserializer): Promise<SerializedSizeStats> {
  const response = await fetch(`/${d.name}`, { headers: { "X-Zstd-Enabled": "true" } });
  const bodyBytes = await response.bytes();

  const resourceEntry: PerformanceResourceTiming = performance
    .getEntriesByType("resource")
    .findLast(
      (entry) => entry.entryType === "resource" && entry.name.endsWith(`/${d.name}`),
    ) as unknown as PerformanceResourceTiming;

  return {
    name: d.name,
    size: bodyBytes.length,
    zstdCompressedSize: resourceEntry.encodedBodySize,
  };
}

async function serializePerformanceTests(d: Deserializer): Promise<SerializePerformanceStats> {
  const response = await fetch(`/${d.name}`, { headers: { "X-Zstd-Enabled": "true" } });
  const bodyBytes = await response.bytes();
  const serializeDuration = parseInt(response.headers.get("x-encode-duration") || "0");

  // It's possible that repeatedly using deserialized like this may cause the JIT to optimize some
  // things in an unrealistic way.
  const deserializeStartTime = performance.now();
  const deserialized = await d.deserializeAll(bodyBytes);
  const deserializeDuration = performance.now() - deserializeStartTime;

  const scanStartTime = performance.now();
  const scanResult = d.scanForIdProperty(deserialized, "123");
  const scanForIdPropertyDuration = performance.now() - scanStartTime;
  // Help guarantee that the scan doesn't get optimized away.
  if (scanResult === true) {
    throw new Error("Scan result should always be false");
  }

  const materializeAsPojoStartTime = performance.now();
  const materialized = d.materializeAsPojo(deserialized);
  const materializeAsPojoDuration = performance.now() - materializeAsPojoStartTime;
  if (materialized.trips.length === 0) {
    throw new Error("Materialized trips should not be empty");
  }

  // Verify that the materialized object is in fact the type we expect by spot checking some
  // properties.
  for (const trip of materialized.trips) {
    if (typeof trip.rideId !== "string") {
      throw new Error("Trip rideId should be a string");
    }
    if (typeof trip.startStationName !== "string") {
      throw new Error("Trip startStationName should be a string");
    }
    if (!(trip.endLng === null || typeof trip.endLng === "number")) {
      throw new Error("Trip endLng should be a number");
    }
  }

  return {
    name: d.name,
    serializeDuration,
    deserializeDuration,
    scanForIdPropertyDuration,
    materializeAsPojoDuration,
  };
}

async function runSerializeSizeTests() {
  const results = [];
  // These must happen sequentially to avoid event loop contention on the client side.
  for (const d of DESERIALIZERS) {
    results.push(await serializeSizeTests(d));
  }
  console.table(results);
}

async function runSerializePerformanceTests() {
  const results = [];
  // These must happen sequentially to avoid event loop contention on the client side.
  for (const d of DESERIALIZERS) {
    results.push(await serializePerformanceTests(d));
  }
  console.table(results);
}

await runSerializeSizeTests();
await runSerializePerformanceTests();
console.log("done");
