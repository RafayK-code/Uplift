use chrono::{DateTime, Utc};

pub enum LogLevel {
    Info,
    Warn,
    Error,
    Crit,
}

impl std::fmt::Display for LogLevel {
    fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> core::result::Result<(), core::fmt::Error> {
        let level_str = match self {
            LogLevel::Info => "INFO",
            LogLevel::Warn => "WARN",
            LogLevel::Error => "ERROR",
            LogLevel::Crit => "CRIT",
        };

        write!(fmt, "{}", level_str)
    }
}

/// Logs a message with a timestamp, log level, and function name.
///
/// ## Parameters
///
/// - `$function`: A string slice representing the function or module name where the log is originating.
/// - `$level`: An enum option from [`LogLevel`]
/// - `$message`: A format string that specifies the message to log. It follows the format string syntax of the `format!` macro.
/// - `$arg`: Optional arguments for the format string.
///
/// ## Example
///
/// ```rust
/// log_msg!("FUNCTION", LogLevel::Info, "This is a log message with value: {}", 42);
/// ```
///
/// This will produce output like:
///
/// ```text
/// 2024-07-20 22:35:36.994 UTC [INFO] ->> FUNCTION - This is a log message with value: 42
/// ```
#[macro_export]
macro_rules! log_msg {
    ($function:expr, $level:expr, $message:expr $(, $arg:expr)*) => {{
        let timestamp = crate::logger::current_timestamp();
        let formatted_message = format!($message $(, $arg)*);
        println!("{} [{}] ->> {:<12} - {}", timestamp, $level, $function, formatted_message);
    }};
}

pub fn current_timestamp() -> String {
    let now: DateTime<Utc> = Utc::now();
    now.format("%Y-%m-%d %H:%M:%S%.3f UTC").to_string()
}