import * as protobufjs from "protobufjs";
import * as msgpackr from "msgpackr";
import * as cbor from "cbor-x";
import * as avsc from "avsc";
import { Buffer } from "buffer";

import { ServerResponseAll as ServerResponseAllBebop } from "./bops.gen.js";
import { ServerResponseAll as ServerResponseAllCapnp } from "./capnp_trip.js";
import { ServerResponseAll as ServerResponseAllFlatbuffers } from "./flatbuffers/server-response-all.js";
import * as capnp from "capnp-es";
import * as flatbuffers from "flatbuffers";
import { Chart } from "chart.js/auto";
import { MemberCasual, RideableType, Trip, tripSchema } from "./trip.js";

const response = await protobufjs.load("./dist/trip.proto");
const ServerResponseAllProtobuf = response.lookupType(
  "trip_protobuf.ServerResponseAll",
);
const TripProtobuf = response.lookupType("trip_protobuf.Trip");

const avroSchema = await (await fetch("./dist/avro_schema.json")).text();

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
    materializeAsPojo: (deserialized: any): ServerResponseAll => {
      // The JSON dates are represented as strings.
      return {
        trips: deserialized.trips.map((trip: any) => ({
          ...trip,
          rideableType:
            trip.rideableType === "classic_bike"
              ? RideableType.classic
              : RideableType.electric,
          memberCasual:
            trip.memberCasual === "member"
              ? MemberCasual.member
              : MemberCasual.casual,
          startedAt: new Date(trip.startedAt),
          endedAt: new Date(trip.endedAt),
        })),
      };
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
  },
  {
    name: "msgpack",
    deserializeAll: (data: Uint8Array) => {
      return msgpackr.unpack(data);
    },
    materializeAsPojo: (deserialized: any) => {
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
  },
  {
    name: "cbor",
    deserializeAll: (data: Uint8Array) => {
      return cbor.decode(data);
    },
    materializeAsPojo: (deserialized: any) => {
      // The values deserialized by cbor-x are POJOs, except that the dates are represented as strings.
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
  },
  {
    name: "bebop",
    deserializeAll: (data: Uint8Array) => {
      return ServerResponseAllBebop.decode(data);
    },
    materializeAsPojo: (deserialized: any): ServerResponseAll => {
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
          startedAt: new Date(Number(trip.startedAtMs)),
          endedAt: new Date(Number(trip.endedAtMs)),
          ...(trip.startStationName !== ""
            ? { startStationName: trip.startStationName }
            : {}),
          ...(trip.startStationId !== ""
            ? { startStationId: trip.startStationId }
            : {}),
          ...(trip.endStationName !== ""
            ? { endStationName: trip.endStationName }
            : {}),
          ...(trip.endStationId !== ""
            ? { endStationId: trip.endStationId }
            : {}),
          ...(trip.startLat !== 0 ? { startLat: trip.startLat.lat } : {}),
          ...(trip.startLng !== 0 ? { startLng: trip.startLng.lng } : {}),
          ...(trip.endLat !== 0 ? { endLat: trip.endLat.lat } : {}),
          ...(trip.endLng !== 0 ? { endLng: trip.endLng.lng } : {}),
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
  },
  {
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
  },
];

type SerializePerformanceStats = {
  name: string;
  deserializeDuration: number;
  serializeDuration: number;
  scanForIdPropertyDuration: number;
  materializeAsPojoDuration: number;
  size: number;
  zstdCompressedSize: number;
  zstdDuration: number;
};

async function serializePerformanceTests(
  d: Deserializer,
): Promise<SerializePerformanceStats> {
  const response = await fetch(`/${d.name}`, {
    headers: { "X-Zstd-Enabled": "true" },
  });
  const bodyBytes = await response.bytes();

  const resourceEntry: PerformanceResourceTiming = performance
    .getEntriesByType("resource")
    .findLast(
      (entry) =>
        entry.entryType === "resource" && entry.name.endsWith(`/${d.name}`),
    ) as unknown as PerformanceResourceTiming;

  const serializeDuration = parseInt(
    response.headers.get("x-encode-duration") || "0",
  );

  const zstdDuration = parseInt(response.headers.get("x-zstd-duration") || "0");

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
  const materializeAsPojoDuration =
    performance.now() - materializeAsPojoStartTime;

  // Sanity check: verify that we got back some trips.
  if (materialized.trips.length === 0) {
    throw new Error("Materialized trips should not be empty");
  }

  // Sanity check: verify that the materialized object is in fact the type we expect
  // To be faster, we only check a random sample.
  const schemaCheckStartTime = performance.now();
  for (const trip of materialized.trips) {
    if (Math.random() < 0.01) {
      try {
        tripSchema.parse(trip);
      } catch (error) {
        debugger;
      }
    }
  }
  const schemaCheckDuration = performance.now() - schemaCheckStartTime;

  return {
    name: d.name,
    serializeDuration,
    deserializeDuration,
    scanForIdPropertyDuration,
    materializeAsPojoDuration,
    size: bodyBytes.length,
    zstdCompressedSize: resourceEntry.encodedBodySize,
    zstdDuration,
  };
}

async function runSerializePerformanceTests(): Promise<
  Array<SerializePerformanceStats>
> {
  const results = [];
  // These must happen sequentially to avoid event loop contention on the client side.
  for (const d of DESERIALIZERS) {
    results.push(await serializePerformanceTests(d));
  }
  return results;
}

const performanceStats = await runSerializePerformanceTests();

function getCanvasElement(id: string): HTMLCanvasElement {
  const element = document.getElementById(id);
  if (element?.tagName !== "CANVAS") {
    throw new Error(`Element with id '${id}' must be a canvas`);
  }
  return element as HTMLCanvasElement;
}

const defaultChartOptions = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ],
  borderColor: [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ],
  borderWidth: 1,
};

new Chart(getCanvasElement("sizes"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "Serialized Size",
        data: performanceStats.map((s) => s.size),
        ...defaultChartOptions,
      },
    ],
  },
});

new Chart(getCanvasElement("compressedSizes"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "Compressed Size",
        data: performanceStats.map((s) => s.zstdCompressedSize),
        ...defaultChartOptions,
      },
    ],
  },
});

new Chart(getCanvasElement("serializationTime"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "Serialize Duration",
        data: performanceStats.map((s) => s.serializeDuration),
        ...defaultChartOptions,
      },
    ],
  },
});

new Chart(getCanvasElement("zstdDuration"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "Zstd Duration",
        data: performanceStats.map((s) => s.zstdDuration),
        ...defaultChartOptions,
      },
    ],
  },
});

new Chart(getCanvasElement("deserializationTime"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "Deserialize Duration",
        data: performanceStats.map((s) => s.deserializeDuration),
        ...defaultChartOptions,
      },
    ],
  },
});

new Chart(getCanvasElement("endToEndPojo"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "End to End Duration for Regular JS Object",
        data: performanceStats.map(
          (s) =>
            s.serializeDuration +
            s.deserializeDuration +
            s.materializeAsPojoDuration,
        ),
        ...defaultChartOptions,
      },
    ],
  },
});

new Chart(getCanvasElement("endToEndScanForProperty"), {
  type: "bar",
  data: {
    labels: performanceStats.map((s) => s.name),
    datasets: [
      {
        label: "End to End Duration to Scan for a single Property",
        data: performanceStats.map(
          (s) =>
            s.serializeDuration +
            s.deserializeDuration +
            s.scanForIdPropertyDuration,
        ),
        ...defaultChartOptions,
      },
    ],
  },
});
