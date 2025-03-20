@0xea5a8c37a1dc24de;

enum RideableType {
  unknownRideableType @0;
  electricBike @1;
  classicBike @2;
}

enum MemberCasual {
  unknownMemberCasual @0;
  member @1;
  casual @2;
}

# The header row of the csv is:
# "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
struct Trip {
    rideId @0 :Text;
    rideableType @1 :RideableType;
    startedAtMs @2 :Int64;
    endedAtMs @3 :Int64;
    startStationName @4 :Text;
    startStationId @5 :Text;
    endStationName @6 :Text;
    endStationId @7 :Text;
    startLat @8 :Float64;
    startLng @9 :Float64;
    endLat @10 :Float64;
    endLng @11 :Float64;
    memberCasual @12 :MemberCasual;
}

struct ServerResponseAll {
    trips @0 :List(Trip);
}
