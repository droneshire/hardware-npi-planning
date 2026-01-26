/**
 * Project Service
 *
 * Handles all Project CRUD operations using Firebase Data Connect.
 * Includes phase generation from templates.
 */

import { Project, ProjectStatus, ProjectPhase } from "@/types"
import { dataConnect } from "@/lib/firebase"
import {
  listProjects,
  getProject,
  listProjectsByStatus,
  createProject,
  updateProject,
  deleteProject,
  listProjectPhases,
  createProjectPhase,
} from "@firebasegen/default-connector"
import { ProjectStatus as SDKProjectStatus } from "@firebasegen/default-connector"
import { phaseTemplateService } from "./phaseTemplate.service"
import { addWeeks, format } from "date-fns"

type UUID = string

interface CreateProjectInput {
  programId: UUID
  name: string
  description?: string
  status?: ProjectStatus
  startDate?: string
  targetCompletionDate?: string
  ownerId?: UUID
  productTypeId?: UUID
  templateId?: UUID // Phase template ID to generate phases from
}

interface UpdateProjectInput {
  id: UUID
  name?: string
  description?: string
  status?: ProjectStatus
  startDate?: string
  targetCompletionDate?: string
  actualCompletionDate?: string
  ownerId?: UUID
  productTypeId?: UUID
}

interface ProjectWithDetails extends Project {
  phases?: ProjectPhase[]
  assignments?: Array<{
    id: string
    userId: string
    allocationPercent: number
    startDate: string
    endDate?: string
    notes?: string
  }>
}

/**
 * Project Service class
 */
export class ProjectService {
  /**
   * List all projects for a program
   */
  async listProjects(programId: UUID): Promise<Project[]> {
    const result = await listProjects(dataConnect, { programId })
    return result.data.projects.map((p) => ({
      id: p.id,
      programId: p.programId || programId,
      productTypeId: p.productTypeId ?? undefined,
      name: p.name,
      description: p.description ?? undefined,
      status: p.status as ProjectStatus,
      startDate: p.startDate ?? undefined,
      targetCompletionDate: p.targetCompletionDate ?? undefined,
      actualCompletionDate: p.actualCompletionDate ?? undefined,
      ownerId: p.ownerId ?? undefined,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }))
  }

  /**
   * List projects by status across the organization
   */
  async listProjectsByStatus(status: ProjectStatus): Promise<Project[]> {
    const result = await listProjectsByStatus(dataConnect, {
      status: status as SDKProjectStatus,
    })
    return result.data.projects.map((p) => ({
      id: p.id,
      programId: p.programId,
      productTypeId: undefined, // Not included in this query
      name: p.name,
      description: p.description ?? undefined,
      status: p.status as ProjectStatus,
      startDate: p.startDate ?? undefined,
      targetCompletionDate: p.targetCompletionDate ?? undefined,
      actualCompletionDate: undefined, // Not included in this query
      ownerId: undefined, // Not included in this query
      createdAt: "", // Not included in this query
      updatedAt: "", // Not included in this query
    }))
  }

  /**
   * Get a single project by ID with full details
   */
  async getProject(id: UUID): Promise<ProjectWithDetails | null> {
    const result = await getProject(dataConnect, { id })
    if (!result.data.project) {
      return null
    }
    const project = result.data.project

    // Load phases separately
    const phasesResult = await listProjectPhases(dataConnect, { projectId: id })
    const phases: ProjectPhase[] = phasesResult.data.projectPhases.map((p) => ({
      id: p.id,
      projectId: p.projectId,
      name: p.name,
      description: p.description ?? undefined,
      status: p.status as ProjectPhase["status"],
      startDate: p.startDate ?? undefined,
      targetEndDate: p.targetEndDate ?? undefined,
      actualEndDate: p.actualEndDate ?? undefined,
      order: p.order,
      percentComplete: p.percentComplete ?? 0,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }))

    return {
      id: project.id,
      programId: project.programId,
      productTypeId: project.productTypeId ?? undefined,
      name: project.name,
      description: project.description ?? undefined,
      status: project.status as ProjectStatus,
      startDate: project.startDate ?? undefined,
      targetCompletionDate: project.targetCompletionDate ?? undefined,
      actualCompletionDate: project.actualCompletionDate ?? undefined,
      ownerId: project.ownerId ?? undefined,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      phases,
      assignments: [], // Assignments will be loaded separately if needed
    }
  }

  /**
   * Create a new project
   *
   * If productTypeId is provided, automatically generates phases from the
   * associated phase template.
   */
  async createProject(input: CreateProjectInput): Promise<Project> {
    // Validate input
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Project name is required")
    }

    if (!input.programId) {
      throw new Error("Program ID is required")
    }

    // Validate dates if provided
    if (input.startDate && input.targetCompletionDate) {
      const start = new Date(input.startDate)
      const target = new Date(input.targetCompletionDate)

      if (target <= start) {
        throw new Error("Target completion date must be after start date")
      }
    }

    // Create the project
    const result = await createProject(dataConnect, {
      programId: input.programId,
      name: input.name,
      description: input.description ?? null,
      status: (input.status as SDKProjectStatus) ?? null,
      startDate: input.startDate ?? null,
      targetCompletionDate: input.targetCompletionDate ?? null,
      ownerId: input.ownerId ?? null,
      productTypeId: input.productTypeId ?? null,
    })

