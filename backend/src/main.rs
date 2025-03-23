use axum::{
    body::{Body, BodyDataStream},
    extract::State,
    http::{Request, StatusCode},
    middleware,
    response::Response,
    routing::get,
    Router,
};
use axum_server::tls_rustls::RustlsConfig;
use bebop::Record;
use bytes::Buf;
use prost::Message;
use serde::Serialize;

use crate::trip::Trip;
use std::{
    convert::Infallible,
    fs,
    io::{Cursor, Read, Write},
    net::SocketAddr,
    sync::Arc,
    time::Instant,
};

pub mod load_data;
pub mod trip;

pub mod generated;
use generated::trip::{ServerResponseAll as BebopServerResponseAll, Trip as BebopTrip};

pub mod trip_flatbuffer;

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
    let bebop_trips = state.data.iter().map(BebopTrip::from).collect();
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
        trip.start_station_name.as_ref().map(|start_station_name| {
            trip_builder.set_start_station_name(start_station_name);
        });
        trip.start_station_id.as_ref().map(|start_station_id| {
            trip_builder.set_start_station_id(start_station_id);
        });
        trip.end_station_name.as_ref().map(|end_station_name| {
            trip_builder.set_end_station_name(end_station_name);
        });
        trip.end_station_id.as_ref().map(|end_station_id| {
            trip_builder.set_end_station_id(end_station_id);
        });
        trip.start_lat
            .map(|start_lat| trip_builder.set_start_lat(start_lat));
        trip.start_lng
            .map(|start_lng| trip_builder.set_start_lng(start_lng));
        trip.end_lat
            .map(|end_lat| trip_builder.set_end_lat(end_lat));
        trip.end_lng
            .map(|end_lng| trip_builder.set_end_lng(end_lng));
        trip.start_lng
            .map(|start_lng| trip_builder.set_start_lng(start_lng));
        trip.end_lng
            .map(|end_lng| trip_builder.set_end_lng(end_lng));
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

async fn flatbuffer_serialize_all(state: State<Arc<AppState>>) -> Response {
    let encode_start = Instant::now();
    let mut fbb = flatbuffers::FlatBufferBuilder::new();
    let mut trip_offsets = Vec::with_capacity(state.data.len());
    for trip in state.data.iter() {
        let start_station_id = trip
            .start_station_id
            .as_ref()
            .map(|id| fbb.create_string(&id));
        let end_station_id = trip
            .end_station_id
            .as_ref()
            .map(|id| fbb.create_string(&id));
        let start_station_name = trip
            .start_station_name
            .as_ref()
            .map(|name| fbb.create_string(&name));
        let end_station_name = trip
            .end_station_name
            .as_ref()
            .map(|name| fbb.create_string(&name));
        let ride_id = fbb.create_string(&trip.ride_id);
        let trip_offset = {
            let mut trip_builder = trip_flatbuffer::trip::TripBuilder::new(&mut fbb);
            trip_builder.add_ride_id(ride_id);
            trip_builder.add_rideable_type((&trip.rideable_type).into());
            trip_builder.add_started_at_ms(trip.started_at.timestamp_millis());
            trip_builder.add_ended_at_ms(trip.ended_at.timestamp_millis());
            start_station_id.map(|id| trip_builder.add_start_station_id(id));
            end_station_id.map(|id| trip_builder.add_end_station_id(id));
            start_station_name.map(|name| trip_builder.add_start_station_name(name));
            end_station_name.map(|name| trip_builder.add_end_station_name(name));
            trip_builder.add_start_lat(trip.start_lat.unwrap_or(0.0));
            trip_builder.add_start_lng(trip.start_lng.unwrap_or(0.0));
            trip_builder.add_end_lat(trip.end_lat.unwrap_or(0.0));
            trip_builder.add_end_lng(trip.end_lng.unwrap_or(0.0));
            trip_builder.add_member_casual((&trip.member_casual).into());
            trip_builder.finish()
        };
        trip_offsets.push(trip_offset);
    }
    let vector = fbb.create_vector(&trip_offsets);

    let server_response_all = trip_flatbuffer::trip::ServerResponseAll::create(
        &mut fbb,
        &trip_flatbuffer::trip::ServerResponseAllArgs {
            trips: Some(vector),
        },
    );
    fbb.finish(server_response_all, None);
    // Extra copy but whatever.
    let data = Vec::from(fbb.finished_data());

    let encode_duration = encode_start.elapsed();

    Response::builder()
        .status(StatusCode::OK)
        .header("X-Encode-Duration", encode_duration.as_millis().to_string())
        .body(Body::from(data))
        .unwrap()
}

