//
// This code was generated by a tool.
//
//
//   bebopc version:
//       3.1.3
//
//
//   bebopc source:
//       https://github.com/betwixt-labs/bebop
//
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//

#![allow(warnings)]

use ::std::io::Write as _;
use ::core::convert::TryInto as _;
use ::bebop::FixedSized as _;

#[repr(u32)]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum RideableType {
    Unknown = 0,
    Bicycle = 1,
    Ebicycle = 2,
}

impl ::core::convert::TryFrom<u32> for RideableType {
    type Error = ::bebop::DeserializeError;

    fn try_from(value: u32) -> ::bebop::DeResult<Self> {
        match value {
            0 => Ok(RideableType::Unknown),
            1 => Ok(RideableType::Bicycle),
            2 => Ok(RideableType::Ebicycle),
            d => Err(::bebop::DeserializeError::InvalidEnumDiscriminator(d.into())),
        }
    }
}

impl ::core::convert::From<RideableType> for u32 {
    fn from(value: RideableType) -> Self {
        match value {
            RideableType::Unknown => 0,
            RideableType::Bicycle => 1,
            RideableType::Ebicycle => 2,
        }
    }
}

impl ::bebop::SubRecord<'_> for RideableType {
    const MIN_SERIALIZED_SIZE: usize = ::std::mem::size_of::<u32>();
    const EXACT_SERIALIZED_SIZE: Option<usize> = Some(::std::mem::size_of::<u32>());

    #[inline]
    fn serialized_size(&self) -> usize { ::std::mem::size_of::<u32>() }

    ::bebop::define_serialize_chained!(*Self => |zelf, dest| {
        u32::from(zelf)._serialize_chained(dest)
    });

    #[inline]
    fn _deserialize_chained(raw: &[u8]) -> ::bebop::DeResult<(usize, Self)> {
        let (n, v) = u32::_deserialize_chained(raw)?;
        Ok((n, v.try_into()?))
    }
}

impl ::bebop::FixedSized for RideableType {
    const SERIALIZED_SIZE: usize = ::std::mem::size_of::<u32>();
}


#[repr(u32)]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum MemberCasual {
    Unknown = 0,
    Member = 1,
    Casual = 2,
}

impl ::core::convert::TryFrom<u32> for MemberCasual {
    type Error = ::bebop::DeserializeError;

    fn try_from(value: u32) -> ::bebop::DeResult<Self> {
        match value {
            0 => Ok(MemberCasual::Unknown),
            1 => Ok(MemberCasual::Member),
            2 => Ok(MemberCasual::Casual),
            d => Err(::bebop::DeserializeError::InvalidEnumDiscriminator(d.into())),
        }
    }
}

impl ::core::convert::From<MemberCasual> for u32 {
    fn from(value: MemberCasual) -> Self {
        match value {
            MemberCasual::Unknown => 0,
            MemberCasual::Member => 1,
            MemberCasual::Casual => 2,
        }
    }
}

impl ::bebop::SubRecord<'_> for MemberCasual {
    const MIN_SERIALIZED_SIZE: usize = ::std::mem::size_of::<u32>();
    const EXACT_SERIALIZED_SIZE: Option<usize> = Some(::std::mem::size_of::<u32>());

    #[inline]
    fn serialized_size(&self) -> usize { ::std::mem::size_of::<u32>() }

    ::bebop::define_serialize_chained!(*Self => |zelf, dest| {
        u32::from(zelf)._serialize_chained(dest)
    });

    #[inline]
    fn _deserialize_chained(raw: &[u8]) -> ::bebop::DeResult<(usize, Self)> {
        let (n, v) = u32::_deserialize_chained(raw)?;
        Ok((n, v.try_into()?))
    }
}

impl ::bebop::FixedSized for MemberCasual {
    const SERIALIZED_SIZE: usize = ::std::mem::size_of::<u32>();
}


