# FlowDesk

FlowDesk is a responsive full stack project and internship management web application built with React, TypeScript, Express, PostgreSQL, Prisma, and Tailwind CSS.

The application provides authenticated project and task management with persistent database storage, server side validation, session based authentication, role based authorization, protected API routes, ownership checks, notifications, dashboard statistics, and responsive user interfaces.

---

## Internship Objective

### Task 1: Responsive Web Application

Build the front end foundation for a complete web application with public and authenticated views.

### Task 2: Full Stack Integration

Connect the application interface to secure server side workflows and persistent data.

Task 2 focuses on:

- Authentication and sessions
- Database backed CRUD
- Server side validation
- Safe frontend API requests
- Ownership checks
- Role based authorization
- Persistent data
- Notifications
- Reproducible project setup
- Secure deployment considerations

---

# Features

## Public Experience

- Responsive landing page
- Responsive navigation
- Sign in
- Create account
- Forgot password interface
- Responsive footer
- Mobile navigation
- 404 page

## Authentication

- User registration
- User login
- Server side credential validation
- Argon2 password hashing
- Database backed sessions
- HttpOnly session cookies
- HMAC SHA-256 session token hashing
- Session expiration
- Session restoration after page refresh
- Logout
- Protected frontend routes
- Protected backend API routes
- Authentication middleware
- Role based authorization

## User Roles

FlowDesk supports two application roles:

- `USER`
- `ADMIN`

### USER

Normal authenticated users can:

- Manage their own projects
- Manage their own tasks
- View their dashboard
- View their notifications
- Update task and project statuses according to the defined workflow
- Manage their account interface

### ADMIN

Administrators have the same authenticated capabilities as normal users, plus access to administration functionality.

Administrators can:

- View registered users
- View user roles
- Promote users to administrator
- Change users between `USER` and `ADMIN` roles
- Access protected administrator endpoints

Role checks are performed on the server.

Frontend visibility is not treated as an authorization boundary.

---

# Projects

FlowDesk provides complete project management functionality.

Features include:

- Create projects
- View projects
- View individual projects
- Edit projects
- Delete projects
- Project status management
- Progress tracking
- Server side validation
- Database persistence
- User ownership enforcement
- Project status notifications

Supported project statuses:

- `PLANNING`
- `ACTIVE`
- `COMPLETED`
- `ON_HOLD`

Project progress is validated server side and must remain between `0` and `100`.

---

# Tasks

FlowDesk provides complete task management functionality.

Features include:

- Create tasks
- View tasks
- View individual tasks
- Edit tasks
- Delete tasks
- Task status management
- Task priority management
- Due dates
- Optional project assignment
- Server side validation
- Database persistence
- User ownership enforcement
- Project ownership validation when assigning tasks
- Task status transition validation
- Task status notifications

Supported task statuses:

- `TODO`
- `IN_PROGRESS`
- `COMPLETED`

Supported priorities:

- `LOW`
- `MEDIUM`
- `HIGH`

---

## Task Status Workflow

Task status changes are validated on the server.

Allowed transitions are:

```text
TODO
  ↓
IN_PROGRESS
  ↓
COMPLETED
````

The following recovery transition is also supported:

```text
COMPLETED
  ↓
IN_PROGRESS
```

And:

```text
IN_PROGRESS
  ↓
