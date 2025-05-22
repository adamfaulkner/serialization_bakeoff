import fs from "node:fs";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import csvParser from "csv-parser";
import { MemberCasual, RideableType, Trip } from "./types.js";

// Set up paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

// Helper function to convert string to RideableType enum
export function stringToRideableType(str: string | undefined): RideableType {
	if (!str) return RideableType.UNKNOWN_RIDEABLE_TYPE;

	const normalized = str.toLowerCase().trim();
	if (normalized === "electric_bike") return RideableType.ELECTRIC_BIKE;
	if (normalized === "classic_bike") return RideableType.CLASSIC_BIKE;
	return RideableType.UNKNOWN_RIDEABLE_TYPE;
}

// Helper function to convert string to MemberCasual enum
export function stringToMemberCasual(str: string | undefined): MemberCasual {
	if (!str) return MemberCasual.UNKNOWN_MEMBER_CASUAL;

	const normalized = str.toLowerCase().trim();
	if (normalized === "member") return MemberCasual.MEMBER;
	if (normalized === "casual") return MemberCasual.CASUAL;
	return MemberCasual.UNKNOWN_MEMBER_CASUAL;
}

// Parse a datetime string to milliseconds since epoch
export function parseDateTime(dateTimeStr: string | undefined): number {
	if (!dateTimeStr) return 0;

	const dateObj = new Date(dateTimeStr);
	return dateObj.getTime();
}

interface CsvRow {
	ride_id: string;
	rideable_type: string;
	started_at: string;
	ended_at: string;
	start_station_name?: string;
	start_station_id?: string;
	end_station_name?: string;
	end_station_id?: string;
	start_lat?: string;
	start_lng?: string;
	end_lat?: string;
	end_lng?: string;
	member_casual: string;
}

export async function loadData(): Promise<Trip[]> {
	const dataPath = path.join(projectRoot, "data", "citibike-tripdata.csv");
	console.log(`Loading data from: ${dataPath}`);
	const trips: Trip[] = [];

	return new Promise((resolve, reject) => {
		createReadStream(dataPath)
			.pipe(csvParser())
			.on("data", (row: CsvRow) => {
				// Create base trip object
				const trip: Trip = {
					rideId: row.ride_id,
					rideableType: stringToRideableType(row.rideable_type),
					startedAt: parseDateTime(row.started_at),
					endedAt: parseDateTime(row.ended_at),
					memberCasual: stringToMemberCasual(row.member_casual),
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
			.on("end", () => {
				console.log(`Loaded ${trips.length} trips`);
				resolve(trips);
			})
			.on("error", (error: Error) => {
				reject(error);
			});
	});
}
