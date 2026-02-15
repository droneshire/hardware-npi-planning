import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse date-only ISO string (YYYY-MM-DD) as local date to avoid UTC midnight timezone issues
 */
function parseLocalDate(date: Date | string): Date {
  if (typeof date !== "string") return date
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date)
  if (match) {
    const [, y, m, d] = match
    return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10))
  }
  return new Date(date)
}

/**
 * Formats a date to a locale string
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—"
  const d = parseLocalDate(typeof date === "string" ? date : date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Calculates fiscal year from a date and fiscal year start month (1-12).
 * Uses local date parts so date-only values are interpreted consistently.
 */
export function getFiscalYear(date: Date, fiscalYearStartMonth: number): number {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 0-indexed to 1-indexed

  if (month >= fiscalYearStartMonth) {
    return year + 1
  }
  return year
}

/**
 * Gets fiscal quarter from a date and fiscal year start month
 */
export function getFiscalQuarter(date: Date, fiscalYearStartMonth: number): number {
  const month = date.getMonth() + 1
  const adjustedMonth = (month - fiscalYearStartMonth + 12) % 12
  return Math.floor(adjustedMonth / 3) + 1
}

/**
 * Validates allocation percentage (0-100)
 */
export function validateAllocation(value: number): boolean {
  return value >= 0 && value <= 100 && Number.isInteger(value)
}

/**
 * Checks if a user is over-allocated based on assignments
 */
export function isOverAllocated(totalAllocation: number): boolean {
  return totalAllocation > 100
}

/**
 * Gets capacity badge status
 * normal: 0-100%, warning: 101-120%, critical: >120%
 */
export function getCapacityStatus(totalAllocation: number): "normal" | "warning" | "critical" {
  if (totalAllocation > 120) return "critical"
  if (totalAllocation > 100) return "warning"
  return "normal"
}

/**
 * Validates that a string is not empty after trimming
 */
export function validateNonEmptyString(value: string | undefined, fieldName: string): void {
  if (value !== undefined && value.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty`)
  }
}

/**
 * Validates that a required value is provided
 */
export function validateRequired<T>(
  value: T | undefined | null,
  fieldName: string
): asserts value is T {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    throw new Error(`${fieldName} is required`)
  }
}

/**
 * Validates that a number is non-negative
 */
export function validateNonNegative(value: number | undefined, fieldName: string): void {
  if (value !== undefined && value < 0) {
    throw new Error(`${fieldName} must be non-negative`)
  }
}

/**
 * Validates email format
 */
export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format")
  }
}

/**
 * Validates that a target date is after a start date
 */
export function validateDateRange(startDate: string, targetDate: string): void {
  const start = new Date(startDate)
  const target = new Date(targetDate)

  if (target <= start) {
    throw new Error("Target completion date must be after start date")
  }
}