TODO
```

Invalid transitions are rejected.

For example:

```text
TODO → COMPLETED
```

is rejected because a task must first move through `IN_PROGRESS`.

Likewise:

```text
COMPLETED → TODO
```

is rejected.

The database remains unchanged when an invalid transition is rejected.

This workflow is enforced by backend service logic rather than frontend controls.

---

# Dashboard

The authenticated dashboard uses real database backed data.

Dashboard functionality includes:

* Total projects
* Active projects
* Completed projects
* Total tasks
* Completed tasks
* Task completion statistics
* Project progress
* Recent projects
* Recent activity
* Loading states
* Error states
* Empty states

Dashboard statistics are retrieved from the protected backend API.

---

# Notifications

FlowDesk includes a persistent notification system backed by PostgreSQL.

Users can:

* View notifications
* Filter notifications
* Mark individual notifications as read
* Mark all notifications as read
* Delete notifications
* View unread notifications
* View notification timestamps

Notifications are scoped to the authenticated user.

A user cannot access another user's notifications.

---

## Automatic Notifications

The backend automatically creates notifications for important project and task events.

### Project notifications

Examples include:

```text
Project created
Project moved to planning
Project active
Project completed
Project on hold
```

### Task notifications

Examples include:

```text
Task created
Task in progress
Task completed
Task moved back to to do
```

Notifications are generated by backend services after successful operations.

---

# Calendar

The Calendar page uses real task data from the backend.

Tasks with due dates are displayed as calendar items.

Calendar functionality includes:

* Task due dates
* Task status indicators
* Upcoming tasks
* Real API data
* Responsive calendar interface

There is currently no separate calendar event subsystem.

The Calendar therefore focuses on task based scheduling rather than independent calendar events.

---

# UX and Accessibility

FlowDesk was designed responsively from the beginning.

Supported layouts include:

* Mobile phones
* Tablets
* Laptops
* Desktops
* Large screens

UX features include:

* Responsive navigation
* Responsive sidebar
* Responsive tables
* Mobile cards
* Loading states
* Error states
* Empty states
* Accessible custom dropdowns
* Keyboard friendly controls
* Visible focus states
* Accessible form labels
* ARIA attributes where appropriate
* Touch friendly controls

---

# Technology Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React

## Backend

* Node.js
* Express
* TypeScript
* Zod
* Argon2
* Cookie Parser
* Helmet
* CORS
* Express Rate Limit

## Database

* PostgreSQL
* Neon PostgreSQL
* Prisma ORM

## Authentication

* Database backed sessions
* HttpOnly cookies
* HMAC SHA-256 session token hashing
* Argon2 password hashing
* Session expiration
* Server side authentication middleware

---

# Architecture

FlowDesk uses a separated frontend and backend architecture.

```text
flowdesk/
│
├── src/                         # React frontend
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── server/                     # Express backend
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       └── server.ts
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

The frontend communicates with the backend through a centralized API service.

The backend is responsible for:

1. Authentication
2. Authorization
3. Role checks
4. Validation
5. Database operations
6. Ownership checks
7. Session management
8. Notifications
9. Business workflow rules

The frontend is responsible for:

1. User interface
2. Client side interaction
3. Route presentation
4. Form interaction
5. Loading states
6. Error states
7. Calling the backend API

The backend remains the source of truth for security and authorization.

---

# Database Schema

The PostgreSQL database contains the following main models:

```text
User
Session
Project
Task
Notification
```

## Relationships

```text
User
 ├── Sessions
 ├── Projects
 ├── Tasks
 └── Notifications

Project
 └── Tasks

Task
 └── optional Project
```

Projects and tasks contain an `ownerId` which is used by the backend to enforce ownership.

Sessions belong to users and are automatically removed when their associated user is deleted.

Notifications belong to users and are scoped through `userId`.

---

## Database Models

### User

The `User` model stores:

* Name
* Email
* Password hash
* Role
* Creation timestamp
* Update timestamp

Supported roles:

```text
USER
ADMIN
```

### Session

The `Session` model stores:

* Hashed session token
* User ID
* Expiration time
* Creation timestamp

The raw authentication token is not stored in PostgreSQL.

### Project

The `Project` model stores:

* Name
* Description
* Status
* Progress
* Owner ID
* Creation timestamp
* Update timestamp

### Task

The `Task` model stores:

* Title
* Description
* Status
* Priority
* Due date
* Owner ID
* Optional project ID
* Creation timestamp
* Update timestamp

### Notification

The `Notification` model stores:

* Title
* Message
* Type
* Read state
* User ID
* Creation timestamp

---

# Frontend Routes

## Public Routes

| Route              | Description                 |
| ------------------ | --------------------------- |
| `/`                | Landing page                |
| `/login`           | Sign in                     |
| `/register`        | Create account              |
| `/forgot-password` | Password recovery interface |

## Protected Routes

| Route                      | Description                   |
| -------------------------- | ----------------------------- |
| `/dashboard`               | Dashboard overview            |
| `/dashboard/projects`      | Project management            |
| `/dashboard/tasks`         | Task management               |
| `/dashboard/calendar`      | Calendar                      |
| `/dashboard/notifications` | Notifications                 |
| `/dashboard/settings`      | Account settings              |
| `/dashboard/admin/users`   | Administrator user management |

The administrator route is protected by both frontend role visibility and server side authorization.

---

# API Endpoints

All protected endpoints require a valid authenticated session unless otherwise stated.

## Health

```text
GET /api/health
```

Returns the current API health status.

