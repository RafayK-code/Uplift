# Uplift

Uplift is a mobile application that delivers daily AI-generated words of affirmation to users. With features to boost positivity and encourage engagement, Uplift promotes a culture of self-love and kindness.

## Features

-   **Daily Affirmations:** Receive AI-generated affirmations tailored to inspire and uplift.
-   **Streak System:** Log daily affirmations to maintain and grow your streak.
-   **Anonymous Affirmations:** Send and receive anonymous words of affirmation with other users.

## Tech Stack

### Client

-   **Expo:** A React Native framework for building the cross-platform mobile app.

### Server

-   **Rust (Axum):** A fast and robust framework for building the backend API.

### Database

-   **PostgreSQL:** Stores user data, affirmations, and streak information.

### Authentication

-   **Auth0:** Handles user authentication and authorization securely.

### AI API Integration

-   **Voiceflow:** Powers the generation of personalized affirmations.

## Setup

### Requirements
- node.js v20.10.0
- Docker

### Client

1.  Navigate to the client directory:
    
    ```bash
    cd client
    ```
    
2.  Install dependencies:
    
    ```bash
    npm install
    ```
    
3.  Start the app via Expo Go:
    
    ```bash
    npx expo start
    ```
    

### Server

1.  Navigate to the server directory:
    
    ```bash
    cd server
    ```
    
2.  Set up the environment variables required by Docker and PostgreSQL. Create a `.env` file in the server directory and add the following:
    
    ```env
    COMPOSE_PROJECT_NAME=uplift
    POSTGRES_DB=upliftdb
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=<your_postgres_password>
    DATABASE_URL=postgres://postgres:<your_postgres_password>@db:5432/upliftdb
    ```
    
3.  Use Docker Compose to build the containers and start the server
    
    ```bash
    docker-compose up --build
    ```

## License

This project is licensed under the MIT License.
