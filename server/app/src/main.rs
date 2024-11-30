use axum::{body::Body, extract::State, http::StatusCode, middleware::{self, Next}, response::IntoResponse, routing::get, Router};
use db::database;
use dotenv::dotenv;
use logger::LogLevel;
use web::middleware::validate_jwt_middleware;

async fn handler() -> &'static str {
    "go away"
}

pub mod logger;
pub mod error;
pub mod db;
pub mod web;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let pool_result = database::create_pool().await;

    let pool = match pool_result {
        Ok(pool) => {
            log_msg!("MAIN", LogLevel::Info, "Connection to database succsessful");
            pool
        }
        Err(err) => {
            log_msg!("MAIN", LogLevel::Crit, "Failed to connect to the database! {:?}", err);
            std::process::exit(1);
        }
    };

    // Create an Axum router with the JWT validation middleware
    let app = Router::new()
        .route("/", get(handler))
        .layer(axum::middleware::from_fn_with_state(pool.clone(), validate_jwt_middleware));

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 8080));
    log_msg!("MAIN", LogLevel::Info, "Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