---

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
GET  /api/auth/admin-test
```

`/api/auth/admin-test` is a protected administrator test endpoint used to verify server side role authorization.

---

# Project API

```text
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

Project operations are scoped to the authenticated user.

---

# Task API

```text
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Task operations are scoped to the authenticated user.

Project assignments are also ownership checked.

---

# Dashboard API

```text
GET /api/dashboard
```

Returns authenticated dashboard statistics based on the current user's projects and tasks.

---

# Notification API

```text
GET    /api/notifications
PATCH  /api/notifications/read-all
PATCH  /api/notifications/:id/read
DELETE /api/notifications/:id
```

Notification operations are scoped to the authenticated user.

---

# Administration API

Administrator only endpoints:

```text
GET   /api/admin/users
PATCH /api/admin/users/:id/role
```

These endpoints require:

1. Authentication
2. `ADMIN` role

Normal users receive:

```text
403 Forbidden
```

when attempting to access administrator functionality.

---

# Security

Security is implemented at the backend boundary rather than relying only on frontend controls.

---

## Password Security

Passwords are never stored directly.

Passwords are hashed using Argon2 before being stored in PostgreSQL.

```text
Password
   ↓
Argon2
   ↓
passwordHash
   ↓
PostgreSQL
```

The API never returns password hashes to the frontend.

---

# Session Security

Authentication uses database backed sessions.

The browser receives an HttpOnly session cookie.

The raw session token is not stored directly in the database.

Instead, the backend stores an HMAC SHA-256 hash of the session token.

```text
Browser
   │
   │ HttpOnly cookie
   ▼
Express API
   │
   │ HMAC SHA-256
   ▼
Session record
   │
   ▼
Authenticated user
```

Sessions have an expiration time.

The current implementation uses a seven day session lifetime.

Logout invalidates the session.

---

# Authorization

Authorization is enforced on the server.

Authentication answers:

```text
Who is the user?
```

Authorization answers:

```text
Is this user allowed to perform this operation?
```

FlowDesk applies both.

For administrator endpoints:

```text
requireAuth
     ↓
requireRole("ADMIN")
     ↓
Controller
```

Normal users cannot bypass the administrator interface by directly calling the API.

---

# Ownership Checks

Every protected project and task operation uses the authenticated user's ID.

For example:

```text
Project lookup

WHERE id = projectId
AND ownerId = authenticatedUserId
```

This prevents one authenticated user from accessing another user's project.

The same ownership principle is applied to tasks.

Task project assignments are also checked to ensure that the selected project belongs to the authenticated user.

Notifications are similarly scoped to the authenticated user.

---

# Server Side Validation

Requests are validated using Zod before database operations.

Examples include:

* Minimum and maximum name lengths
* Valid email addresses
* Password requirements
* Valid project statuses
* Valid task statuses
* Valid task priorities
* Progress between 0 and 100
* Valid date formats
* Required fields
* Valid project and task update fields

Frontend validation is treated as a user experience feature.

The backend remains the source of truth for request validation.

---

# Workflow Validation

Business rules are enforced by backend services.

Task status transitions are validated before database updates.

For example:

```text
TODO → IN_PROGRESS
```

is valid.

```text
IN_PROGRESS → COMPLETED
```

is valid.

```text
COMPLETED → IN_PROGRESS
```

is valid.

However:

```text
TODO → COMPLETED
```

is rejected.

And:

```text
COMPLETED → TODO
```

is rejected.

Invalid transitions do not modify the database.

---

# HTTP Security

The API uses:

* Helmet
* CORS configuration
* Rate limiting
* HttpOnly cookies
* Request body limits
* Server side validation
* Authentication middleware
* Role based authorization

The API applies a JSON request body limit of `1mb`.

A global API rate limiter is applied to `/api`.

---

# Environment Variables

## Frontend

Create:

```text
.env.local
```

Example:

```env
VITE_API_URL=http://localhost:4000/api
```

The frontend API service uses:

```text
VITE_API_URL
```

to determine the backend API base URL.

For production, set `VITE_API_URL` to the deployed backend API URL.

Example:

```env
VITE_API_URL=https://your-backend-domain.example.com/api
```

Replace the example domain with the actual deployed backend URL.

The current Vercel configuration provides SPA routing and does not itself act as an API proxy.

---

## Backend

Create:

```text
server/.env
```

Example:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_long_random_session_secret
```

For production:

```env
PORT=4000
CLIENT_URL=https://your-frontend-domain.example.com
DATABASE_URL=your_production_postgresql_connection_string
SESSION_SECRET=your_long_random_session_secret
```

