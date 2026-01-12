# Architecture Overview

This document describes the technical architecture of the Hardware NPI Planning application.

## System Overview

The application is a **Firebase-native** web application built with Next.js, using Firebase for hosting, authentication, and database services. The architecture follows a modern, serverless approach with client-side rendering and GraphQL-based data access.

## Technology Stack

### Frontend

- **Next.js 14+** (App Router): React framework with server-side rendering capabilities
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **TanStack Query**: Server state management and data fetching
- **Zustand**: Client-side state management
- **React Hook Form + Zod**: Form handling and validation

### Backend & Infrastructure

- **Firebase Hosting**: Static site hosting with CDN
- **Firebase Authentication**: User authentication (Email/Password + Google OAuth)
- **Firebase Data Connect**: Managed PostgreSQL database via Cloud SQL
- **NextAuth.js v5**: Authentication middleware and session management

### Data Access

- **GraphQL**: Schema definition and queries via Firebase Data Connect
- **TypeScript SDK**: Auto-generated from GraphQL schema
- **Authorization**: Row-level security via Auth.js context

## Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Next.js App (React + TypeScript)         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │  Pages   │  │Components│  │ Services │      │   │
│  │  └──────────┘  └──────────┘  └──────────┘      │   │
│  │         │              │              │          │   │
│  │         └──────────────┼──────────────┘          │   │
│  │                        │                          │   │
│  │              ┌─────────▼─────────┐               │   │
│  │              │  TanStack Query   │               │   │
│  │              │   (Data Fetching) │               │   │
│  │              └─────────┬─────────┘               │   │
│  └────────────────────────┼─────────────────────────┘   │
└────────────────────────────┼─────────────────────────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
        ┌───────▼───┐  ┌─────▼─────┐  ┌──▼──────────┐
        │  Firebase │  │  Firebase │  │   Firebase  │
        │   Auth    │  │   Data    │  │   Hosting   │
        │           │  │  Connect  │  │             │
        └───────────┘  └───────────┘  └─────────────┘
                             │
                    ┌────────▼────────┐
                    │  Cloud SQL      │
                    │  (PostgreSQL)   │
                    └─────────────────┘
```

## Data Model

The application uses a hierarchical data model:

```
Organization
├── User (roles: ADMIN, MANAGER, MEMBER, VIEWER)
├── Portfolio
│   └── Program
│       └── Project
│           ├── ProjectPhase
│           └── ProjectAssignment
├── PhaseTemplate
│   └── PhaseTemplatePhase
├── ProductType
│   └── ProductTypePhaseConfig
└── Team
    └── TeamMember
```

### Key Design Principles

1. **Single Source of Truth**: Data Connect schema (`dataconnect/schema.gql`) is the authoritative schema definition
2. **Multi-tenant Ready**: All data is scoped to an Organization
3. **Percentage-based Allocations**: Resource allocations are 0-100% with date ranges
4. **Template-based Phases**: NPI phases are generated from templates but can be customized per project
5. **Fiscal Year Awareness**: Organization-level fiscal year configuration supports different FY start months

## Authentication Flow

```
User → NextAuth.js → Firebase Auth → Session Token
                      ↓
              Firebase Data Connect
              (with user context)
```

1. User authenticates via NextAuth.js
2. NextAuth.js validates with Firebase Auth
3. Session token stored in HTTP-only cookie
4. Data Connect operations include user context for authorization
5. Row-level security enforced at database level

## Data Access Pattern

### GraphQL Operations

All data access goes through Firebase Data Connect GraphQL operations:

1. **Schema Definition**: `dataconnect/schema.gql` defines tables and relationships
2. **Operations**: `dataconnect/operations/*.gql` define queries and mutations
3. **SDK Generation**: TypeScript SDK auto-generated from schema
4. **Client Usage**: Services use generated SDK with type safety

### Example Flow

```typescript
// Service layer
const projects = await getProjects(portfolioId);

// Generated SDK
export async function getProjects(portfolioId: string) {
  return await executeQuery({
    query: GET_PROJECTS_QUERY,
    variables: { portfolioId },
  });
}

// Data Connect enforces authorization
// based on user context from NextAuth
```

## State Management

### Server State (TanStack Query)

- API responses
- Cached data
- Background refetching
- Optimistic updates

### Client State (Zustand)

- UI state (sidebar collapsed, filters)
- Form state (draft changes)
- Temporary selections

## Component Architecture

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── dashboard/         # Dashboard page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   ├── visualizations/    # Charts, Gantt, etc.
│   └── shared/            # Shared components
├── services/              # Business logic & API calls
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── lib/                   # Utilities
└── types/                 # TypeScript definitions
```

## Routing

Next.js App Router handles routing:

- `/` - Home page
- `/dashboard` - Executive dashboard
- `/timeline` - Project timeline (Gantt view)
- `/resources` - Resource overview
- `/projects/[id]` - Project detail
- `/projects/[id]/resources` - Project resource assignments
- `/resources/people/[id]` - Person allocation view

## Deployment Architecture

### CI/CD Pipeline

```
GitHub Repository (main branch)
    ↓
GitHub Actions Workflow
    ├── Install dependencies
    ├── Type check
    ├── Lint
    ├── Run tests
    ├── Build Next.js app
    ├── Static export
    └── Deploy to Firebase Hosting
```

### Environments

- **Development**: Local with Firebase emulators (optional)
- **Production**: Firebase Hosting (auto-deploy on `main` branch merge)

## Security

### Authentication

- NextAuth.js handles session management
- Firebase Auth provides identity verification
- HTTP-only cookies for session storage

### Authorization

- Role-based access control (ADMIN, MANAGER, MEMBER, VIEWER)
- Row-level security in Data Connect
- User context passed to all queries

### Data Validation

- Zod schemas for form validation
- TypeScript for compile-time safety
- GraphQL schema validation

## Performance Considerations

### Client-Side

- Code splitting via Next.js App Router
- Lazy loading of heavy components (charts, tables)
- Optimistic UI updates
- TanStack Query caching

### Server-Side

- Static generation where possible
- Firebase Hosting CDN
- Database indexing on frequently queried fields

## Scalability

- **Horizontal Scaling**: Firebase services scale automatically
- **Database**: Cloud SQL PostgreSQL supports high concurrency
- **Caching**: TanStack Query reduces redundant API calls
- **CDN**: Firebase Hosting provides global CDN

## Monitoring & Observability

- Firebase Console for service metrics
- Error tracking (can integrate Sentry)
- User analytics (Firebase Analytics)

## Future Enhancements

- Real-time updates via Firebase Realtime Database or subscriptions
- Offline support with service workers
- Advanced caching strategies
- Multi-region deployment
