/**
 * Integration tests for Project Service
 * Tests Data Connect operations for Project CRUD and phases
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { projectService } from "@/services/project.service"
import * as sdk from "@firebasegen/default-connector"
import { dataConnect } from "@/lib/firebase"

// Mock the Data Connect SDK
vi.mock("@firebasegen/default-connector", () => ({
  listProjects: vi.fn(),
  getProject: vi.fn(),
  listProjectsByStatus: vi.fn(),
  createProject: vi.fn(),
  updateProject: vi.fn(),
  deleteProject: vi.fn(),
  listProjectPhases: vi.fn(),
  createProjectPhase: vi.fn(),
  ProjectStatus: {
    PLANNING: "PLANNING",
    ACTIVE: "ACTIVE",
    ON_HOLD: "ON_HOLD",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
  },
}))

// Mock the dataConnect client
vi.mock("@/lib/firebase", () => ({
  dataConnect: {} as any,
}))

describe("ProjectService - Data Connect Operations", () => {
  const mockProgramId = "program-123"
  const mockProjectId = "project-123"
  const mockProject = {
    id: mockProjectId,
    programId: mockProgramId,
    productTypeId: "product-type-123",
    name: "Test Project",
    description: "Test Description",
    status: "PLANNING",
    startDate: "2024-01-01",
    targetCompletionDate: "2024-12-31",
    actualCompletionDate: null,
    ownerId: "user-123",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  }

  const mockPhase = {
    id: "phase-123",
    projectId: mockProjectId,
    name: "EVT",
    description: "Engineering Validation Test",
    status: "NOT_STARTED",
    startDate: "2024-01-01",
    targetEndDate: "2024-03-31",
    actualEndDate: null,
    order: 1,
    percentComplete: 0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("listProjects", () => {
    it("should call listProjects SDK function with correct parameters", async () => {
      const mockResult = {
        data: {
          projects: [mockProject],
        },
      }

      vi.mocked(sdk.listProjects).mockResolvedValue(mockResult as any)

      const result = await projectService.listProjects(mockProgramId)

      expect(sdk.listProjects).toHaveBeenCalledWith(dataConnect, {
        programId: mockProgramId,
      })
      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({
        id: mockProjectId,
        programId: mockProgramId,
        name: "Test Project",
        status: "PLANNING",
      })
    })

    it("should handle empty project list", async () => {
      const mockResult = {
        data: {
          projects: [],
        },
      }

      vi.mocked(sdk.listProjects).mockResolvedValue(mockResult as any)

      const result = await projectService.listProjects(mockProgramId)

      expect(result).toHaveLength(0)
    })

    it("should handle null optional fields", async () => {
      const projectWithoutOptional = {
        ...mockProject,
        description: null,
        productTypeId: null,
        startDate: null,
        targetCompletionDate: null,
      }
      const mockResult = {
        data: {
          projects: [projectWithoutOptional],
        },
      }

      vi.mocked(sdk.listProjects).mockResolvedValue(mockResult as any)

      const result = await projectService.listProjects(mockProgramId)

      expect(result[0].description).toBeUndefined()
      expect(result[0].productTypeId).toBeUndefined()
      expect(result[0].startDate).toBeUndefined()
      expect(result[0].targetCompletionDate).toBeUndefined()
    })
  })

  describe("listProjectsByStatus", () => {
    it("should call listProjectsByStatus SDK function with correct parameters", async () => {
      const mockResult = {
        data: {
          projects: [mockProject],
        },
      }

      vi.mocked(sdk.listProjectsByStatus).mockResolvedValue(mockResult as any)

      const result = await projectService.listProjectsByStatus("ACTIVE")

      expect(sdk.listProjectsByStatus).toHaveBeenCalledWith(dataConnect, {
        status: "ACTIVE",
      })
      expect(result).toHaveLength(1)
      expect(result[0].status).toBe("PLANNING") // Status from mock
    })
  })

  describe("getProject", () => {
    it("should call getProject SDK function and load phases", async () => {
      const mockProjectResult = {
        data: {
          project: mockProject,
        },
      }

      const mockPhasesResult = {
        data: {
          projectPhases: [mockPhase],
        },
      }

      vi.mocked(sdk.getProject).mockResolvedValue(mockProjectResult as any)
      vi.mocked(sdk.listProjectPhases).mockResolvedValue(mockPhasesResult as any)

      const result = await projectService.getProject(mockProjectId)

      expect(sdk.getProject).toHaveBeenCalledWith(dataConnect, {
        id: mockProjectId,
      })
      expect(sdk.listProjectPhases).toHaveBeenCalledWith(dataConnect, {
        projectId: mockProjectId,
      })
      expect(result).not.toBeNull()
      expect(result?.id).toBe(mockProjectId)
      expect(result?.phases).toHaveLength(1)
      expect(result?.phases?.[0].name).toBe("EVT")
    })

    it("should return null when project not found", async () => {
      const mockResult = {
        data: {
          project: null,
        },
      }

      vi.mocked(sdk.getProject).mockResolvedValue(mockResult as any)

      const result = await projectService.getProject(mockProjectId)

      expect(result).toBeNull()
    })

    it("should handle projects without phases", async () => {
      const mockProjectResult = {
        data: {
          project: mockProject,
        },
      }

      const mockPhasesResult = {
        data: {
          projectPhases: [],
        },
      }

      vi.mocked(sdk.getProject).mockResolvedValue(mockProjectResult as any)
      vi.mocked(sdk.listProjectPhases).mockResolvedValue(mockPhasesResult as any)

      const result = await projectService.getProject(mockProjectId)

      expect(result?.phases).toHaveLength(0)
    })
  })

  describe("createProject", () => {
    it("should call createProject SDK function with correct parameters", async () => {
      const input = {
        programId: mockProgramId,
        name: "New Project",
        description: "New Description",
        status: "PLANNING" as const,
        startDate: "2024-01-01",
        targetCompletionDate: "2024-12-31",
      }

      const mockResult = {
        data: {
          project_insert: {
            id: mockProjectId,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      }

      vi.mocked(sdk.createProject).mockResolvedValue(mockResult as any)

      const result = await projectService.createProject(input)

      expect(sdk.createProject).toHaveBeenCalledWith(dataConnect, {
        programId: mockProgramId,
        name: "New Project",
        description: "New Description",
        status: "PLANNING",
        startDate: "2024-01-01",
        targetCompletionDate: "2024-12-31",
        ownerId: null,
        productTypeId: null,
      })
      expect(result.id).toBe(mockProjectId)
      expect(result.name).toBe("New Project")
    })

    it("should throw error when name is empty", async () => {
      const input = {
        programId: mockProgramId,
        name: "",
      }

      await expect(projectService.createProject(input)).rejects.toThrow(
        "Project name is required"
      )
    })

    it("should throw error when programId is missing", async () => {
      const input = {
        programId: "",
        name: "Test",
      }

      await expect(projectService.createProject(input as any)).rejects.toThrow(
        "Program ID is required"
      )
    })

    it("should validate date ranges", async () => {
      const input = {
        programId: mockProgramId,
        name: "Test Project",
        startDate: "2024-12-31",
        targetCompletionDate: "2024-01-01", // Before start date
      }

      await expect(projectService.createProject(input)).rejects.toThrow(
        "Target completion date must be after start date"
      )
    })

    it("should handle null optional fields", async () => {
      const input = {
        programId: mockProgramId,
        name: "New Project",
      }

      const mockResult = {
        data: {
          project_insert: {
            id: mockProjectId,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        },
      }

      vi.mocked(sdk.createProject).mockResolvedValue(mockResult as any)

      const result = await projectService.createProject(input)

      expect(sdk.createProject).toHaveBeenCalledWith(dataConnect, {
        programId: mockProgramId,
        name: "New Project",
        description: null,
        status: null,
        startDate: null,
        targetCompletionDate: null,
        ownerId: null,
        productTypeId: null,
      })
      expect(result.status).toBe("PLANNING") // Default status
    })
  })

  describe("updateProject", () => {
    it("should call updateProject SDK function with correct parameters", async () => {
      const input = {
        id: mockProjectId,
        name: "Updated Project",
        status: "ACTIVE" as const,
      }

      const mockUpdateResult = {
        data: {
          project_update: {
            id: mockProjectId,
          },
        },
      }

      const mockGetResult = {
        data: {
          project: {
            ...mockProject,
            name: "Updated Project",
            status: "ACTIVE",
          },
        },
      }

      const mockPhasesResult = {
        data: {
          projectPhases: [],
        },
      }

      vi.mocked(sdk.updateProject).mockResolvedValue(mockUpdateResult as any)
      vi.mocked(sdk.getProject).mockResolvedValue(mockGetResult as any)
      vi.mocked(sdk.listProjectPhases).mockResolvedValue(mockPhasesResult as any)

      const result = await projectService.updateProject(input)

      expect(sdk.updateProject).toHaveBeenCalledWith(dataConnect, {
        id: mockProjectId,
        name: "Updated Project",
        description: null,
        status: "ACTIVE",
        startDate: null,
        targetCompletionDate: null,
        actualCompletionDate: null,
        ownerId: null,
        productTypeId: null,
      })
      expect(result.name).toBe("Updated Project")
      expect(result.status).toBe("ACTIVE")
    })

    it("should throw error when project not found", async () => {
      const input = {
        id: mockProjectId,
        name: "Updated Project",
      }

      const mockResult = {
        data: {
          project_update: null,
        },
      }

      vi.mocked(sdk.updateProject).mockResolvedValue(mockResult as any)

      await expect(projectService.updateProject(input)).rejects.toThrow("Project not found")
    })

    it("should validate date ranges", async () => {
      const input = {
        id: mockProjectId,
        startDate: "2024-12-31",
        targetCompletionDate: "2024-01-01",
      }

      await expect(projectService.updateProject(input)).rejects.toThrow(
        "Target completion date must be after start date"
      )
    })
  })

  describe("deleteProject", () => {
    it("should call deleteProject SDK function with correct parameters", async () => {
      vi.mocked(sdk.deleteProject).mockResolvedValue({} as any)

      await projectService.deleteProject(mockProjectId)

      expect(sdk.deleteProject).toHaveBeenCalledWith(dataConnect, {
        id: mockProjectId,
      })
    })

    it("should throw error when id is missing", async () => {
      await expect(projectService.deleteProject("")).rejects.toThrow("Project ID is required")
    })
  })

  describe("calculateProjectCompletion", () => {
    it("should calculate completion percentage from phases", () => {
      const phases = [
        { ...mockPhase, percentComplete: 50 },
        { ...mockPhase, id: "phase-2", percentComplete: 100 },
        { ...mockPhase, id: "phase-3", percentComplete: 0 },
      ]

      const result = projectService.calculateProjectCompletion(phases as any)

      expect(result).toBe(50) // (50 + 100 + 0) / 3 = 50
    })

    it("should return 0 for empty phases", () => {
      const result = projectService.calculateProjectCompletion([])

      expect(result).toBe(0)
    })
  })

  describe("isNameAvailable", () => {
    it("should return true when name is available", async () => {
      const mockResult = {
        data: {
          projects: [],
        },
      }

      vi.mocked(sdk.listProjects).mockResolvedValue(mockResult as any)

      const result = await projectService.isNameAvailable(mockProgramId, "New Name")

      expect(result).toBe(true)
    })

    it("should return false when name is taken", async () => {
      const mockResult = {
        data: {
          projects: [mockProject],
        },
      }

      vi.mocked(sdk.listProjects).mockResolvedValue(mockResult as any)

      const result = await projectService.isNameAvailable(mockProgramId, "Test Project")

      expect(result).toBe(false)
    })

    it("should be case-insensitive", async () => {
      const mockResult = {
        data: {
          projects: [mockProject],
        },
      }

      vi.mocked(sdk.listProjects).mockResolvedValue(mockResult as any)

      const result = await projectService.isNameAvailable(mockProgramId, "test project")

      expect(result).toBe(false)
    })
  })
})
