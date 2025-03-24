import { z } from "zod";

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
