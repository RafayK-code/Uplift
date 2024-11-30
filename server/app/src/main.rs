use axum::{routing::get, Router};
use db::database;
use dotenv::dotenv;
use logger::LogLevel;

async fn handler() -> &'static str {
    "go away"
}

pub mod logger;
pub mod db;

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

    let app = Router::new()
        .route("/", get(handler));

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 8080));
    log_msg!("MAIN", LogLevel::Info, "Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