#[derive(Clone, Debug, PartialEq, Default)]
pub struct Trip<'raw> {
    /// Field 1
    pub ride_id: ::core::option::Option<&'raw str>,
    /// Field 2
    pub rideable_type: ::core::option::Option<RideableType>,
    /// Field 3
    pub started_at: ::core::option::Option<::bebop::Date>,
    /// Field 4
    pub ended_at: ::core::option::Option<::bebop::Date>,
    /// Field 5
    pub start_station_name: ::core::option::Option<&'raw str>,
    /// Field 6
    pub start_station_id: ::core::option::Option<&'raw str>,
    /// Field 7
    pub end_station_name: ::core::option::Option<&'raw str>,
    /// Field 8
    pub end_station_id: ::core::option::Option<&'raw str>,
    /// Field 9
    pub start_lat: ::core::option::Option<f64>,
    /// Field 10
    pub start_lng: ::core::option::Option<f64>,
    /// Field 11
    pub end_lat: ::core::option::Option<f64>,
    /// Field 12
    pub end_lng: ::core::option::Option<f64>,
    /// Field 13
    pub member_casual: ::core::option::Option<MemberCasual>,
}

impl<'raw> ::bebop::SubRecord<'raw> for Trip<'raw> {
    const MIN_SERIALIZED_SIZE: usize = ::bebop::LEN_SIZE + 1;

    #[inline]
    fn serialized_size(&self) -> usize {
        ::bebop::LEN_SIZE + 1 +
        self.ride_id.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.rideable_type.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.started_at.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.ended_at.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.start_station_name.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.start_station_id.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.end_station_name.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.end_station_id.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.start_lat.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.start_lng.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.end_lat.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.end_lng.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
        self.member_casual.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0)
    }

    ::bebop::define_serialize_chained!(Self => |zelf, dest| {
        let size = zelf.serialized_size();
        ::bebop::write_len(dest, size - ::bebop::LEN_SIZE)?;
        if let Some(ref v) = zelf.ride_id {
            1u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.rideable_type {
            2u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.started_at {
            3u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.ended_at {
            4u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.start_station_name {
            5u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.start_station_id {
            6u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.end_station_name {
            7u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.end_station_id {
            8u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.start_lat {
            9u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.start_lng {
            10u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.end_lat {
            11u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.end_lng {
            12u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        if let Some(ref v) = zelf.member_casual {
            13u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        0u8._serialize_chained(dest)?;
        Ok(size)
    });

    fn _deserialize_chained(raw: &'raw [u8]) -> ::bebop::DeResult<(usize, Self)> {
        let mut i = 0;
        let len = ::bebop::read_len(&raw[i..])? + ::bebop::LEN_SIZE;
        i += ::bebop::LEN_SIZE;

        #[cfg(not(feature = "unchecked"))]
        if len == 0 {
            return Err(::bebop::DeserializeError::CorruptFrame);
        }

        if raw.len() < len {
            return Err(::bebop::DeserializeError::MoreDataExpected(len - raw.len()));
        }

        let mut _ride_id = None;
        let mut _rideable_type = None;
        let mut _started_at = None;
        let mut _ended_at = None;
        let mut _start_station_name = None;
        let mut _start_station_id = None;
        let mut _end_station_name = None;
        let mut _end_station_id = None;
        let mut _start_lat = None;
        let mut _start_lng = None;
        let mut _end_lat = None;
        let mut _end_lng = None;
        let mut _member_casual = None;

        #[cfg(not(feature = "unchecked"))]
        let mut last = 0;

        while i < len {
            let di = raw[i];

            #[cfg(not(feature = "unchecked"))]
            if di != 0 {
                if di < last {
                    return Err(::bebop::DeserializeError::CorruptFrame);
                }
                last = di;
            }

            i += 1;
            match di {
                0 => {
                    break;
                }
                1 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _ride_id.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _ride_id = Some(value)
                }
                2 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _rideable_type.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _rideable_type = Some(value)
                }
                3 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _started_at.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _started_at = Some(value)
                }
                4 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _ended_at.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _ended_at = Some(value)
                }
                5 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _start_station_name.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _start_station_name = Some(value)
                }
                6 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _start_station_id.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _start_station_id = Some(value)
                }
                7 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _end_station_name.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _end_station_name = Some(value)
                }
                8 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _end_station_id.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _end_station_id = Some(value)
                }
                9 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _start_lat.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _start_lat = Some(value)
                }
                10 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _start_lng.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _start_lng = Some(value)
                }
                11 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _end_lat.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _end_lat = Some(value)
                }
                12 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _end_lng.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _end_lng = Some(value)
                }
                13 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _member_casual.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _member_casual = Some(value)
                }
                _ => {
                    i = len;
                    break;
                }
            }
        }

        if i != len {
            debug_assert!(i > len);
            return Err(::bebop::DeserializeError::CorruptFrame)
        }

        Ok((i, Self {
            ride_id: _ride_id,
            rideable_type: _rideable_type,
            started_at: _started_at,
            ended_at: _ended_at,
            start_station_name: _start_station_name,
            start_station_id: _start_station_id,
            end_station_name: _end_station_name,
            end_station_id: _end_station_id,
            start_lat: _start_lat,
            start_lng: _start_lng,
            end_lat: _end_lat,
            end_lng: _end_lng,
            member_casual: _member_casual,
        }))
    }
}

