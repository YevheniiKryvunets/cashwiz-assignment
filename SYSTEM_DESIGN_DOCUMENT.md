# System Design – User Access & Audit Management Prototype

## High-Level Architecture

The system consists of three components:

- Frontend (React + TypeScript): provides the login page, profile view, and audit log UI.
- Backend API (Node.js + Express + TypeScript): handles authentication (/auth/login), profile retrieval (/users/me), and audit log retrieval (/audit/my-logs).
- Database (MySQL): stores user accounts (users) and audit records (user_actions).

## Data flow:

1. The user logs in through the React app.
2. The backend verifies the credentials, creates a JWT, and records LOGIN_SUCCESS.
3. The frontend stores the JWT and sends it with each request.
4. The backend validates the token and returns the user profile and audit logs.

## Components

### Frontend

React + TypeScript SPA that provides login, profile view, and audit log UI.
Sends HTTP requests and stores the JWT token in localStorage.

### Backend

Node.js + Express API with three endpoints:

- /auth/login – authenticate + issue JWT
- /users/me – return current user
- /audit/my-logs – return user's audit logs

Also writes login events to the audit table.

### Database

MySQL with two tables:

- users – user data + password hash + role
- user_actions – audit log entries

### Authentication

JWT-based authentication.
On login the server issues a 1h token, which the client includes in Authorization: Bearer <token>.

### Authorization

Basic RBAC (Role-Based Access Control).
Users can access only their own profile and audit logs.

## Data Model Design

The system uses two tables:

- **users** – stores email, password hash, full name, role, and timestamps.
- **user_actions** – stores audit events linked to users via `user_id`.

`user_actions` has a foreign key to `users`, forming a simple 1-to-many relationship (one user → many audit records).

## Architecture diagram

```
+------------------+          HTTP (JSON)            +------------------+           SQL
|                  |  POST /auth/login               |                  |  queries   |
|  React Frontend  |-------------------------------->|  Node.js API     |----------->|  MySQL DB     |
|  (TypeScript)    |  GET /users/me, /audit/my-logs  |  (Express + TS)  |            |  users        |
|                  |<--------------------------------|                  |<-----------|  user_actions |
+------------------+      JWT in Authorization       +------------------+
```

## Scalability Reasoning

The backend is stateless (JWT), so it can scale horizontally by running multiple API instances.
The main growth point is the `user_actions` table; if audit volume increases, it can be optimized by pagination, partitioning, or moving logs to a separate storage.
The frontend is a static SPA and scales independently via any CDN.

## Security Considerations

- Passwords are stored as bcrypt hashes.
- JWT tokens are signed, expire in 1 hour, and are required for protected routes.
- Users can access only their own data (basic RBAC).
- SQL queries are parameterized to avoid injection.

Future improvements: login rate limiting, account lockouts, httpOnly cookies, extended audit logging.

## Clean Architecture Application

The backend is structured in simple layers:

- `config` – environment and application configuration.
- `domain` – core business logic: entities and repositories.
- `infrastructure` – technical details such as the MySQL connection.
- `presentation/http` – Express routes, controllers, and middlewares.

Higher-level layers (presentation) depend on the domain layer, while domain does not depend on Express or MySQL directly.
This separation makes the code easier to understand, test, and extend (for example, replacing the database or adding new delivery channels without changing core logic).

## Trade-Offs

- **JWT vs sessions** – JWT was chosen to keep the API stateless and easy to scale with a separate SPA frontend. The trade-off is that token revocation is harder; this is acceptable for a small prototype.
- **Simple RBAC vs complex permissions** – a single `role` field (`admin` / `user`) is enough for the assignment. More granular permissions would require a richer model but were out of scope.
- **Direct SQL vs ORM** – using raw SQL via `mysql2` keeps the code lightweight and explicit. An ORM could improve abstraction and migrations but would add complexity for a small project.
- **Synchronous audit logging** – audit entries are written inside the request flow, which is simple and reliable. In a high-traffic system this might be moved to asynchronous processing (e.g. a message queue).
