import * as $ from "capnp-es";
export declare const _capnpFileId: bigint;
export declare const RideableType: {
  readonly UNKNOWN_RIDEABLE_TYPE: 0;
  readonly ELECTRIC_BIKE: 1;
  readonly CLASSIC_BIKE: 2;
};
export type RideableType = (typeof RideableType)[keyof typeof RideableType];
export declare const MemberCasual: {
  readonly UNKNOWN_MEMBER_CASUAL: 0;
  readonly MEMBER: 1;
  readonly CASUAL: 2;
};
export type MemberCasual = (typeof MemberCasual)[keyof typeof MemberCasual];
export declare class Trip extends $.Struct {
  static readonly _capnp: {
    displayName: string;
    id: string;
    size: $.ObjectSize;
  };
  get rideId(): string;
  set rideId(value: string);
  get rideableType(): RideableType;
  set rideableType(value: RideableType);
  get startedAtMs(): bigint;
  set startedAtMs(value: bigint);
  get endedAtMs(): bigint;
  set endedAtMs(value: bigint);
  get startStationName(): string;
  set startStationName(value: string);
  get startStationId(): string;
  set startStationId(value: string);
  get endStationName(): string;
  set endStationName(value: string);
  get endStationId(): string;
  set endStationId(value: string);
  get startLat(): number;
  set startLat(value: number);
  get startLng(): number;
  set startLng(value: number);
  get endLat(): number;
  set endLat(value: number);
  get endLng(): number;
  set endLng(value: number);
  get memberCasual(): MemberCasual;
  set memberCasual(value: MemberCasual);
  toString(): string;
}
export declare class ServerResponseAll extends $.Struct {
  static readonly _capnp: {
    displayName: string;
    id: string;
    size: $.ObjectSize;
  };
  static _Trips: $.ListCtor<Trip>;
  _adoptTrips(value: $.Orphan<$.List<Trip>>): void;
  _disownTrips(): $.Orphan<$.List<Trip>>;
  get trips(): $.List<Trip>;
  _hasTrips(): boolean;
  _initTrips(length: number): $.List<Trip>;
  set trips(value: $.List<Trip>);
  toString(): string;
}
