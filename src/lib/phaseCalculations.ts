/**
 * Phase Calculations
 *
 * Utilities for calculating phase dates, durations, and schedules.
 */

import { addWeeks, parseISO, formatISO } from "date-fns"

export interface PhaseSchedule {
  name: string
  description?: string
  startDate: string
  targetEndDate: string
  order: number
  durationWeeks?: number
}

export interface TemplatePhaseInput {
  name: string
  description?: string
  durationWeeks?: number
  order: number
}

/**
 * Calculate phase dates based on project start date and template phases
 *
 * @param projectStartDate - ISO date string for project start
 * @param templatePhases - Array of template phases with durations
 * @returns Array of phase schedules with calculated dates
 */
export function calculatePhaseSchedule(
  projectStartDate: string,
  templatePhases: TemplatePhaseInput[]
): PhaseSchedule[] {
  const startDate = parseISO(projectStartDate)
  const schedules: PhaseSchedule[] = []

  let currentDate = startDate

  // Sort phases by order to ensure sequential calculation
  const sortedPhases = [...templatePhases].sort((a, b) => a.order - b.order)

  for (const phase of sortedPhases) {
    const phaseStart = currentDate
    const durationWeeks = phase.durationWeeks || 4 // Default to 4 weeks if not specified
    const phaseEnd = addWeeks(phaseStart, durationWeeks)

    schedules.push({
      name: phase.name,
      description: phase.description,
      startDate: formatISO(phaseStart, { representation: "date" }),
      targetEndDate: formatISO(phaseEnd, { representation: "date" }),
      order: phase.order,
      durationWeeks: phase.durationWeeks,
    })

    // Next phase starts where this one ends
    currentDate = phaseEnd
  }

  return schedules
}

/**
 * Calculate total project duration from template phases
 *
 * @param templatePhases - Array of template phases
 * @returns Total duration in weeks
 */
export function calculateTotalDuration(templatePhases: TemplatePhaseInput[]): number {
  return templatePhases.reduce((total, phase) => {
    return total + (phase.durationWeeks || 4)
  }, 0)
}

/**
 * Calculate project end date from start date and template phases
 *
 * @param projectStartDate - ISO date string for project start
 * @param templatePhases - Array of template phases
 * @returns ISO date string for project end
 */
export function calculateProjectEndDate(
  projectStartDate: string,
  templatePhases: TemplatePhaseInput[]
): string {
  const totalWeeks = calculateTotalDuration(templatePhases)
  const startDate = parseISO(projectStartDate)
  const endDate = addWeeks(startDate, totalWeeks)

  return formatISO(endDate, { representation: "date" })
}

/**
 * Recalculate phase dates when project start date changes
 *
 * Maintains the same duration for each phase but adjusts dates
 *
 * @param newProjectStartDate - New project start date
 * @param existingPhases - Current phase schedules
 * @returns Updated phase schedules
 */
export function recalculatePhaseSchedule(
  newProjectStartDate: string,
  existingPhases: PhaseSchedule[]
): PhaseSchedule[] {
  const sortedPhases = [...existingPhases].sort((a, b) => a.order - b.order)

  return calculatePhaseSchedule(
    newProjectStartDate,
    sortedPhases.map((p) => ({
      name: p.name,
      description: p.description,
      durationWeeks: p.durationWeeks,
      order: p.order,
    }))
  )
}

/**
 * Validate phase schedule for overlaps or gaps
 *
 * @param phases - Array of phase schedules
 * @returns Validation result with any issues found
 */
export function validatePhaseSchedule(phases: PhaseSchedule[]): {
  valid: boolean
  issues: string[]
} {
  const issues: string[] = []
  const sortedPhases = [...phases].sort((a, b) => a.order - b.order)

  for (let i = 0; i < sortedPhases.length - 1; i++) {
    const currentPhase = sortedPhases[i]
    const nextPhase = sortedPhases[i + 1]

    const currentEnd = parseISO(currentPhase.targetEndDate)
    const nextStart = parseISO(nextPhase.startDate)

    // Check for gaps
    if (nextStart > currentEnd) {
      issues.push(
        `Gap detected between ${currentPhase.name} and ${nextPhase.name}`
      )
    }

    // Check for overlaps
    if (nextStart < currentEnd) {
      issues.push(
        `Overlap detected between ${currentPhase.name} and ${nextPhase.name}`
      )
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}

/**
 * Calculate phase progress percentage
 *
 * @param startDate - Phase start date
 * @param targetEndDate - Phase target end date
 * @param currentDate - Current date (defaults to now)
 * @returns Progress percentage (0-100)
 */
export function calculatePhaseProgress(
  startDate: string,
  targetEndDate: string,
  currentDate: Date = new Date()
): number {
  const start = parseISO(startDate)
  const end = parseISO(targetEndDate)

  // If not started yet
  if (currentDate < start) {
    return 0
  }

  // If already completed
  if (currentDate >= end) {
    return 100
  }

  // Calculate progress
  const totalDuration = end.getTime() - start.getTime()
  const elapsed = currentDate.getTime() - start.getTime()
  const progress = (elapsed / totalDuration) * 100

  return Math.round(Math.min(100, Math.max(0, progress)))
}

/**
 * Format phase duration for display
 *
 * @param weeks - Duration in weeks
 * @returns Formatted string (e.g., "12 weeks", "1 week")
 */
export function formatPhaseDuration(weeks: number): string {
  if (weeks === 1) return "1 week"
  return `${weeks} weeks`
}

/**
 * Calculate expected completion date based on current progress
 *
 * @param startDate - Phase start date
 * @param targetEndDate - Phase target end date
 * @param percentComplete - Current completion percentage
 * @returns Projected completion date
 */
export function calculateProjectedCompletion(
  startDate: string,
  targetEndDate: string,
  percentComplete: number
): string {
  if (percentComplete === 0) {
    return targetEndDate
  }

  const start = parseISO(startDate)
  const target = parseISO(targetEndDate)
  const totalDuration = target.getTime() - start.getTime()

  // Calculate projected total time based on current velocity
  const elapsedTime = Date.now() - start.getTime()
  const projectedTotalTime = (elapsedTime / percentComplete) * 100

  const projectedEnd = new Date(start.getTime() + projectedTotalTime)

  return formatISO(projectedEnd, { representation: "date" })
}