    const project = result.data.project_insert

    // If templateId is provided in input, generate phases from template
    if (input.templateId && input.startDate) {
      try {
        await this.generatePhasesFromTemplate(project.id, input.templateId, input.startDate)
      } catch (error) {
        console.error("Failed to generate phases from template:", error)
        // Don't fail project creation if phase generation fails
      }
    }

    return {
      id: project.id,
      programId: input.programId,
      productTypeId: input.productTypeId,
      name: input.name,
      description: input.description,
      status: input.status || "PLANNING",
      startDate: input.startDate,
      targetCompletionDate: input.targetCompletionDate,
      actualCompletionDate: undefined,
      ownerId: input.ownerId,
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: project.updatedAt || new Date().toISOString(),
    }
  }

  /**
   * Update an existing project
   */
  async updateProject(input: UpdateProjectInput): Promise<Project> {
    // Validate input
    if (!input.id) {
      throw new Error("Project ID is required")
    }

    if (input.name !== undefined && input.name.trim().length === 0) {
      throw new Error("Project name cannot be empty")
    }

    // Validate dates if provided
    if (input.startDate && input.targetCompletionDate) {
      const start = new Date(input.startDate)
      const target = new Date(input.targetCompletionDate)

      if (target <= start) {
        throw new Error("Target completion date must be after start date")
      }
    }

    const result = await updateProject(dataConnect, {
      id: input.id,
      name: input.name ?? null,
      description: input.description ?? null,
      status: input.status ? (input.status as SDKProjectStatus) : null,
      startDate: input.startDate ?? null,
      targetCompletionDate: input.targetCompletionDate ?? null,
      actualCompletionDate: input.actualCompletionDate ?? null,
      ownerId: input.ownerId ?? null,
      productTypeId: input.productTypeId ?? null,
    })

    if (!result.data.project_update) {
      throw new Error("Project not found")
    }

    // Fetch the updated project to get all fields
    const updated = await this.getProject(input.id)
    if (!updated) {
      throw new Error("Failed to fetch updated project")
    }

    return updated
  }

  /**
   * Delete a project
   *
   * WARNING: This will cascade delete all phases and assignments for the project.
   */
  async deleteProject(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("Project ID is required")
    }

    await deleteProject(dataConnect, { id })
  }

  /**
   * Generate project phases from a phase template
   *
   * This is called during project creation if a productTypeId is provided,
   * or can be called manually to regenerate phases.
   */
  async generatePhasesFromTemplate(
    projectId: UUID,
    templateId: UUID,
    projectStartDate?: string
  ): Promise<ProjectPhase[]> {
    // Fetch template with all phases
    const template = await phaseTemplateService.getTemplate(templateId)
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    if (template.phases.length === 0) {
      return []
    }

    // Determine start date
    const startDate = projectStartDate ? new Date(projectStartDate) : new Date()
    let currentDate = new Date(startDate)

    // Create project phases from template phases
    const createdPhases: ProjectPhase[] = []

    for (const templatePhase of template.phases.sort((a, b) => a.order - b.order)) {
      const phaseStartDate = new Date(currentDate)
      const durationWeeks = templatePhase.durationWeeks || 4
      const phaseEndDate = addWeeks(phaseStartDate, durationWeeks)

      // Create the project phase
      const result = await createProjectPhase(dataConnect, {
        projectId,
        name: templatePhase.name,
        description: templatePhase.description ?? null,
        status: "NOT_STARTED" as any,
        startDate: format(phaseStartDate, "yyyy-MM-dd"),
        targetEndDate: format(phaseEndDate, "yyyy-MM-dd"),
        order: templatePhase.order,
        percentComplete: 0,
      })

      const createdPhase = result.data.projectPhase_insert
      createdPhases.push({
        id: createdPhase.id,
        projectId,
        name: templatePhase.name,
        description: templatePhase.description,
        status: "NOT_STARTED",
        startDate: format(phaseStartDate, "yyyy-MM-dd"),
        targetEndDate: format(phaseEndDate, "yyyy-MM-dd"),
        actualEndDate: undefined,
        order: templatePhase.order,
        percentComplete: 0,
        createdAt: createdPhase.createdAt || new Date().toISOString(),
        updatedAt: createdPhase.updatedAt || new Date().toISOString(),
      })

      // Move to next phase start date
      currentDate = phaseEndDate
    }

    return createdPhases
  }

  /**
   * Validate project name uniqueness within a program
   */
  async isNameAvailable(programId: UUID, name: string, excludeId?: UUID): Promise<boolean> {
    const projects = await this.listProjects(programId)

    return !projects.some((p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId)
  }

  /**
   * Calculate project completion percentage based on phase completion
   */
  calculateProjectCompletion(phases: ProjectPhase[]): number {
    if (phases.length === 0) return 0

    const totalCompletion = phases.reduce((sum, phase) => sum + (phase.percentComplete || 0), 0)

    return Math.round(totalCompletion / phases.length)
  }
}

// Export singleton instance
export const projectService = new ProjectService()
