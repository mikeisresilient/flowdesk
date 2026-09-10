# FlowDesk

A responsive project-management web application interface built with React, TypeScript, Tailwind CSS, and React Router.

FlowDesk provides a polished multi-page frontend foundation with public and authenticated views, responsive dashboard experiences, reusable UI components, accessible interactions, protected routes, and a service-layer architecture prepared for secure backend integration.

## Internship Objective

> **Responsive Web Application**  
> Build the front-end foundation for a complete web application with public and authenticated views.  
> **Outcome:** A responsive, accessible multi-page application interface ready for secure backend integration.

FlowDesk was built to satisfy this frontend-focused requirement.

## Features

### Public experience
- Responsive landing page
- Responsive navigation
- Sign in
- Create account
- Forgot password
- Responsive footer
- Mobile navigation menu

### Authenticated experience
- Protected dashboard routes
- Dashboard overview
- Projects management interface
- Tasks management interface
- Calendar
- Notifications
- Settings
- Responsive dashboard sidebar
- Desktop dashboard header
- Sign-out flow

### UX and accessibility
- Mobile, tablet, laptop, desktop, and large-screen layouts
- Keyboard-friendly interactive controls
- Visible focus states
- Accessible form labels
- ARIA attributes for relevant interactive elements
- Loading states
- Error states
- Empty states
- Custom accessible dropdown component
- Responsive table/card transformations
- 404 page

### Frontend architecture
- Reusable UI components
- Layout components for public, authentication, and dashboard experiences
- Centralized routing
- Authentication context and hook separation
- Protected route handling
- API abstraction layer
- Typed service modules for authentication, projects, and tasks

## Technology Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React**

## Routes

### Public

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Sign-in page |
| `/register` | Registration page |
| `/forgot-password` | Password recovery page |

### Protected

| Route | Description |
|---|---|
| `/dashboard` | Dashboard overview |
| `/dashboard/projects` | Projects |
| `/dashboard/tasks` | Tasks |
| `/dashboard/calendar` | Calendar |
| `/dashboard/notifications` | Notifications |
| `/dashboard/settings` | Settings |

### Fallback

| Route | Description |
|---|---|
| `*` | Custom 404 page |

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Authentication Scope

The current authentication flow is a **frontend demonstration/mock authentication layer**.

It demonstrates login state, protected routes, persistent frontend session state, logout, and redirecting unauthenticated users to `/login`.

It does **not** claim to provide production-grade authentication.

Production authentication would require a real backend, secure credential handling, server-side session/token validation, password hashing, account verification, secure storage, and other security controls.

## Backend Integration Readiness

The frontend has been structured so backend services can be integrated without rebuilding the application UI.

The service layer currently provides typed contracts for areas such as:

```text
POST /api/auth/login
POST /api/auth/register
POST /api/auth/forgot-password

GET /api/projects
GET /api/projects/:id

GET /api/tasks
GET /api/tasks/:id
```

The API abstraction provides a centralized location for base API URL configuration, HTTP requests, JSON request headers, Bearer-token authorization, HTTP error handling, and typed responses.

Current project and task data remains mock data where a backend endpoint does not yet exist.

## Responsive Design

FlowDesk was designed responsively from the beginning rather than treating mobile support as a final polish.

The interface was checked across mobile, large mobile, tablet, laptop, desktop, and large screens.

Particular attention was given to navigation, cards, tables, forms, filters, dropdowns, calendar layouts, and dashboard content.

## Accessibility

The interface includes accessibility-focused practices such as:

- Semantic HTML where appropriate
- Form labels
- Screen-reader-only labels
- ARIA roles and states for custom controls
- Keyboard interaction for the custom dropdown
- Visible focus indicators
- Accessible button labels
- Progress-bar semantics
- Error and status announcements

## Design System

The interface uses a warm yellow-led visual system with neutral surfaces and strong contrast.

Primary visual tokens include:

- Primary yellow: `#F5C542`
- Primary dark: `#D9A514`
- Primary light: `#FFF4C7`
- Background: `#FAFAF8`
- Surface: `#FFFFFF`
- Dark: `#18181B`

## Current Scope

This project intentionally focuses on the **frontend foundation required by the internship brief**.

Included:
- Responsive interface
- Public views
- Authenticated views
- Protected routing
- Reusable components
- Accessibility foundation
- Loading/error/empty states
- Backend-ready service architecture

Not included:
- Production backend
- Production database
- Real user authentication
- Real password reset delivery
- Production authorization
- Real-time infrastructure
- Deployment infrastructure
- Production monitoring

These can be added as a separate production phase if required.

## Submission Checklist

- [x] Responsive web application
- [x] Multi-page interface
- [x] Public views
- [x] Authenticated views
- [x] Protected dashboard routes
- [x] Login interface
- [x] Registration interface
- [x] Password recovery interface
- [x] Dashboard
- [x] Projects
- [x] Tasks
- [x] Calendar
- [x] Notifications
- [x] Settings
- [x] Responsive navigation
- [x] Custom responsive dropdown
- [x] Loading state
- [x] Error state
- [x] Empty states
- [x] 404 page
- [x] Accessibility foundation
- [x] API/service abstraction
- [x] Production build verified
- [x] Responsive audit completed

## Author

Built as a frontend application project for an internship submission.
