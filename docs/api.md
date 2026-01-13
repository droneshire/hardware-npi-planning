# API Reference

This document describes the Firebase Data Connect API operations and data model for the Hardware NPI Planning application.

## Overview

All data access is performed through Firebase Data Connect, which provides a GraphQL interface to a managed PostgreSQL database. The schema is defined in `dataconnect/schema.gql` and operations are defined in `dataconnect/operations/*.gql`.

## Schema Overview

The complete schema is defined in `dataconnect/schema.gql`. This document provides a high-level overview of the data model.

## Data Model

### Organization

The root entity that scopes all data. Multi-tenant ready.

```graphql
type Organization {
  id: ID!
  name: String!
  fiscalYearStartMonth: Int! # 1-12
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### User

Users belong to an organization and have a role.

```graphql
type User {
  id: ID!
  organizationId: ID!
  email: String!
  name: String
  role: UserRole! # ADMIN, MANAGER, MEMBER, VIEWER
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum UserRole {
  ADMIN
  MANAGER
  MEMBER
  VIEWER
}
```

### Portfolio

Top-level grouping of programs and projects.

```graphql
type Portfolio {
  id: ID!
  organizationId: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Program

Programs belong to a portfolio and contain projects.

```graphql
type Program {
  id: ID!
  portfolioId: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Project

Projects belong to a program and have phases and assignments.

```graphql
type Project {
  id: ID!
  programId: ID!
  productTypeId: ID
  name: String!
  description: String
  status: ProjectStatus! # PLANNING, ACTIVE, ON_HOLD, COMPLETED, CANCELLED
  startDate: Date
  endDate: Date
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum ProjectStatus {
  PLANNING
  ACTIVE
  ON_HOLD
  COMPLETED
  CANCELLED
}
```

### PhaseTemplate

Reusable phase templates (e.g., EVT/DVT/PVT/MP).

```graphql
type PhaseTemplate {
  id: ID!
  organizationId: ID!
  name: String!
  description: String
  isDefault: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PhaseTemplatePhase {
  id: ID!
  phaseTemplateId: ID!
  name: String!
  description: String
  order: Int!
  estimatedDurationDays: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### ProjectPhase

Phases copied from templates to projects (can be customized).

```graphql
type ProjectPhase {
  id: ID!
  projectId: ID!
  name: String!
  description: String
  order: Int!
  status: PhaseStatus! # NOT_STARTED, IN_PROGRESS, COMPLETED, BLOCKED
  startDate: Date
  endDate: Date
  actualDurationDays: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum PhaseStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  BLOCKED
}
```

### ProductType

Product types link to phase templates.

```graphql
type ProductType {
  id: ID!
  organizationId: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ProductTypePhaseConfig {
  id: ID!
  productTypeId: ID!
  phaseTemplateId: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Team

Hierarchical team structure.

```graphql
type Team {
  id: ID!
  organizationId: ID!
  parentTeamId: ID
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type TeamMember {
  id: ID!
  teamId: ID!
  userId: ID!
  role: String
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### ProjectAssignment

Resource assignments with percentage allocation.

```graphql
type ProjectAssignment {
  id: ID!
  projectId: ID!
  userId: ID!
  allocationPercentage: Float! # 0-100
  startDate: Date!
  endDate: Date!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

## GraphQL Operations

Operations are defined in `dataconnect/operations/*.gql`. Each entity typically has:

- `list*` - Query to list entities (with filters)
- `get*` - Query to get a single entity by ID
- `create*` - Mutation to create an entity
- `update*` - Mutation to update an entity
- `delete*` - Mutation to delete an entity

### Example Operations

#### List Projects

```graphql
query ListProjects($portfolioId: ID, $programId: ID) {
  projects(portfolioId: $portfolioId, programId: $programId) {
    id
    name
    status
    startDate
    endDate
    program {
      id
      name
      portfolio {
        id
        name
      }
    }
  }
}
```

#### Create Project

```graphql
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    status
    createdAt
  }
}
```

#### Assign Resource to Project

```graphql
mutation AssignResource($input: CreateProjectAssignmentInput!) {
  createProjectAssignment(input: $input) {
    id
    userId
    allocationPercentage
    startDate
    endDate
  }
}
```

## TypeScript SDK

The TypeScript SDK is auto-generated from the GraphQL schema. After running `firebase dataconnect:sdk:generate`, you can import types and operations:

```typescript
import { executeQuery, executeMutation } from "@/dataconnect/generated"
import { GetProjectsQuery, CreateProjectMutation } from "@/dataconnect/generated/queries"
```

### Usage Example

```typescript
// In a service file
import { executeQuery } from "@/dataconnect/generated"
import { GetProjectsDocument } from "@/dataconnect/generated/queries"

export async function getProjects(programId: string) {
  const result = await executeQuery({
    query: GetProjectsDocument,
    variables: { programId },
  })
  return result.data?.projects || []
}
```

## Authorization

All operations include user context from NextAuth.js. Data Connect enforces row-level security:

- Users can only access data from their organization
- Role-based permissions (ADMIN, MANAGER, MEMBER, VIEWER)
- Project assignments are scoped to the user's organization

## Validation Rules

### Allocation Percentage

- Must be between 0 and 100
- Over-allocation (>100% total for a user in a date range) is detected but not prevented (warning shown)

### Date Ranges

- `startDate` must be before `endDate`
- Project phases must fall within project date range
- Assignments must have valid date ranges

### Required Fields

- Organization: `name`, `fiscalYearStartMonth`
- User: `email`, `role`
- Project: `name`, `status`, `programId`
- Assignment: `projectId`, `userId`, `allocationPercentage`, `startDate`, `endDate`

## Error Handling

GraphQL operations return errors in the standard format:

```json
{
  "errors": [
    {
      "message": "User not authorized",
      "extensions": {
        "code": "UNAUTHORIZED"
      }
    }
  ]
}
```

Common error codes:

- `UNAUTHORIZED` - User lacks permission
- `NOT_FOUND` - Entity doesn't exist
- `VALIDATION_ERROR` - Input validation failed
- `CONSTRAINT_VIOLATION` - Database constraint violation

## Rate Limiting

Firebase Data Connect has default rate limits. For high-volume operations, consider:

- Batching queries where possible
- Caching results with TanStack Query
- Using pagination for large lists

## Best Practices

1. **Use the generated SDK**: Always use the TypeScript SDK for type safety
2. **Handle errors**: Always check for errors in responses
3. **Cache queries**: Use TanStack Query for automatic caching
4. **Optimistic updates**: Update UI optimistically, then sync with server
5. **Validate inputs**: Use Zod schemas before sending mutations

## See Also

- [Setup Guide](setup.md) - How to generate and use the SDK
- [Architecture](architecture.md) - System architecture overview
- [Development Guide](development.md) - Development workflow
