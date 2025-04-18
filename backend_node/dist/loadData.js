import { createReadStream } from 'node:fs';
import path from 'node:path';
import csvParser from 'csv-parser';
import { MemberCasual, RideableType } from './types.js';
// Helper function to convert string to RideableType enum
export function stringToRideableType(str) {
    if (!str)
        return RideableType.UNKNOWN_RIDEABLE_TYPE;
    const normalized = str.toLowerCase().trim();
    if (normalized === 'electric_bike')
        return RideableType.ELECTRIC_BIKE;
    if (normalized === 'classic_bike')
        return RideableType.CLASSIC_BIKE;
    return RideableType.UNKNOWN_RIDEABLE_TYPE;
}
// Helper function to convert string to MemberCasual enum
export function stringToMemberCasual(str) {
    if (!str)
        return MemberCasual.UNKNOWN_MEMBER_CASUAL;
    const normalized = str.toLowerCase().trim();
    if (normalized === 'member')
        return MemberCasual.MEMBER;
    if (normalized === 'casual')
        return MemberCasual.CASUAL;
    return MemberCasual.UNKNOWN_MEMBER_CASUAL;
}
// Parse a datetime string to milliseconds since epoch
export function parseDateTime(dateTimeStr) {
    if (!dateTimeStr)
        return 0;
    const dateObj = new Date(dateTimeStr);
    return dateObj.getTime();
}
export async function loadData() {
    const dataPath = path.resolve('../data/citibike-tripdata.csv');
    const trips = [];
    return new Promise((resolve, reject) => {
        createReadStream(dataPath)
            .pipe(csvParser())
            .on('data', (row) => {
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
//# sourceMappingURL=loadData.js.map