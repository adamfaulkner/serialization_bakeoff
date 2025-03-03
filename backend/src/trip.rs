use chrono::{DateTime, NaiveDateTime, Utc};
use serde::{Deserialize, Deserializer, Serialize};

use crate::trip_protobuf;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum RideableType {
    ElectricBike,
    ClassicBike,
}

impl From<&RideableType> for trip_protobuf::RideableType {
    fn from(rideable_type: &RideableType) -> Self {
        match rideable_type {
            RideableType::ElectricBike => trip_protobuf::RideableType::ElectricBike,
            RideableType::ClassicBike => trip_protobuf::RideableType::ClassicBike,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum MemberCasual {
    Member,
    Casual,
}

impl From<&MemberCasual> for trip_protobuf::MemberCasual {
    fn from(member_casual: &MemberCasual) -> Self {
        match member_casual {
            MemberCasual::Member => trip_protobuf::MemberCasual::Member,
            MemberCasual::Casual => trip_protobuf::MemberCasual::Casual,
        }
    }
}

fn deserialize_datetime_from_str<'de, D>(deserializer: D) -> Result<DateTime<Utc>, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    NaiveDateTime::parse_from_str(&s, "%Y-%m-%d %H:%M:%S%.3f")
        .map(|ndt| ndt.and_utc())
        .map_err(serde::de::Error::custom)
}

// The header row of the csv is:
// "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Trip {
    ride_id: String,
    rideable_type: RideableType,
    #[serde(deserialize_with = "deserialize_datetime_from_str")]
    started_at: DateTime<Utc>,
    #[serde(deserialize_with = "deserialize_datetime_from_str")]
    ended_at: DateTime<Utc>,
    start_station_name: String,
    start_station_id: String,
    end_station_name: String,
    end_station_id: String,
    start_lat: Option<f64>,
    start_lng: Option<f64>,
    end_lat: Option<f64>,
    end_lng: Option<f64>,
    member_casual: MemberCasual,
}

impl From<&Trip> for trip_protobuf::Trip {
    fn from(trip: &Trip) -> Self {
        trip_protobuf::Trip {
            ride_id: trip.ride_id.clone(),
            rideable_type: Into::<trip_protobuf::RideableType>::into(&trip.rideable_type).into(),
            started_at: Some(prost_types::Timestamp {
                seconds: trip.started_at.timestamp(),
                nanos: trip.started_at.timestamp_subsec_nanos() as i32,
            }),
            ended_at: Some(prost_types::Timestamp {
                seconds: trip.ended_at.timestamp(),
                nanos: trip.ended_at.timestamp_subsec_nanos() as i32,
            }),
            start_station_name: trip.start_station_name.clone(),
            start_station_id: trip.start_station_id.clone(),
            end_station_name: trip.end_station_name.clone(),
            end_station_id: trip.end_station_id.clone(),
            start_lat: trip.start_lat.unwrap_or(0.0),
            start_lng: trip.start_lng.unwrap_or(0.0),
            end_lat: trip.end_lat.unwrap_or(0.0),
            end_lng: trip.end_lng.unwrap_or(0.0),
            member_casual: Into::<trip_protobuf::MemberCasual>::into(&trip.member_casual).into(),
        }
    }
}
