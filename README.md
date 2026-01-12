# Hardware NPI Planning

A comprehensive web application for managing hardware New Product Introduction (NPI) planning, built with Next.js and Firebase. Plan projects, allocate resources, and track progress across portfolios, programs, and projects with fiscal-year awareness.

![Dashboard](docs/screenshots/dashboard.png)
*Executive dashboard showing portfolio overview and resource utilization*

## Features

- **Portfolio Management**: Organize projects in a Portfolio → Program → Project hierarchy
- **NPI Phase Templates**: Customizable phase templates (EVT/DVT/PVT/MP) with per-project customization
- **Resource Planning**: Percentage-based resource allocation with over-allocation detection
- **Timeline Visualization**: Gantt-style project timelines with fiscal/calendar year views
- **Team Management**: Hierarchical team structure with capacity tracking
- **Multi-tenant Ready**: Organization-based data isolation

![Timeline View](docs/screenshots/timeline.png)
*Project timeline showing phases across fiscal quarters*

![Resource Planning](docs/screenshots/resources.png)
*Resource allocation view with capacity indicators*

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account and project
- Git

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hardware_project_planning
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Firebase credentials:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
   - `NEXTAUTH_URL`

4. **Initialize Firebase**

   ```bash
   firebase login
   firebase init
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Setup

For detailed setup instructions, including Firebase Data Connect configuration and authentication setup, see the [Setup Guide](docs/setup.md).

## Project Structure

```text
hardware_project_planning/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── services/         # Business logic and API services
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript definitions
├── dataconnect/          # Firebase Data Connect schema
│   ├── schema.gql        # GraphQL schema (source of truth)
│   └── operations/       # GraphQL queries and mutations
├── docs/                 # Documentation
└── tests/                # Test suites
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Platform**: Firebase (Hosting, Auth, Data Connect)
- **Database**: Firebase Data Connect (PostgreSQL via Cloud SQL)
- **UI**: shadcn/ui + Tailwind CSS
- **State**: TanStack Query + Zustand
- **Testing**: Vitest + Playwright

## Documentation

- [Setup Guide](docs/setup.md) - Detailed installation and configuration
- [Architecture](docs/architecture.md) - System design and technical overview
- [API Reference](docs/api.md) - Data Connect operations and data model
- [User Guide](docs/user-guide.md) - How to use the application
- [Development Guide](docs/development.md) - Contributing and development workflow

## Deployment

The application is automatically deployed to Firebase Hosting via GitHub Actions when changes are merged to the `main` branch. See [Development Guide](docs/development.md#deployment) for details.

## License

See [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or contributions, please refer to the [Development Guide](docs/development.md) or open an issue in the repository.
