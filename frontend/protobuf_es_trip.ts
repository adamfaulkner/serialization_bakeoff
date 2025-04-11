// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file trip.proto (package trip_protobuf, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file trip.proto.
 */
export const file_trip: GenFile = /*@__PURE__*/
  fileDesc("Cgp0cmlwLnByb3RvEg10cmlwX3Byb3RvYnVmIosECgRUcmlwEg8KB3JpZGVfaWQYASABKAkSMgoNcmlkZWFibGVfdHlwZRgCIAEoDjIbLnRyaXBfcHJvdG9idWYuUmlkZWFibGVUeXBlEhUKDXN0YXJ0ZWRfYXRfbXMYAyABKAMSEwoLZW5kZWRfYXRfbXMYBCABKAMSHwoSc3RhcnRfc3RhdGlvbl9uYW1lGAUgASgJSACIAQESHQoQc3RhcnRfc3RhdGlvbl9pZBgGIAEoCUgBiAEBEh0KEGVuZF9zdGF0aW9uX25hbWUYByABKAlIAogBARIbCg5lbmRfc3RhdGlvbl9pZBgIIAEoCUgDiAEBEhYKCXN0YXJ0X2xhdBgJIAEoAUgEiAEBEhYKCXN0YXJ0X2xuZxgKIAEoAUgFiAEBEhQKB2VuZF9sYXQYCyABKAFIBogBARIUCgdlbmRfbG5nGAwgASgBSAeIAQESMgoNbWVtYmVyX2Nhc3VhbBgNIAEoDjIbLnRyaXBfcHJvdG9idWYuTWVtYmVyQ2FzdWFsQhUKE19zdGFydF9zdGF0aW9uX25hbWVCEwoRX3N0YXJ0X3N0YXRpb25faWRCEwoRX2VuZF9zdGF0aW9uX25hbWVCEQoPX2VuZF9zdGF0aW9uX2lkQgwKCl9zdGFydF9sYXRCDAoKX3N0YXJ0X2xuZ0IKCghfZW5kX2xhdEIKCghfZW5kX2xuZyI3ChFTZXJ2ZXJSZXNwb25zZUFsbBIiCgV0cmlwcxgBIAMoCzITLnRyaXBfcHJvdG9idWYuVHJpcCpOCgxSaWRlYWJsZVR5cGUSGQoVdW5rbm93bl9yaWRlYWJsZV90eXBlEAASEQoNZWxlY3RyaWNfYmlrZRABEhAKDGNsYXNzaWNfYmlrZRACKkEKDE1lbWJlckNhc3VhbBIZChV1bmtub3duX21lbWJlcl9jYXN1YWwQABIKCgZtZW1iZXIQARIKCgZjYXN1YWwQAmIGcHJvdG8z");

/**
 * The header row of the csv is:
 * "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
 *
 * @generated from message trip_protobuf.Trip
 */
export type Trip = Message<"trip_protobuf.Trip"> & {
  /**
   * @generated from field: string ride_id = 1;
   */
  rideId: string;

  /**
   * @generated from field: trip_protobuf.RideableType rideable_type = 2;
   */
  rideableType: RideableType;

  /**
   * @generated from field: int64 started_at_ms = 3;
   */
  startedAtMs: bigint;

  /**
   * @generated from field: int64 ended_at_ms = 4;
   */
  endedAtMs: bigint;

  /**
   * @generated from field: optional string start_station_name = 5;
   */
  startStationName?: string;

  /**
   * @generated from field: optional string start_station_id = 6;
   */
  startStationId?: string;

  /**
   * @generated from field: optional string end_station_name = 7;
   */
  endStationName?: string;

  /**
   * @generated from field: optional string end_station_id = 8;
   */
  endStationId?: string;

  /**
   * @generated from field: optional double start_lat = 9;
   */
  startLat?: number;

  /**
   * @generated from field: optional double start_lng = 10;
   */
  startLng?: number;

  /**
   * @generated from field: optional double end_lat = 11;
   */
  endLat?: number;

  /**
   * @generated from field: optional double end_lng = 12;
   */
  endLng?: number;

  /**
   * @generated from field: trip_protobuf.MemberCasual member_casual = 13;
   */
  memberCasual: MemberCasual;
};

/**
 * Describes the message trip_protobuf.Trip.
 * Use `create(TripSchema)` to create a new message.
 */
export const TripSchema: GenMessage<Trip> = /*@__PURE__*/
  messageDesc(file_trip, 0);

/**
 * @generated from message trip_protobuf.ServerResponseAll
 */
export type ServerResponseAll = Message<"trip_protobuf.ServerResponseAll"> & {
  /**
   * @generated from field: repeated trip_protobuf.Trip trips = 1;
   */
  trips: Trip[];
};

/**
 * Describes the message trip_protobuf.ServerResponseAll.
 * Use `create(ServerResponseAllSchema)` to create a new message.
 */
export const ServerResponseAllSchema: GenMessage<ServerResponseAll> = /*@__PURE__*/
  messageDesc(file_trip, 1);

/**
 * @generated from enum trip_protobuf.RideableType
 */
export enum RideableType {
  /**
   * @generated from enum value: unknown_rideable_type = 0;
   */
  unknown_rideable_type = 0,

  /**
   * @generated from enum value: electric_bike = 1;
   */
  electric_bike = 1,

  /**
   * @generated from enum value: classic_bike = 2;
   */
  classic_bike = 2,
}

/**
 * Describes the enum trip_protobuf.RideableType.
 */
export const RideableTypeSchema: GenEnum<RideableType> = /*@__PURE__*/
  enumDesc(file_trip, 0);

/**
 * @generated from enum trip_protobuf.MemberCasual
 */
export enum MemberCasual {
  /**
   * @generated from enum value: unknown_member_casual = 0;
   */
  unknown_member_casual = 0,

  /**
   * @generated from enum value: member = 1;
   */
  member = 1,

  /**
   * @generated from enum value: casual = 2;
   */
  casual = 2,
}

/**
 * Describes the enum trip_protobuf.MemberCasual.
 */
export const MemberCasualSchema: GenEnum<MemberCasual> = /*@__PURE__*/
  enumDesc(file_trip, 1);

