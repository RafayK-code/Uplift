use axum::{
    async_trait, extract::{FromRequest, FromRequestParts}, http::{HeaderMap, Request, StatusCode}, middleware::Next, response::{IntoResponse, Response}
};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm, TokenData};
use serde::{Serialize, Deserialize};
use crate::{error::{UpliftError, UpliftResult}, log_msg, logger::LogLevel};  // Import your custom error handling

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String,  // Subject claim (the user id or whatever)
    aud: String,  // Audience claim (your API or service name)
    iss: String,  // Issuer claim (your Auth0 URL)
    exp: usize,   // Expiration time
}

pub async fn jwt_auth<B>(req: Request<B>, next: Next<B>) -> UpliftResult<Response> {
    // Extract the authorization header
    let auth_header = req
        .headers()
        .get("Authorization")
        .ok_or(UpliftError::AuthFail)? // If no Authorization header, return AuthFail
        .to_str()
        .map_err(|_| UpliftError::AuthFail)?;

    log_msg!("MIDDLEWARE", LogLevel::Info, "valid authorization header");

    // Ensure the header starts with "Bearer "
    if !auth_header.starts_with("Bearer ") {
        log_msg!("MIDDLEWARE", LogLevel::Error, "no bearer token");
        return Err(UpliftError::AuthFail);
    }

    // Extract the token part
    let token = auth_header.trim_start_matches("Bearer ").to_string();

    // Validate the token (we'll use HS256 with your Auth0 secret)
    validate_jwt(&token).await?;

    // Continue with the request handling if the token is valid
    Ok(next.run(req).await)
}

// Helper function to validate the JWT
async fn validate_jwt(token: &str) -> UpliftResult<()> {
    let secret = b"laQ8yy91qF3qiks8pSBktVLOUxmomQwqIhUsA-pCwviRb4hnnQXVYPR2bV1MnYGw";  // Replace with your actual Auth0 client secret

    // Set up validation with HS256 (your Auth0 signing algorithm)
    let mut validation = Validation::new(Algorithm::HS256);
    validation.set_audience(&["http://localhost:8080/"]);
    validation.set_issuer(&["https://dev-rg785djdlhv8xukf.ca.auth0.com/"]);

    // Decode and validate the token using the secret (HS256)
    let result  = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret),
        &validation,
    );  // If decoding fails, return AuthFail

    match result {
        Ok(_) => (),
        Err(err) => {
            log_msg!("MIDDLEWARE", LogLevel::Error, "Could not decode JWT: {:?}", err);
            return Err(UpliftError::AuthFail);
        }
    }

    // If decoding is successful, everything is good, return Ok
    Ok(())
}
