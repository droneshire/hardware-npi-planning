/**
 * Integration tests for Portfolio Service
 * Tests Data Connect operations for Portfolio CRUD
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { portfolioService } from "@/services/portfolio.service"
import * as sdk from "@firebasegen/default-connector"
import { dataConnect } from "@/lib/firebase"

// Mock the Data Connect SDK
vi.mock("@firebasegen/default-connector", () => ({
  listPortfolios: vi.fn(),
  getPortfolio: vi.fn(),
  createPortfolio: vi.fn(),
  updatePortfolio: vi.fn(),
  deletePortfolio: vi.fn(),
}))

// Mock the dataConnect client
vi.mock("@/lib/firebase", () => ({
  dataConnect: {} as any,
}))

describe("PortfolioService - Data Connect Operations", () => {
  const mockOrganizationId = "org-123"
  const mockPortfolioId = "portfolio-123"
  const mockPortfolio = {
    id: mockPortfolioId,
    organizationId: mockOrganizationId,
    name: "Test Portfolio",
    description: "Test Description",
    ownerId: "user-123",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("listPortfolios", () => {
    it("should call listPortfolios SDK function with correct parameters", async () => {
      const mockResult = {
        data: {
          portfolios: [mockPortfolio],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.listPortfolios(mockOrganizationId)

      expect(sdk.listPortfolios).toHaveBeenCalledWith(dataConnect, {
        organizationId: mockOrganizationId,
      })
      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({
        id: mockPortfolioId,
        organizationId: mockOrganizationId,
        name: "Test Portfolio",
        description: "Test Description",
        ownerId: "user-123",
      })
    })

    it("should handle empty portfolio list", async () => {
      const mockResult = {
        data: {
          portfolios: [],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.listPortfolios(mockOrganizationId)

      expect(result).toHaveLength(0)
    })

    it("should handle null description fields", async () => {
      const portfolioWithoutDesc = {
        ...mockPortfolio,
        description: null,
      }
      const mockResult = {
        data: {
          portfolios: [portfolioWithoutDesc],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.listPortfolios(mockOrganizationId)

      expect(result[0].description).toBeUndefined()
    })
  })

  describe("getPortfolio", () => {
    it("should call getPortfolio SDK function with correct parameters", async () => {
      const mockResult = {
        data: {
          portfolio: mockPortfolio,
        },
      }

      vi.mocked(sdk.getPortfolio).mockResolvedValue(mockResult as any)

      const result = await portfolioService.getPortfolio(mockPortfolioId)

      expect(sdk.getPortfolio).toHaveBeenCalledWith(dataConnect, {
        id: mockPortfolioId,
      })
      expect(result).not.toBeNull()
      expect(result?.id).toBe(mockPortfolioId)
      expect(result?.name).toBe("Test Portfolio")
    })

    it("should return null when portfolio not found", async () => {
      const mockResult = {
        data: {
          portfolio: null,
        },
      }

      vi.mocked(sdk.getPortfolio).mockResolvedValue(mockResult as any)

      const result = await portfolioService.getPortfolio(mockPortfolioId)

      expect(result).toBeNull()
    })
  })

  describe("createPortfolio", () => {
    it("should call createPortfolio SDK function with correct parameters", async () => {
      const input = {
        organizationId: mockOrganizationId,
        name: "New Portfolio",
        description: "New Description",
        ownerId: "user-123",
      }

      const mockResult = {
        data: {
          portfolio_insert: {
            id: mockPortfolioId,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      }

      vi.mocked(sdk.createPortfolio).mockResolvedValue(mockResult as any)

      const result = await portfolioService.createPortfolio(input)

      expect(sdk.createPortfolio).toHaveBeenCalledWith(dataConnect, {
        organizationId: mockOrganizationId,
        name: "New Portfolio",
        description: "New Description",
        ownerId: "user-123",
      })
      expect(result.id).toBe(mockPortfolioId)
      expect(result.name).toBe("New Portfolio")
    })

    it("should throw error when name is empty", async () => {
      const input = {
        organizationId: mockOrganizationId,
        name: "",
      }

      await expect(portfolioService.createPortfolio(input)).rejects.toThrow(
        "Portfolio name is required"
      )
    })

    it("should throw error when organizationId is missing", async () => {
      const input = {
        organizationId: "",
        name: "Test",
      }

      await expect(portfolioService.createPortfolio(input as any)).rejects.toThrow(
        "Organization ID is required"
      )
    })

    it("should handle null optional fields", async () => {
      const input = {
        organizationId: mockOrganizationId,
        name: "New Portfolio",
      }

      const mockResult = {
        data: {
          portfolio_insert: {
            id: mockPortfolioId,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      }

      vi.mocked(sdk.createPortfolio).mockResolvedValue(mockResult as any)

      const result = await portfolioService.createPortfolio(input)

      expect(sdk.createPortfolio).toHaveBeenCalledWith(dataConnect, {
        organizationId: mockOrganizationId,
        name: "New Portfolio",
        description: null,
        ownerId: null,
      })
      expect(result.description).toBeUndefined()
      expect(result.ownerId).toBeUndefined()
    })
  })

  describe("updatePortfolio", () => {
    it("should call updatePortfolio SDK function with correct parameters", async () => {
      const input = {
        id: mockPortfolioId,
        name: "Updated Portfolio",
        description: "Updated Description",
      }

      const mockUpdateResult = {
        data: {
          portfolio_update: {
            id: mockPortfolioId,
          },
        },
      }

      const mockGetResult = {
        data: {
          portfolio: {
            ...mockPortfolio,
            name: "Updated Portfolio",
            description: "Updated Description",
          },
        },
      }

      vi.mocked(sdk.updatePortfolio).mockResolvedValue(mockUpdateResult as any)
      vi.mocked(sdk.getPortfolio).mockResolvedValue(mockGetResult as any)

      const result = await portfolioService.updatePortfolio(input)

      expect(sdk.updatePortfolio).toHaveBeenCalledWith(dataConnect, {
        id: mockPortfolioId,
        name: "Updated Portfolio",
        description: "Updated Description",
        ownerId: null,
      })
      expect(result.name).toBe("Updated Portfolio")
    })

    it("should throw error when portfolio not found", async () => {
      const input = {
        id: mockPortfolioId,
        name: "Updated Portfolio",
      }

      const mockResult = {
        data: {
          portfolio_update: null,
        },
      }

      vi.mocked(sdk.updatePortfolio).mockResolvedValue(mockResult as any)

      await expect(portfolioService.updatePortfolio(input)).rejects.toThrow("Portfolio not found")
    })

    it("should throw error when name is empty", async () => {
      const input = {
        id: mockPortfolioId,
        name: "",
      }

      await expect(portfolioService.updatePortfolio(input)).rejects.toThrow(
        "Portfolio name cannot be empty"
      )
    })
  })

  describe("deletePortfolio", () => {
    it("should call deletePortfolio SDK function with correct parameters", async () => {
      vi.mocked(sdk.deletePortfolio).mockResolvedValue({} as any)

      await portfolioService.deletePortfolio(mockPortfolioId)

      expect(sdk.deletePortfolio).toHaveBeenCalledWith(dataConnect, {
        id: mockPortfolioId,
      })
    })

    it("should throw error when id is missing", async () => {
      await expect(portfolioService.deletePortfolio("")).rejects.toThrow(
        "Portfolio ID is required"
      )
    })
  })

  describe("isNameAvailable", () => {
    it("should return true when name is available", async () => {
      const mockResult = {
        data: {
          portfolios: [],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.isNameAvailable(mockOrganizationId, "New Name")

      expect(result).toBe(true)
    })

    it("should return false when name is taken", async () => {
      const mockResult = {
        data: {
          portfolios: [mockPortfolio],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.isNameAvailable(
        mockOrganizationId,
        "Test Portfolio"
      )

      expect(result).toBe(false)
    })

    it("should return true when name is taken by excluded id", async () => {
      const mockResult = {
        data: {
          portfolios: [mockPortfolio],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.isNameAvailable(
        mockOrganizationId,
        "Test Portfolio",
        mockPortfolioId
      )

      expect(result).toBe(true)
    })

    it("should be case-insensitive", async () => {
      const mockResult = {
        data: {
          portfolios: [mockPortfolio],
        },
      }

      vi.mocked(sdk.listPortfolios).mockResolvedValue(mockResult as any)

      const result = await portfolioService.isNameAvailable(
        mockOrganizationId,
        "test portfolio"
      )

      expect(result).toBe(false)
    })
  })
})
