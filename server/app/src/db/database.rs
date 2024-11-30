use std::{env, error::Error};

use chrono::NaiveDateTime;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

use super::models::UserStreaks;

pub type DbError = Box<dyn Error + Send + Sync>;
pub type DbResult<T> = Result<T, DbError>;

pub async fn create_pool() -> DbResult<Pool<Postgres>> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be sent");

    match PgPoolOptions::new().max_connections(5).connect(&database_url).await {
        Ok(pool) => Ok(pool),
        Err(error) => Err(Box::new(error) as DbError)
    }
}

pub async fn insert_user(pool: &Pool<Postgres>, sub: String) -> DbResult<()> {
    sqlx::query(
        "INSERT INTO users (sub) VALUES ($1)"
    )
    .bind(sub)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn user_exists(pool: &Pool<Postgres>, sub: String) -> DbResult<bool> {
    let row = sqlx::query(
        "SELECT * FROM users WHERE sub = $1"
    )
    .bind(sub)
    .fetch_optional(pool)
    .await?;

    Ok(row.is_some())
}

pub async fn insert_generated_affirmation(pool: &Pool<Postgres>, sub: &String, content: &String, created_at: &NaiveDateTime) -> DbResult<()> {
    sqlx::query(
        "INSERT INTO affirmations_generated (user_id, content, created_at) VALUES ($1, $2, $3)"
    )
    .bind(sub)
    .bind(content)
    .bind(created_at)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn get_user_streak(pool: &Pool<Postgres>, sub: &String) -> DbResult<UserStreaks> {
    let row = sqlx::query_as::<_, UserStreaks>(
        "SELECT * FROM user_streaks WHERE user_id = $1"
    )
    .bind(sub)
    .fetch_one(pool)
    .await?;

    Ok(row)
}