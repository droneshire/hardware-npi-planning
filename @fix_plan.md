# Hardware NPI Planning - Fix Plan

## Phase 1: Foundation (High Priority)
- [ ] Initialize Next.js 14+ project with App Router
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Create Firebase project and configure Firebase Hosting
- [ ] Initialize Firebase Data Connect
- [ ] Set up Auth.js (NextAuth.js v5) with Firebase Auth
- [ ] Create base layout (Sidebar, Header, Breadcrumbs)
- [ ] Set up GitHub Actions deployment workflow (`.github/workflows/deploy.yml`)

## Phase 2: Schema & CRUD (High Priority)
- [ ] Define Data Connect schema in `dataconnect/schema.gql`
  - [ ] Organization, User, Portfolio, Program, Project entities
  - [ ] PhaseTemplate, PhaseTemplatePhase entities
  - [ ] ProductType, ProductTypePhaseConfig entities
  - [ ] Team, TeamMember entities
- [ ] Generate TypeScript SDK from Data Connect
- [ ] Implement Portfolio CRUD operations
- [ ] Implement Program CRUD operations
- [ ] Implement Project CRUD operations
- [ ] Implement Product Type management

## Phase 3: NPI Phases (Medium Priority)
- [ ] Create Phase Template management UI
- [ ] Implement default templates (EVT/DVT/PVT/MP)
- [ ] Build project phase generation from templates
- [ ] Add phase progress tracking
- [ ] Implement per-project phase customization

## Phase 4: Resource Planning (Medium Priority)
- [ ] Implement Team management
- [ ] Build TeamMember assignment functionality
- [ ] Create ProjectAssignment with percentage allocation (0-100%)
- [ ] Add date range validation for assignments
- [ ] Implement over-allocation detection and warnings
- [ ] Build `/resources` page with capacity summary
- [ ] Build `/projects/[id]/resources` page
- [ ] Build `/resources/people/[id]` person view

## Phase 5: Visualization (Medium Priority)
- [ ] Build `/timeline` page with Gantt-style project view
- [ ] Implement quarterly granularity timeline
- [ ] Add fiscal year / calendar year toggle
- [ ] Create portfolio rollup views
- [ ] Implement resource heatmaps
- [ ] Add filter by portfolio, program, product type, status

## Phase 6: Executive Polish (Low Priority)
- [ ] Build KPI dashboard
- [ ] Implement status export functionality
- [ ] Performance optimization
- [ ] SSO readiness
- [ ] Advanced filtering and saved views

## Testing
- [ ] Set up Vitest for unit tests
- [ ] Set up Playwright for E2E tests
- [ ] Write unit tests for allocation math
- [ ] Write unit tests for phase generation
- [ ] Write integration tests for Data Connect operations
- [ ] Write E2E test: Create project → assign resources → view timeline

## Completed
- [x] Project initialization
- [x] Firebase-based architecture selected
- [x] Requirements documentation (specs/requirements.md)

## Notes
- Data Connect schema is the single source of truth (no Prisma)
- All allocations are percentage-based (0-100)
- All assignments must have date ranges
- Fiscal year start month is configurable per Organization
- Focus on MVP: Timeline and Resources pages first
