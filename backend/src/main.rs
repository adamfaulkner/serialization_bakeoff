use axum::{
    body::Body,
    debug_handler,
    extract::State,
    http::{Request, StatusCode},
    middleware,
    response::Response,
    routing::get,
    Router,
};
use serde::Serialize;
use tokio::net::TcpListener;

use crate::trip::Trip;
use std::{
    convert::Infallible,
    error::Error,
    net::{IpAddr, Ipv4Addr, SocketAddr},
    sync::Arc,
};

pub mod load_data;
pub mod trip;

// TODO: eventually we want to serialize streams as well; the all suffix here means we serialize all trips at once
#[derive(Serialize)]
struct ServerResponseAll {
    trips: Vec<Trip>,
}

#[derive(Clone)]
struct AppState {
    data: Vec<Trip>,
}

async fn json_serialize_all(state: State<Arc<AppState>>) -> Response {
    // Remove this clone
    let response = ServerResponseAll {
        trips: state.data.clone(),
    };
    Response::builder()
        .status(StatusCode::OK)
        .body(Body::from(serde_json::to_vec(&response).unwrap()))
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
        .fallback_service(tower_http::services::ServeFile::new(
            "../frontend/index.html",
        ))
        .nest_service(
            "/code.js",
            tower_http::services::ServeFile::new("../frontend/code.js"),
        )
        .route("/json/all", get(json_serialize_all))
        .layer(middleware::from_fn(add_headers))
        .with_state(shared_state);

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    print!("Listening on 0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
