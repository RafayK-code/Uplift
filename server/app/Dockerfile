# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

################################################################################
# Create a stage for building the application.

# Use the official Rust image as a base
FROM rust:latest

# Create a new directory for your app
WORKDIR /usr/src/app

# Copy your Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Copy the source code
COPY src ./src

WORKDIR /usr/src/app

# Build dependencies
RUN cargo fetch

# Build the project
RUN cargo build --release

# Expose the port your app runs on
EXPOSE 8080

# Run the application
CMD ["./target/release/app"]