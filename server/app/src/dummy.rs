use chrono::{Duration, Utc};
use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    aud: String,
    iss: String,
    exp: usize,
}

pub fn create_dummy_jwt() -> String {

    let claims = Claims {
        sub: "user123".to_string(),     // Example subject
        aud: "http://localhost:8080/".to_string(),    // Audience: could be your API's name
        iss: "https://dev-rg785djdlhv8xukf.ca.auth0.com/".to_string(),  // Issuer: your Auth0 URL or your service URL
        exp: (Utc::now() + Duration::hours(1)).timestamp() as usize, // Set expiration (1 hour from now)
    };

    // Create the header and specify the algorithm (HS256)
    let header = Header::default();

    // Encode the JWT with your secret key (HS256 algorithm)
    let secret = b"laQ8yy91qF3qiks8pSBktVLOUxmomQwqIhUsA-pCwviRb4hnnQXVYPR2bV1MnYGw";  // Replace with your actual secret
    let token = encode(&header, &claims, &EncodingKey::from_secret(secret))
        .expect("Failed to encode JWT");

    token
}

