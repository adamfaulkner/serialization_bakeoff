import { z } from "zod";
import { Ajv, JTDSchemaType } from "ajv/dist/jtd.js";

export enum RideableType {
  electric = 1,
  classic = 2,
}

export enum MemberCasual {
  member = 1,
  casual = 2,
}

// This is the same trip that we use on the backend.
// The header row of the csv is:
// "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
export const tripSchema = z.object({
  rideId: z.string().nonempty(),
  rideableType: z.nativeEnum(RideableType),
  startedAt: z.date(),
  endedAt: z.date(),
  // These are optional because some trips do not start (initial manufacture of the bike?) or do not
  // finish (bike is lost or stolen?)
  startStationName: z.string().optional(),
  startStationId: z.string().optional(),
  endStationName: z.string().optional(),
  endStationId: z.string().optional(),
  startLat: z.number().optional(),
  startLng: z.number().optional(),
  endLat: z.number().optional(),
  endLng: z.number().optional(),
  memberCasual: z.nativeEnum(MemberCasual),
});
export type Trip = z.infer<typeof tripSchema>;

const tripJtdSchema: JTDSchemaType<Trip> = {
  properties: {
    rideId: { type: "string" },
    rideableType: { type: "uint8" },
    startedAt: { type: "timestamp" },
    endedAt: { type: "timestamp" },
    memberCasual: { type: "uint8" },
  },
  optionalProperties: {
    startStationName: { type: "string" },
    startStationId: { type: "string" },
    endStationName: { type: "string" },
    endStationId: { type: "string" },
    startLat: { type: "float64" },
    startLng: { type: "float64" },
    endLat: { type: "float64" },
    endLng: { type: "float64" },
  },
};

const serverResponseAllJtdSchema: JTDSchemaType<ServerResponseAll> = {
  properties: {
    trips: { elements: tripJtdSchema },
  },
};

const ajv = new Ajv();
export const serverResponseAllAjvValidator = ajv.compile(
  serverResponseAllJtdSchema,
);

export const serverResponseAllSchema = z.object({
  trips: z.array(tripSchema),
});

// TODO: eventually we want to serialize streams as well; the `all` suffix here means we serialize all trips at once
export type ServerResponseAll = {
  trips: Array<Trip>;
};

export const tripReceivedJsonSchema = z.object({
  rideId: z.string().nonempty(),
  rideableType: z.union([
    z.literal(1), // electric_bike
    z.literal(2), // classic_bike
  ]),
  startedAt: z.union([z.number(), z.bigint()]),
  endedAt: z.union([z.number(), z.bigint()]),
  // These are optional because some trips do not start (initial manufacture of the bike?) or do not
  // finish (bike is lost or stolen?)
  startStationName: z.string().optional(),
  startStationId: z.string().optional(),
  endStationName: z.string().optional(),
  endStationId: z.string().optional(),
  startLat: z.number().optional(),
  startLng: z.number().optional(),
  endLat: z.number().optional(),
  endLng: z.number().optional(),
  memberCasual: z.union([z.literal(1), z.literal(2)]), // member, casual
});

const tripReceivedJsonAjvSchema = {
  properties: {
    rideId: { type: "string" },
    rideableType: { type: "uint8" }, // Use uint8 for numeric enum values
    startedAt: { type: "float64" },
    endedAt: { type: "float64" },
    memberCasual: { type: "uint8" }, // Use uint8 for numeric enum values
  },
  optionalProperties: {
    startStationName: { type: "string" },
    startStationId: { type: "string" },
    endStationName: { type: "string" },
    endStationId: { type: "string" },
    startLat: { type: "float64" },
    startLng: { type: "float64" },
    endLat: { type: "float64" },
    endLng: { type: "float64" },
  },
};

export const serverResponseAllReceivedJsonAjvSchema = {
  properties: {
    trips: { elements: tripReceivedJsonAjvSchema },
  },
};

export const serverResponseAllReceivedAjvValidator = ajv.compile(
  serverResponseAllReceivedJsonAjvSchema,
);

export const serverResponseAllJsonSchema = z.object({
  trips: z.array(tripReceivedJsonSchema),
});

export type ServerResponseAllJson = {
  trips: Array<Trip>;
};
