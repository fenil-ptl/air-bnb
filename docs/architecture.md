# Architecture

## Overview

This project is a monorepo containing a Next.js frontend, an Express backend, and shared TypeScript packages.

## Stack

| Layer    | Technologies                                              |
| -------- | --------------------------------------------------------- |
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS            |
| Backend  | Node.js, Express, TypeScript, MongoDB, Mongoose            |
| Shared   | TypeScript package for cross-workspace types                |

## Workspace Layout

```
airbnb-clone/
├── frontend/          # Next.js application
├── backend/           # Express API server
├── packages/
│   └── shared/        # Shared types and utilities
└── docs/              # Project documentation
```

## Communication

The frontend communicates with the backend via HTTP. The API base URL is configured through the `NEXT_PUBLIC_API_URL` environment variable.

## Database

MongoDB is the primary data store. Connection details are configured in the backend via the `MONGODB_URI` environment variable.