async fn avro_serialize_all(state: State<Arc<AppState>>) -> Response {
    let schema_str = fs::read_to_string("../schemas/trip.avsc").unwrap();
    let schema: serde_avro_fast::Schema = schema_str.parse().unwrap();
    let start_time = Instant::now();

    let server_response_all = ServerResponseAll { trips: &state.data };
    let data = serde_avro_fast::to_datum_vec(
        &server_response_all,
        &mut serde_avro_fast::ser::SerializerConfig::new(&schema),
    )
    .unwrap();

    Response::builder()
        .status(StatusCode::OK)
        .header(
            "X-Encode-Duration",
            start_time.elapsed().as_millis().to_string(),
        )
        .body(Body::from(data))
        .unwrap()
}

async fn add_headers(
    req: Request<Body>,
    next: middleware::Next,
) -> Result<Response<Body>, Infallible> {
    let mut response = next.run(req).await;
    // This mumbo-jumbo is required for the browser to allow us to use high precision timers.
    response
        .headers_mut()
        .insert("Cross-Origin-Opener-Policy", "same-origin".parse().unwrap());
    response.headers_mut().insert(
        "Cross-Origin-Embedder-Policy",
        "require-corp".parse().unwrap(),
    );

    Ok(response)
}

struct SwappableWriter {
    underlying: Vec<u8>,
}

impl Write for SwappableWriter {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        self.underlying.write(buf)
    }

    fn flush(&mut self) -> std::io::Result<()> {
        self.underlying.flush()
    }
}

impl SwappableWriter {
    fn take(&mut self) -> Vec<u8> {
        std::mem::take(&mut self.underlying)
    }
}

struct ZstdStream<'a> {
    encoder: zstd::stream::Encoder<'a, SwappableWriter>,
    underlying_body_stream: BodyDataStream,
    buffered_data: Option<Cursor<bytes::Bytes>>,
    stream_finished: bool,
}

use futures::{
    stream::Stream,
    task::{Context, Poll},
    StreamExt,
};
use std::pin::Pin;

impl ZstdStream<'_> {
    fn new(underlying_body_stream: BodyDataStream) -> Self {
        let encoder = zstd::stream::Encoder::new(
            SwappableWriter {
                underlying: Vec::new(),
            },
            3,
        )
        .unwrap();
        ZstdStream {
            encoder,
            underlying_body_stream,
            stream_finished: false,
            buffered_data: None,
        }
    }
}

impl Stream for ZstdStream<'_> {
    type Item = Result<Vec<u8>, axum::Error>;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        if self.stream_finished {
            return Poll::Ready(None);
        }

        if let Some(buffered_data) = &mut self.buffered_data {
            if !buffered_data.has_remaining() {
                self.buffered_data = None;
            } else {
                let mut chunk = [0; 10240];
                let read = buffered_data.read(&mut chunk).unwrap();
                self.encoder.write_all(&chunk[..read]).unwrap();
                let buffer = self.encoder.get_mut().take();
                return Poll::Ready(Some(Ok(buffer)));
            }
        }

        match self.underlying_body_stream.poll_next_unpin(cx) {
            Poll::Pending => Poll::Pending,
            Poll::Ready(None) => match self.encoder.do_finish() {
                Ok(_) => {
                    self.stream_finished = true;
                    Poll::Ready(Some(Ok(self.encoder.get_mut().take())))
                }
                Err(e) => Poll::Ready(Some(Err(axum::Error::new(e)))),
            },
            Poll::Ready(Some(Ok(chunk))) => {
                self.buffered_data = Some(Cursor::new(chunk));
                self.poll_next(cx)
            }
            Poll::Ready(Some(Err(e))) => Poll::Ready(Some(Err(e))),
        }
    }
}

async fn zstd_if_requested(
    req: Request<Body>,
    next: middleware::Next,
) -> Result<Response<Body>, Infallible> {
    let compression_requested = req
        .headers()
        .get("X-Zstd-Enabled")
        .is_some_and(|value| value == "true");
    let response = next.run(req).await;
    if !compression_requested {
        return Ok(response);
    }

    let (head, body) = response.into_parts();
    let body_bytes = body.into_data_stream();
    let zstd_stream = ZstdStream::new(body_bytes);

    let mut final_response = Response::from_parts(head, Body::from_stream(zstd_stream));

    final_response
        .headers_mut()
        .insert("Content-Encoding", "zstd".parse().unwrap());
    Ok(final_response)
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
    env_logger::init();
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
        .route("/flatbuffers", get(flatbuffer_serialize_all))
        .route("/avro", get(avro_serialize_all))
        .layer(middleware::from_fn(add_headers))
        .layer(middleware::from_fn(log_request_stats))
        .layer(middleware::from_fn(zstd_if_requested))
        .with_state(shared_state);

    rustls::crypto::ring::default_provider()
        .install_default()
        .unwrap();

    // configure certificate and private key used by https
    let config = RustlsConfig::from_pem_file(
        "../self_signed_cert/localhost.crt",
        "../self_signed_cert/localhost.key",
    )
    .await
    .unwrap();

    // run https server

    print!("Listening on 0.0.0.0:3000");
    axum_server::bind_rustls(SocketAddr::from(([0, 0, 0, 0], 3000)), config)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