Never commit real credentials or secrets.

A safe template is provided in:

```text
server/.env.example
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/mikeisresilient/flowdesk.git
cd flowdesk
```

---

## 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd server
npm install
```

---

# Database Setup

FlowDesk uses PostgreSQL with Prisma.

Configure the database connection in:

```text
server/.env
```

Set:

```env
DATABASE_URL=your_postgresql_connection_string
```

Return to the server directory:

```bash
cd server
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply existing migrations:

```bash
npx prisma migrate deploy
```

For local development where a new migration needs to be created:

```bash
npx prisma migrate dev
```

---

# Running the Application

FlowDesk requires both the frontend and backend servers.

---

## Terminal 1: Backend

```bash
cd server
npm run dev
```

The API runs on:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "FlowDesk API is running"
}
```

---

## Terminal 2: Frontend

From the project root:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# Production Builds

## Frontend

From the project root:

```bash
npm run build
```

The production frontend is generated in:

```text
dist/
```

---

## Backend

From the server directory:

```bash
npm run build
```

The backend is compiled into:

```text
server/dist/
```

Start the compiled backend with:

```bash
npm start
```

---

# Administrator Management

FlowDesk includes a backend utility for promoting an existing user to administrator.

From the server directory:

```bash
npm run promote:admin -- user@example.com
```

The script:

1. Finds the user by email
2. Verifies that the user exists
3. Checks the current role
4. Updates the role to `ADMIN`

The command does not contain or require a hardcoded password.

---

# Verification

The following workflows were tested during development.

---

## Authentication Verification

* Registration succeeds with valid data
* Duplicate email registration is rejected
* Login succeeds with valid credentials
* Invalid credentials are rejected
* Unauthenticated protected requests return `401`
* `/api/auth/me` rejects unauthenticated requests
* Authenticated sessions survive page refresh
* Logout invalidates the session
* Session cookie uses HttpOnly protection
* Authentication responses do not expose password hashes or session secrets

---

# Authorization Verification

Administrator authorization was tested directly against the API.

A normal user attempting to access an administrator endpoint receives:

```text
403 Forbidden
```

An administrator receives a successful response.

This confirms that administrator access is enforced server side.

---

# Ownership Verification

The following ownership scenarios were tested:

* User A cannot read User B's project
* User A cannot update User B's project
* User A cannot delete User B's project
* User A cannot read User B's task
* User A cannot update User B's task
* User A cannot delete User B's task
* User A cannot attach a task to User B's project
* User A cannot access User B's notifications

Ownership violations return a resource not found response where appropriate.

This avoids exposing the existence of resources belonging to another user.

---

# Project Verification

The following project workflows were tested:

* Unauthenticated project creation is rejected
* Authenticated project creation succeeds
* Projects persist in PostgreSQL
* Projects can be retrieved
* Projects can be edited
* Projects can be deleted
* Invalid project data is rejected
* Invalid project status is rejected
* Progress below `0` is rejected
* Progress above `100` is rejected
* Users cannot access another user's project
* Users cannot modify another user's project
* Users cannot delete another user's project
* Project creation generates a notification
* Project status changes generate notifications

---

# Task Verification

The following task workflows were tested:

* Unauthenticated task creation is rejected
* Authenticated task creation succeeds
* Tasks persist in PostgreSQL
* Tasks can be retrieved
* Tasks can be edited
* Tasks can be deleted
* Invalid task data is rejected
* Invalid task status is rejected
* Invalid task priority is rejected
* Invalid due dates are rejected
* Tasks persist after browser refresh
* Edited tasks persist after browser refresh
* Deleted tasks remain deleted after browser refresh
* Users cannot access another user's task
* Users cannot modify another user's task
* Users cannot delete another user's task
* Task project assignments are ownership checked

---

# Task Workflow Verification

Valid transitions were tested:

```text
TODO → IN_PROGRESS
```

```text
IN_PROGRESS → COMPLETED
```

```text
COMPLETED → IN_PROGRESS
```

```text
IN_PROGRESS → TODO
```

Invalid transitions were also tested:

```text
TODO → COMPLETED
```

```text
COMPLETED → TODO
```

Invalid transitions return a validation error and leave the database unchanged.

---

# Notification Verification

The notification system was tested for:

* Task creation notifications
* Task status notifications
* Project creation notifications
* Project status notifications
* Mark individual notification as read
* Mark all notifications as read
* Delete notification
* Notification filtering
* Notification persistence
* Notification ownership
* Safe repeated read operations
* Safe repeated mark all read operations
* Safe repeated deletion attempts

---

# Dashboard Verification

The dashboard was verified against real backend data.

Tested functionality includes:

* Project statistics
* Task statistics
* Project progress
* Task completion statistics
* Recent projects
* Recent activity
* Loading state
* Error state
* Empty state
* Authentication protection

Dashboard values are retrieved from the authenticated user's database records.

---

# Validation Verification

An invalid task request was tested directly against the API.

Example:

```json
{
  "title": "X"
}
```

The API returned:

```text
400 Bad Request
```

with:

```json
{
  "success": false,
  "message": "Validation failed"
}
```

This demonstrates that validation is enforced by the server rather than relying only on frontend validation.

Other validation cases tested include:

* Missing project name
* Invalid project status
* Invalid progress
* Missing task title
* Invalid task status
* Invalid task priority
* Invalid due date
* Invalid project ID
* Invalid task transitions

---

# Recovery and Error Handling Verification

Recovery paths were tested for:

* Non existent project
* Non existent task
* Non existent notification
* Repeated project deletion
* Repeated task deletion
* Repeated notification deletion
* Repeated notification read
* Repeated mark all notifications read
* Malformed JSON
* Invalid authentication
* Unauthorized administrator access
* Invalid workflow transitions

The API remains operational after malformed requests and other rejected operations.

---

# Build Verification

Frontend build:

```bash
npm run build
```

Backend build:

```bash
cd server
npm run build
```

Both builds were successfully verified during development.

The backend build also generates the Prisma client before TypeScript compilation.

---

# Current Application State

The application currently includes:

## Frontend

* Responsive landing page
* Authentication interface
* Login
* Registration
* Forgot password interface
* Protected dashboard
* Project management
* Task management
* Calendar
* Notifications
* Settings
* Administrator user management
* Responsive navigation
* Loading states
* Error states
* Empty states
* 404 page
* Accessibility foundation

## Backend

* Express API
* PostgreSQL database
* Prisma ORM
* Prisma migrations
* User registration
* Login
* Logout
* Database backed sessions
* HttpOnly session cookies
* Argon2 password hashing
* HMAC SHA-256 session token hashing
* Server side validation
* Project CRUD
* Task CRUD
* Dashboard API
* Notification API
* Administrator API
* Role based authorization
* Ownership checks
* Task status transition enforcement
* Protected API routes
* Frontend API integration
* Persistent database data
* Security middleware
* Rate limiting
* Recovery and error handling

---

# Design System

FlowDesk uses a warm yellow led visual system with neutral surfaces and strong contrast.

Primary tokens:

```text
Primary Yellow:  #F5C542
Primary Dark:    #D9A514
Primary Light:   #FFF4C7
Background:      #FAFAF8
Surface:         #FFFFFF
Dark:            #18181B
Text:            #171717
Muted:           #6B7280
Border:          #E5E7EB
Success:         #16A34A
Danger:          #DC2626
Warning:         #CA8A04
```

The interface was designed responsively from the beginning for:

* Mobile phones
* Tablets
* Laptops
* Desktops
* Large screens

---

# Accessibility

The application includes accessibility focused practices such as:

* Semantic HTML
* Accessible form labels
* Screen reader labels
* ARIA attributes where appropriate
* Keyboard accessible controls
* Visible focus indicators
* Accessible dropdown interactions
* Progress bar semantics
* Error states
* Loading states
* Empty states
* Status announcements
* Touch friendly controls

Accessibility is treated as part of the interface implementation rather than a final stage addition.

---

# Development Scripts

## Frontend

From the project root:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend

From the `server` directory:

```bash
npm run dev
npm run build
npm start
npm run promote:admin -- user@example.com
```

---

# Project Structure

```text
flowdesk/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── context/
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── public/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   ├── prisma.config.ts
│   └── tsconfig.json
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Deployment

