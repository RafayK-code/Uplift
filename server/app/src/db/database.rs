use std::{env, error::Error};

use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

pub type DbError = Box<dyn Error + Send + Sync>;
pub type DbResult<T> = Result<T, DbError>;

pub async fn create_pool() -> DbResult<Pool<Postgres>> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be sent");

    match PgPoolOptions::new().max_connections(5).connect(&database_url).await {
        Ok(pool) => Ok(pool),
        Err(error) => Err(Box::new(error) as DbError)
    }
}