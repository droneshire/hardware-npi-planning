/**
 * Portfolio Service
 *
 * Handles all Portfolio CRUD operations using Firebase Data Connect.
 * Uses generated TypeScript SDK from Data Connect operations.
 */

import { Portfolio } from "@/types"

// Placeholder types until SDK is generated
type UUID = string

interface CreatePortfolioInput {
  organizationId: UUID
  name: string
  description?: string
  ownerId?: UUID
}

interface UpdatePortfolioInput {
  id: UUID
  name?: string
  description?: string
  ownerId?: UUID
}

interface PortfolioWithPrograms extends Portfolio {
  programs?: Array<{
    id: string
    name: string
    description?: string
    ownerId?: string
    createdAt: string
    updatedAt: string
  }>
}

/**
 * Portfolio Service class
 *
 * NOTE: This implementation uses placeholder methods until Firebase Data Connect
 * SDK is generated. After running `firebase dataconnect:sdk:generate`, update
 * the imports to use the actual generated SDK.
 */
export class PortfolioService {
  /**
   * List all portfolios for an organization
   */
  async listPortfolios(organizationId: UUID): Promise<Portfolio[]> {
    // TODO: Replace with generated SDK call
    // import { listPortfolios } from '@/dataconnect/generated'
    // const result = await listPortfolios({ organizationId })
    // return result.data.portfolios

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Get a single portfolio by ID with related data
   */
  async getPortfolio(id: UUID): Promise<PortfolioWithPrograms | null> {
    // TODO: Replace with generated SDK call
    // import { getPortfolio } from '@/dataconnect/generated'
    // const result = await getPortfolio({ id })
    // return result.data.portfolio

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Create a new portfolio
   */
  async createPortfolio(input: CreatePortfolioInput): Promise<Portfolio> {
    // Validate input
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Portfolio name is required")
    }

    if (!input.organizationId) {
      throw new Error("Organization ID is required")
    }

    // TODO: Replace with generated SDK call
    // import { createPortfolio } from '@/dataconnect/generated'
    // const result = await createPortfolio(input)
    // return result.data.portfolio

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Update an existing portfolio
   */
  async updatePortfolio(input: UpdatePortfolioInput): Promise<Portfolio> {
    // Validate input
    if (!input.id) {
      throw new Error("Portfolio ID is required")
    }

    if (input.name !== undefined && input.name.trim().length === 0) {
      throw new Error("Portfolio name cannot be empty")
    }

    // TODO: Replace with generated SDK call
    // import { updatePortfolio } from '@/dataconnect/generated'
    // const result = await updatePortfolio(input)
    // return result.data.portfolio

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Delete a portfolio
   *
   * WARNING: This will cascade delete all programs and projects within the portfolio.
   * Ensure proper confirmation from the user before calling this method.
   */
  async deletePortfolio(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("Portfolio ID is required")
    }

    // TODO: Replace with generated SDK call
    // import { deletePortfolio } from '@/dataconnect/generated'
    // await deletePortfolio({ id })

    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Validate portfolio name uniqueness within an organization
   *
   * @returns true if name is available, false if already taken
   */
  async isNameAvailable(organizationId: UUID, name: string, excludeId?: UUID): Promise<boolean> {
    const portfolios = await this.listPortfolios(organizationId)

    return !portfolios.some(
      (p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId
    )
  }
}

// Export singleton instance
export const portfolioService = new PortfolioService()
