import { describe, it, expect } from "vitest"

/**
 * Allocation Math Tests
 *
 * Tests for calculating resource allocation percentages,
 * detecting over-allocation, and validating date ranges.
 */

interface Assignment {
  id: string
  userId: string
  allocationPercent: number
  startDate: string
  endDate?: string
}

/**
 * Calculate total allocation for a user in a date range
 */
function calculateTotalAllocation(
  assignments: Assignment[],
  userId: string,
  startDate: string,
  endDate: string
): number {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return assignments
    .filter((assignment) => {
      if (assignment.userId !== userId) return false

      const assignmentStart = new Date(assignment.startDate)
      const assignmentEnd = assignment.endDate ? new Date(assignment.endDate) : new Date("2099-12-31")

      // Check if assignment overlaps with date range
      return (
        (assignmentStart <= start && assignmentEnd >= start) ||
        (assignmentStart <= end && assignmentEnd >= end) ||
        (assignmentStart >= start && assignmentEnd <= end)
      )
    })
    .reduce((sum, assignment) => sum + assignment.allocationPercent, 0)
}

/**
 * Check if adding an assignment would cause over-allocation
 */
function wouldCauseOverAllocation(
  existingAssignments: Assignment[],
  newAssignment: Assignment
): boolean {
  const total = calculateTotalAllocation(
    [...existingAssignments, newAssignment],
    newAssignment.userId,
    newAssignment.startDate,
    newAssignment.endDate || new Date("2099-12-31").toISOString()
  )

  return total > 100
}

/**
 * Find overlapping assignments for a user in a date range
 */
function findOverlappingAssignments(
  assignments: Assignment[],
  userId: string,
  startDate: string,
  endDate: string
): Assignment[] {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return assignments.filter((assignment) => {
    if (assignment.userId !== userId) return false

    const assignmentStart = new Date(assignment.startDate)
    const assignmentEnd = assignment.endDate
      ? new Date(assignment.endDate)
      : new Date("2099-12-31")

    return (
      (assignmentStart <= start && assignmentEnd >= start) ||
      (assignmentStart <= end && assignmentEnd >= end) ||
      (assignmentStart >= start && assignmentEnd <= end)
    )
  })
}

describe("calculateTotalAllocation", () => {
  const mockAssignments: Assignment[] = [
    {
      id: "1",
      userId: "user-1",
      allocationPercent: 50,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
    },
    {
      id: "2",
      userId: "user-1",
      allocationPercent: 30,
      startDate: "2024-02-01",
      endDate: "2024-04-30",
    },
    {
      id: "3",
      userId: "user-2",
      allocationPercent: 100,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  ]

  it("should calculate total allocation for overlapping assignments", () => {
    const total = calculateTotalAllocation(mockAssignments, "user-1", "2024-02-01", "2024-03-31")

    // Both assignments overlap in this range: 50% + 30% = 80%
    expect(total).toBe(80)
  })

  it("should only count assignments for the specified user", () => {
    const total = calculateTotalAllocation(mockAssignments, "user-2", "2024-01-01", "2024-12-31")

    expect(total).toBe(100)
  })

  it("should handle assignments with no end date (ongoing)", () => {
    const assignments: Assignment[] = [
      {
        id: "1",
        userId: "user-1",
        allocationPercent: 50,
        startDate: "2024-01-01",
        // No endDate = ongoing
      },
    ]

    const total = calculateTotalAllocation(assignments, "user-1", "2024-06-01", "2024-12-31")

    expect(total).toBe(50)
  })

  it("should return 0 when no assignments overlap", () => {
    const total = calculateTotalAllocation(mockAssignments, "user-1", "2025-01-01", "2025-12-31")

    expect(total).toBe(0)
  })

  it("should handle partial overlaps correctly", () => {
    const total = calculateTotalAllocation(mockAssignments, "user-1", "2024-01-15", "2024-01-31")

    // Only first assignment overlaps: 50%
    expect(total).toBe(50)
  })
})

describe("wouldCauseOverAllocation", () => {
  const existingAssignments: Assignment[] = [
    {
      id: "1",
      userId: "user-1",
      allocationPercent: 60,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: "2",
      userId: "user-1",
      allocationPercent: 30,
      startDate: "2024-06-01",
      endDate: "2024-12-31",
    },
  ]

  it("should detect over-allocation when total exceeds 100%", () => {
    const newAssignment: Assignment = {
      id: "3",
      userId: "user-1",
      allocationPercent: 20, // 60 + 30 + 20 = 110% > 100%
      startDate: "2024-06-01",
      endDate: "2024-12-31",
    }

    expect(wouldCauseOverAllocation(existingAssignments, newAssignment)).toBe(true)
  })

  it("should not flag when total is exactly 100%", () => {
    const newAssignment: Assignment = {
      id: "3",
      userId: "user-1",
      allocationPercent: 10, // 60 + 30 + 10 = 100%
      startDate: "2024-06-01",
      endDate: "2024-12-31",
    }

    expect(wouldCauseOverAllocation(existingAssignments, newAssignment)).toBe(false)
  })

  it("should not flag when assignments don't overlap", () => {
    const newAssignment: Assignment = {
      id: "3",
      userId: "user-1",
      allocationPercent: 100, // Doesn't overlap with existing
      startDate: "2025-01-01",
      endDate: "2025-12-31",
    }

    expect(wouldCauseOverAllocation(existingAssignments, newAssignment)).toBe(false)
  })

  it("should handle different users independently", () => {
    const newAssignment: Assignment = {
      id: "3",
      userId: "user-2", // Different user
      allocationPercent: 100,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    }

    expect(wouldCauseOverAllocation(existingAssignments, newAssignment)).toBe(false)
  })
})

describe("findOverlappingAssignments", () => {
  const assignments: Assignment[] = [
    {
      id: "1",
      userId: "user-1",
      allocationPercent: 50,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
    },
    {
      id: "2",
      userId: "user-1",
      allocationPercent: 30,
      startDate: "2024-04-01",
      endDate: "2024-06-30",
    },
    {
      id: "3",
      userId: "user-1",
      allocationPercent: 20,
      startDate: "2024-02-01",
      endDate: "2024-05-31",
    },
  ]

  it("should find all overlapping assignments", () => {
    const overlapping = findOverlappingAssignments(
      assignments,
      "user-1",
      "2024-02-15",
      "2024-04-15"
    )

    // Range Feb 15 - Apr 15: assignment 1 (Jan-Mar), 2 (Apr-Jun), 3 (Feb-May) all overlap
    expect(overlapping).toHaveLength(3)
    expect(overlapping.map((a) => a.id)).toContain("1")
    expect(overlapping.map((a) => a.id)).toContain("2")
    expect(overlapping.map((a) => a.id)).toContain("3")
  })

  it("should return empty array when no overlaps", () => {
    const overlapping = findOverlappingAssignments(
      assignments,
      "user-1",
      "2025-01-01",
      "2025-12-31"
    )

    expect(overlapping).toHaveLength(0)
  })

  it("should only return assignments for specified user", () => {
    const otherUserAssignments: Assignment[] = [
      {
        id: "4",
        userId: "user-2",
        allocationPercent: 100,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
    ]

    const overlapping = findOverlappingAssignments(
      [...assignments, ...otherUserAssignments],
      "user-1",
      "2024-01-01",
      "2024-12-31"
    )

    expect(overlapping.every((a) => a.userId === "user-1")).toBe(true)
  })
})
