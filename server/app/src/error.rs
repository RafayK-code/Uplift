use axum::{http::StatusCode, response::{IntoResponse, Response}};

use crate::{log_msg, logger::LogLevel};

pub type UpliftResult<T> = core::result::Result<T, UpliftError>;

#[derive(Debug, PartialEq)]
pub enum UpliftError {
    AuthFail,
}

impl std::fmt::Display for UpliftError {
    fn fmt(&self, fmt: &mut std::fmt::Formatter) -> core::result::Result<(), core::fmt::Error> {
        write!(fmt, "{self:?}")
    }
}

impl std::error::Error for UpliftError {}

impl IntoResponse for UpliftError {
    fn into_response(self) -> Response {
        log_msg!("INTO_RES", LogLevel::Error, "{self:?}");

        let (status, message) = match self {
            UpliftError::AuthFail => (StatusCode::UNAUTHORIZED, "UNHANDLED_CLIENT_ERROR"),
            _ => (StatusCode::INTERNAL_SERVER_ERROR, "UNHANDLED_CLIENT_ERROR")
        };

        (status, message).into_response()
    }
}