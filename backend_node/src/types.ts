// Enum types
export enum RideableType {
  UNKNOWN_RIDEABLE_TYPE = 0,
  ELECTRIC_BIKE = 1,
  CLASSIC_BIKE = 2
}

export enum MemberCasual {
  UNKNOWN_MEMBER_CASUAL = 0,
  MEMBER = 1,
  CASUAL = 2
}

// Trip data structure
export interface Trip {
  rideId: string;
  rideableType: RideableType;
  startedAt: number;
  endedAt: number;
  startStationName?: string;
  startStationId?: string;
  endStationName?: string;
  endStationId?: string;
  startLat?: number;
  startLng?: number;
  endLat?: number;
  endLng?: number;
  memberCasual: MemberCasual;
}

// Server response with all trips
export interface ServerResponseAll {
  trips: Trip[];
}

// Response from serializers
export interface SerializerResponse {
  data: Buffer | string;
  duration: number;
}