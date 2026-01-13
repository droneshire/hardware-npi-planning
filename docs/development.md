# Development Guide

This guide covers the development workflow, coding standards, and contribution process for the Hardware NPI Planning application.

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Firebase CLI (`npm install -g firebase-tools`)
- Code editor (VS Code recommended)

### Initial Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure
4. Run `firebase login` and `firebase init`
5. Start dev server: `npm run dev`

See the [Setup Guide](setup.md) for detailed instructions.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── [routes]/          # Route pages
├── components/
│   ├── ui/                # shadcn/ui components (don't edit directly)
│   ├── layout/            # Layout components (Sidebar, Header, etc.)
│   ├── visualizations/    # Charts, Gantt, Timeline
│   └── shared/            # Shared/common components
├── services/              # Business logic & API services
│   ├── portfolio.service.ts
│   ├── program.service.ts
│   └── project.service.ts
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── lib/                   # Utilities
│   ├── utils.ts          # General utilities
│   ├── firebase.ts       # Firebase client
│   └── phaseCalculations.ts
└── types/                 # TypeScript definitions
    └── index.ts

dataconnect/
├── schema.gql             # GraphQL schema (SOURCE OF TRUTH)
├── operations/            # GraphQL queries/mutations
│   ├── project.gql
│   ├── portfolio.gql
│   └── ...
└── generated/             # Auto-generated TypeScript SDK

tests/
├── unit/                  # Vitest unit tests
├── integration/           # Integration tests
└── e2e/                   # Playwright E2E tests
```

## Coding Standards

### TypeScript

- **Strict mode**: Always enabled
- **No `any` types**: Use proper types or `unknown`
- **Type imports**: Use `import type` for type-only imports
- **Path aliases**: Use `@/` for imports from `src/`

```typescript
// Good
import type { Project } from "@/types"
import { getProjects } from "@/services/project.service"

// Bad
import { Project } from "@/types" // Should be type-only
const data: any = {} // Use proper type
```

### React Components

- **Functional components**: Use function components, not classes
- **TypeScript props**: Define props interfaces
- **Default exports**: Use default exports for pages, named for components

```typescript
// Component
export function ProjectCard({ project }: { project: Project }) {
  return <div>{project.name}</div>;
}

// Page
export default function ProjectsPage() {
  return <div>Projects</div>;
}
```

### File Naming

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Services**: kebab-case with `.service.ts` (e.g., `project.service.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useProjects.ts`)
- **Utils**: kebab-case (e.g., `phase-calculations.ts`)

### Code Organization

1. **Imports**: Group by type (external, internal, types, relative)
2. **Exports**: At the top for clarity
3. **Functions**: Small, focused, single responsibility
4. **Comments**: Explain why, not what

```typescript
// External imports
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// Internal imports
import { getProjects } from "@/services/project.service"
import { ProjectCard } from "@/components/shared/ProjectCard"

// Types
import type { Project } from "@/types"

export function ProjectsList() {
  // Component logic
}
```

## Data Access Pattern

### Services Layer

All data access goes through service files:

```typescript
// src/services/project.service.ts
import { executeQuery } from "@/dataconnect/generated"
import { GetProjectsDocument } from "@/dataconnect/generated/queries"

export async function getProjects(programId: string): Promise<Project[]> {
  const result = await executeQuery({
    query: GetProjectsDocument,
    variables: { programId },
  })
  return result.data?.projects || []
}
```

### React Query Usage

Use TanStack Query for data fetching:

```typescript
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/services/project.service"

