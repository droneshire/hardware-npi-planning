/**
 * Integration tests for Program Service
 * Tests Data Connect operations for Program CRUD
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { programService } from "@/services/program.service"
import * as sdk from "@firebasegen/default-connector"
import { dataConnect } from "@/lib/firebase"

// Mock the Data Connect SDK
vi.mock("@firebasegen/default-connector", () => ({
  listPrograms: vi.fn(),
  getProgram: vi.fn(),
  createProgram: vi.fn(),
  updateProgram: vi.fn(),
  deleteProgram: vi.fn(),
}))

// Mock the dataConnect client
vi.mock("@/lib/firebase", () => ({
  dataConnect: {} as any,
}))

describe("ProgramService - Data Connect Operations", () => {
  const mockPortfolioId = "portfolio-123"
  const mockProgramId = "program-123"
  const mockProgram = {
    id: mockProgramId,
    portfolioId: mockPortfolioId,
    name: "Test Program",
    description: "Test Description",
    ownerId: "user-123",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("listPrograms", () => {
    it("should call listPrograms SDK function with correct parameters", async () => {
      const mockResult = {
        data: {
          programs: [mockProgram],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.listPrograms(mockPortfolioId)

      expect(sdk.listPrograms).toHaveBeenCalledWith(dataConnect, {
        portfolioId: mockPortfolioId,
      })
      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({
        id: mockProgramId,
        portfolioId: mockPortfolioId,
        name: "Test Program",
        description: "Test Description",
        ownerId: "user-123",
      })
    })

    it("should handle empty program list", async () => {
      const mockResult = {
        data: {
          programs: [],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.listPrograms(mockPortfolioId)

      expect(result).toHaveLength(0)
    })

    it("should handle null description fields", async () => {
      const programWithoutDesc = {
        ...mockProgram,
        description: null,
      }
      const mockResult = {
        data: {
          programs: [programWithoutDesc],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.listPrograms(mockPortfolioId)

      expect(result[0].description).toBeUndefined()
    })
  })

  describe("getProgram", () => {
    it("should call getProgram SDK function with correct parameters", async () => {
      const mockResult = {
        data: {
          program: mockProgram,
        },
      }

      vi.mocked(sdk.getProgram).mockResolvedValue(mockResult as any)

      const result = await programService.getProgram(mockProgramId)

      expect(sdk.getProgram).toHaveBeenCalledWith(dataConnect, {
        id: mockProgramId,
      })
      expect(result).not.toBeNull()
      expect(result?.id).toBe(mockProgramId)
      expect(result?.name).toBe("Test Program")
    })

    it("should return null when program not found", async () => {
      const mockResult = {
        data: {
          program: null,
        },
      }

      vi.mocked(sdk.getProgram).mockResolvedValue(mockResult as any)

      const result = await programService.getProgram(mockProgramId)

      expect(result).toBeNull()
    })
  })

  describe("createProgram", () => {
    it("should call createProgram SDK function with correct parameters", async () => {
      const input = {
        portfolioId: mockPortfolioId,
        name: "New Program",
        description: "New Description",
        ownerId: "user-123",
      }

      const mockResult = {
        data: {
          program_insert: {
            id: mockProgramId,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      }

      vi.mocked(sdk.createProgram).mockResolvedValue(mockResult as any)

      const result = await programService.createProgram(input)

      expect(sdk.createProgram).toHaveBeenCalledWith(dataConnect, {
        portfolioId: mockPortfolioId,
        name: "New Program",
        description: "New Description",
        ownerId: "user-123",
      })
      expect(result.id).toBe(mockProgramId)
      expect(result.name).toBe("New Program")
    })

    it("should throw error when name is empty", async () => {
      const input = {
        portfolioId: mockPortfolioId,
        name: "",
      }

      await expect(programService.createProgram(input)).rejects.toThrow(
        "Program name is required"
      )
    })

    it("should throw error when portfolioId is missing", async () => {
      const input = {
        portfolioId: "",
        name: "Test",
      }

      await expect(programService.createProgram(input as any)).rejects.toThrow(
        "Portfolio ID is required"
      )
    })

    it("should handle null optional fields", async () => {
      const input = {
        portfolioId: mockPortfolioId,
        name: "New Program",
      }

      const mockResult = {
        data: {
          program_insert: {
            id: mockProgramId,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      }

      vi.mocked(sdk.createProgram).mockResolvedValue(mockResult as any)

      const result = await programService.createProgram(input)

      expect(sdk.createProgram).toHaveBeenCalledWith(dataConnect, {
        portfolioId: mockPortfolioId,
        name: "New Program",
        description: null,
        ownerId: null,
      })
      expect(result.description).toBeUndefined()
      expect(result.ownerId).toBeUndefined()
    })
  })

  describe("updateProgram", () => {
    it("should call updateProgram SDK function with correct parameters", async () => {
      const input = {
        id: mockProgramId,
        name: "Updated Program",
        description: "Updated Description",
      }

      const mockUpdateResult = {
        data: {
          program_update: {
            id: mockProgramId,
          },
        },
      }

      const mockGetResult = {
        data: {
          program: {
            ...mockProgram,
            name: "Updated Program",
            description: "Updated Description",
          },
        },
      }

      vi.mocked(sdk.updateProgram).mockResolvedValue(mockUpdateResult as any)
      vi.mocked(sdk.getProgram).mockResolvedValue(mockGetResult as any)

      const result = await programService.updateProgram(input)

      expect(sdk.updateProgram).toHaveBeenCalledWith(dataConnect, {
        id: mockProgramId,
        name: "Updated Program",
        description: "Updated Description",
        ownerId: null,
      })
      expect(result.name).toBe("Updated Program")
    })

    it("should throw error when program not found", async () => {
      const input = {
        id: mockProgramId,
        name: "Updated Program",
      }

      const mockResult = {
        data: {
          program_update: null,
        },
      }

      vi.mocked(sdk.updateProgram).mockResolvedValue(mockResult as any)

      await expect(programService.updateProgram(input)).rejects.toThrow("Program not found")
    })

    it("should throw error when name is empty", async () => {
      const input = {
        id: mockProgramId,
        name: "",
      }

      await expect(programService.updateProgram(input)).rejects.toThrow(
        "Program name cannot be empty"
      )
    })
  })

  describe("deleteProgram", () => {
    it("should call deleteProgram SDK function with correct parameters", async () => {
      vi.mocked(sdk.deleteProgram).mockResolvedValue({} as any)

      await programService.deleteProgram(mockProgramId)

      expect(sdk.deleteProgram).toHaveBeenCalledWith(dataConnect, {
        id: mockProgramId,
      })
    })

    it("should throw error when id is missing", async () => {
      await expect(programService.deleteProgram("")).rejects.toThrow("Program ID is required")
    })
  })

  describe("isNameAvailable", () => {
    it("should return true when name is available", async () => {
      const mockResult = {
        data: {
          programs: [],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.isNameAvailable(mockPortfolioId, "New Name")

      expect(result).toBe(true)
    })

    it("should return false when name is taken", async () => {
      const mockResult = {
        data: {
          programs: [mockProgram],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.isNameAvailable(mockPortfolioId, "Test Program")

      expect(result).toBe(false)
    })

    it("should return true when name is taken by excluded id", async () => {
      const mockResult = {
        data: {
          programs: [mockProgram],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.isNameAvailable(
        mockPortfolioId,
        "Test Program",
        mockProgramId
      )

      expect(result).toBe(true)
    })

    it("should be case-insensitive", async () => {
      const mockResult = {
        data: {
          programs: [mockProgram],
        },
      }

      vi.mocked(sdk.listPrograms).mockResolvedValue(mockResult as any)

      const result = await programService.isNameAvailable(mockPortfolioId, "test program")

      expect(result).toBe(false)
    })
  })
})
