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

// TODO: eventually we want to serialize streams as well; the all suffix here means we serialize all trips at once
type ServerResponseAll = {
  trips: Array<Trip>;
};

interface Deserializer {
  name: string;
  deserializeAll: (data: Uint8Array) => Promise<any>;
  scanResult: (deserialized: any, targetId: string) => Promise<boolean>;
}

const DESERIALIZERS: Array<Deserializer> = [
  {
    name: "json",
    deserializeAll: async (data: Uint8Array) => {
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(data));
    },
    scanResult: async (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "proto",
    deserializeAll: async (data: Uint8Array) => {
      const response = ServerResponseAllProtobuf.decode(data) as unknown as any;
      return { trips: response.trips };
    },
    scanResult: async (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "msgpack",
    deserializeAll: async (data: Uint8Array) => {
      const response = await msgpackr.unpack(data);
      return { trips: response.trips };
    },
    scanResult: async (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "cbor",
    deserializeAll: async (data: Uint8Array) => {
      const response = await cbor.decode(data);
      return { trips: response.trips };
    },
    scanResult: async (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "bebop",
    deserializeAll: async (data: Uint8Array) => {
      const response = ServerResponseAllBebop.decode(data);
      return { trips: response.trips };
    },
    scanResult: async (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "capnp",
    deserializeAll: async (data: Uint8Array) => {
      const responseMessage = new capnp.Message(data, true, true);
      const response = responseMessage.getRoot(ServerResponseAllCapnp);

      return { trips: response.trips };
    },
    scanResult: async (deserialized: ServerResponseAll, targetId: string) => {
      const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
      return trip !== undefined;
    },
  },
  {
    name: "flatbuffers",
    deserializeAll: async (data: Uint8Array) => {
      const response = ServerResponseAllFlatbuffers.getRootAsServerResponseAll(
        new flatbuffers.ByteBuffer(data),
      );
      return response;
    },
    scanResult: async (deserialized: ServerResponseAllFlatbuffers, targetId: string) => {
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

type DeserializeAllStats = {
  name: string;
  size: number;
  contentLength: number;
  elapsedDeserializeTime: number;
  timeToFirstByte: number;
  totalTransferTime: number;
  encodeTime: number;
  elapsedScanTime: number;
  zstdDuration: number;
};

async function deserializeAllTest(d: Deserializer, zstd: boolean): Promise<DeserializeAllStats> {
  if (protobufjs === undefined) {
    throw new Error("protobuf is undefined");
  }
  const fetchStart = performance.now();
  const response = await fetch(`/${d.name}`, { headers: { "X-Zstd-Enabled": zstd.toString() } });
  const timeToFirstByte = performance.now() - fetchStart;
  const bodyBytes = await response.bytes();
  const totalTransferTime = performance.now() - fetchStart;
  const encodeTime = parseInt(response.headers.get("x-encode-duration") || "0");

  const resourceEntry: PerformanceResourceTiming = performance
    .getEntriesByType("resource")
    .findLast(
      (entry) => entry.entryType === "resource" && entry.name.endsWith(`/${d.name}`),
    ) as unknown as PerformanceResourceTiming;

  const contentLength = resourceEntry.encodedBodySize;

  const deserializeStartTime = performance.now();
  const serverResponse = await d.deserializeAll(bodyBytes);
  const elapsedDeserializeTime = performance.now() - deserializeStartTime;

  const scanStartTime = performance.now();
  const scanResult = await d.scanResult(serverResponse, "123");
  const elapsedScanTime = performance.now() - scanStartTime;
  const zstdDuration = parseInt(response.headers.get("x-zstd-duration") || "0");

  return {
    name: d.name,
    size: bodyBytes.length,
    contentLength,
    elapsedDeserializeTime,
    timeToFirstByte,
    totalTransferTime,
    encodeTime,
    elapsedScanTime,
    zstdDuration,
  };
}

async function runDeserializeAllTests(useZstd: boolean) {
  const results = [];
  // These must happen sequentially to avoid event loop contention on the client side.
  for (const d of DESERIALIZERS) {
    results.push(await deserializeAllTest(d, useZstd));
  }
  console.table(results);
}

await runDeserializeAllTests(false);
await runDeserializeAllTests(true);
console.log("done");
