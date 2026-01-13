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

| Decision | Choice |
|--------|--------|
| Platform | **Firebase-based application** |
| Authentication | Firebase Auth via NextAuth.js (email/password + Google OAuth) |
| Hierarchy | Portfolio → Program → Project (with rollups at each level) |
| Database | Firebase Data Connect (managed PostgreSQL via Cloud SQL) |
| Schema authority | **Data Connect is the single source of truth** |
| NPI Phases | Default templates (EVT/DVT/PVT/MP) + per-project customization |
| Resource planning | Percentage-based allocations with date ranges |
| Multi-tenancy | Single organization initially (multi-tenant–ready schema) |
| Fiscal year | Organization-configurable FY start month (1–12) |
| Deployment | GitHub Actions → Firebase Hosting on `main` |

---

## Tech Stack

| Layer | Technology |
|-----|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Platform | Firebase |
| Database | Firebase Data Connect (Cloud SQL – PostgreSQL) |
| Data access | Data Connect GraphQL + generated TypeScript SDK |
| Auth | NextAuth.js v5 (Auth.js) + Firebase Auth |
| Hosting | Firebase Hosting |
| UI | shadcn/ui + Tailwind CSS |
| Tables | TanStack Table v8 |
| Charts | Recharts + D3 (custom Gantt rendering) |
| State | TanStack Query + Zustand |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Playwright |
| CI/CD | GitHub Actions |

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

| Principle | Standard |
|---------|----------|
| Predictability | Consistent page layout: title left, actions right |
| Density control | Comfortable by default; density toggles only where useful |
| Minimal chrome | Prefer whitespace + borders over heavy shadows |
| One primary action | Exactly one primary CTA per page |
| Fast feedback | Skeletons, inline validation, optimistic UI where safe |
| Accessibility | Keyboard navigation, focus rings, semantic HTML |
| Data-first visuals | Charts exist to support decisions, not decoration |

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

| Level | Scope |
|-----|------|
| Unit | Allocation math, phase generation |
| Integration | Data Connect operations |
| E2E | Create project → assign resources → view timeline |
| Manual | Executive and PM workflows |

## Success Criteria

1. [ ] Login and auth works as basic access - use typical Google/Email auth
2. [ ] Schema and Dataconnect are working properly - make update_sdk is working
3. [ ] All pages are completed and meet requirements listed above
4. [ ] All tests are passing and logic is properly tested