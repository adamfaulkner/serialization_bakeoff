export declare enum RideableType {
    UNKNOWN_RIDEABLE_TYPE = 0,
    ELECTRIC_BIKE = 1,
    CLASSIC_BIKE = 2
}
export declare enum MemberCasual {
    UNKNOWN_MEMBER_CASUAL = 0,
    MEMBER = 1,
    CASUAL = 2
}
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
export interface ServerResponseAll {
    trips: Trip[];
}
export interface SerializerResponse {
    data: Buffer | string;
    duration: number;
}