impl<'raw> ::bebop::Record<'raw> for Trip<'raw> {}

#[derive(Clone, Debug, PartialEq, Default)]
pub struct ServerResponseAll<'raw> {
    /// Field 1
    pub trips: ::core::option::Option<::std::vec::Vec<Trip<'raw>>>,
}

impl<'raw> ::bebop::SubRecord<'raw> for ServerResponseAll<'raw> {
    const MIN_SERIALIZED_SIZE: usize = ::bebop::LEN_SIZE + 1;

    #[inline]
    fn serialized_size(&self) -> usize {
        ::bebop::LEN_SIZE + 1 +
        self.trips.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0)
    }

    ::bebop::define_serialize_chained!(Self => |zelf, dest| {
        let size = zelf.serialized_size();
        ::bebop::write_len(dest, size - ::bebop::LEN_SIZE)?;
        if let Some(ref v) = zelf.trips {
            1u8._serialize_chained(dest)?;
            v._serialize_chained(dest)?;
        }
        0u8._serialize_chained(dest)?;
        Ok(size)
    });

    fn _deserialize_chained(raw: &'raw [u8]) -> ::bebop::DeResult<(usize, Self)> {
        let mut i = 0;
        let len = ::bebop::read_len(&raw[i..])? + ::bebop::LEN_SIZE;
        i += ::bebop::LEN_SIZE;

        #[cfg(not(feature = "unchecked"))]
        if len == 0 {
            return Err(::bebop::DeserializeError::CorruptFrame);
        }

        if raw.len() < len {
            return Err(::bebop::DeserializeError::MoreDataExpected(len - raw.len()));
        }

        let mut _trips = None;

        #[cfg(not(feature = "unchecked"))]
        let mut last = 0;

        while i < len {
            let di = raw[i];

            #[cfg(not(feature = "unchecked"))]
            if di != 0 {
                if di < last {
                    return Err(::bebop::DeserializeError::CorruptFrame);
                }
                last = di;
            }

            i += 1;
            match di {
                0 => {
                    break;
                }
                1 => {
                    #[cfg(not(feature = "unchecked"))]
                    if _trips.is_some() {
                        return Err(::bebop::DeserializeError::DuplicateMessageField);
                    }
                    let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                    i += read;
                    _trips = Some(value)
                }
                _ => {
                    i = len;
                    break;
                }
            }
        }

        if i != len {
            debug_assert!(i > len);
            return Err(::bebop::DeserializeError::CorruptFrame)
        }

        Ok((i, Self {
            trips: _trips,
        }))
    }
}

impl<'raw> ::bebop::Record<'raw> for ServerResponseAll<'raw> {}

#[cfg(feature = "bebop-owned-all")]
pub mod owned {
    #![allow(warnings)]

    use ::std::io::Write as _;
    use ::core::convert::TryInto as _;
    use ::bebop::FixedSized as _;

    pub use super::RideableType;

    pub use super::MemberCasual;

    #[derive(Clone, Debug, PartialEq, Default)]
    pub struct Trip {
        /// Field 1
        pub ride_id: ::core::option::Option<String>,
        /// Field 2
        pub rideable_type: ::core::option::Option<RideableType>,
        /// Field 3
        pub started_at: ::core::option::Option<::bebop::Date>,
        /// Field 4
        pub ended_at: ::core::option::Option<::bebop::Date>,
        /// Field 5
        pub start_station_name: ::core::option::Option<String>,
        /// Field 6
        pub start_station_id: ::core::option::Option<String>,
        /// Field 7
        pub end_station_name: ::core::option::Option<String>,
        /// Field 8
        pub end_station_id: ::core::option::Option<String>,
        /// Field 9
        pub start_lat: ::core::option::Option<f64>,
        /// Field 10
        pub start_lng: ::core::option::Option<f64>,
        /// Field 11
        pub end_lat: ::core::option::Option<f64>,
        /// Field 12
        pub end_lng: ::core::option::Option<f64>,
        /// Field 13
        pub member_casual: ::core::option::Option<MemberCasual>,
    }

