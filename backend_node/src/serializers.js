import { Packr } from 'msgpackr';
import { encode as cborEncode } from 'cbor-x';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Encoder } from '@toondepauw/node-zstd';
import protobuf from 'protobufjs';
import { rideableTypeToString, memberCasualToString } from './trip.js';

// Shared state for serializers that need initialization
let avroSchema = null;
let protoRoot = null;
let flatbuffersSchema = null;

// Lazy initialization of serialization schemas
function initSerializers() {
  if (!protoRoot) {
    // Initialize protobuf schema
    protoRoot = protobuf.loadSync(resolve('../schemas/trip.proto'));
  }
  
  if (!avroSchema) {
    // Initialize Avro schema
    try {
      const avsc = require('avsc');
      const schemaJson = JSON.parse(readFileSync(resolve('../schemas/trip.avsc'), 'utf8'));
      avroSchema = avsc.Type.forSchema(schemaJson);
    } catch (error) {
      console.error('Error loading Avro schema:', error);
    }
  }
}

// JSON Serializer
export function jsonSerialize(trips) {
  // Convert enum values to strings for JSON serialization
  const processedTrips = trips.map(trip => ({
    ...trip,
    rideableType: rideableTypeToString(trip.rideableType),
    memberCasual: memberCasualToString(trip.memberCasual)
  }));
  
  const response = { trips: processedTrips };
  const startTime = process.hrtime.bigint();
  const serialized = JSON.stringify(response);
  const endTime = process.hrtime.bigint();
  
  return {
    data: serialized,
    duration: Number((endTime - startTime) / 1000000n) // Convert to milliseconds
  };
}

// MessagePack Serializer
export function msgpackSerialize(trips) {
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
export function cborSerialize(trips) {
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
export function protoSerialize(trips) {
  initSerializers();
  
  const TripMessage = protoRoot.lookupType('trip_protobuf.Trip');
  const ServerResponseAll = protoRoot.lookupType('trip_protobuf.ServerResponseAll');
  
  // Convert trips to protobuf format
  const startTime = process.hrtime.bigint();
  
  const protoTrips = trips.map(trip => {
    return TripMessage.create({
      rideId: trip.rideId,
      rideableType: trip.rideableType,
      startedAtMs: trip.startedAtMs,
      endedAtMs: trip.endedAtMs,
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
export function avroSerialize(trips) {
  initSerializers();
  
  if (!avroSchema) {
    throw new Error('Avro schema not initialized');
  }
  
  const response = { trips };
  
  const startTime = process.hrtime.bigint();
  const serialized = avroSchema.toBuffer(response);
  const endTime = process.hrtime.bigint();
  
  return {
    data: serialized,
    duration: Number((endTime - startTime) / 1000000n)
  };
}

// Compression using zstd
export function compressWithZstd(data) {
  const startTime = process.hrtime.bigint();
  // Compression level 3 to match the Rust implementation
  const encoder = new Encoder(3);
  const compressed = encoder.encodeSync(data);
  const endTime = process.hrtime.bigint();
  
  return {
    data: compressed,
    duration: Number((endTime - startTime) / 1000000n)
  };
}