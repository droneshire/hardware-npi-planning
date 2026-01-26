/**
 * Program Service
 *
 * Handles all Program CRUD operations using Firebase Data Connect.
 */

import { Program } from "@/types"
import { dataConnect } from "@/lib/firebase"
import {
  listPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from "@firebasegen/default-connector"
import { validateRequired, validateNonEmptyString } from "@/lib/utils"

type UUID = string

interface CreateProgramInput {
  portfolioId: UUID
  name: string
  description?: string
  ownerId?: UUID
}

interface UpdateProgramInput {
  id: UUID
  name?: string
  description?: string
  ownerId?: UUID
}

interface ProgramWithProjects extends Program {
  projects?: Array<{
    id: string
    name: string
    description?: string
    status: string
    startDate?: string
    targetCompletionDate?: string
    actualCompletionDate?: string
    createdAt: string
    updatedAt: string
  }>
}

/**
 * Program Service class
 */
export class ProgramService {
  /**
   * List all programs for a portfolio
   */
  async listPrograms(portfolioId: UUID): Promise<Program[]> {
    const result = await listPrograms(dataConnect, { portfolioId })
    return result.data.programs.map((p) => ({
      id: p.id,
      portfolioId: p.portfolioId || portfolioId,
      name: p.name,
      description: p.description ?? undefined,
      ownerId: p.ownerId ?? undefined,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }))
  }

  /**
   * Get a single program by ID with related data
   */
  async getProgram(id: UUID): Promise<ProgramWithProjects | null> {
    const result = await getProgram(dataConnect, { id })
    if (!result.data.program) {
      return null
    }
    const program = result.data.program
    return {
      id: program.id,
      portfolioId: program.portfolioId,
      name: program.name,
      description: program.description ?? undefined,
      ownerId: program.ownerId ?? undefined,
      createdAt: program.createdAt,
      updatedAt: program.updatedAt,
      projects: [], // Projects will be loaded separately if needed
    }
  }

  /**
   * Create a new program
   */
  async createProgram(input: CreateProgramInput): Promise<Program> {
    // Validate input
    validateRequired(input.name, "Program name")
    validateRequired(input.portfolioId, "Portfolio ID")

    const result = await createProgram(dataConnect, {
      portfolioId: input.portfolioId,
      name: input.name,
      description: input.description ?? null,
      ownerId: input.ownerId ?? null,
    })
    const program = result.data.program_insert
    return {
      id: program.id,
      portfolioId: input.portfolioId,
      name: input.name,
      description: input.description,
      ownerId: input.ownerId,
      createdAt: program.createdAt || new Date().toISOString(),
      updatedAt: program.updatedAt || new Date().toISOString(),
    }
  }

  /**
   * Update an existing program
   */
  async updateProgram(input: UpdateProgramInput): Promise<Program> {
    // Validate input
    validateRequired(input.id, "Program ID")
    validateNonEmptyString(input.name, "Program name")

    const result = await updateProgram(dataConnect, {
      id: input.id,
      name: input.name ?? null,
      description: input.description ?? null,
      ownerId: input.ownerId ?? null,
    })

    if (!result.data.program_update) {
      throw new Error("Program not found")
    }

    // Fetch the updated program to get all fields
    const updated = await this.getProgram(input.id)
    if (!updated) {
      throw new Error("Failed to fetch updated program")
    }

    return updated
  }

  /**
   * Delete a program
   *
   * WARNING: This will cascade delete all projects within the program.
   */
  async deleteProgram(id: UUID): Promise<void> {
    validateRequired(id, "Program ID")

    await deleteProgram(dataConnect, { id })
  }

  /**
   * Validate program name uniqueness within a portfolio
   */
  async isNameAvailable(portfolioId: UUID, name: string, excludeId?: UUID): Promise<boolean> {
    const programs = await this.listPrograms(portfolioId)

    return !programs.some((p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId)
  }
}

// Export singleton instance
export const programService = new ProgramService()