FlowDesk uses a separated frontend and backend deployment model.

## Frontend

The React frontend can be deployed as a Vite application to a static hosting platform such as Vercel.

The production frontend must have:

```env
VITE_API_URL=https://your-backend-domain.example.com/api
```

configured in the deployment environment.

The Vercel SPA rewrite ensures that frontend routes such as:

```text
/dashboard
/dashboard/projects
/dashboard/tasks
```

resolve correctly when directly accessed.

---

## Backend

The Express backend can be deployed to a Node compatible hosting platform.

The backend requires:

```env
PORT
CLIENT_URL
DATABASE_URL
SESSION_SECRET
```

The production `CLIENT_URL` must match the deployed frontend origin.

---

## Database

The production database uses PostgreSQL.

Neon PostgreSQL can be used as the hosted PostgreSQL provider.

Prisma migrations should be applied during deployment:

```bash
npx prisma migrate deploy
```

The production database connection string must never be committed to Git.

---

# Production Security Considerations

Before public production use, the following should be verified against the actual deployed domains:

* Frontend can reach the deployed backend
* Backend CORS allows only the intended frontend origin
* Authentication cookies are delivered correctly
* Authentication survives page refresh
* Logout invalidates the session
* Protected routes remain protected
* Administrator routes remain protected
* Ownership checks work against production data
* Production database credentials are stored as environment variables
* `SESSION_SECRET` is a strong random value
* No `.env` files are committed
* API health endpoint responds correctly
* Production frontend uses the deployed API URL

