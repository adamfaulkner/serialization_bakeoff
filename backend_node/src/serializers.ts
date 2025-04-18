import { Packr } from 'msgpackr';
import { encode as cborEncode } from 'cbor-x';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Encoder } from '@toondepauw/node-zstd';
import protobuf from 'protobufjs';
import { SerializerResponse, Trip } from './types.js';

// Set up paths for schema files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Shared state for serializers that need initialization
let avroSchema: any = null;
let protoRoot: protobuf.Root | null = null;

// Lazy initialization of serialization schemas
function initSerializers(): void {
  if (!protoRoot) {
    // Initialize protobuf schema
    const protoPath = path.join(projectRoot, 'schemas', 'trip.proto');
    console.log(`Loading Protocol Buffers schema from: ${protoPath}`);
    try {
      protoRoot = protobuf.loadSync(protoPath);
      console.log('Successfully loaded Protocol Buffers schema');
    } catch (error) {
      console.error('Error loading Protocol Buffers schema:', error);
      throw error;
    }
  }
  
  if (!avroSchema) {
    // Initialize Avro schema
    try {
      // Using dynamic import for avsc
      const avroPath = path.join(projectRoot, 'schemas', 'trip.avsc');
      console.log(`Loading Avro schema from: ${avroPath}`);
      const schemaJson = JSON.parse(readFileSync(avroPath, 'utf8'));
      
      // We'll initialize this when needed in the avroSerialize function
      console.log('Successfully loaded Avro schema JSON');
    } catch (error) {
      console.error('Error loading Avro schema:', error);
    }
  }
}

// JSON Serializer
export function jsonSerialize(trips: Trip[]): SerializerResponse {
  const response = { trips };
  const startTime = process.hrtime.bigint();
  const serialized = JSON.stringify(response);
  const endTime = process.hrtime.bigint();
  
  return {
    data: serialized,
    duration: Number((endTime - startTime) / 1000000n) // Convert to milliseconds
  };
}

// MessagePack Serializer
export function msgpackSerialize(trips: Trip[]): SerializerResponse {
  const response = { trips };
  const packr = new Packr();
  
  const startTime = process.hrtime.bigint();
  const serialized = packr.pack(response);
  const endTime = process.hrtime.bigint();
  
  return {
    data: serialized,
    duration: Number((endTime - startTime) / 1000000n)
  };
}

// CBOR Serializer
export function cborSerialize(trips: Trip[]): SerializerResponse {
  const response = { trips };
  
  const startTime = process.hrtime.bigint();
  const serialized = cborEncode(response);
  const endTime = process.hrtime.bigint();
  
  return {
    data: serialized,
    duration: Number((endTime - startTime) / 1000000n)
  };
}

// Protocol Buffers Serializer
export function protoSerialize(trips: Trip[]): SerializerResponse {
  initSerializers();
  
  if (!protoRoot) {
    throw new Error('Protocol Buffers schema not initialized');
  }
  
  const TripMessage = protoRoot.lookupType('trip_protobuf.Trip');
  const ServerResponseAll = protoRoot.lookupType('trip_protobuf.ServerResponseAll');
  
  // Convert trips to protobuf format
  const startTime = process.hrtime.bigint();
  
  const protoTrips = trips.map(trip => {
    return TripMessage.create({
      rideId: trip.rideId,
      rideableType: trip.rideableType,
      startedAtMs: trip.startedAt, // Using the new field name but proto expects startedAtMs
      endedAtMs: trip.endedAt,     // Using the new field name but proto expects endedAtMs
      startStationName: trip.startStationName,
      startStationId: trip.startStationId,
      endStationName: trip.endStationName,
      endStationId: trip.endStationId,
      startLat: trip.startLat,
      startLng: trip.startLng, 
      endLat: trip.endLat,
      endLng: trip.endLng,
      memberCasual: trip.memberCasual
    });
  });
  
  const response = ServerResponseAll.create({ trips: protoTrips });
  const serialized = ServerResponseAll.encode(response).finish();
  const endTime = process.hrtime.bigint();
  
  return {
    data: Buffer.from(serialized),
    duration: Number((endTime - startTime) / 1000000n)
  };
}

// Avro Serializer
export function avroSerialize(trips: Trip[]): SerializerResponse {
  // For now, return a message that Avro is not implemented
  // This avoids the require() issue with ESM
  console.log('Avro serialization requested but not fully implemented in ESM mode');
  
  const startTime = process.hrtime.bigint();
  const serialized = Buffer.from('Avro serialization not fully implemented');
  const endTime = process.hrtime.bigint();
  
  return {
    data: serialized,
    duration: Number((endTime - startTime) / 1000000n)
  };
}

// Compression using zstd
export function compressWithZstd(data: Buffer | string): SerializerResponse {
  const startTime = process.hrtime.bigint();
  
  // Convert string to Buffer if needed
  const dataBuffer = typeof data === 'string' ? Buffer.from(data) : data;
  
  // Compression level 3 to match the Rust implementation
  const encoder = new Encoder(3);
  const compressed = encoder.encodeSync(dataBuffer);
  const endTime = process.hrtime.bigint();
  
  return {
    data: compressed,
    duration: Number((endTime - startTime) / 1000000n)
  };
}