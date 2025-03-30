import { Chart } from "chart.js/auto";
import { ServerResponseAll, tripSchema } from "./trip.js";
import { json } from "./json.js";
import { proto } from "./proto.js";
import { msgpack } from "./msgpack.js";
import { bebop } from "./bebop.js";
import { avro, AvroServerResponseAll } from "./avro.js";
import { cbor } from "./cbor.js";
import { capnp } from "./capnp.js";
import { flatbuffers } from "./flatbuffers.js";
import { Message } from "protobufjs/index.js";
import { ServerResponseAll as ServerResponseAllBebop } from "./bops.gen.js";
import { ServerResponseAll as ServerResponseAllCapnp } from "./capnp_trip.js";
import { ServerResponseAll as ServerResponseAllFlatbuffers } from "./flatbuffers/server-response-all.js";
import { Deserializer, SerializePerformanceStats } from "./deserializer.js";

const DESERIALIZERS: Array<Deserializer<any>> = [
  json,
  proto,
  msgpack,
  cbor,
  bebop,
  capnp,
  flatbuffers,
  avro,
];

async function serializePerformanceTests(
  d: Deserializer<any>,
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

  const validationStartTime = performance.now();
  if (!d.verifyServerResponse(deserialized)) {
    debugger;
    throw new Error("Server response should be valid");
  }
  const validationDuration = performance.now() - validationStartTime;

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
    validationDuration,
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

new Chart(getCanvasElement("endToEndPojoValidated"), {
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
            s.materializeAsPojoDuration +
            s.validationDuration,
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
