# Transactions REST API

A guided Node.js and TypeScript API exercise for recording and reviewing personal transactions. It uses Fastify, Knex, Zod, and SQLite by default, with PostgreSQL also supported by the database configuration.

## Features

- Create credit and debit transactions.
- List transactions and view a single transaction for the current session.
- Calculate the session's transaction balance.
- Create a `sessionId` cookie when a transaction is first created and scope later reads to that session.
- Validate request bodies and route parameters with Zod.

The API exposes `GET /hello` and the following transaction routes:

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/transactions` | Create a transaction |
| `GET` | `/transactions` | List transactions in the current session |
| `GET` | `/transactions/:id` | Read one transaction in the current session |
| `GET` | `/transactions/summary` | Return the current session's balance |

There are no user accounts or login flow in this exercise; the session cookie provides transaction grouping and access scoping.

## Technology

Node.js, TypeScript, Fastify, Knex, SQLite or PostgreSQL, Zod, cookie-based sessions, Vitest, Supertest, and npm.

## Run locally

The project requires Node.js `>=22.15.9 <23.0.0`. Install dependencies and prepare local configuration:

```bash
npm install
cp .env.example .env
npm run knex -- migrate:latest
npm run dev
```

The server listens on port `3333` by default. Set `PORT` in `.env` to use another port. To run the automated test suite, create `.env.test` from `.env.test.example` and run:

```bash
npm test
```

## Environment variables

- `NODE_ENV` (`development`, `test`, or `production`)
- `DATABASE_CLIENT` (`sqlite` or `pg`; defaults to `sqlite`)
- `DATABASE_URL` (SQLite file path or PostgreSQL connection string)
- `PORT` (defaults to `3333`)

The example configuration uses local SQLite files. No database server or credentials are included.

## Project status

This repository is a learning project focused on REST routes, persistence, validation, and request-level session handling. The repository includes automated tests for the transaction routes.

## Source guide

| Source | What to inspect |
| --- | --- |
| [Application setup](src/app.ts) | Fastify plugins and route registration. |
| [Transaction routes](src/routes/transactions.ts) | Creation, session-scoped reads, and balance summary. |
| [Session check](src/middlewares/check-session-id-exists.ts) | Handling of requests without a session cookie. |
| [Database setup](src/database.ts) | Knex configuration and database connection. |
| [Environment validation](src/env/index.ts) | Validated database and server configuration. |

## Session workflow

Create a transaction first, then retain the returned `sessionId` cookie for list, detail, and summary requests. An API client that does not preserve cookies will not share that session automatically across separate calls.

This mechanism groups and scopes transactions by a cookie. It does not provide registered user identities, password authentication, or a complete account-based authorization system. Read the route queries alongside the session middleware when evaluating the access boundary.
