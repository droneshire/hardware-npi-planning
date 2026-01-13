---
task: Build a modern looking, comprehensive hardware NPI (New Product Introduction) planning web application built with Next.js and Firebase.
test_command: "npm run test"
---

# Task: CLI Todo App (TypeScript)

Build a modern looking, comprehensive hardware NPI (New Product Introduction) planning web application built with Next.js and Firebase.
The system supports portfolio → program → project hierarchies, customizable NPI phase templates, and percentage-based resource planning with fiscal-year awareness.

## Requirements

A comprehensive hardware NPI (New Product Introduction) planning web application built with Next.js and Firebase.
The system supports portfolio → program → project hierarchies, customizable NPI phase templates, and percentage-based resource planning with fiscal-year awareness.

The application is **Firebase-native**, using Firebase for:

- Hosting
- Authentication
- Managed PostgreSQL (via Firebase Data Connect)
- CI/CD deployment

Primary use cases:

- Executive portfolio visibility
- Program-level planning and tradeoff analysis
- Resource allocation and capacity tracking
- Historical auditability of NPI plans

---

## Key Decisions

| Decision          | Choice                                                         |
| ----------------- | -------------------------------------------------------------- |
| Platform          | **Firebase-based application**                                 |
| Authentication    | Firebase Auth via NextAuth.js (email/password + Google OAuth)  |
| Hierarchy         | Portfolio → Program → Project (with rollups at each level)     |
| Database          | Firebase Data Connect (managed PostgreSQL via Cloud SQL)       |
| Schema authority  | **Data Connect is the single source of truth**                 |
| NPI Phases        | Default templates (EVT/DVT/PVT/MP) + per-project customization |
| Resource planning | Percentage-based allocations with date ranges                  |
| Multi-tenancy     | Single organization initially (multi-tenant–ready schema)      |
| Fiscal year       | Organization-configurable FY start month (1–12)                |
| Deployment        | GitHub Actions → Firebase Hosting on `main`                    |

---

## Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 14+ (App Router)                        |
| Language    | TypeScript                                      |
| Platform    | Firebase                                        |
| Database    | Firebase Data Connect (Cloud SQL – PostgreSQL)  |
| Data access | Data Connect GraphQL + generated TypeScript SDK |
| Auth        | NextAuth.js v5 (Auth.js) + Firebase Auth        |
| Hosting     | Firebase Hosting                                |
| UI          | shadcn/ui + Tailwind CSS                        |
| Tables      | TanStack Table v8                               |
| Charts      | Recharts + D3 (custom Gantt rendering)          |
| State       | TanStack Query + Zustand                        |
| Forms       | React Hook Form + Zod                           |
| Testing     | Vitest + Playwright                             |
| CI/CD       | GitHub Actions                                  |

**Explicit non-goal**: Prisma is not used as an ORM. All schema definitions live in Data Connect.

---

## CI / CD & Deployment

### Source Control

- GitHub repository
- `main` is the production branch

### Environments

- `main` → production Firebase project
- (Optional later) `staging` branch → staging Firebase project

---

## UI Principles (Design System)

### Design goals

- Modern, executive-friendly, dark themed
- Dense enough for planning, never cramped
- Data clarity over decoration
- Reference UIs - Robinhood, Ramp, Github

### Core principles

| Principle          | Standard                                                  |
| ------------------ | --------------------------------------------------------- |
| Predictability     | Consistent page layout: title left, actions right         |
| Density control    | Comfortable by default; density toggles only where useful |
| Minimal chrome     | Prefer whitespace + borders over heavy shadows            |
| One primary action | Exactly one primary CTA per page                          |
| Fast feedback      | Skeletons, inline validation, optimistic UI where safe    |
| Accessibility      | Keyboard navigation, focus rings, semantic HTML           |
| Data-first visuals | Charts exist to support decisions, not decoration         |

---

## UI Components Checklist

### Layout & Navigation

- Sidebar (collapsible)
- Top header
- Breadcrumbs
- Command palette (optional)

### Typography

- PageTitle
- SectionTitle
- MutedDescription
- InlineLabel

### Surfaces & Structure

- Card
- Tabs
- Separator
- Collapsible sections

### Forms

- Input
- Select
- Combobox
- DateRangePicker
- Slider + numeric input (allocation %)
- Switch
- Inline validation messaging

### Tables (Critical)

- TanStack Table wrapper with:
  - Sticky headers
  - Column resize
  - Row hover + actions menu
  - Saved views
  - Optional density toggle

### Feedback & States

- Skeleton
- EmptyState
- Toast
- Alert
- InlineError

### Resource Planning

- CapacityBadge (normal / warning / critical)
- Over-allocation callouts
- Per-row allocation indicators

