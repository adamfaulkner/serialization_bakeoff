import { SerializerResponse, Trip } from './types.js';
export declare function jsonSerialize(trips: Trip[]): SerializerResponse;
export declare function msgpackSerialize(trips: Trip[]): SerializerResponse;
export declare function cborSerialize(trips: Trip[]): SerializerResponse;
export declare function protoSerialize(trips: Trip[]): SerializerResponse;
export declare function avroSerialize(trips: Trip[]): SerializerResponse;
export declare function compressWithZstd(data: Buffer | string): SerializerResponse;
