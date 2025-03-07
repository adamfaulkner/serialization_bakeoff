use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware,
    response::Response,
    routing::get,
    Router,
};
use bebop::Record;
use prost::Message;
use serde::Serialize;
use tokio::net::TcpListener;

use crate::trip::Trip;
use std::{convert::Infallible, sync::Arc, time::Instant};

pub mod load_data;
pub mod trip;

pub mod generated;
use generated::trip::{ServerResponseAll as BebopServerResponseAll, Trip as BebopTrip};

pub mod trip_protobuf {
    include!(concat!(env!("OUT_DIR"), "/trip_protobuf.rs"));
}

pub mod trip_capnp {
    include!(concat!(env!("OUT_DIR"), "/trip_capnp.rs"));
}

// TODO: eventually we want to serialize streams as well; the all suffix here means we serialize all trips at once
#[derive(Serialize)]
struct ServerResponseAll<'a> {
    trips: &'a [Trip],
}

#[derive(Clone)]
struct AppState {
    data: Vec<Trip>,
}

async fn json_serialize_all(state: State<Arc<AppState>>) -> Response {
    // Remove this clone
    let response = ServerResponseAll { trips: &state.data };
    let encode_start = Instant::now();
    let encoded_response = serde_json::to_vec(&response).unwrap();
    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(encoded_response))
        .unwrap()
}

async fn proto_serialize_all(state: State<Arc<AppState>>) -> Response {
    // It only seems fair to include the conversion from Trip to trip_protobuf::Trip
    let encode_start = Instant::now();
    let trips = state.data.iter().map(|trip| trip.into()).collect();
    let response = trip_protobuf::ServerResponseAll { trips };
    let encoded_response = response.encode_to_vec();
    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(encoded_response))
        .unwrap()
}

// TODO: see if we can find a way to avoid having all the names in the serialized response for this
// and cbor.
async fn rmp_serialize_all(state: State<Arc<AppState>>) -> Response {
    let encode_start = Instant::now();
    let response = ServerResponseAll { trips: &state.data };
    let encoded_response = rmp_serde::to_vec_named(&response).unwrap();
    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(encoded_response))
        .unwrap()
}

async fn cbor_serialize_all(state: State<Arc<AppState>>) -> Response {
    let encode_start = Instant::now();
    let response = ServerResponseAll { trips: &state.data };
    let mut writer = Vec::new();
    ciborium::ser::into_writer(&response, &mut writer).unwrap();
    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(writer))
        .unwrap()
}

async fn bebop_serialize_all(state: State<Arc<AppState>>) -> Response {
    let encode_start = Instant::now();
    let bebop_trips = state
        .data
        .iter()
        .map(|trip| BebopTrip::from(trip))
        .collect();
    let response = BebopServerResponseAll {
        trips: Some(bebop_trips),
    };
    let mut writer = Vec::new();
    response.serialize(&mut writer).unwrap();
    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(writer))
        .unwrap()
}

async fn capnp_serialize_all(state: State<Arc<AppState>>) -> Response {
    let encode_start = Instant::now();
    let mut builder = capnp::message::Builder::new_default();
    let server_response_all = builder.init_root::<trip_capnp::server_response_all::Builder>();
    let mut trips_list = server_response_all.init_trips(state.data.len() as u32);
    for (i, trip) in state.data.iter().enumerate() {
        let mut trip_builder = trips_list.reborrow().get(i as u32);
        trip_builder.set_ride_id(&trip.ride_id);
        let rt: trip_capnp::RideableType = (&trip.rideable_type).into();
        trip_builder.set_rideable_type(rt);
        trip_builder.set_started_at_ms(trip.started_at.timestamp_millis());
        trip_builder.set_ended_at_ms(trip.ended_at.timestamp_millis());
        trip_builder.set_start_station_name(trip.start_station_name.clone());
        trip_builder.set_start_station_id(trip.start_station_id.clone());
        trip_builder.set_end_station_name(trip.end_station_name.clone());
        trip_builder.set_end_station_id(trip.end_station_id.clone());
        trip_builder.set_start_lat(trip.start_lat.unwrap_or(0.0));
        trip_builder.set_start_lng(trip.start_lng.unwrap_or(0.0));
        trip_builder.set_end_lat(trip.end_lat.unwrap_or(0.0));
        trip_builder.set_end_lng(trip.end_lng.unwrap_or(0.0));
        trip_builder.set_member_casual(Into::<trip_capnp::MemberCasual>::into(&trip.member_casual));
    }

    let data = capnp::serialize::write_message_to_words(&builder);
    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(data))
        .unwrap()
}

async fn add_headers(
    req: Request<Body>,
    next: middleware::Next,
) -> Result<Response<Body>, Infallible> {
    let mut response = next.run(req).await;
    response
        .headers_mut()
        .insert("Cross-Origin-Opener-Policy", "same-origin".parse().unwrap());
    response.headers_mut().insert(
        "Cross-Origin-Embedder-Policy",
        "require-corp".parse().unwrap(),
    );
    response
        .headers_mut()
        .insert("Connection", "keep-alive".parse().unwrap());
    response
        .headers_mut()
        .insert("Keep-Alive", "timeout=5, max=100".parse().unwrap());

    Ok(response)
}

async fn log_request_stats(
    req: Request<Body>,
    next: middleware::Next,
) -> Result<Response<Body>, Infallible> {
    let path = req.uri().path().to_string();
    let start = std::time::Instant::now();
    let response = next.run(req).await;
    let elapsed = start.elapsed();
    println!("{} Request duration: {:?}", path, elapsed);
    Ok(response)
}

#[tokio::main]
async fn main() {
    let start = std::time::Instant::now();
    let data: Vec<Trip> = load_data::load_data().unwrap();
    println!("Loaded {} trips", data.len());
    let elapsed = start.elapsed();
    println!("Elapsed time: {:?}", elapsed);
    let shared_state = Arc::new(AppState { data });

    let app: Router<()> = Router::new()
        .nest_service(
            "/index.html",
            tower_http::services::ServeFile::new("../frontend/index.html"),
        )
        .nest_service(
            "/dist/",
            tower_http::services::ServeDir::new("../frontend/dist"),
        )
        .route("/json", get(json_serialize_all))
        .route("/proto", get(proto_serialize_all))
        .route("/msgpack", get(rmp_serialize_all))
        .route("/cbor", get(cbor_serialize_all))
        .route("/bebop", get(bebop_serialize_all))
        .route("/capnp", get(capnp_serialize_all))
        .layer(middleware::from_fn(add_headers))
        .layer(middleware::from_fn(log_request_stats))
        .with_state(shared_state);

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    print!("Listening on 0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
