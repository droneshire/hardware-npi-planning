/**
 * Seed Data API Route
 *
 * POST /api/seed
 * Creates initial organization data, default templates, and sample data
 *
 * This endpoint can be called from the browser or via curl to seed the database.
 */

import { NextRequest, NextResponse } from "next/server"
import { dataConnect } from "@/lib/firebase"
import { phaseTemplateService } from "@/services/phaseTemplate.service"
import { portfolioService } from "@/services/portfolio.service"
import { programService } from "@/services/program.service"
import { projectService } from "@/services/project.service"
import { createOrganization, updateOrganization } from "@firebasegen/default-connector"
import { format, addWeeks } from "date-fns"

// Mock organization ID - in production, this would come from authentication
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export async function POST(request: NextRequest) {
  try {
    const results: any = {
      organization: null,
      templates: [],
      portfolios: [],
      programs: [],
      projects: [],
    }

    // 1. Create or get organization
    let organizationId = MOCK_ORGANIZATION_ID
    try {
      // Try to create organization (will fail if already exists, which is fine)
      const result = await createOrganization(dataConnect, {
        name: "Acme Hardware Corp",
        fiscalYearStartMonth: 10, // October
      })
      organizationId = result.data.organization_insert.id
      results.organization = { id: organizationId, action: "created" }
    } catch (error: any) {
      // Organization might already exist, use mock ID
      results.organization = {
        id: MOCK_ORGANIZATION_ID,
        action: "using_existing_or_mock",
        note: "Using existing organization or mock ID",
      }
    }

    // 2. Initialize default templates
    try {
      // Check if templates already exist
      const existingTemplates = await phaseTemplateService.listTemplates(organizationId)
      if (existingTemplates.length > 0) {
        results.templates = existingTemplates.map((t) => ({
          id: t.id,
          name: t.name,
          action: "existing",
        }))
      } else {
        const templates = await phaseTemplateService.initializeDefaultTemplates(organizationId)
        results.templates = templates.map((t) => ({ id: t.id, name: t.name, action: "created" }))
      }
    } catch (error: any) {
      console.error("Template initialization error:", error)
      results.templates = { error: error.message || String(error) }
    }

    // 3. Create sample portfolios
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

    for (const portfolio of portfolios) {
      try {
        // Check if portfolio already exists
        const existing = await portfolioService.listPortfolios(organizationId)
        const existingPortfolio = existing.find((p) => p.name === portfolio.name)
        if (existingPortfolio) {
          results.portfolios.push({
            id: existingPortfolio.id,
            name: portfolio.name,
            action: "existing",
          })
        } else {
          const created = await portfolioService.createPortfolio({
            organizationId,
            name: portfolio.name,
            description: portfolio.description,
          })
          results.portfolios.push({ id: created.id, name: portfolio.name, action: "created" })
        }
      } catch (error: any) {
        console.error(`Portfolio creation error for ${portfolio.name}:`, error)
        results.portfolios.push({ name: portfolio.name, error: error.message || String(error) })
      }
    }

    // 4. Create sample programs
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

    for (const program of programs) {
      if (results.portfolios[program.portfolioIndex]?.id) {
        try {
          const portfolioId = results.portfolios[program.portfolioIndex].id
          // Check if program already exists
          const existing = await programService.listPrograms(portfolioId)
          const existingProgram = existing.find((p) => p.name === program.name)
          if (existingProgram) {
            results.programs.push({
              id: existingProgram.id,
              name: program.name,
              action: "existing",
            })
          } else {
            const created = await programService.createProgram({
              portfolioId,
              name: program.name,
              description: program.description,
            })
            results.programs.push({ id: created.id, name: program.name, action: "created" })
          }
        } catch (error: any) {
          console.error(`Program creation error for ${program.name}:`, error)
          results.programs.push({ name: program.name, error: error.message || String(error) })
        }
      } else {
        results.programs.push({ name: program.name, error: "Portfolio not found" })
      }
    }

    // 5. Create sample projects with phases
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

    for (const project of projects) {
      const programId = results.programs[project.programIndex]?.id
      const templateId = Array.isArray(results.templates)
        ? results.templates[project.templateIndex]?.id
        : undefined

      if (!programId) {
        results.projects.push({ name: project.name, error: "Program not found" })
        continue
      }

      if (!templateId) {
        results.projects.push({ name: project.name, error: "Template not found" })
        continue
      }

      try {
        // Check if project already exists
        const program = await programService.getProgram(programId)
        // Note: We'd need to list projects for the program, but for now just try to create
        const created = await projectService.createProject({
          programId,
          name: project.name,
          description: project.description,
          status: project.status,
          startDate: project.startDate,
          targetCompletionDate: format(addWeeks(new Date(project.startDate), 40), "yyyy-MM-dd"),
          templateId,
        })
        results.projects.push({ id: created.id, name: project.name, action: "created" })
      } catch (error: any) {
        console.error(`Project creation error for ${project.name}:`, error)
        // Check if it's a duplicate error
        if (
          error.message?.toLowerCase().includes("already exists") ||
          error.message?.toLowerCase().includes("duplicate")
        ) {
          results.projects.push({
            name: project.name,
            action: "existing",
            error: "Project already exists",
          })
        } else {
          results.projects.push({ name: project.name, error: error.message || String(error) })
        }
      }
    }

    // Count created vs existing
    const createdCounts = {
      templates: Array.isArray(results.templates)
        ? results.templates.filter((t: any) => t.action === "created").length
        : 0,
      portfolios: results.portfolios.filter((p: any) => p.action === "created").length,
      programs: results.programs.filter((p: any) => p.action === "created").length,
      projects: results.projects.filter((p: any) => p.action === "created").length,
    }

    const errorCounts = {
      templates: Array.isArray(results.templates) ? 0 : 1,
      portfolios: results.portfolios.filter((p: any) => p.error).length,
      programs: results.programs.filter((p: any) => p.error).length,
      projects: results.projects.filter((p: any) => p.error).length,
    }

    return NextResponse.json({
      success: true,
      message: "Seeding completed",
      results,
      summary: {
        created: createdCounts,
        errors: errorCounts,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Seeding failed",
      },
      { status: 500 }
    )
  }
}
