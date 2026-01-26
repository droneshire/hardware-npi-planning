/**
 * Portfolio Service
 *
 * Handles all Portfolio CRUD operations using Firebase Data Connect.
 * Uses generated TypeScript SDK from Data Connect operations.
 */

import { Portfolio } from "@/types"
import { dataConnect } from "@/lib/firebase"
import {
  listPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@firebasegen/default-connector"

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
    const result = await listPortfolios(dataConnect, { organizationId })
    return result.data.portfolios.map((p) => ({
      id: p.id,
      organizationId: p.organizationId || organizationId,
      name: p.name,
      description: p.description ?? undefined,
      ownerId: p.ownerId ?? undefined,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }))
  }

  /**
   * Get a single portfolio by ID with related data
   */
  async getPortfolio(id: UUID): Promise<PortfolioWithPrograms | null> {
    const result = await getPortfolio(dataConnect, { id })
    if (!result.data.portfolio) {
      return null
    }
    const portfolio = result.data.portfolio
    return {
      id: portfolio.id,
      organizationId: portfolio.organizationId,
      name: portfolio.name,
      description: portfolio.description ?? undefined,
      ownerId: portfolio.ownerId ?? undefined,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
      programs: [], // Programs will be loaded separately if needed
    }
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

    const result = await createPortfolio(dataConnect, {
      organizationId: input.organizationId,
      name: input.name,
      description: input.description ?? null,
      ownerId: input.ownerId ?? null,
    })
    const portfolio = result.data.portfolio_insert
    return {
      id: portfolio.id,
      organizationId: input.organizationId,
      name: input.name,
      description: input.description,
      ownerId: input.ownerId,
      createdAt: portfolio.createdAt || new Date().toISOString(),
      updatedAt: portfolio.updatedAt || new Date().toISOString(),
    }
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

    const result = await updatePortfolio(dataConnect, {
      id: input.id,
      name: input.name ?? null,
      description: input.description ?? null,
      ownerId: input.ownerId ?? null,
    })

    if (!result.data.portfolio_update) {
      throw new Error("Portfolio not found")
    }

    // Fetch the updated portfolio to get all fields
    const updated = await this.getPortfolio(input.id)
    if (!updated) {
      throw new Error("Failed to fetch updated portfolio")
    }

    return updated
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

    await deletePortfolio(dataConnect, { id })
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
