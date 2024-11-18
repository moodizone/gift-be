# Gift-BE

A RESTful backend service built with **Express** and **TypeScript**. This project demonstrates core backend concepts such as routing, middleware, validation, and database interaction using **PostgreSQL**. It serves as a showcase of my backend development skills.

## Technologies

- **Express** for building the REST API.
- **TypeScript** for type safety and better developer experience.
- **PostgreSQL** as the database (Prisma ORM).
- **bcrypt** for password hashing.
- **Zod** for schema validation.
- **Nodemon** for hot-reloading during development.
- **dotenv** for managing environment variables.

## Project Structure

```plaintext
src/
├── config/         # Configuration files (e.g., environment setup)
├── controllers/    # Request handlers for specific routes (HTTP layer)
├── middleware/     # Custom middleware (e.g., auth, logging)
├── models/         # Database models (queries)
├── types/          # TypeScript type definitions
├── routes/         # Route definitions
├── services/       # Business logic and reusable services
├── utils/          # Utility functions
├── validations/    # Request validation logic
```

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)

## Setup and Running the App

1. Clone the repository:

    ```bash
    git clone https://github.com/moodizone/gift-be.git
    cd gift-be
    docker-compose up --build
    ```

2. Create an `.env` file:

    ```
    # APP
    APP_PORT = "..."

    # DATABASE
    DB_PORT = "..."
    DB_NAME = "..."
    DB_USER = "..."
    DB_PASSWORD = "..."

    # AUTH
    SECRET_0 = "..."
    SECRET_1 = "..."
    SECRET_2 = "..."
    SECRET_3 = "..."
    SECRET_4 = "..."

    # Number between 0-24
    SECRET_POSITION = "..."
    ```
3. Start the containers:
    ```
    docker compose up --build
    ```