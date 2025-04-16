import fs from 'node:fs';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import csvParser from 'csv-parser';
import { RideableType, MemberCasual, stringToRideableType, stringToMemberCasual, parseDateTime } from './trip.js';

export async function loadData() {
  const dataPath = path.resolve('../data/citibike-tripdata.csv');
  const trips = [];
  
  return new Promise((resolve, reject) => {
    createReadStream(dataPath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Parse and transform the CSV data into Trip objects
        const trip = {
          rideId: row.ride_id,
          rideableType: stringToRideableType(row.rideable_type),
          startedAtMs: parseDateTime(row.started_at),
          endedAtMs: parseDateTime(row.ended_at),
          startStationName: row.start_station_name || null,
          startStationId: row.start_station_id || null,
          endStationName: row.end_station_name || null,
          endStationId: row.end_station_id || null,
          startLat: row.start_lat ? parseFloat(row.start_lat) : null,
          startLng: row.start_lng ? parseFloat(row.start_lng) : null,
          endLat: row.end_lat ? parseFloat(row.end_lat) : null,
          endLng: row.end_lng ? parseFloat(row.end_lng) : null,
          memberCasual: stringToMemberCasual(row.member_casual)
        };
        
        trips.push(trip);
      })
      .on('end', () => {
        console.log(`Loaded ${trips.length} trips`);
        resolve(trips);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}