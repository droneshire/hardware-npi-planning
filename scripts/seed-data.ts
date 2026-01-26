/**
 * Seed Data Script
 *
 * Creates initial organization data, default templates, and sample portfolios,
 * programs, and projects for testing.
 *
 * Usage:
 *   npx tsx scripts/seed-data.ts
 *   or
 *   npm run seed
 */

import { dataConnect } from "../src/lib/firebase"
import { phaseTemplateService } from "../src/services/phaseTemplate.service"
import { portfolioService } from "../src/services/portfolio.service"
import { programService } from "../src/services/program.service"
import { projectService } from "../src/services/project.service"
import {
  createOrganization,
  updateOrganization,
  getOrganization,
} from "@firebasegen/default-connector"
import { format, addWeeks } from "date-fns"

// Mock organization ID - in production, this would come from authentication
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

interface SeedData {
  organizationId: string
  portfolioIds: string[]
  programIds: string[]
  projectIds: string[]
  templateIds: string[]
}

/**
 * Create or get organization
 */
async function seedOrganization(): Promise<string> {
  try {
    // Try to get existing organization first
    try {
      const existing = await getOrganization(dataConnect, { id: MOCK_ORGANIZATION_ID })
      if (existing.data.organization) {
        console.log("✅ Using existing organization:", MOCK_ORGANIZATION_ID)
        return MOCK_ORGANIZATION_ID
      }
    } catch {
      // Organization doesn't exist, create it
    }

    // Create new organization
    const result = await createOrganization(dataConnect, {
      name: "Acme Hardware Corp",
      fiscalYearStartMonth: 10, // October
    })

    const orgId = result.data.organization_insert.id
    console.log("✅ Created organization:", orgId)

    return orgId
  } catch (error: any) {
    console.log("⚠️  Using mock organization ID:", MOCK_ORGANIZATION_ID)
    console.log("   Error:", error.message)
    return MOCK_ORGANIZATION_ID
  }
}

/**
 * Initialize default phase templates
 */
async function seedTemplates(organizationId: string): Promise<string[]> {
  console.log("\n📋 Initializing default phase templates...")

  try {
    const templates = await phaseTemplateService.initializeDefaultTemplates(organizationId)
    console.log(`✅ Created ${templates.length} phase templates:`)
    templates.forEach((t) => {
      console.log(`   - ${t.name}${t.isDefault ? " (Default)" : ""}`)
    })
    return templates.map((t) => t.id)
  } catch (error: any) {
    console.error("❌ Failed to create templates:", error.message)
    return []
  }
}

/**
 * Create sample portfolios
 */
async function seedPortfolios(organizationId: string): Promise<string[]> {
  console.log("\n📁 Creating sample portfolios...")

  const portfolios = [
    {
      name: "Consumer Electronics",
      description: "Consumer-facing hardware products including phones, tablets, and accessories",
    },
    {
      name: "Enterprise Solutions",
      description: "B2B hardware products for enterprise customers",
    },
    {
      name: "Research & Development",
      description: "Experimental and R&D projects",
    },
  ]

  const portfolioIds: string[] = []

  for (const portfolio of portfolios) {
    try {
      const created = await portfolioService.createPortfolio({
        organizationId,
        name: portfolio.name,
        description: portfolio.description,
      })
      portfolioIds.push(created.id)
      console.log(`   ✅ Created portfolio: ${portfolio.name}`)
    } catch (error: any) {
      console.error(`   ❌ Failed to create portfolio ${portfolio.name}:`, error.message)
    }
  }

  return portfolioIds
}

/**
 * Create sample programs
 */
