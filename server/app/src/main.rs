use axum::{routing::get, middleware, Router};
use db::database;
use dotenv::dotenv;
use dummy::create_dummy_jwt;
use logger::LogLevel;
use web::middleware::jwt_auth;

async fn handler() -> &'static str {
    "go away"
}

pub mod logger;
pub mod error;
pub mod db;
pub mod web;
pub mod dummy;

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

    log_msg!("MAIN", LogLevel::Info, "Dummy token: {}", create_dummy_jwt());

    let app = Router::new()
        .route("/", get(handler))
        .layer(middleware::from_fn(jwt_auth));

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 8080));
    log_msg!("MAIN", LogLevel::Info, "Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
