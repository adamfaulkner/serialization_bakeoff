use chrono::{DateTime, NaiveDateTime, Utc};
use serde::{Deserialize, Deserializer, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum RideableType {
    ElectricBike,
    ClassicBike,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
enum MemberCasual {
    Member,
    Casual,
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
    rideable_type: String,
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
    member_casual: String,
}