export function useProjects(programId: string) {
  return useQuery({
    queryKey: ["projects", programId],
    queryFn: () => getProjects(programId),
  })
}
```

## Schema Changes

### Modifying the Schema

1. Edit `dataconnect/schema.gql`
2. Update operations in `dataconnect/operations/*.gql` if needed
3. Regenerate SDK: `firebase dataconnect:sdk:generate`
4. Update TypeScript types in `src/types/index.ts` if needed
5. Test changes locally
6. Deploy schema: `firebase deploy --only dataconnect`

**Important**: The schema is the source of truth. Always update the schema first, then regenerate the SDK.

## Testing

### Unit Tests

Use Vitest for unit tests:

```typescript
// tests/unit/lib/phaseCalculations.test.ts
import { describe, it, expect } from "vitest"
import { calculatePhaseDuration } from "@/lib/phaseCalculations"

describe("calculatePhaseDuration", () => {
  it("calculates duration correctly", () => {
    const result = calculatePhaseDuration(startDate, endDate)
    expect(result).toBe(30)
  })
})
```

Run tests:

```bash
npm test              # Run all tests
npm run test:ui       # Run with UI
npm run test:coverage # With coverage
```

### E2E Tests

Use Playwright for end-to-end tests:

```typescript
// tests/e2e/projects.spec.ts
import { test, expect } from "@playwright/test"

test("creates a project", async ({ page }) => {
  await page.goto("/projects")
  await page.click("text=New Project")
  await page.fill('input[name="name"]', "Test Project")
  await page.click('button:has-text("Create")')
  await expect(page.locator("text=Test Project")).toBeVisible()
})
```

Run E2E tests:

```bash
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Run with UI
```

## Git Workflow

### Branch Strategy

- `main`: Production branch (auto-deploys)
- `develop`: Development branch (optional)
- Feature branches: `feature/description`
- Bug fixes: `fix/description`

### Commit Messages

Follow conventional commits:

```
feat: add project timeline view
fix: resolve over-allocation calculation
docs: update setup guide
refactor: simplify project service
test: add unit tests for phase calculations
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with tests
3. Ensure all tests pass
4. Run linter: `npm run lint`
5. Type check: `npm run type-check`
6. Create PR with description
7. Request review
8. Merge to `main` (auto-deploys)

## Code Quality

### Linting

```bash
npm run lint          # Run ESLint
npm run lint -- --fix # Auto-fix issues
```

### Type Checking

```bash
npm run type-check    # TypeScript type checking
```

### Formatting

Prettier is configured. Format on save in your editor, or:

```bash
npx prettier --write .
```

## Deployment

### Automatic Deployment

- Every merge to `main` triggers GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Steps:
  1. Checkout code
  2. Install dependencies
  3. Type check and lint
  4. Run tests
  5. Build Next.js app
  6. Static export
  7. Deploy to Firebase Hosting

### Manual Deployment

If needed, deploy manually:

```bash
# Build
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Environment Variables

Production environment variables are set in:

- Firebase Console → Project Settings → Environment Config
- GitHub Secrets (for CI/CD)

## Debugging

### Local Development

- Use browser DevTools for React debugging
- Use React DevTools extension
- Check Network tab for API calls
- Review Console for errors

### Firebase Debugging

- Firebase Console → Data Connect → Logs
- Firebase Console → Authentication → Users
- Firebase Console → Hosting → Logs

### Common Issues

**Build fails:**

```bash
rm -rf .next node_modules
npm install
npm run build
```

**Type errors:**

```bash
npm run type-check
# Fix errors, regenerate SDK if schema changed
```

**Data Connect errors:**

- Verify schema is deployed
- Check environment variables
- Review Firebase Console logs

## Performance

### Optimization Tips

1. **Code splitting**: Use dynamic imports for heavy components
2. **Image optimization**: Use Next.js Image component
3. **Query caching**: Leverage TanStack Query caching
4. **Memoization**: Use `useMemo` and `useCallback` appropriately
5. **Bundle analysis**: Run `npm run build` and review output

### Monitoring

- Firebase Console → Performance
- Browser DevTools → Performance tab
- Lighthouse audits

## Contributing

### Before Contributing

1. Read this guide
2. Check existing issues/PRs
3. Discuss major changes in an issue first

### Making Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a PR

### Code Review

- All PRs require review
- Address feedback promptly
- Keep PRs focused and small
- Write clear commit messages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

- Check existing documentation
- Review code comments
- Ask in team chat/forum
- Open an issue for bugs
