use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Serialize, Deserialize)]

pub struct User {
    pub sub: String,
}

#[derive(Serialize, Deserialize)]
pub struct GeneratedAffirmation {
    pub id: i32,
    pub user_id: String,
    pub content: String,
    pub created_at: NaiveDateTime,
}

#[derive(Serialize, Deserialize)]

pub struct MailedAffirmation {
    pub id: i32,
    pub sender_id: String,
    pub recipient_id: String,
    pub content: String,
    pub sent_at: NaiveDateTime,
    pub reaction: bool,
}

#[derive(Serialize, Deserialize, FromRow)]

pub struct UserStreaks {
    pub id: i32,
    pub user_id: String,
    pub current_streak: i32,
    pub last_streak_date: NaiveDateTime,
    pub longest_streak: i32,
    pub affirmation_1: String,
    pub affirmation_2: String,
    pub affirmation_3: String,
}