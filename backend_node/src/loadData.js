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
        // Create base trip object
        const trip = {
          rideId: row.ride_id,
          rideableType: stringToRideableType(row.rideable_type),
          startedAt: parseDateTime(row.started_at),
          endedAt: parseDateTime(row.ended_at),
          memberCasual: stringToMemberCasual(row.member_casual)
        };

        // Add optional fields only if they exist and are not empty
        if (row.start_station_name && row.start_station_name.trim()) {
          trip.startStationName = row.start_station_name;
        }
        
        if (row.start_station_id && row.start_station_id.trim()) {
          trip.startStationId = String(row.start_station_id);
        }
        
        if (row.end_station_name && row.end_station_name.trim()) {
          trip.endStationName = row.end_station_name;
        }
        
        if (row.end_station_id && row.end_station_id.trim()) {
          trip.endStationId = String(row.end_station_id);
        }

        // Add latitude and longitude fields if they exist
        if (row.start_lat && !isNaN(parseFloat(row.start_lat))) {
          trip.startLat = parseFloat(row.start_lat);
        }
        
        if (row.start_lng && !isNaN(parseFloat(row.start_lng))) {
          trip.startLng = parseFloat(row.start_lng);
        }
        
        if (row.end_lat && !isNaN(parseFloat(row.end_lat))) {
          trip.endLat = parseFloat(row.end_lat);
        }
        
        if (row.end_lng && !isNaN(parseFloat(row.end_lng))) {
          trip.endLng = parseFloat(row.end_lng);
        }
        
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