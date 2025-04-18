import { MemberCasual, RideableType, Trip } from './types.js';
export declare function stringToRideableType(str: string | undefined): RideableType;
export declare function stringToMemberCasual(str: string | undefined): MemberCasual;
export declare function parseDateTime(dateTimeStr: string | undefined): number;
export declare function loadData(): Promise<Trip[]>;
