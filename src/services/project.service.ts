/**
 * Project Service
 *
 * Handles all Project CRUD operations using Firebase Data Connect.
 * Includes phase generation from templates.
 */

import { Project, ProjectStatus, ProjectPhase } from "@/types"

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
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * List projects by status across the organization
   */
  async listProjectsByStatus(status: ProjectStatus): Promise<Project[]> {
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Get a single project by ID with full details
   */
  async getProject(id: UUID): Promise<ProjectWithDetails | null> {
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
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

    // TODO: Replace with generated SDK call
    // 1. Create the project
    // 2. If productTypeId is provided, fetch the associated phase template
    // 3. Generate project phases from the template phases

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
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

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
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

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
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
    // TODO: Implement phase generation logic
    // 1. Fetch template phases
    // 2. Calculate phase dates based on duration and project start date
    // 3. Create project phases in correct order

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
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