### Timeline / Gantt

- Lightweight grid
- Phase bars with semantic color
- Hover tooltips
- Context menu
- Zoom controls (quarter ↔ month later)

---

## Core Pages

### 1. Projects Timeline (`/timeline`)

- Gantt-style horizontal bars per project - inline phases
- Quarterly granularity (initial)
- Fiscal year or calendar year toggle
- Filter by portfolio, program, product type, status
- Click-through to project detail
- Ability to expand and contract phases inline and move left/right in time
- Relative sliding of resources when the "collide" in the gantt - auto snapping

### 2. Resources Overview (`/resources`)

- Organization-wide resource list
- Team grouping
- Capacity summary
- Over-allocation warnings

### 3. Project Assignments (`/projects/[id]/resources`)

- Assign people to project
- Allocation percentage
- Assignment start/end dates
- Live validation for over-allocation

### 4. Person View (`/resources/people/[id]`)

- Quarterly breakdown of allocations
- Bar chart by project
- Historical assignment view
- Total allocation indicator (>100% warning)

---

## Data Model (Logical)

Canonical schema is defined in **Data Connect GraphQL** (`dataconnect/schema.gql`).

Organization
├─ User (roles: ADMIN, MANAGER, MEMBER, VIEWER)
├─ Portfolio
│ └─ Program
│ └─ Project
│ ├─ ProjectPhase
│ └─ ProjectAssignment
├─ PhaseTemplate
│ └─ PhaseTemplatePhase
├─ ProductType
│ └─ ProductTypePhaseConfig
├─ Team
│ └─ TeamMember

### Key rules

- All allocations are percentage-based (0–100)
- All assignments are date-ranged
- Phase templates are copied into projects at creation
- Fiscal year start month stored on Organization
- Team hierarchy supports parentTeamId

---

## API & Data Access

### Firebase Data Connect

- GraphQL schema defines tables and relationships
- Operations (queries/mutations) explicitly defined
- Typed TypeScript SDK generated and committed
- Authorization enforced via Auth.js context

---

## Implementation Phases

### Phase 1 – Foundation

- Next.js setup
- Tailwind + shadcn/ui
- Firebase project creation
- Firebase Hosting configuration
- Firebase Data Connect initialization
- Auth.js setup
- Base layout

### Phase 2 – Schema & CRUD

- Data Connect schema definition
- Portfolio / Program / Project CRUD
- Product types and phase templates

### Phase 3 – NPI Phases

- Phase template management
- Project phase generation
- Phase progress tracking

### Phase 4 – Resource Planning

- Team management
- Project assignments
- Person and team views
- Over-allocation detection

### Phase 5 – Visualization

- Project timeline (Gantt)
- Portfolio rollups
- Resource heatmaps

### Phase 6 – Executive Polish

- KPI dashboard
- Status export
- Performance optimization

---

## Project Structure

public/

src/
├─ app/
├─ components/
│ ├─ ui/
│ ├─ layout/
│ ├─ visualizations/
│ └─ shared/
├─ services/
├─ hooks/
├─ store/
├─ types/
└─ lib/

dataconnect/
├─ schema.gql
├─ operations/
└─ generated/

.github/
└─ workflows/
└─ deploy.yml

tests/
├─ unit/
├─ integration/
└─ e2e/

---

## Verification Strategy

| Level       | Scope                                             |
| ----------- | ------------------------------------------------- |
| Unit        | Allocation math, phase generation                 |
| Integration | Data Connect operations                           |
| E2E         | Create project → assign resources → view timeline |
| Manual      | Executive and PM workflows                        |

---

## Completed

### ✅ Authentication & Security

- **NextAuth.js Integration**: Full authentication setup with Google OAuth and email/password providers
- **Auth Pages**: Complete signin, signout, and error pages with proper error handling
- **Session Management**: Protected routes and session handling configured
- **Firebase Auth Integration**: Client-side Firebase Auth integration for credentials provider

### ✅ UI Components & Design System

- **Core Components**: Input, Select, Tabs, Skeleton, Toast, Alert, Switch, Slider, Table, Dialog, Badge, EmptyState
- **Layout Components**: Sidebar (collapsible), Header, Breadcrumbs
- **Form Components**: All essential form inputs with validation support
- **Feedback Components**: Toast notifications, alerts, empty states, loading skeletons
- **Design System**: All components follow shadcn/ui patterns with consistent styling

### ✅ Pages & Features

- **Projects Page**: Complete CRUD operations with table view, search, status filters, and create dialog
- **Resources Page**: Resource list with capacity tracking, over-allocation warnings, and summary cards
- **Dashboard**: Basic structure in place (ready for data connection)
- **Navigation**: Full sidebar navigation with active state management

