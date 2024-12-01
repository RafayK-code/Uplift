use std::{env, error::Error};

use chrono::{Duration, NaiveDateTime, Utc};
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

use super::models::{GeneratedAffirmation, UserStreaks};

pub type DbError = Box<dyn Error + Send + Sync>;
pub type DbResult<T> = Result<T, DbError>;

pub async fn create_pool() -> DbResult<Pool<Postgres>> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be sent");

    match PgPoolOptions::new().max_connections(5).connect(&database_url).await {
        Ok(pool) => Ok(pool),
        Err(error) => Err(Box::new(error) as DbError)
    }
}

pub async fn init_user(pool: &Pool<Postgres>, sub: String) -> DbResult<()> {
    let mut tx = pool.begin().await?;

    sqlx::query(
        "INSERT INTO users (sub) VALUES ($1)"
    )
    .bind(&sub)
    .execute(&mut *tx)
    .await?;

    sqlx::query(
        "INSERT INTO user_streaks (user_id, last_streak_date, affirmation_1, affirmation_2, affirmation_3) VALUES ($1, $2, $3, $4, $5)"
    )
    .bind(&sub)
    .bind(Utc::now() - Duration::hours(24))
    .bind("")
    .bind("")
    .bind("")
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;

    Ok(())
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

pub async fn get_all_generated_affirmations(pool: &Pool<Postgres>, sub: &String) -> DbResult<Vec<GeneratedAffirmation>> {
    let rows = sqlx::query_as::<_, GeneratedAffirmation>(
        "SELECT * FROM affirmations_generated WHERE user_id = $1 ORDER BY created_at DESC"
    )
    .bind(sub)
    .fetch_all(pool)
    .await?;

    Ok(rows)
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

pub async fn update_user_streak(pool: &Pool<Postgres>, streaks: UserStreaks) -> DbResult<()> {
    sqlx::query(
        "UPDATE user_streaks SET current_streak = $1,
            last_streak_date = $2,
            longest_streak = $3,
            affirmation_1 = $4,
            affirmation_2 = $5,
            affirmation_3 = $6 WHERE id = $7"
    )
    .bind(streaks.current_streak)
    .bind(streaks.last_streak_date)
    .bind(streaks.longest_streak)
    .bind(streaks.affirmation_1)
    .bind(streaks.affirmation_2)
    .bind(streaks.affirmation_3)
    .execute(pool)
    .await?;

    Ok(())
}