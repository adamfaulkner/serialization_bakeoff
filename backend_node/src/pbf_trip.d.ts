// TypeScript declarations for pbf_trip.js

export interface RideableType {
	unknown_rideable_type: 0;
	electric_bike: 1;
	classic_bike: 2;
}

export interface MemberCasual {
	unknown_member_casual: 0;
	member: 1;
	casual: 2;
}

export interface Trip {
	rideId: string;
	rideableType: number;
	startedAtMs: number;
	endedAtMs: number;
	startStationName: string | undefined;
	startStationId: string | undefined;
	endStationName: string | undefined;
	endStationId: string | undefined;
	startLat: number | undefined;
	startLng: number | undefined;
	endLat: number | undefined;
	endLng: number | undefined;
	memberCasual: number;
}

export interface ServerResponseAll {
	trips: Trip[];
}

export declare const RideableType: RideableType;
export declare const MemberCasual: MemberCasual;

export declare function readTrip(pbf: any, end?: number): Trip;
export declare function writeTrip(obj: Trip, pbf: any): void;
export declare function readServerResponseAll(pbf: any, end?: number): ServerResponseAll;
export declare function writeServerResponseAll(obj: ServerResponseAll, pbf: any): void;