async function seedPrograms(portfolioIds: string[]): Promise<string[]> {
  console.log("\n📂 Creating sample programs...")

  const programs = [
    {
      portfolioIndex: 0,
      name: "Smartphone Series 2025",
      description: "Next-generation smartphone product line",
    },
    {
      portfolioIndex: 0,
      name: "Tablet Pro Line",
      description: "Professional tablet series for content creators",
    },
    {
      portfolioIndex: 1,
      name: "Server Hardware Platform",
      description: "Enterprise server hardware solutions",
    },
    {
      portfolioIndex: 2,
      name: "Advanced Sensor Research",
      description: "R&D project for next-gen sensor technology",
    },
  ]

  const programIds: string[] = []

  for (const program of programs) {
    if (portfolioIds[program.portfolioIndex]) {
      try {
        const created = await programService.createProgram({
          portfolioId: portfolioIds[program.portfolioIndex],
          name: program.name,
          description: program.description,
        })
        programIds.push(created.id)
        console.log(`   ✅ Created program: ${program.name}`)
      } catch (error: any) {
        console.error(`   ❌ Failed to create program ${program.name}:`, error.message)
      }
    }
  }

  return programIds
}

/**
 * Create sample projects with phases
 */
async function seedProjects(
  programIds: string[],
  templateIds: string[]
): Promise<string[]> {
  console.log("\n🚀 Creating sample projects...")

  const projects = [
    {
      programIndex: 0,
      name: "Project Alpha",
      description: "Flagship smartphone with advanced camera system",
      status: "ACTIVE" as const,
      startDate: "2024-01-15",
      templateIndex: 0, // Standard NPI
    },
    {
      programIndex: 0,
      name: "Project Beta",
      description: "Mid-range smartphone for emerging markets",
      status: "PLANNING" as const,
      startDate: "2024-06-01",
      templateIndex: 1, // Fast Track
    },
    {
      programIndex: 1,
      name: "Project Gamma",
      description: "Professional tablet with stylus support",
      status: "ACTIVE" as const,
      startDate: "2024-03-01",
      templateIndex: 0, // Standard NPI
    },
    {
      programIndex: 2,
      name: "Project Delta",
      description: "Enterprise server rack solution",
      status: "ACTIVE" as const,
      startDate: "2024-02-01",
      templateIndex: 2, // Extended NPI
    },
    {
      programIndex: 3,
      name: "Project Epsilon",
      description: "Advanced sensor prototype",
      status: "PLANNING" as const,
      startDate: "2024-09-01",
      templateIndex: 3, // Software-Focused
    },
  ]

  const projectIds: string[] = []

  for (const project of projects) {
    if (programIds[project.programIndex] && templateIds[project.templateIndex]) {
      try {
        const created = await projectService.createProject({
          programId: programIds[project.programIndex],
          name: project.name,
          description: project.description,
          status: project.status,
          startDate: project.startDate,
          targetCompletionDate: format(
            addWeeks(new Date(project.startDate), 40),
            "yyyy-MM-dd"
          ),
          templateId: templateIds[project.templateIndex],
        })
        projectIds.push(created.id)
        console.log(`   ✅ Created project: ${project.name} (with phases)`)
      } catch (error: any) {
        console.error(`   ❌ Failed to create project ${project.name}:`, error.message)
      }
    }
  }

  return projectIds
}

/**
 * Main seed function
 */
async function seed() {
  console.log("🌱 Starting data seeding...\n")

  try {
    // 1. Create organization
    const organizationId = await seedOrganization()

    // 2. Initialize default templates
    const templateIds = await seedTemplates(organizationId)

    // 3. Create portfolios
    const portfolioIds = await seedPortfolios(organizationId)

    // 4. Create programs
    const programIds = await seedPrograms(portfolioIds)

    // 5. Create projects with phases
    const projectIds = await seedProjects(programIds, templateIds)

    // Summary
    console.log("\n" + "=".repeat(60))
    console.log("✅ Seeding completed!")
    console.log("=".repeat(60))
    console.log(`Organization ID: ${organizationId}`)
    console.log(`Templates created: ${templateIds.length}`)
    console.log(`Portfolios created: ${portfolioIds.length}`)
    console.log(`Programs created: ${programIds.length}`)
    console.log(`Projects created: ${projectIds.length}`)
    console.log("=".repeat(60))
  } catch (error) {
    console.error("\n❌ Seeding failed:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log("\n✨ Done!")
      process.exit(0)
    })
    .catch((error) => {
      console.error("Fatal error:", error)
      process.exit(1)
    })
}

export { seed, seedOrganization, seedTemplates, seedPortfolios, seedPrograms, seedProjects }
