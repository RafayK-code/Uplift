use axum::{extract::State, routing::{get, post}, Extension, Json, Router};
use chrono::{NaiveDateTime, Utc};
use rand::{seq::SliceRandom, thread_rng};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::{PgPool, Pool, Postgres};
use tokio::task;

use crate::{db::{database, models::UserStreaks}, error::{UpliftError, UpliftResult}, log_msg, logger::LogLevel};

pub fn routes(pool: Pool<Postgres>) -> Router {
    Router::new()
        .route("/store_generated_affirmation", post(store_generated_affirmation))
        .route("/get_generated_history", get(get_generated_history))
        .route("/get_user_streak", get(get_user_streak))
        .route("/update_user_streak", post(update_user_streak))
        .route("/send_user_affirmation", post(send_user_affirmation))
        .route("/get_all_user_affirmations", get(get_all_user_affirmations))
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

pub async fn get_generated_history(State(pool): State<PgPool>, Extension(sub): Extension<String>) -> UpliftResult<Json<GenerateResponse>> {
    log_msg!("HANDLER", LogLevel::Info, "get_generated_history");

    let get_result = database::get_all_generated_affirmations(&pool, &sub).await;
    let gen_affirm_db = match get_result {
        Ok(affirm) => affirm,
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to find affirmation data in database: {:?}", err);
            return Err(UpliftError::AffirmationGetFail);
        }
    };

    let gen_items = gen_affirm_db.into_iter()
        .map(|affirm| GenerateResponseItem {
            content: affirm.content,
            created_at: affirm.created_at,
        })
        .collect();

    let response = GenerateResponse {
        items: gen_items
    };

    Ok(Json(response))
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

pub async fn update_user_streak(
    State(pool): State<PgPool>,
    Extension(sub): Extension<String>,
    Json(payload): Json<StreakPayload>
) -> UpliftResult<Json<Value>> {
    log_msg!("HANDLER", LogLevel::Info, "update_user_streak");

    let get_result = database::get_user_streak(&pool, &sub).await;
    let user_streaks_db = match get_result {
        Ok(streaks) => streaks,
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to find streak data in database: {:?}", err);
            return Err(UpliftError::StreakUpdateFail);
        }
    };

    if payload.current_streak == 0 {
        let update_streaks_db = UserStreaks {
            id: user_streaks_db.id,
            user_id: sub,
            current_streak: 0,
            last_streak_date: Utc::now().naive_utc(),
            longest_streak: payload.longest_streak,
            affirmation_1: "".to_owned(),
            affirmation_2: "".to_owned(),
            affirmation_3: "".to_owned(),
        };

        let update_result = database::update_user_streak(&pool, update_streaks_db).await;
        match update_result {
            Ok(_) => (),
            Err(err) => {
                log_msg!("HANDLER", LogLevel::Error, "failed to update streak: {:?}", err);
                return Err(UpliftError::StreakUpdateFail);
            }
        }
    }
    else {
        let update_streaks_db = UserStreaks {
            id: user_streaks_db.id,
            user_id: sub,
            current_streak: payload.current_streak,
            last_streak_date: Utc::now().naive_utc(),
            longest_streak: payload.longest_streak,
            affirmation_1: payload.content,
            affirmation_2: user_streaks_db.affirmation_1,
            affirmation_3: user_streaks_db.affirmation_2,
        };

        let update_result = database::update_user_streak(&pool, update_streaks_db).await;
        match update_result {
            Ok(_) => (),
            Err(err) => {
                log_msg!("HANDLER", LogLevel::Error, "failed to update streak: {:?}", err);
                return Err(UpliftError::StreakUpdateFail);
            }
        }
    }

    let body = Json(json!({
        "result": {
            "success": true
        }
    }));

    Ok(body)
}

pub async fn send_user_affirmation(
    State(pool): State<PgPool>,
    Extension(sub): Extension<String>,
    Json(payload): Json<MailPayload>
) -> UpliftResult<Json<Value>> {
    log_msg!("HANDLER", LogLevel::Info, "send_user_affirmation");

    let get_result = database::get_all_other_users(&pool, sub.to_owned()).await;
    let users = match get_result {
        Ok(streaks) => streaks,
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to get users: {:?}", err);
            return Err(UpliftError::StreakUpdateFail);
        }
    };

    let recipient = task::block_in_place(|| {
        let mut rng = thread_rng();
        let chosen_user = users.choose(&mut rng);

        chosen_user.ok_or(UpliftError::AffirmationGetFail)
    });

    let recipient = match recipient {
        Ok(user) => user,
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to get users: {:?}", err);
            return Err(UpliftError::StreakUpdateFail);
        }
    }.to_owned();

    let insert_result = database::insert_affirmations_mail(&pool, sub, recipient.sub, payload.content, payload.sent_at).await;
    match insert_result {
        Ok(_) => (),
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to insert new mail: {:?}", err);
            return Err(UpliftError::StreakUpdateFail);
        }
    }

    let body = Json(json!({
        "result": {
            "success": true
        }
    }));

    Ok(body)
}

pub async fn get_all_user_affirmations(State(pool): State<PgPool>, Extension(sub): Extension<String>) -> UpliftResult<Json<MailResponse>>{
    log_msg!("HANDLER", LogLevel::Info, "get_all_user_affirmations");

    let get_result = database::get_all_mail_affirmations(&pool, sub).await;
    let gen_affirm_db = match get_result {
        Ok(affirm) => affirm,
        Err(err) => {
            log_msg!("HANDLER", LogLevel::Error, "failed to find affirmation data in database: {:?}", err);
            return Err(UpliftError::AffirmationGetFail);
        }
    };

    let gen_items = gen_affirm_db.into_iter()
        .map(|affirm| MailResponseItem {
            content: affirm.content,
            sent_at: affirm.sent_at,
        })
        .collect();

    let response = MailResponse {
        items: gen_items
    };

    Ok(Json(response))
}

#[derive(Deserialize)]
pub struct GeneratedAffirmationPayload {
    pub content: String,
    pub created_at: NaiveDateTime,
}

#[derive(Deserialize)]
pub struct StreakPayload {
    pub current_streak: i32,
    pub longest_streak: i32,
    pub content: String,
}

#[derive(Serialize)]
pub struct StreakResponse {
    pub current_streak: i32,
    pub last_streak_date: NaiveDateTime,
    pub longest_streak: i32,
    pub affirmations: Vec<String>,
}

#[derive(Serialize)]
pub struct GenerateResponse {
    pub items: Vec<GenerateResponseItem>,
}

#[derive(Serialize)]
pub struct GenerateResponseItem {
    pub content: String,
    pub created_at: NaiveDateTime,
}

#[derive(Deserialize)]
pub struct MailPayload {
    pub content: String,
    pub sent_at: NaiveDateTime,
}

#[derive(Serialize)]
pub struct MailResponse {
    pub items: Vec<MailResponseItem>
}

#[derive(Serialize)]
pub struct MailResponseItem {
    pub content: String,
    pub sent_at: NaiveDateTime,
}