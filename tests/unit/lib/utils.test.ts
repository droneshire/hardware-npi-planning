import { describe, it, expect } from "vitest"
import {
  cn,
  formatDate,
  getFiscalYear,
  getFiscalQuarter,
  validateAllocation,
  isOverAllocated,
  getCapacityStatus,
  validateNonEmptyString,
  validateRequired,
  validateNonNegative,
  validateEmail,
  validateDateRange,
} from "@/lib/utils"

describe("cn - Tailwind class merger", () => {
  it("should merge classes correctly", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("should handle conditional classes", () => {
    expect(cn("base", true && "conditional")).toBe("base conditional")
    expect(cn("base", false && "conditional")).toBe("base")
  })

  it("should handle undefined and null", () => {
    expect(cn("base", undefined, null)).toBe("base")
  })
})

describe("formatDate", () => {
  it("should format Date objects", () => {
    const date = new Date(2024, 2, 15) // March 15, 2024 (local)
    const formatted = formatDate(date)
    expect(formatted).toContain("Mar")
    expect(formatted).toContain("15")
    expect(formatted).toContain("2024")
  })

  it("should format ISO date strings", () => {
    const formatted = formatDate("2024-03-15")
    expect(formatted).toContain("Mar")
    expect(formatted).toContain("15")
  })

  it("should return em dash for null", () => {
    expect(formatDate(null)).toBe("—")
  })

  it("should return em dash for undefined", () => {
    expect(formatDate(undefined)).toBe("—")
  })
})

describe("getFiscalYear", () => {
  it("should calculate fiscal year with January start (calendar year)", () => {
    const date = new Date(2024, 5, 15) // June 15, 2024 (local)
    expect(getFiscalYear(date, 1)).toBe(2025) // FY2025
  })

  it("should calculate fiscal year with July start", () => {
    const dateBeforeJuly = new Date(2024, 5, 15) // June 15 (local)
    expect(getFiscalYear(dateBeforeJuly, 7)).toBe(2024) // Still in FY2024

    const dateAfterJuly = new Date(2024, 6, 15) // July 15 (local)
    expect(getFiscalYear(dateAfterJuly, 7)).toBe(2025) // Now in FY2025
  })

  it("should calculate fiscal year with October start", () => {
    const dateBefore = new Date(2024, 8, 30) // Sep 30, 2024 (local)
    expect(getFiscalYear(dateBefore, 10)).toBe(2024)

    const dateAfter = new Date(2024, 9, 1) // Oct 1, 2024 (local)
    expect(getFiscalYear(dateAfter, 10)).toBe(2025)
  })

  it("should handle edge case at fiscal year boundary", () => {
    const april30 = new Date(2024, 3, 30) // Apr 30 (local)
    const may1 = new Date(2024, 4, 1) // May 1 (local)

    expect(getFiscalYear(april30, 5)).toBe(2024)
    expect(getFiscalYear(may1, 5)).toBe(2025)
  })
})

describe("getFiscalQuarter", () => {
  it("should calculate Q1 correctly with January start", () => {
    expect(getFiscalQuarter(new Date("2024-01-15"), 1)).toBe(1)
    expect(getFiscalQuarter(new Date("2024-02-15"), 1)).toBe(1)
    expect(getFiscalQuarter(new Date("2024-03-15"), 1)).toBe(1)
  })

  it("should calculate all quarters with January start", () => {
    expect(getFiscalQuarter(new Date("2024-01-15"), 1)).toBe(1) // Q1
    expect(getFiscalQuarter(new Date("2024-04-15"), 1)).toBe(2) // Q2
    expect(getFiscalQuarter(new Date("2024-07-15"), 1)).toBe(3) // Q3
    expect(getFiscalQuarter(new Date("2024-10-15"), 1)).toBe(4) // Q4
  })

  it("should calculate quarters with July start (common fiscal year)", () => {
    expect(getFiscalQuarter(new Date("2024-07-15"), 7)).toBe(1) // Q1
    expect(getFiscalQuarter(new Date("2024-10-15"), 7)).toBe(2) // Q2
    expect(getFiscalQuarter(new Date("2024-01-15"), 7)).toBe(3) // Q3
    expect(getFiscalQuarter(new Date("2024-04-15"), 7)).toBe(4) // Q4
  })

  it("should calculate quarters with October start", () => {
    expect(getFiscalQuarter(new Date("2024-10-15"), 10)).toBe(1) // Q1
    expect(getFiscalQuarter(new Date("2024-01-15"), 10)).toBe(2) // Q2
    expect(getFiscalQuarter(new Date("2024-04-15"), 10)).toBe(3) // Q3
    expect(getFiscalQuarter(new Date("2024-07-15"), 10)).toBe(4) // Q4
  })
})

describe("validateAllocation", () => {
  it("should validate valid allocations", () => {
    expect(validateAllocation(0)).toBe(true)
    expect(validateAllocation(50)).toBe(true)
    expect(validateAllocation(100)).toBe(true)
  })

  it("should reject negative allocations", () => {
    expect(validateAllocation(-1)).toBe(false)
    expect(validateAllocation(-100)).toBe(false)
  })

  it("should reject allocations over 100", () => {
    expect(validateAllocation(101)).toBe(false)
    expect(validateAllocation(150)).toBe(false)
  })

  it("should reject decimal allocations", () => {
    expect(validateAllocation(50.5)).toBe(false)
    expect(validateAllocation(99.9)).toBe(false)
  })

  it("should handle edge cases", () => {
    expect(validateAllocation(0)).toBe(true)
    expect(validateAllocation(100)).toBe(true)
  })
})

describe("isOverAllocated", () => {
  it("should return false for normal allocation", () => {
    expect(isOverAllocated(50)).toBe(false)
    expect(isOverAllocated(100)).toBe(false)
  })

  it("should return true for over-allocation", () => {
    expect(isOverAllocated(101)).toBe(true)
    expect(isOverAllocated(150)).toBe(true)
  })

  it("should handle edge case at 100%", () => {
    expect(isOverAllocated(100)).toBe(false)
    expect(isOverAllocated(100.1)).toBe(true)
  })
})

describe("getCapacityStatus", () => {
  it("should return 'normal' for allocations up to 100%", () => {
    expect(getCapacityStatus(0)).toBe("normal")
    expect(getCapacityStatus(50)).toBe("normal")
    expect(getCapacityStatus(100)).toBe("normal")
  })

  it("should return 'warning' for allocations 101-120%", () => {
    expect(getCapacityStatus(101)).toBe("warning")
    expect(getCapacityStatus(110)).toBe("warning")
    expect(getCapacityStatus(120)).toBe("warning")
  })

  it("should return 'critical' for allocations over 120%", () => {
    expect(getCapacityStatus(121)).toBe("critical")
    expect(getCapacityStatus(150)).toBe("critical")
    expect(getCapacityStatus(200)).toBe("critical")
  })

  it("should handle edge cases", () => {
    expect(getCapacityStatus(100)).toBe("normal")
    expect(getCapacityStatus(120)).toBe("warning")
    expect(getCapacityStatus(121)).toBe("critical")
  })
})

describe("validateNonEmptyString", () => {
  it("should not throw for valid non-empty strings", () => {
    expect(() => validateNonEmptyString("valid", "Field")).not.toThrow()
    expect(() => validateNonEmptyString("  valid  ", "Field")).not.toThrow()
  })

  it("should not throw for undefined values", () => {
    expect(() => validateNonEmptyString(undefined, "Field")).not.toThrow()
  })

  it("should throw for empty strings", () => {
    expect(() => validateNonEmptyString("", "Field")).toThrow("Field cannot be empty")
    expect(() => validateNonEmptyString("   ", "Field")).toThrow("Field cannot be empty")
  })
})

describe("validateRequired", () => {
  it("should not throw for valid values", () => {
    expect(() => validateRequired("value", "Field")).not.toThrow()
    expect(() => validateRequired(123, "Field")).not.toThrow()
    expect(() => validateRequired(true, "Field")).not.toThrow()
    expect(() => validateRequired([], "Field")).not.toThrow()
  })

  it("should throw for undefined", () => {
    expect(() => validateRequired(undefined, "Field")).toThrow("Field is required")
  })

  it("should throw for null", () => {
    expect(() => validateRequired(null, "Field")).toThrow("Field is required")
  })

  it("should throw for empty strings", () => {
    expect(() => validateRequired("", "Field")).toThrow("Field is required")
    expect(() => validateRequired("   ", "Field")).toThrow("Field is required")
  })
})

describe("validateNonNegative", () => {
  it("should not throw for valid non-negative numbers", () => {
    expect(() => validateNonNegative(0, "Field")).not.toThrow()
    expect(() => validateNonNegative(1, "Field")).not.toThrow()
    expect(() => validateNonNegative(100, "Field")).not.toThrow()
  })

  it("should not throw for undefined", () => {
    expect(() => validateNonNegative(undefined, "Field")).not.toThrow()
  })

  it("should throw for negative numbers", () => {
    expect(() => validateNonNegative(-1, "Field")).toThrow("Field must be non-negative")
    expect(() => validateNonNegative(-100, "Field")).toThrow("Field must be non-negative")
  })
})

describe("validateEmail", () => {
  it("should not throw for valid email addresses", () => {
    expect(() => validateEmail("test@example.com")).not.toThrow()
    expect(() => validateEmail("user.name@example.co.uk")).not.toThrow()
    expect(() => validateEmail("user+tag@example.com")).not.toThrow()
  })

  it("should throw for invalid email addresses", () => {
    expect(() => validateEmail("invalid")).toThrow("Invalid email format")
    expect(() => validateEmail("invalid@")).toThrow("Invalid email format")
    expect(() => validateEmail("@example.com")).toThrow("Invalid email format")
    expect(() => validateEmail("invalid@example")).toThrow("Invalid email format")
    expect(() => validateEmail("invalid @example.com")).toThrow("Invalid email format")
  })
})

describe("validateDateRange", () => {
  it("should not throw for valid date ranges", () => {
    expect(() => validateDateRange("2024-01-01", "2024-01-02")).not.toThrow()
    expect(() => validateDateRange("2024-01-01", "2024-12-31")).not.toThrow()
  })

  it("should throw when target date is before start date", () => {
    expect(() => validateDateRange("2024-01-02", "2024-01-01")).toThrow(
      "Target completion date must be after start date"
    )
  })

  it("should throw when target date equals start date", () => {
    expect(() => validateDateRange("2024-01-01", "2024-01-01")).toThrow(
      "Target completion date must be after start date"
    )
  })
})