    impl<'raw> ::core::convert::From<super::Trip<'raw>> for Trip {
        fn from(value: super::Trip) -> Self {
            Self {
                ride_id: value.ride_id.map(|value| value.into()),
                rideable_type: value.rideable_type,
                started_at: value.started_at,
                ended_at: value.ended_at,
                start_station_name: value.start_station_name.map(|value| value.into()),
                start_station_id: value.start_station_id.map(|value| value.into()),
                end_station_name: value.end_station_name.map(|value| value.into()),
                end_station_id: value.end_station_id.map(|value| value.into()),
                start_lat: value.start_lat,
                start_lng: value.start_lng,
                end_lat: value.end_lat,
                end_lng: value.end_lng,
                member_casual: value.member_casual,
            }
        }
    }

    impl<'raw> ::bebop::SubRecord<'raw> for Trip {
        const MIN_SERIALIZED_SIZE: usize = ::bebop::LEN_SIZE + 1;

        #[inline]
        fn serialized_size(&self) -> usize {
            ::bebop::LEN_SIZE + 1 +
            self.ride_id.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.rideable_type.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.started_at.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.ended_at.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.start_station_name.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.start_station_id.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.end_station_name.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.end_station_id.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.start_lat.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.start_lng.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.end_lat.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.end_lng.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0) +
            self.member_casual.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0)
        }

        ::bebop::define_serialize_chained!(Self => |zelf, dest| {
            let size = zelf.serialized_size();
            ::bebop::write_len(dest, size - ::bebop::LEN_SIZE)?;
            if let Some(ref v) = zelf.ride_id {
                1u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.rideable_type {
                2u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.started_at {
                3u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.ended_at {
                4u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.start_station_name {
                5u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.start_station_id {
                6u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.end_station_name {
                7u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.end_station_id {
                8u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.start_lat {
                9u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.start_lng {
                10u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.end_lat {
                11u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.end_lng {
                12u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            if let Some(ref v) = zelf.member_casual {
                13u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            0u8._serialize_chained(dest)?;
            Ok(size)
        });

        fn _deserialize_chained(raw: &'raw [u8]) -> ::bebop::DeResult<(usize, Self)> {
            let mut i = 0;
            let len = ::bebop::read_len(&raw[i..])? + ::bebop::LEN_SIZE;
            i += ::bebop::LEN_SIZE;

            #[cfg(not(feature = "unchecked"))]
            if len == 0 {
                return Err(::bebop::DeserializeError::CorruptFrame);
            }

            if raw.len() < len {
                return Err(::bebop::DeserializeError::MoreDataExpected(len - raw.len()));
            }

            let mut _ride_id = None;
            let mut _rideable_type = None;
            let mut _started_at = None;
            let mut _ended_at = None;
            let mut _start_station_name = None;
            let mut _start_station_id = None;
            let mut _end_station_name = None;
            let mut _end_station_id = None;
            let mut _start_lat = None;
            let mut _start_lng = None;
            let mut _end_lat = None;
            let mut _end_lng = None;
            let mut _member_casual = None;

            #[cfg(not(feature = "unchecked"))]
            let mut last = 0;

            while i < len {
                let di = raw[i];

                #[cfg(not(feature = "unchecked"))]
                if di != 0 {
                    if di < last {
                        return Err(::bebop::DeserializeError::CorruptFrame);
                    }
                    last = di;
                }

                i += 1;
                match di {
                    0 => {
                        break;
                    }
                    1 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _ride_id.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _ride_id = Some(value)
                    }
                    2 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _rideable_type.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _rideable_type = Some(value)
                    }
                    3 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _started_at.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _started_at = Some(value)
                    }
                    4 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _ended_at.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _ended_at = Some(value)
                    }
                    5 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _start_station_name.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _start_station_name = Some(value)
                    }
                    6 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _start_station_id.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _start_station_id = Some(value)
                    }
                    7 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _end_station_name.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _end_station_name = Some(value)
                    }
                    8 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _end_station_id.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _end_station_id = Some(value)
                    }
                    9 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _start_lat.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _start_lat = Some(value)
                    }
                    10 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _start_lng.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _start_lng = Some(value)
                    }
                    11 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _end_lat.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _end_lat = Some(value)
                    }
                    12 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _end_lng.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _end_lng = Some(value)
                    }
                    13 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _member_casual.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _member_casual = Some(value)
                    }
                    _ => {
                        i = len;
                        break;
                    }
                }
            }

            if i != len {
                debug_assert!(i > len);
                return Err(::bebop::DeserializeError::CorruptFrame)
            }

            Ok((i, Self {
                ride_id: _ride_id,
                rideable_type: _rideable_type,
                started_at: _started_at,
                ended_at: _ended_at,
                start_station_name: _start_station_name,
                start_station_id: _start_station_id,
                end_station_name: _end_station_name,
                end_station_id: _end_station_id,
                start_lat: _start_lat,
                start_lng: _start_lng,
                end_lat: _end_lat,
                end_lng: _end_lng,
                member_casual: _member_casual,
            }))
        }
    }

    impl<'raw> ::bebop::Record<'raw> for Trip {}

    #[derive(Clone, Debug, PartialEq, Default)]
    pub struct ServerResponseAll {
        /// Field 1
        pub trips: ::core::option::Option<::std::vec::Vec<Trip>>,
    }

    impl<'raw> ::core::convert::From<super::ServerResponseAll<'raw>> for ServerResponseAll {
        fn from(value: super::ServerResponseAll) -> Self {
            Self {
                trips: value.trips.map(|value| value.into_iter().map(|value| value.into()).collect()),
            }
        }
    }

    impl<'raw> ::bebop::SubRecord<'raw> for ServerResponseAll {
        const MIN_SERIALIZED_SIZE: usize = ::bebop::LEN_SIZE + 1;

        #[inline]
        fn serialized_size(&self) -> usize {
            ::bebop::LEN_SIZE + 1 +
            self.trips.as_ref().map(|v| v.serialized_size() + 1).unwrap_or(0)
        }

        ::bebop::define_serialize_chained!(Self => |zelf, dest| {
            let size = zelf.serialized_size();
            ::bebop::write_len(dest, size - ::bebop::LEN_SIZE)?;
            if let Some(ref v) = zelf.trips {
                1u8._serialize_chained(dest)?;
                v._serialize_chained(dest)?;
            }
            0u8._serialize_chained(dest)?;
            Ok(size)
        });

        fn _deserialize_chained(raw: &'raw [u8]) -> ::bebop::DeResult<(usize, Self)> {
            let mut i = 0;
            let len = ::bebop::read_len(&raw[i..])? + ::bebop::LEN_SIZE;
            i += ::bebop::LEN_SIZE;

            #[cfg(not(feature = "unchecked"))]
            if len == 0 {
                return Err(::bebop::DeserializeError::CorruptFrame);
            }

            if raw.len() < len {
                return Err(::bebop::DeserializeError::MoreDataExpected(len - raw.len()));
            }

            let mut _trips = None;

            #[cfg(not(feature = "unchecked"))]
            let mut last = 0;

            while i < len {
                let di = raw[i];

                #[cfg(not(feature = "unchecked"))]
                if di != 0 {
                    if di < last {
                        return Err(::bebop::DeserializeError::CorruptFrame);
                    }
                    last = di;
                }

                i += 1;
                match di {
                    0 => {
                        break;
                    }
                    1 => {
                        #[cfg(not(feature = "unchecked"))]
                        if _trips.is_some() {
                            return Err(::bebop::DeserializeError::DuplicateMessageField);
                        }
                        let (read, value) = ::bebop::SubRecord::_deserialize_chained(&raw[i..])?;
                        i += read;
                        _trips = Some(value)
                    }
                    _ => {
                        i = len;
                        break;
                    }
                }
            }

            if i != len {
                debug_assert!(i > len);
                return Err(::bebop::DeserializeError::CorruptFrame)
            }

            Ok((i, Self {
                trips: _trips,
            }))
        }
    }

    impl<'raw> ::bebop::Record<'raw> for ServerResponseAll {}}
