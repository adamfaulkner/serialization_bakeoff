use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware,
    response::Response,
    routing::get,
    Router,
};
use prost::Message;
use serde::Serialize;
use tokio::net::TcpListener;

use crate::trip::Trip;
use std::{convert::Infallible, sync::Arc, time::Instant};

pub mod load_data;
pub mod trip;

pub mod trip_protobuf {
    include!(concat!(env!("OUT_DIR"), "/trip_protobuf.rs"));
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
        .layer(middleware::from_fn(add_headers))
        .layer(middleware::from_fn(log_request_stats))
        .with_state(shared_state);

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    print!("Listening on 0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
