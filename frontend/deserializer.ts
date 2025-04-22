import { ServerResponseAll } from "./trip.js";

export interface Deserializer<D, UseText = false> {
  name: string;
  endpoint: string;
  useText?: UseText;
  deserializeAll: (data: UseText extends true ? string : Uint8Array) => D;
  materializeUnverifiedAsPojo: (deserialized: D) => ServerResponseAll;
  scanForIdProperty: (deserialized: D, targetId: string) => boolean;
  materializeVerifedAsPojo: (deserialized: D) => ServerResponseAll;
}

export type SerializePerformanceStats = {
  name: string;
  endToEndMaterializeUnverifiedPojoDuration: number;
  deserializeDuration: number;
  bodyReadDuration: number;
  serializeDuration: number;
  scanForIdPropertyDuration: number;
  materializeAsUnverifiedPojoDuration: number;
  size: number;
  zstdCompressedSize: number;
  zstdDuration: number;
  materializeAsVerifiedPojoDuration: number;
};
