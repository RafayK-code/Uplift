use axum::{routing::get, Router};
use logger::LogLevel;

async fn handler() -> &'static str {
    "go away"
}

pub mod logger;

#[tokio::main]
async fn main() {
    
    let app = Router::new()
        .route("/", get(handler));

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 8080));
    log_msg!("MAIN", LogLevel::Info, "Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
