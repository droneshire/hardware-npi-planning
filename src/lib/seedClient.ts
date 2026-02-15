/**
 * Client-side seed: creates sample data using Data Connect / services.
 * Used by the Settings page "Seed Sample Data" button (no API route in Vite).
 */

import { format, addWeeks } from "date-fns"
import { phaseTemplateService } from "@/services/phaseTemplate.service"
import { portfolioService } from "@/services/portfolio.service"
import { programService } from "@/services/program.service"
import { projectService } from "@/services/project.service"

export interface SeedSummary {
  created: {
    templates: number
    portfolios: number
    programs: number
    projects: number
  }
  errors: {
    templates: number
    portfolios: number
    programs: number
    projects: number
  }
}

export interface SeedResult {
  success: boolean
  summary: { created: SeedSummary["created"]; errors: SeedSummary["errors"] }
  error?: string
}

async function seedTemplates(organizationId: string): Promise<{ ids: string[]; errors: number }> {
  try {
    const templates = await phaseTemplateService.initializeDefaultTemplates(organizationId)
    return { ids: templates.map((t) => t.id), errors: 0 }
  } catch {
    return { ids: [], errors: 1 }
  }
}

async function seedPortfolios(organizationId: string): Promise<{ ids: string[]; errors: number }> {
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
  const ids: string[] = []
  let errors = 0
  for (const p of portfolios) {
    try {
      const created = await portfolioService.createPortfolio({
        organizationId,
        name: p.name,
        description: p.description,
      })
      ids.push(created.id)
    } catch {
      errors += 1
    }
  }
  return { ids, errors }
}

async function seedPrograms(portfolioIds: string[]): Promise<{ ids: string[]; errors: number }> {
  const programs = [
    { portfolioIndex: 0, name: "Smartphone Series 2025", description: "Next-generation smartphone product line" },
    { portfolioIndex: 0, name: "Tablet Pro Line", description: "Professional tablet series for content creators" },
    { portfolioIndex: 1, name: "Server Hardware Platform", description: "Enterprise server hardware solutions" },
    { portfolioIndex: 2, name: "Advanced Sensor Research", description: "R&D project for next-gen sensor technology" },
  ]
  const ids: string[] = []
  let errors = 0
  for (const prog of programs) {
    const pid = portfolioIds[prog.portfolioIndex]
    if (!pid) continue
    try {
      const created = await programService.createProgram({
        portfolioId: pid,
        name: prog.name,
        description: prog.description,
      })
      ids.push(created.id)
    } catch {
      errors += 1
    }
  }
  return { ids, errors }
}

async function seedProjects(
  programIds: string[],
  templateIds: string[]
): Promise<{ ids: string[]; errors: number }> {
  const projects = [
    { programIndex: 0, name: "Project Alpha", description: "Flagship smartphone with advanced camera system", status: "ACTIVE" as const, startDate: "2024-01-15", templateIndex: 0 },
    { programIndex: 0, name: "Project Beta", description: "Mid-range smartphone for emerging markets", status: "PLANNING" as const, startDate: "2024-06-01", templateIndex: 1 },
    { programIndex: 1, name: "Project Gamma", description: "Professional tablet with stylus support", status: "ACTIVE" as const, startDate: "2024-03-01", templateIndex: 0 },
    { programIndex: 2, name: "Project Delta", description: "Enterprise server rack solution", status: "ACTIVE" as const, startDate: "2024-02-01", templateIndex: 2 },
    { programIndex: 3, name: "Project Epsilon", description: "Advanced sensor prototype", status: "PLANNING" as const, startDate: "2024-09-01", templateIndex: 3 },
  ]
  const ids: string[] = []
  let errors = 0
  for (const proj of projects) {
    const programId = programIds[proj.programIndex]
    const templateId = templateIds[proj.templateIndex]
    if (!programId || !templateId) continue
    try {
      const created = await projectService.createProject({
        programId,
        name: proj.name,
        description: proj.description,
        status: proj.status,
        startDate: proj.startDate,
        targetCompletionDate: format(addWeeks(new Date(proj.startDate), 40), "yyyy-MM-dd"),
        templateId,
      })
      ids.push(created.id)
    } catch {
      errors += 1
    }
  }
  return { ids, errors }
}

/**
 * Run seed for the given organization. Returns a result shape compatible with the Settings UI.
 */
export async function runSeed(organizationId: string): Promise<SeedResult> {
  const created = { templates: 0, portfolios: 0, programs: 0, projects: 0 }
  const errors = { templates: 0, portfolios: 0, programs: 0, projects: 0 }

  try {
    const t = await seedTemplates(organizationId)
    created.templates = t.ids.length
    errors.templates = t.errors

    const p = await seedPortfolios(organizationId)
    created.portfolios = p.ids.length
    errors.portfolios = p.errors

    const prog = await seedPrograms(p.ids)
    created.programs = prog.ids.length
    errors.programs = prog.errors

    const proj = await seedProjects(prog.ids, t.ids)
    created.projects = proj.ids.length
    errors.projects = proj.errors

    return {
      success: true,
      summary: { created, errors },
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to seed data"
    return {
      success: false,
      summary: { created, errors },
      error: message,
    }
  }
}