### ✅ Infrastructure & Setup

- **TanStack Query**: Provider configured and integrated for server state management
- **React Hook Form + Zod**: Form handling and validation setup
- **TypeScript**: Full type safety across the application
- **Service Layer**: Service classes structured and ready for SDK integration
- **Component Architecture**: Proper component organization and structure

### ✅ Firebase Data Connect Setup

- **Schema Definition**: Complete GraphQL schema with all entities (Organization, User, Portfolio, Program, Project, PhaseTemplate, etc.)
- **Schema Syntax**: Fixed schema to use correct Firebase Data Connect syntax (uuidV4() for UUID defaults, proper @ref syntax)
- **Connector Operations**: All GraphQL queries and mutations defined for CRUD operations
- **SDK Generation**: `make update_sdk` command successfully generates TypeScript SDK
- **Generated SDK**: SDK files created in `src/dataconnect-generated/js/default-connector` with React hooks support

---

## Success Criteria

### Authentication

- [x] Login and auth works as basic access - use typical Google/Email auth
- [x] Auth pages (signin/signout/error) implemented and functional
- [x] Session management and protected routes working

### Data & Backend

- [x] Schema and DataConnect are working properly - `make update_sdk` is working
- [ ] Firebase Data Connect SDK generated and integrated
- [ ] All service classes updated to use generated SDK (replace placeholder methods)
- [ ] Data Connect operations tested and verified

### Pages & Features

- [x] Projects page with CRUD operations, table view, and filters
- [x] Resources page with capacity tracking and over-allocation warnings
- [ ] Timeline page with Gantt chart (quarterly granularity, fiscal/calendar toggle, filters, drag-and-drop)
- [ ] Project detail pages (`/projects/[id]`) with full project information
- [ ] Project assignments page (`/projects/[id]/resources`) - assign people, allocation %, date ranges, live validation
- [ ] Person view page (`/resources/people/[id]`) - quarterly breakdown, bar chart, historical assignments
- [ ] Settings page - organization settings (fiscal year), user preferences, phase templates management
- [ ] Dashboard connected to real data - active projects count, resource utilization, over-allocation count, recent activity

### Phase Templates & Configuration

- [ ] Default NPI phase templates (EVT/DVT/PVT/MP) implemented
- [ ] Phase template management UI
- [ ] Project phase generation from templates working
- [ ] Phase progress tracking functional

### Testing

- [ ] All unit tests passing (allocation math, phase generation)
- [ ] Integration tests for Data Connect operations
- [ ] E2E tests for core workflows (create project → assign resources → view timeline)
- [ ] Manual testing completed for executive and PM workflows
- [ ] `make lint` passes

---

## Next Steps

### 1. Service Integration (Priority)

1. Install generated SDK package: `npm install @firebasegen/default-connector`
2. Update all service classes to use generated Data Connect SDK
3. Replace placeholder methods with actual SDK calls (using hooks like `useInsertUser`, `useListProjects`, etc.)
4. Test CRUD operations for Portfolio, Program, and Project
5. Implement phase generation logic using templates

### 2. Firebase Data Connect Deployment

1. Deploy schema to Firebase Data Connect: `make deploy_schema`
2. Verify schema deployment in Firebase Console
3. Test operations against deployed instance
4. Set up proper authentication rules for Data Connect

### 3. Service Integration (Continued)

1. Update all service classes to use generated Data Connect SDK
2. Replace placeholder methods with actual SDK calls
3. Test CRUD operations for Portfolio, Program, and Project
4. Implement phase generation logic using templates

### 4. Complex Visualizations

1. Implement Timeline/Gantt chart component using D3
2. Add quarterly/monthly granularity toggle
3. Implement fiscal year vs calendar year toggle
4. Add drag-and-drop functionality for phase adjustments
5. Implement auto-snapping for resource collisions

### 5. Detail Pages & Advanced Features

1. Create project detail page with phases and assignments
2. Implement project assignments page with live validation
3. Create person view page with allocation charts
4. Build settings page for organization configuration
5. Add phase template management UI

### 6. Default Templates & Data

1. Create default phase templates (EVT, DVT, PVT, MP)
2. Seed initial organization data
3. Create sample portfolios, programs, and projects for testing

### 7. Testing & Quality Assurance

1. Write unit tests for allocation calculations
2. Write unit tests for phase generation logic
3. Create integration tests for Data Connect operations
4. Implement E2E tests for critical user workflows
5. Perform manual testing of all features

### 8. Polish & Optimization

1. Connect dashboard to real data sources
2. Optimize performance (lazy loading, caching)
3. Add error boundaries and better error handling
4. Implement loading states and optimistic updates
5. Final UI/UX polish and accessibility audit
