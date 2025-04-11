import { ServerResponseAll } from "./trip.js";

export interface Deserializer<D> {
  name: string;
  endpoint: string;
  deserializeAll: (data: Uint8Array) => D;

  materializeUnverifiedAsPojo: (deserialized: D) => ServerResponseAll;
  scanForIdProperty: (deserialized: D, targetId: string) => boolean;
  materializeVerifedAsPojo: (deserialized: D) => ServerResponseAll;
}

export type SerializePerformanceStats = {
  name: string;
  deserializeDuration: number;
  serializeDuration: number;
  scanForIdPropertyDuration: number;
  materializeAsUnverifiedPojoDuration: number;
  size: number;
  zstdCompressedSize: number;
  zstdDuration: number;
  materializeAsVerifiedPojoDuration: number;
};
