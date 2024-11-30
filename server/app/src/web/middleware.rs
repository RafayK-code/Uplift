use axum::{
    extract::State, middleware::Next, response::Response
};
use jsonwebtoken::{decode, decode_header, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::fs;

use crate::{db::database, error::{UpliftError, UpliftResult}};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

// Middleware to validate JWT for every request
pub async fn validate_jwt_middleware<B>(State(pool): State<PgPool>, mut req: axum::http::Request<B>, next: Next<B>) -> UpliftResult<Response> {
    match jwt_from_header(&req).await {
        Ok(token) => {
            match validate_jwt(&token) {
                Ok(claims) => {
                    let exists = database::user_exists(&pool, claims.sub.to_owned()).await.map_err(|_| UpliftError::AuthFail)?;
                    if !exists {
                        database::insert_user(&pool, claims.sub.to_owned()).await.map_err(|_| UpliftError::AuthFail)?;
                    }
                    req.extensions_mut().insert(claims.sub);
                    Ok(next.run(req).await)
                },
                Err(e) => Err(e)
            }
        }
        Err(e) => Err(e)
    }
}

const PUBLIC_KEY_PATH: &str = "dev-rg785djdlhv8xukf.pem";

// Load the public key from the PEM file
fn load_public_key() -> UpliftResult<DecodingKey> {
    let public_key_pem = fs::read_to_string(PUBLIC_KEY_PATH)
        .map_err(|_| UpliftError::AuthFail)?;
    
    let public_key = DecodingKey::from_rsa_pem(public_key_pem.as_bytes())
        .map_err(|_| UpliftError::AuthFail)?;
    Ok(public_key)
}

// Validate JWT using the loaded public key
fn validate_jwt(token: &str) -> UpliftResult<Claims> {
    let header = decode_header(token)
        .map_err(|_| UpliftError::AuthFail)?;
    let _kid = header.kid
        .ok_or_else(|| UpliftError::AuthFail)?;
    // Load the public key from PEM file
    let public_key = load_public_key()?;
    // Validate JWT with the public key and RS256 algorithm
    let mut validation = Validation::new(Algorithm::RS256);
    validation.set_audience(&["http://localhost:8080/", "https://dev-rg785djdlhv8xukf.ca.auth0.com/userinfo"]);
    validation.set_issuer(&["https://dev-rg785djdlhv8xukf.ca.auth0.com/"]);
    let decoded = decode::<Claims>(
        token,
        &public_key,
        &validation,
    )
    .map_err(|_| UpliftError::AuthFail)?;
    Ok(decoded.claims)
}

// Extract JWT from the Authorization header
async fn jwt_from_header<B>(req: &axum::http::Request<B>) -> UpliftResult<String> {
    if let Some(auth_header) = req.headers().get("Authorization") {
        if let Ok(auth_value) = auth_header.to_str() {
            if auth_value.starts_with("Bearer ") {
                return Ok(auth_value[7..].to_string());
            }
        }
    }
    Err(UpliftError::AuthFail)
}