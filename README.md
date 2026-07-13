# Airbnb Clone

A full-stack monorepo foundation for an Airbnb-style marketplace application.

## Overview

This repository contains the project scaffold for a modern web application with a Next.js frontend, Express backend, and shared TypeScript packages. The foundation is configured for production-grade development but contains no business logic — it is ready for feature implementation.

### Tech Stack

**Frontend**

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- TanStack Query
- Axios

**Backend**

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [npm](https://www.npmjs.com/) >= 10
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd airbnb-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Update the values in each file as needed.

### 4. Start development servers

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or start them individually:

```bash
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:5000
```

## Folder Structure

```
airbnb-clone/
├── frontend/
│   ├── public/                 # Static assets
│   └── src/
│       ├── app/                # Next.js App Router
│       ├── components/         # React components
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Frontend utilities and config
│       ├── providers/          # React context providers
│       ├── services/           # API client layer
│       ├── types/              # Frontend-specific types
│       └── utils/              # Helper functions
├── backend/
│   └── src/
│       ├── config/             # Configuration modules
│       ├── controllers/        # Request handlers
│       ├── middleware/         # Express middleware
│       ├── models/             # Mongoose models
│       ├── routes/             # API route definitions
│       ├── services/           # Business logic layer
│       ├── types/              # Backend-specific types
│       ├── utils/              # Helper functions
│       ├── app.ts              # Express application setup
│       └── server.ts           # Server entry point
├── packages/
│   └── shared/
│       └── src/
│           ├── types/          # Shared TypeScript types
│           └── index.ts        # Package entry point
└── docs/                       # Project documentation
```

## Available Scripts

Run from the repository root:

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start frontend and backend in dev mode   |
| `npm run dev:frontend`  | Start Next.js dev server                 |
| `npm run dev:backend`   | Start Express dev server                 |
| `npm run build`         | Build all workspaces                     |
| `npm run build:frontend`| Build the Next.js application            |
| `npm run build:backend` | Compile the Express server               |
| `npm run start:frontend`| Start the production Next.js server      |
| `npm run start:backend` | Start the production Express server      |
| `npm run lint`          | Lint frontend and backend                |
| `npm run format`        | Format all files with Prettier           |
| `npm run format:check`  | Check formatting without writing changes |

### Workspace Scripts

Each workspace also supports its own scripts via `npm run <script> -w <workspace>`:

```bash
npm run typecheck -w frontend
npm run typecheck -w backend
npm run typecheck -w @airbnb-clone/shared
```

## Path Aliases

Both frontend and backend are configured with TypeScript path aliases:

- **Frontend:** `@/*` maps to `frontend/src/*`
- **Backend:** `@/*` maps to `backend/src/*`

## License

Private — All rights reserved.
"# air-bnb" 
"# air-bnb" 
