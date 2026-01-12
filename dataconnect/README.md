# Firebase Data Connect Operations

This directory contains the GraphQL schema and operations for the Hardware NPI Planning application.

## Structure

```
dataconnect/
├── schema.gql              # Database schema (SOURCE OF TRUTH)
├── operations/             # GraphQL queries and mutations
│   ├── organization.gql    # Organization operations
│   ├── user.gql           # User operations
│   ├── portfolio.gql      # Portfolio operations
│   ├── program.gql        # Program operations
│   ├── project.gql        # Project operations
│   ├── projectPhase.gql   # Project phase operations
│   ├── projectAssignment.gql # Resource assignment operations
│   ├── team.gql           # Team operations
│   ├── phaseTemplate.gql  # Phase template operations
│   └── productType.gql    # Product type operations
└── generated/             # Generated TypeScript SDK (after generation)
```

## Schema Overview

The schema defines a complete data model for NPI planning:

### Core Entities
- **Organization**: Multi-tenant root entity with fiscal year configuration
- **User**: Users with roles (ADMIN, MANAGER, MEMBER, VIEWER)
- **Portfolio → Program → Project**: Three-level hierarchy for organizing work

### NPI Planning
- **PhaseTemplate**: Reusable templates (e.g., EVT/DVT/PVT/MP)
- **PhaseTemplatePhase**: Individual phases within a template
- **ProjectPhase**: Actual phases copied to projects
- **ProductType**: Product categories (Laptop, Phone, etc.)
- **ProductTypePhaseConfig**: Links product types to default templates

### Resource Planning
- **Team**: Hierarchical team structure
- **TeamMember**: Team membership with roles
- **ProjectAssignment**: Percentage-based (0-100%) resource allocations

## Operations Coverage

### Organization (3 operations)
- `GetOrganization` - Query organization with related data
- `CreateOrganization` - Create new organization
- `UpdateOrganization` - Update organization settings

### User (6 operations)
- `ListUsers` - Query all users in organization
- `GetUser` - Query single user with assignments and teams
- `GetUserByEmail` - Find user by email
- `GetUserByFirebaseUid` - Find user by Firebase UID
- `CreateUser` - Create new user
- `UpdateUser` - Update user details
- `DeleteUser` - Delete user

### Portfolio (5 operations)
- `ListPortfolios` - Query all portfolios in organization
- `GetPortfolio` - Query single portfolio with programs
- `CreatePortfolio` - Create new portfolio
- `UpdatePortfolio` - Update portfolio
- `DeletePortfolio` - Delete portfolio (cascades to programs/projects)

### Program (5 operations)
- `ListPrograms` - Query all programs in portfolio
- `GetProgram` - Query single program with projects
- `CreateProgram` - Create new program
- `UpdateProgram` - Update program
- `DeleteProgram` - Delete program (cascades to projects)

### Project (6 operations)
- `ListProjects` - Query all projects in program
- `GetProject` - Query single project with full details
- `ListProjectsByStatus` - Query projects by status
- `CreateProject` - Create new project
- `UpdateProject` - Update project
- `DeleteProject` - Delete project (cascades to phases/assignments)

### Project Phase (5 operations)
- `ListProjectPhases` - Query all phases for project (ordered)
- `GetProjectPhase` - Query single phase
- `CreateProjectPhase` - Create new phase
- `UpdateProjectPhase` - Update phase (status, dates, completion %)
- `DeleteProjectPhase` - Delete phase

### Project Assignment (6 operations)
- `ListProjectAssignments` - Query assignments for project
- `ListUserAssignments` - Query assignments for user
- `ListAssignmentsByDateRange` - Query assignments in date range
- `CreateProjectAssignment` - Create new assignment
- `UpdateProjectAssignment` - Update assignment
- `DeleteProjectAssignment` - Delete assignment

### Team (8 operations)
- `ListTeams` - Query all teams in organization
- `GetTeam` - Query single team with members
- `CreateTeam` - Create new team
- `UpdateTeam` - Update team
- `DeleteTeam` - Delete team
- `AddTeamMember` - Add user to team
- `RemoveTeamMember` - Remove user from team
- `UpdateTeamMemberRole` - Update member's team role

### Phase Template (9 operations)
- `ListPhaseTemplates` - Query all templates in organization
- `GetPhaseTemplate` - Query single template with phases
- `GetDefaultTemplates` - Query default templates
- `CreatePhaseTemplate` - Create new template
- `UpdatePhaseTemplate` - Update template
- `DeletePhaseTemplate` - Delete template
- `CreatePhaseTemplatePhase` - Add phase to template
- `UpdatePhaseTemplatePhase` - Update template phase
- `DeletePhaseTemplatePhase` - Delete template phase

### Product Type (6 operations)
- `ListProductTypes` - Query all product types
- `GetProductType` - Query single product type with configs
- `CreateProductType` - Create new product type
- `UpdateProductType` - Update product type
- `DeleteProductType` - Delete product type
- `CreateProductTypePhaseConfig` - Link template to product type
- `DeleteProductTypePhaseConfig` - Unlink template

**Total: 64 GraphQL operations**

## Generating the TypeScript SDK

After defining operations, generate the TypeScript SDK:

```bash
firebase dataconnect:sdk:generate
```

This creates type-safe functions in `generated/` directory that can be imported and used in service layers.

## Usage in Services

The service layer (`src/services/`) uses the generated SDK:

```typescript
import { listPortfolios, createPortfolio } from '@/dataconnect/generated'

// Query portfolios
const result = await listPortfolios({ organizationId })
const portfolios = result.data.portfolios

// Create portfolio
const newPortfolio = await createPortfolio({
  organizationId: "...",
  name: "New Portfolio",
  description: "Description"
})
```

## Authentication

All operations use `@auth(level: USER)` directive, requiring authenticated users.

Authorization logic should be implemented in Firebase Data Connect security rules or in the application layer.

## Key Features

### Fiscal Year Support
- Organization has configurable `fiscalYearStartMonth` (1-12)
- Utility functions calculate fiscal year and quarters
- Timeline views can toggle between fiscal and calendar year

### Percentage-Based Allocations
- All assignments use `allocationPercent` (0-100)
- Validation in service layer and UI
- Over-allocation detection (>100%)

### Date Ranges
- All assignments have `startDate` and optional `endDate`
- Queries support date range filtering
- Enables temporal resource planning

### Hierarchical Structures
- Portfolio → Program → Project (3 levels)
- Teams support parent-child relationships
- Phase templates support custom ordering

### Cascading Deletes
- Deleting portfolio removes all programs and projects
- Deleting program removes all projects
- Deleting project removes all phases and assignments
- ⚠️ Use with caution - ensure user confirmation

## Next Steps

1. ✅ Schema defined
2. ✅ Operations created
3. ⏳ Generate SDK: `firebase dataconnect:sdk:generate`
4. ⏳ Update service layer to use generated SDK
5. ⏳ Build UI components for CRUD operations
6. ⏳ Implement authorization rules
7. ⏳ Add comprehensive error handling

## Notes

- **No Prisma**: Data Connect is the single ORM
- **Type Safety**: Generated SDK provides full TypeScript types
- **Performance**: Use specific queries to fetch only needed data
- **Consistency**: All timestamps use `Timestamp!` type
- **UUIDs**: All IDs use `UUID!` type for uniqueness
