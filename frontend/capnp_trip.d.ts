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
export declare const Trip_StartLat_Which: {
  readonly LAT: 0;
  readonly LAT_UNKNOWN: 1;
};
export type Trip_StartLat_Which = (typeof Trip_StartLat_Which)[keyof typeof Trip_StartLat_Which];
export declare class Trip_StartLat extends $.Struct {
  static readonly LAT: 0;
  static readonly LAT_UNKNOWN: 1;
  static readonly _capnp: {
    displayName: string;
    id: string;
    size: $.ObjectSize;
  };
  get lat(): number;
  get _isLat(): boolean;
  set lat(value: number);
  get _isLatUnknown(): boolean;
  set latUnknown(_: true);
  toString(): string;
  which(): Trip_StartLat_Which;
}
export declare const Trip_StartLng_Which: {
  readonly LNG: 0;
  readonly LNG_UNKNOWN: 1;
};
export type Trip_StartLng_Which = (typeof Trip_StartLng_Which)[keyof typeof Trip_StartLng_Which];
export declare class Trip_StartLng extends $.Struct {
  static readonly LNG: 0;
  static readonly LNG_UNKNOWN: 1;
  static readonly _capnp: {
    displayName: string;
    id: string;
    size: $.ObjectSize;
  };
  get lng(): number;
  get _isLng(): boolean;
  set lng(value: number);
  get _isLngUnknown(): boolean;
  set lngUnknown(_: true);
  toString(): string;
  which(): Trip_StartLng_Which;
}
export declare const Trip_EndLat_Which: {
  readonly LAT: 0;
  readonly LAT_UNKNOWN: 1;
};
export type Trip_EndLat_Which = (typeof Trip_EndLat_Which)[keyof typeof Trip_EndLat_Which];
export declare class Trip_EndLat extends $.Struct {
  static readonly LAT: 0;
  static readonly LAT_UNKNOWN: 1;
  static readonly _capnp: {
    displayName: string;
    id: string;
    size: $.ObjectSize;
  };
  get lat(): number;
  get _isLat(): boolean;
  set lat(value: number);
  get _isLatUnknown(): boolean;
  set latUnknown(_: true);
  toString(): string;
  which(): Trip_EndLat_Which;
}
export declare const Trip_EndLng_Which: {
  readonly LNG: 0;
  readonly LNG_UNKNOWN: 1;
};
export type Trip_EndLng_Which = (typeof Trip_EndLng_Which)[keyof typeof Trip_EndLng_Which];
export declare class Trip_EndLng extends $.Struct {
  static readonly LNG: 0;
  static readonly LNG_UNKNOWN: 1;
  static readonly _capnp: {
    displayName: string;
    id: string;
    size: $.ObjectSize;
  };
  get lng(): number;
  get _isLng(): boolean;
  set lng(value: number);
  get _isLngUnknown(): boolean;
  set lngUnknown(_: true);
  toString(): string;
  which(): Trip_EndLng_Which;
}
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
  get startLat(): Trip_StartLat;
  _initStartLat(): Trip_StartLat;
  get startLng(): Trip_StartLng;
  _initStartLng(): Trip_StartLng;
  get endLat(): Trip_EndLat;
  _initEndLat(): Trip_EndLat;
  get endLng(): Trip_EndLng;
  _initEndLng(): Trip_EndLng;
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