Cross origin authentication behavior should be explicitly tested when frontend and backend are hosted on different domains.

---

# Known Limitations

The following areas are intentionally limited in the current implementation:

* The Forgot Password page is currently an interface and does not implement a complete email based password reset workflow.
* Calendar functionality is based on task due dates rather than a separate event management subsystem.
* There is no real time WebSocket notification delivery.
* Notifications are generated as part of successful backend operations and retrieved through the notification API.
* The application does not currently include file attachments.
* The application does not currently include team or multi member project collaboration.
* The application does not currently include email notification delivery.
* Production authentication should be tested end to end after the frontend and backend are deployed to their final domains.

---

# Submission Checklist

## Task 1

* [x] Responsive web application
* [x] Multi page interface
* [x] Public views
* [x] Authenticated views
* [x] Protected dashboard routes
* [x] Login
* [x] Registration
* [x] Password recovery interface
* [x] Dashboard
* [x] Projects
* [x] Tasks
* [x] Calendar
* [x] Notifications
* [x] Settings
* [x] Responsive navigation
* [x] Loading states
* [x] Error states
* [x] Empty states
* [x] 404 page
* [x] Accessibility foundation
* [x] Responsive mobile layouts
* [x] Responsive tablet layouts
* [x] Responsive desktop layouts

## Task 2

* [x] Backend API
* [x] PostgreSQL database
* [x] Prisma schema
* [x] Prisma migrations
* [x] User registration
* [x] Login
* [x] Logout
* [x] Database backed sessions
* [x] HttpOnly session cookie
* [x] Argon2 password hashing
* [x] HMAC SHA-256 session token hashing
* [x] Server side validation
* [x] Projects CRUD
* [x] Tasks CRUD
* [x] Dashboard API
* [x] Notification API
* [x] Admin API
* [x] User roles
* [x] Server side role authorization
* [x] Ownership checks
* [x] Protected API routes
* [x] Frontend API integration
* [x] Persistent data
* [x] Task status workflow validation
* [x] Automatic project notifications
* [x] Automatic task notifications
* [x] Security middleware
* [x] Rate limiting
* [x] Request body limits
* [x] Frontend build verified
* [x] Backend build verified
* [x] Authentication verified
* [x] Authorization verified
* [x] CRUD workflows verified
* [x] Ownership verified
* [x] Validation verified
* [x] Persistence verified
* [x] Recovery paths verified

## Deployment

* [x] Frontend production build configured
* [x] Backend production build configured
* [x] SPA routing configured
* [ ] Final production frontend API URL configured
* [ ] Final production CORS origin verified
* [ ] Final production authentication flow verified
* [ ] Final production role authorization verified
* [ ] Final production database workflow verified

---

# Final Project Summary

FlowDesk demonstrates an end to end full stack application workflow:

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP Request
 ▼
Express API
 │
 ├── Authentication
 ├── Authorization
 ├── Role Checks
 ├── Validation
 ├── Ownership Checks
 ├── Workflow Rules
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL
 │
 ▼
Persistent Application Data
```

The application is designed to demonstrate not only frontend implementation, but also secure backend request handling, database persistence, authentication, authorization, ownership enforcement, validation, business workflow rules, notifications, responsive design, and deployment readiness.

---

# Author

Built as a full stack application project for an internship submission.

GitHub:

```text
https://github.com/mikeisresilient/flowdesk
```
