use axum::{body::Body, http::StatusCode, middleware::{self, Next}, response::IntoResponse, routing::get, Router};
use db::database;
use dotenv::dotenv;
use dummy::create_dummy_jwt;
use logger::LogLevel;
use web::middleware::{validate_jwt_middleware, JwtMiddleware};

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

    let public_key_path = "dev-rg785djdlhv8xukf.pem".to_string();

    let jwt_middleware = JwtMiddleware {
        public_key_path,
    };

    // Create an Axum router with the JWT validation middleware
    let app = Router::new()
        .route("/", get(handler))
        .layer(axum::middleware::from_fn(move |req, next| {
            let jwt_middleware = jwt_middleware.clone();
            async move {
                validate_jwt_middleware(req, jwt_middleware, next).await
            }
        }));

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 8080));
    log_msg!("MAIN", LogLevel::Info, "Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
