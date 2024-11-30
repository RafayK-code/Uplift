use axum::{
    async_trait,
    extract::{FromRequest, FromRequestParts},
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    middleware::{self, Next},
    Router,
    routing::get,
};
use jsonwebtoken::{decode, decode_header, DecodingKey, Validation, Algorithm};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::fs;
use std::sync::Arc;
use axum::middleware::from_fn;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
    // Add other fields based on your needs
}

#[derive(Debug)]
pub struct AuthError(pub String);

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        (StatusCode::UNAUTHORIZED, self.0).into_response()
    }
}

#[derive(Clone)]
pub struct JwtMiddleware {
    pub public_key_path: String,  // Path to the PEM file with the public key
}

impl JwtMiddleware {
    // Load the public key from the PEM file
    pub fn load_public_key(&self) -> Result<DecodingKey, AuthError> {
        let public_key_pem = fs::read_to_string(&self.public_key_path)
            .map_err(|e| AuthError(format!("Failed to read PEM file: {}", e)))?;
        
        let public_key = DecodingKey::from_rsa_pem(public_key_pem.as_bytes())
            .map_err(|e| AuthError(format!("Failed to parse PEM public key: {}", e)))?;

        Ok(public_key)
    }

    // Validate JWT using the loaded public key
    pub fn validate_jwt(&self, token: &str) -> Result<Claims, AuthError> {
        // Decode the JWT header to get the 'kid'
        let header = decode_header(token)
            .map_err(|e| AuthError(format!("Failed to decode JWT header: {}", e)))?;

        let _kid = header.kid
            .ok_or_else(|| AuthError("No 'kid' in JWT header".to_string()))?;

        // Load the public key from PEM file
        let public_key = self.load_public_key()?;

        // Validate JWT with the public key and RS256 algorithm
        let mut validation = Validation::new(Algorithm::RS256);
        validation.set_audience(&["http://localhost:8080/", "https://dev-rg785djdlhv8xukf.ca.auth0.com/userinfo"]);
        validation.set_issuer(&["https://dev-rg785djdlhv8xukf.ca.auth0.com/"]);

        let decoded = decode::<Claims>(
            token,
            &public_key,
            &validation,
        )
        .map_err(|e| AuthError(format!("JWT validation failed: {}", e)))?;

        Ok(decoded.claims)
    }
}

// Extract JWT from the Authorization header
async fn jwt_from_header<B>(req: &axum::http::Request<B>) -> Result<String, AuthError> {
    if let Some(auth_header) = req.headers().get("Authorization") {
        if let Ok(auth_value) = auth_header.to_str() {
            if auth_value.starts_with("Bearer ") {
                return Ok(auth_value[7..].to_string());
            }
        }
    }
    Err(AuthError("Authorization header missing or invalid".to_string()))
}

// Middleware to validate JWT for every request
pub async fn validate_jwt_middleware<B>(req: axum::http::Request<B>, jwt_middleware: JwtMiddleware, next: Next<B>) -> impl IntoResponse {
    match jwt_from_header(&req).await {
        Ok(token) => {
            match jwt_middleware.validate_jwt(&token) {
                Ok(_) => next.run(req).await,
                Err(e) => (StatusCode::UNAUTHORIZED, e.0).into_response(),
            }
        }
        Err(e) => (StatusCode::UNAUTHORIZED, e.0).into_response(),
    }
}