import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a locale string
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—"
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Calculates fiscal year from a date and fiscal year start month
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
 */
export function getCapacityStatus(totalAllocation: number): "normal" | "warning" | "critical" {
  if (totalAllocation <= 100) return "normal"
  if (totalAllocation <= 120) return "warning"
  return "critical"
}
