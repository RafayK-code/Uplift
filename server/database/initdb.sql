CREATE TABLE users(
    sub VARCHAR(255) PRIMARY KEY
);

CREATE TABLE affirmations_generated(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(sub) ON DELETE RESTRICT
);

CREATE TABLE affirmations_mail(
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(255),
    recipient_id VARCHAR(255),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reaction BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users(sub) ON DELETE RESTRICT,
    FOREIGN KEY (recipient_id) REFERENCES users(sub) ON DELETE RESTRICT
);

CREATE TABLE affirmations_reactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    affirmation INT,
    reacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (user_id) REFERENCES users(sub) ON DELETE CASCADE,
    FOREIGN KEY (affirmation) REFERENCES affirmations_mail(id) ON DELETE CASCADE
);

CREATE TABLE user_streaks(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    current_streak INT DEFAULT 0,
    last_streak_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    longest_streak INT DEFAULT 0
    affirmation_1 TEXT NOT NULL,
    affirmation_2 TEXT NOT NULL,
    affirmation_3 TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(sub) ON DELETE CASCADE
);