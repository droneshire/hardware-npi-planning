/**
 * Program Service
 *
 * Handles all Program CRUD operations using Firebase Data Connect.
 */

import { Program } from "@/types"

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
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Get a single program by ID with related data
   */
  async getProgram(id: UUID): Promise<ProgramWithProjects | null> {
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Create a new program
   */
  async createProgram(input: CreateProgramInput): Promise<Program> {
    // Validate input
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Program name is required")
    }

    if (!input.portfolioId) {
      throw new Error("Portfolio ID is required")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Update an existing program
   */
  async updateProgram(input: UpdateProgramInput): Promise<Program> {
    // Validate input
    if (!input.id) {
      throw new Error("Program ID is required")
    }

    if (input.name !== undefined && input.name.trim().length === 0) {
      throw new Error("Program name cannot be empty")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Delete a program
   *
   * WARNING: This will cascade delete all projects within the program.
   */
  async deleteProgram(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("Program ID is required")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Validate program name uniqueness within a portfolio
   */
  async isNameAvailable(
    portfolioId: UUID,
    name: string,
    excludeId?: UUID
  ): Promise<boolean> {
    const programs = await this.listPrograms(portfolioId)

    return !programs.some(
      (p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId
    )
  }
}

// Export singleton instance
export const programService = new ProgramService()
