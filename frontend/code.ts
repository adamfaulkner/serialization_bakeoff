import { ServerResponseAll, tripSchema } from "./trip.js";
import { json } from "./json.js";
import { proto } from "./proto.js";
import { msgpack } from "./msgpack.js";
import { bebop } from "./bebop.js";
import { avro } from "./avro.js";
import { cbor } from "./cbor.js";
import { capnp } from "./capnp.js";
import { flatbuffers } from "./flatbuffers.js";
import { Deserializer, SerializePerformanceStats } from "./deserializer.js";
import { renderCharts } from "./charts.js";

const DESERIALIZERS: Array<Deserializer<any>> = [
  json,
  // proto,
  // msgpack,
  // cbor,
  bebop,
  //capnp,
  // flatbuffers,
  avro,
];

function sanityCheckMaterializedPojo(pojo: ServerResponseAll) {
  // Sanity check: verify that we got back some trips.
  if (pojo.trips.length === 0) {
    throw new Error("Materialized trips should not be empty");
  }

  // Sanity check: verify that the materialized object is in fact the type we expect
  // To be faster, we only check a random sample.
  for (const trip of pojo.trips) {
    if (Math.random() < 0.01) {
      try {
        tripSchema.parse(trip);
      } catch (error) {
        debugger;
      }
    }
  }
}

async function serializePerformanceTests(
  d: Deserializer<any>,
): Promise<SerializePerformanceStats> {
  const response = await fetch(`/${d.name}`, {
    headers: { "X-Zstd-Enabled": "true" },
  });

  let body;
  // if (d.name === 'json') {
  if (false) {
    body = await response.text();
  } else {
    body = await response.bytes();
  }
  // const bodyBytes = await response.bytes();

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
  const deserialized = await d.deserializeAll(body);
  const deserializeDuration = performance.now() - deserializeStartTime;

  const materializeVerifiedStartTime = performance.now();
  const materializedVerified = d.materializeVerifedAsPojo(deserialized);
  const materializeAsVerifiedPojoDuration =
    performance.now() - materializeVerifiedStartTime;
  sanityCheckMaterializedPojo(materializedVerified);

  const scanStartTime = performance.now();
  const scanResult = d.scanForIdProperty(deserialized, "123");
  const scanForIdPropertyDuration = performance.now() - scanStartTime;
  // Help guarantee that the scan doesn't get optimized away.
  if (scanResult === true) {
    throw new Error("Scan result should always be false");
  }

  const materializeAsUnverifiedPojoStartTime = performance.now();
  const materializedUnverified = d.materializeUnverifiedAsPojo(deserialized);
  const materializeAsUnverifiedPojoDuration =
    performance.now() - materializeAsUnverifiedPojoStartTime;
  sanityCheckMaterializedPojo(materializedUnverified);

  return {
    name: d.name,
    serializeDuration,
    deserializeDuration,
    scanForIdPropertyDuration,
    materializeAsUnverifiedPojoDuration,
    size: body.length,
    zstdCompressedSize: resourceEntry.encodedBodySize,
    zstdDuration,
    materializeAsVerifiedPojoDuration,
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
renderCharts(performanceStats);
