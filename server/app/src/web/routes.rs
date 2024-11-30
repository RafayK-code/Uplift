use axum::{extract::State, routing::{get, post}, Extension, Json, Router};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::{PgPool, Pool, Postgres};

use crate::{db::database, error::{UpliftResult, UpliftError}, log_msg, logger::LogLevel};


pub fn routes(pool: Pool<Postgres>) -> Router {
    Router::new()
        .route("/store_generated_affirmation", post(store_generated_affirmation))
        .route("/get_user_streak", get(get_user_streak))
        .with_state(pool)
}

pub async fn store_generated_affirmation(
    State(pool): State<PgPool>,
    Extension(sub): Extension<String>,
    Json(payload): Json<GeneratedAffirmationPayload>
) -> UpliftResult<Json<Value>> {
    log_msg!("HANDLER", LogLevel::Info, "store_generated_affirmation");
    
    let insert_result = database::insert_generated_affirmation(&pool, &sub, &payload.content, &payload.created_at).await;

    match insert_result {
        Ok(_) => (),
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to insert affirmation in database: {:?}", err);
            return Err(UpliftError::AffirmationInsertFail);
        }
    }

    let body = Json(json!({
        "result": {
            "success": true
        }
    }));

    Ok(body)
}

pub async fn get_user_streak(State(pool): State<PgPool>, Extension(sub): Extension<String>) -> UpliftResult<Json<StreakResponse>> {
    log_msg!("HANDLER", LogLevel::Info, "get_user_streak");

    let get_result = database::get_user_streak(&pool, &sub).await;
    let user_streaks_db = match get_result {
        Ok(streaks) => streaks,
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to find streak data in database: {:?}", err);
            return Err(UpliftError::StreakGetFail);
        }
    };

    let streak_response = StreakResponse {
        current_streak: user_streaks_db.current_streak,
        last_streak_date: user_streaks_db.last_streak_date,
        longest_streak: user_streaks_db.longest_streak,
        affirmations: vec![user_streaks_db.affirmation_1, user_streaks_db.affirmation_2, user_streaks_db.affirmation_3]
    };

    Ok(Json(streak_response))
}

#[derive(Deserialize)]
pub struct GeneratedAffirmationPayload {
    pub content: String,
    pub created_at: NaiveDateTime,
}

#[derive(Serialize)]
pub struct StreakResponse {
    pub current_streak: i32,
    pub last_streak_date: NaiveDateTime,
    pub longest_streak: i32,
    pub affirmations: Vec<String>,
}