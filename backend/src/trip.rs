use chrono::{DateTime, NaiveDateTime, Utc};
use serde::{Deserialize, Deserializer, Serialize, Serializer};

use crate::generated::trip as bebop_trip;
use crate::{trip_capnp, trip_flatbuffer, trip_protobuf};

#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RideableType {
    ElectricBike,
    ClassicBike,
}

impl Serialize for RideableType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            RideableType::ElectricBike => serializer.serialize_u8(1),
            RideableType::ClassicBike => serializer.serialize_u8(2),
        }
    }
}

impl From<&RideableType> for trip_protobuf::RideableType {
    fn from(rideable_type: &RideableType) -> Self {
        match rideable_type {
            RideableType::ElectricBike => trip_protobuf::RideableType::ElectricBike,
            RideableType::ClassicBike => trip_protobuf::RideableType::ClassicBike,
        }
    }
}

impl From<&RideableType> for bebop_trip::RideableType {
    fn from(rideable_type: &RideableType) -> Self {
        match rideable_type {
            RideableType::ElectricBike => bebop_trip::RideableType::Ebicycle,
            RideableType::ClassicBike => bebop_trip::RideableType::Bicycle,
        }
    }
}

impl From<&RideableType> for trip_capnp::RideableType {
    fn from(rideable_type: &RideableType) -> Self {
        match rideable_type {
            RideableType::ElectricBike => trip_capnp::RideableType::ElectricBike,
            RideableType::ClassicBike => trip_capnp::RideableType::ClassicBike,
        }
    }
}

impl From<&RideableType> for trip_flatbuffer::trip::RideableType {
    fn from(rideable_type: &RideableType) -> Self {
        match rideable_type {
            RideableType::ElectricBike => trip_flatbuffer::trip::RideableType::ELECTRIC_BIKE,
            RideableType::ClassicBike => trip_flatbuffer::trip::RideableType::CLASSIC_BIKE,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemberCasual {
    Member,
    Casual,
}

impl Serialize for MemberCasual {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            MemberCasual::Member => serializer.serialize_u8(1),
            MemberCasual::Casual => serializer.serialize_u8(2),
        }
    }
}

impl From<&MemberCasual> for trip_protobuf::MemberCasual {
    fn from(member_casual: &MemberCasual) -> Self {
        match member_casual {
            MemberCasual::Member => trip_protobuf::MemberCasual::Member,
            MemberCasual::Casual => trip_protobuf::MemberCasual::Casual,
        }
    }
}

impl From<&MemberCasual> for bebop_trip::MemberCasual {
    fn from(member_casual: &MemberCasual) -> Self {
        match member_casual {
            MemberCasual::Member => bebop_trip::MemberCasual::Member,
            MemberCasual::Casual => bebop_trip::MemberCasual::Casual,
        }
    }
}

impl From<&MemberCasual> for trip_capnp::MemberCasual {
    fn from(member_casual: &MemberCasual) -> Self {
        match member_casual {
            MemberCasual::Member => trip_capnp::MemberCasual::Member,
            MemberCasual::Casual => trip_capnp::MemberCasual::Casual,
        }
    }
}

impl From<&MemberCasual> for trip_flatbuffer::trip::MemberCasual {
    fn from(member_casual: &MemberCasual) -> Self {
        match member_casual {
            MemberCasual::Member => trip_flatbuffer::trip::MemberCasual::MEMBER,
            MemberCasual::Casual => trip_flatbuffer::trip::MemberCasual::CASUAL,
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

fn serialize_datetime_to_number_ms<S>(
    date: &DateTime<Utc>,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.serialize_i64(date.timestamp_millis())
}

// The header row of the csv is:
// "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Trip {
    pub ride_id: String,
    pub rideable_type: RideableType,
    #[serde(
        deserialize_with = "deserialize_datetime_from_str",
        serialize_with = "serialize_datetime_to_number_ms"
    )]
    pub started_at: DateTime<Utc>,
    #[serde(
        deserialize_with = "deserialize_datetime_from_str",
        serialize_with = "serialize_datetime_to_number_ms"
    )]
    pub ended_at: DateTime<Utc>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub start_station_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub start_station_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub end_station_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub end_station_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub start_lat: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub start_lng: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub end_lat: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub end_lng: Option<f64>,
    pub member_casual: MemberCasual,
}

impl From<&Trip> for trip_protobuf::Trip {
    fn from(trip: &Trip) -> Self {
        trip_protobuf::Trip {
            ride_id: trip.ride_id.clone(),
            rideable_type: Into::<trip_protobuf::RideableType>::into(&trip.rideable_type).into(),
            started_at_ms: trip.started_at.timestamp_millis(),
            ended_at_ms: trip.ended_at.timestamp_millis(),
            start_station_name: trip.start_station_name.clone(),
            start_station_id: trip.start_station_id.clone(),
            end_station_name: trip.end_station_name.clone(),
            end_station_id: trip.end_station_id.clone(),
            start_lat: trip.start_lat,
            start_lng: trip.start_lng,
            end_lat: trip.end_lat,
            end_lng: trip.end_lng,
            member_casual: Into::<trip_protobuf::MemberCasual>::into(&trip.member_casual).into(),
        }
    }
}

impl<'a> From<&'a Trip> for bebop_trip::Trip<'a> {
    fn from(trip: &'a Trip) -> Self {
        bebop_trip::Trip {
            ride_id: Some(&trip.ride_id),
            rideable_type: Some(Into::<bebop_trip::RideableType>::into(&trip.rideable_type)),
            started_at: Some(bebop::Date::from_millis_since_unix_epoch(
                trip.started_at.timestamp_millis() as u64,
            )),
            ended_at: Some(bebop::Date::from_millis_since_unix_epoch(
                trip.ended_at.timestamp_millis() as u64,
            )),
            start_station_name: trip.start_station_name.as_deref(),
            start_station_id: trip.start_station_id.as_deref(),
            end_station_name: trip.end_station_name.as_deref(),
            end_station_id: trip.end_station_id.as_deref(),
            start_lat: trip.start_lat,
            start_lng: trip.start_lng,
            end_lat: trip.end_lat,
            end_lng: trip.end_lng,
            member_casual: Some(Into::<bebop_trip::MemberCasual>::into(&trip.member_casual)),
        }
    }
}
