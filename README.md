# FlowDesk

FlowDesk is a responsive full stack project management web application built with React, TypeScript, Express, PostgreSQL, Prisma, and Tailwind CSS.

The application provides authenticated project and task management with persistent database storage, server side validation, session based authentication, protected API routes, and ownership checks.

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
- Persistent data
- Reproducible project setup

---

## Features

### Public experience

- Responsive landing page
- Responsive navigation
- Sign in
- Create account
- Forgot password interface
- Responsive footer
- Mobile navigation

### Authentication

- User registration
- User login
- Server side credential validation
- Argon2 password hashing
- Database backed sessions
- HttpOnly session cookies
- Session expiration
- Session restoration after page refresh
- Logout
- Protected frontend routes
- Protected backend API routes

### Projects

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

### Tasks

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

### Dashboard

- Authenticated dashboard
- Real project statistics
- Real task statistics
- Project progress
- Task completion statistics
- Recent projects
- Recent activity
- Loading states
- Error states
- Empty states

### UX and accessibility

- Mobile responsive layouts
- Tablet layouts
- Laptop layouts
- Desktop layouts
- Large screen layouts
- Keyboard friendly controls
- Visible focus states
- Accessible form labels
- ARIA attributes where appropriate
- Loading states
- Error states
- Empty states
- Responsive tables and cards
- Accessible custom dropdown
- Responsive dashboard navigation

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Backend

- Node.js
- Express
- TypeScript
- Zod
- Argon2
- Cookie Parser
- Helmet
- CORS
- Express Rate Limit

## Database

- PostgreSQL
- Neon PostgreSQL
- Prisma ORM

## Authentication

- Database backed sessions
- HttpOnly cookies
- HMAC SHA-256 session token hashing
- Argon2 password hashing

---

# Architecture

FlowDesk uses a separated frontend and backend architecture.

```text
flowdesk/
│
├── src/                       # React frontend
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
├── server/                    # Express backend
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
└── README.md
````

The frontend communicates with the backend through a centralized API service.

The backend is responsible for:

1. Authentication
2. Authorization
3. Validation
4. Database operations
5. Ownership checks
6. Session management

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

### Relationships

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

---

# Routes

## Public routes

| Route              | Description                 |
| ------------------ | --------------------------- |
| `/`                | Landing page                |
| `/login`           | Sign in                     |
| `/register`        | Create account              |
| `/forgot-password` | Password recovery interface |

## Protected frontend routes

| Route                      | Description        |
| -------------------------- | ------------------ |
| `/dashboard`               | Dashboard overview |
| `/dashboard/projects`      | Project management |
| `/dashboard/tasks`         | Task management    |
| `/dashboard/calendar`      | Calendar           |
| `/dashboard/notifications` | Notifications      |
| `/dashboard/settings`      | Account settings   |

---

# API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

## Projects

```text
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

## Tasks

```text
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

## Health

```text
GET /api/health
```

---

# Security

Security is implemented at the backend boundary rather than relying only on frontend controls.

## Password security

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

## Session security

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

Sessions have an expiration time and are removed when invalid or expired.

## Ownership checks

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

## Server side validation

Requests are validated using Zod before database operations.

Examples include:

* Minimum and maximum name lengths
* Valid email addresses
* Password length
* Valid project statuses
* Valid task statuses
* Valid task priorities
* Progress between 0 and 100
* Valid date formats
* Required fields

Frontend validation is treated as a user experience feature.

The backend remains the source of truth for request validation.

## HTTP security

The API uses:

* Helmet
* CORS configuration
* Rate limiting
* HttpOnly cookies
* Request body limits
* Server side validation

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

For production, `VITE_API_URL` should point to the deployed backend API.

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

Never commit real credentials or secrets.

A safe template is provided in:

```text
.env.example
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/mikeisresilient/flowdesk.git
cd flowdesk
```

## 2. Install frontend dependencies

From the project root:

```bash
npm install
```

## 3. Install backend dependencies

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

Then return to the server directory:

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

## Backend

From the server directory:

```bash
npm run build
```

Start the compiled backend:

```bash
npm start
```

---

# Verification

The following workflows were tested during development.

## Authentication

* Registration succeeds with valid data
* Duplicate email registration is rejected
* Login succeeds with valid credentials
* Invalid credentials are rejected
* `/api/auth/me` rejects unauthenticated requests
* Authenticated sessions survive page refresh
* Logout invalidates the session
* Session cookie uses HttpOnly protection

## Projects

* Unauthenticated project creation is rejected
* Authenticated project creation succeeds
* Projects persist in PostgreSQL
* Projects can be retrieved
* Projects can be edited
* Projects can be deleted
* Invalid project data is rejected
* Users cannot access another user's project
* Users cannot modify another user's project
* Users cannot delete another user's project

## Tasks

* Unauthenticated task creation is rejected
* Authenticated task creation succeeds
* Tasks persist in PostgreSQL
* Tasks can be retrieved
* Tasks can be edited
* Tasks can be deleted
* Invalid task data is rejected
* Tasks persist after browser refresh
* Edited tasks persist after browser refresh
* Deleted tasks remain deleted after browser refresh
* Users cannot access another user's task
* Users cannot modify another user's task
* Users cannot delete another user's task
* Task project assignments are ownership checked

## Server side validation

An invalid task request was tested directly against the API.

Example invalid request:

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

---

# Current Application State

Task 1 frontend requirements have been implemented.

Task 2 backend integration currently includes:

* Real authentication
* Database backed sessions
* PostgreSQL persistence
* Prisma ORM
* User registration
* Login
* Logout
* Session restoration
* Project CRUD
* Task CRUD
* Server side validation
* Ownership checks
* Protected API routes
* Frontend API integration
* Persistent dashboard data
* Security middleware
* Rate limiting
* Responsive authenticated interface

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
Text:             #171717
Muted:            #6B7280
Border:           #E5E7EB
Success:          #16A34A
Danger:           #DC2626
Warning:          #CA8A04
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
* Status announcements

---

# Development Scripts

## Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend

```bash
npm run dev
npm run build
npm start
```

---

# Project Structure

```text
flowdesk/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
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
* [x] Server side validation
* [x] Projects CRUD
* [x] Tasks CRUD
* [x] Ownership checks
* [x] Protected API routes
* [x] Frontend API integration
* [x] Persistent data
* [x] Security middleware
* [x] Rate limiting
* [x] Frontend build verified
* [x] Backend build verified
* [x] Authentication verified
* [x] CRUD workflows verified
* [x] Validation verified
* [x] Persistence verified

---

# Author

Built as a full stack application project for an internship submission.

```
