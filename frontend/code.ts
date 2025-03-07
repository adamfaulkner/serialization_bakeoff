import * as protobufjs from "protobufjs";
import * as msgpackr from "msgpackr";
import * as cbor from "cbor-x";

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
  deserializeAll: (data: Uint8Array, fullLength: number) => Promise<ServerResponseAll>;
}

const DESERIALIZERS: Array<Deserializer> = [
  {
    name: "json",
    deserializeAll: async (data: Uint8Array, fullLength: number) => {
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(data));
    },
  },
  {
    name: "proto",
    deserializeAll: async (data: Uint8Array, fullLength: number) => {
      const response = ServerResponseAllProtobuf.decode(data) as unknown as any;
      return { trips: response.trips };
    },
  },
  {
    name: "msgpack",
    deserializeAll: async (data: Uint8Array, fullLength: number) => {
      const response = await msgpackr.unpack(data);
      return { trips: response.trips };
    },
  },
  {
    name: "cbor",
    deserializeAll: async (data: Uint8Array, fullLength: number) => {
      const response = await cbor.decode(data);
      return { trips: response.trips };
    },
  },
];

type DeserializeAllStats = {
  name: string;
  size: number;
  elapsedDeserializeTime: number;
  timeToFirstByte: number;
  totalTransferTime: number;
  encodeTime: number;
};

async function deserializeAllTest(d: Deserializer): Promise<DeserializeAllStats> {
  if (protobufjs === undefined) {
    throw new Error("protobuf is undefined");
  }
  const fetchStart = performance.now();
  const response = await fetch(`/${d.name}`);
  const timeToFirstByte = performance.now() - fetchStart;
  const bodyBytes = await response.bytes();
  const totalTransferTime = performance.now() - fetchStart;
  const encodeTime = parseInt(response.headers.get("x-encode-duration") || "0");

  const size = parseInt(response.headers.get("content-length") || "0");
  const deserializeStartTime = performance.now();
  const serverResponse = await d.deserializeAll(bodyBytes, size);
  const elapsedDeserializeTime = performance.now() - deserializeStartTime;

  // Simple thing to defeat the optimizer
  for (const trip of serverResponse.trips) {
    if (trip.rideId === "123") {
      console.log(trip);
    }
  }

  return {
    name: d.name,
    size: size,
    elapsedDeserializeTime,
    timeToFirstByte,
    totalTransferTime,
    encodeTime,
  };
}

async function runDeserializeAllTests() {
  const results = [];
  // These must happen sequentially to avoid event loop contention on the client side.
  for (const d of DESERIALIZERS) {
    results.push(await deserializeAllTest(d));
  }
  console.table(results);
}

await runDeserializeAllTests();
console.log("done");
