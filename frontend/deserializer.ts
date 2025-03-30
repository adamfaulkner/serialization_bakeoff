import { ServerResponseAll } from "./trip.js";

export interface Deserializer<D> {
  name: string;
  deserializeAll: (data: Uint8Array) => D;
  materializeAsPojo: (deserialized: D) => ServerResponseAll;
  scanForIdProperty: (deserialized: D, targetId: string) => boolean;
  verifyServerResponse: (deserialized: D) => boolean;
}

export type SerializePerformanceStats = {
  name: string;
  deserializeDuration: number;
  serializeDuration: number;
  scanForIdPropertyDuration: number;
  materializeAsPojoDuration: number;
  size: number;
  zstdCompressedSize: number;
  zstdDuration: number;
  validationDuration: number;
};
