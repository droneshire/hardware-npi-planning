"use client"

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { Project, ProjectPhase, ProjectStatus } from "@/types"
import {
  format,
  startOfQuarter,
  endOfQuarter,
  eachQuarterOfInterval,
  startOfYear,
  endOfYear,
  addQuarters,
  differenceInDays,
  addDays,
  parseISO,
} from "date-fns"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { dataConnect } from "@/lib/firebase"
import { updateProjectPhase } from "@firebasegen/default-connector"
import { useToast } from "@/hooks/use-toast"

interface GanttProject extends Project {
  phases?: ProjectPhase[]
  portfolioName?: string
  programName?: string
  productTypeName?: string
}

interface GanttChartProps {
  projects: GanttProject[]
  startDate?: Date
  endDate?: Date
  granularity?: "quarter" | "month"
  fiscalYearStart?: number // 1-12, where 1 = January
  useFiscalYear?: boolean
  onProjectClick?: (projectId: string) => void
}

const STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNING: "#6b7280", // gray-500
  ACTIVE: "#10b981", // green-500
  ON_HOLD: "#eab308", // yellow-500
  COMPLETED: "#3b82f6", // blue-500
  CANCELLED: "#ef4444", // red-500
}

const PHASE_COLORS: Record<string, string> = {
  NOT_STARTED: "#d1d5db", // gray-300
  IN_PROGRESS: "#60a5fa", // blue-400
  COMPLETED: "#4ade80", // green-400
  BLOCKED: "#f87171", // red-400
}

// Phase color mapping based on phase names (dark theme optimized)
const PHASE_NAME_COLORS: Record<string, string> = {
  EVT: "#3b82f6", // blue-500
  DVT: "#60a5fa", // blue-400
  PVT: "#2563eb", // blue-600
  MP: "#1d4ed8", // blue-700
  "Pilot Run": "#6366f1", // indigo-500
  Concept: "#8b5cf6", // purple-500
  EVT1: "#3b82f6", // blue-500
  EVT2: "#60a5fa", // blue-400
  Alpha: "#06b6d4", // cyan-500
  Beta: "#14b8a6", // teal-500
  HC: "#22d3ee", // cyan-400
  S: "#64748b", // slate-500
  Pr: "#ef4444", // red-500
  C: "#a855f7", // purple-500
  L: "#10b981", // green-500
  Pi: "#f59e0b", // amber-500
}

// Get phase abbreviation (first 2-3 letters, uppercase)
function getPhaseAbbreviation(phaseName: string): string {
  // Common abbreviations
  const abbreviations: Record<string, string> = {
    EVT: "EV",
    DVT: "DV",
    PVT: "PV",
    MP: "MP",
    "Pilot Run": "PR",
    Concept: "C",
    EVT1: "E1",
    EVT2: "E2",
    Alpha: "Al",
    Beta: "Be",
    HC: "HC",
    S: "S",
    Pr: "Pr",
    L: "L",
    Pi: "Pi",
  }

  if (abbreviations[phaseName]) {
    return abbreviations[phaseName]
  }

  // Default: take first 2-3 uppercase letters
  const upper = phaseName.toUpperCase()
  if (upper.length <= 3) return upper
  return upper.substring(0, 2)
}

// Get phase color based on name or status
function getPhaseColor(phaseName: string, status: string): string {
  return PHASE_NAME_COLORS[phaseName] || PHASE_COLORS[status] || "#d1d5db"
}

export function GanttChart({
  projects,
  startDate,
  endDate,
  granularity = "quarter",
  fiscalYearStart = 1,
  useFiscalYear = false,
  onProjectClick,
}: GanttChartProps) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [draggingPhase, setDraggingPhase] = useState<{
    phaseId: string
    projectId: string
    startOffset: number
    originalStart: Date
    originalEnd: Date
  } | null>(null)
  const [dragPosition, setDragPosition] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Calculate date range
  const dateRange = useMemo(() => {
    if (startDate && endDate) {
      return { start: startDate, end: endDate }
    }

    // Calculate from projects
    const allDates: Date[] = []
    projects.forEach((project) => {
      if (project.startDate) allDates.push(new Date(project.startDate))
      if (project.targetCompletionDate) allDates.push(new Date(project.targetCompletionDate))
      if (project.actualCompletionDate) allDates.push(new Date(project.actualCompletionDate))
      project.phases?.forEach((phase) => {
        if (phase.startDate) allDates.push(new Date(phase.startDate))
        if (phase.targetEndDate) allDates.push(new Date(phase.targetEndDate))
        if (phase.actualEndDate) allDates.push(new Date(phase.actualEndDate))
      })
    })

    if (allDates.length === 0) {
      const now = new Date()
      return {
        start: startOfYear(now),
        end: endOfYear(new Date(2029, 11, 31)), // End of 2029
      }
    }

    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())))

    // Ensure we extend through 2029
    const endOf2029 = endOfYear(new Date(2029, 11, 31))
    const finalEndDate = maxDate > endOf2029 ? maxDate : endOf2029

    // Round to quarters
    return {
      start: startOfQuarter(startOfQuarter(minDate)),
      end: endOfQuarter(endOfQuarter(finalEndDate)),
    }
  }, [projects, startDate, endDate])

  // Generate time periods (quarters) grouped by year
  const { periods, yearGroups } = useMemo(() => {
    const allPeriods = eachQuarterOfInterval(dateRange)

    // Group periods by year
    const groups: { year: number; quarters: Date[] }[] = []
    let currentYear = 0
    let currentGroup: Date[] = []

    allPeriods.forEach((period) => {
      const year = period.getFullYear()
      if (year !== currentYear) {
        if (currentGroup.length > 0) {
          groups.push({ year: currentYear, quarters: currentGroup })
        }
        currentYear = year
        currentGroup = [period]
      } else {
        currentGroup.push(period)
      }
    })
    if (currentGroup.length > 0) {
      groups.push({ year: currentYear, quarters: currentGroup })
    }

    return { periods: allPeriods, yearGroups: groups }
  }, [dateRange, granularity])

  // Calculate position and width for a date range
  const calculateBarPosition = useCallback(
    (start: Date | undefined, end: Date | undefined) => {
      if (!start || !end) return { left: 0, width: 0 }

      const totalDays = differenceInDays(dateRange.end, dateRange.start)
      const startOffset = differenceInDays(start, dateRange.start)
      const duration = differenceInDays(end, start)

      const leftPercent = (startOffset / totalDays) * 100
      const widthPercent = (duration / totalDays) * 100

      return {
        left: Math.max(0, leftPercent),
        width: Math.min(100 - leftPercent, widthPercent),
      }
    },
    [dateRange]
  )

  // Convert pixel position to date
  const pixelToDate = useCallback(
    (pixelX: number, containerWidth: number): Date => {
      const percent = (pixelX / containerWidth) * 100
      const totalDays = differenceInDays(dateRange.end, dateRange.start)
      const daysOffset = (percent / 100) * totalDays
      return addDays(dateRange.start, Math.round(daysOffset))
    },
    [dateRange]
  )

  // Detect collisions and calculate auto-snap positions
  const calculateAutoSnap = useCallback(
    (
      phaseId: string,
      projectId: string,
      newStart: Date,
      newEnd: Date,
      allPhases: ProjectPhase[]
    ): { startDate: Date; endDate: Date } => {
      const otherPhases = allPhases.filter((p) => p.id !== phaseId && p.projectId === projectId)
      const phaseDuration = differenceInDays(newEnd, newStart)

      // Check for collisions with other phases
      for (const otherPhase of otherPhases) {
        if (!otherPhase.startDate || !otherPhase.targetEndDate) continue

        const otherStart = parseISO(otherPhase.startDate)
        const otherEnd = parseISO(otherPhase.targetEndDate)

        // Check if phases overlap
        if (newStart < otherEnd && newEnd > otherStart) {
          // Collision detected - snap to avoid overlap
          // Option 1: Snap before the other phase
          if (newStart < otherStart) {
            const snapEnd = otherStart
            const snapStart = addDays(snapEnd, -phaseDuration)
            return { startDate: snapStart, endDate: snapEnd }
          }
          // Option 2: Snap after the other phase
          else {
            const snapStart = otherEnd
            const snapEnd = addDays(snapStart, phaseDuration)
            return { startDate: snapStart, endDate: snapEnd }
          }
        }
      }

      // No collision, return original dates
      return { startDate: newStart, endDate: newEnd }
    },
    []
  )

  // Update phase mutation
  const updatePhaseMutation = useMutation({
    mutationFn: async ({
      phaseId,
      startDate,
      targetEndDate,
    }: {
      phaseId: string
      startDate: string
      targetEndDate: string
    }) => {
      await updateProjectPhase(dataConnect, {
        id: phaseId,
        startDate,
        targetEndDate,
      })
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["project", variables.phaseId] })
      queryClient.invalidateQueries({ queryKey: ["timeline-projects"] })
      toast({
        title: "Phase updated",
        description: "Phase dates have been updated successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update phase",
        variant: "destructive",
      })
    },
  })

  // Handle drag start
  const handleDragStart = useCallback(
    (
      e: React.MouseEvent,
      phase: ProjectPhase,
      projectId: string,
      phaseStart: Date,
      phaseEnd: Date
    ) => {
      e.preventDefault()
      e.stopPropagation()

      if (!timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const startX = e.clientX - rect.left
      const phaseBar = calculateBarPosition(phaseStart, phaseEnd)
      const containerWidth = rect.width - 256 // Subtract project name column width
      const phaseStartPixel = (phaseBar.left / 100) * containerWidth

      setDraggingPhase({
        phaseId: phase.id,
        projectId,
        startOffset: startX - phaseStartPixel,
        originalStart: phaseStart,
        originalEnd: phaseEnd,
      })
      setDragPosition(startX)
    },
    [calculateBarPosition]
  )

  // Handle drag move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingPhase || !timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      setDragPosition(mouseX - draggingPhase.startOffset)
    },
    [draggingPhase]
  )

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    if (!draggingPhase || !timelineRef.current || dragPosition === null) {
      setDraggingPhase(null)
      setDragPosition(null)
      return
    }

    const rect = timelineRef.current.getBoundingClientRect()
    const containerWidth = rect.width - 256 // Subtract project name column width
    const adjustedPosition = Math.max(0, Math.min(containerWidth, dragPosition))

    // Calculate new dates
    const newStart = pixelToDate(adjustedPosition, containerWidth)
    const phaseDuration = differenceInDays(draggingPhase.originalEnd, draggingPhase.originalStart)
    const newEnd = addDays(newStart, phaseDuration)

    // Find the project and phases for collision detection
    const project = projects.find((p) => p.id === draggingPhase.projectId)
    if (project && project.phases) {
      // Calculate auto-snap to avoid collisions
      const snapped = calculateAutoSnap(
        draggingPhase.phaseId,
        draggingPhase.projectId,
        newStart,
        newEnd,
        project.phases
      )

      // Update phase dates
      updatePhaseMutation.mutate({
        phaseId: draggingPhase.phaseId,
        startDate: format(snapped.startDate, "yyyy-MM-dd"),
        targetEndDate: format(snapped.endDate, "yyyy-MM-dd"),
      })
    }

    setDraggingPhase(null)
    setDragPosition(null)
  }, [draggingPhase, dragPosition, pixelToDate, calculateAutoSnap, projects, updatePhaseMutation])

  // Set up mouse event listeners
  useEffect(() => {
    if (draggingPhase) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [draggingPhase, handleMouseMove, handleMouseUp])

  return (
    <div className="w-full overflow-x-auto" ref={timelineRef}>
      <div className="min-w-[800px]">
        {/* Header with time periods - grouped by year */}
        <div className="sticky top-0 z-10 border-b bg-background">
          {/* Year row */}
          <div className="flex border-b">
            <div className="w-64 flex-shrink-0 border-r bg-muted/30 p-2 font-medium"></div>
            <div className="flex">
              {yearGroups.map((group) => (
                <div
                  key={group.year}
                  className="whitespace-nowrap border-r bg-muted/30 px-2 py-2 text-center font-semibold last:border-r-0"
                  style={{ minWidth: `${group.quarters.length * 50}px` }}
                >
                  {group.year}
                </div>
              ))}
            </div>
          </div>
          {/* Quarter row */}
          <div className="flex">
            <div className="w-64 flex-shrink-0 border-r p-2 font-medium">Project</div>
            <div className="flex">
              {periods.map((period, index) => {
                const quarterStart = startOfQuarter(period)
                const quarter = Math.floor(quarterStart.getMonth() / 3) + 1
                const isEven = index % 2 === 0
                return (
                  <div
                    key={index}
                    className="whitespace-nowrap border-r px-2 py-2 text-center text-sm last:border-r-0"
                    style={{
                      backgroundColor: isEven ? "rgba(59, 130, 246, 0.05)" : "transparent",
                      minWidth: "50px",
                    }}
                  >
                    <div className="font-medium">Q{quarter}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(quarterStart, "MMM")}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Project rows */}
        <div className="divide-y">
          {projects.map((project) => {
            const projectStart = project.startDate ? new Date(project.startDate) : undefined
            const projectEnd =
              project.actualCompletionDate || project.targetCompletionDate
                ? new Date(project.actualCompletionDate || project.targetCompletionDate!)
                : undefined

            const projectBar = calculateBarPosition(projectStart, projectEnd)

            return (
              <div key={project.id} className="group hover:bg-muted/50">
                <div className="flex min-h-[60px] items-center">
                  {/* Project name column */}
                  <div className="w-64 flex-shrink-0 border-r p-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: STATUS_COLORS[project.status] || "#9ca3af",
                        }}
                        title={project.status}
                      />
                      <Link
                        href={`/projects/${project.id}` as any}
                        className="font-medium hover:underline"
                        onClick={(e) => {
                          if (onProjectClick) {
                            e.preventDefault()
                            onProjectClick(project.id)
                          }
                        }}
                      >
                        {project.name}
                      </Link>
                    </div>
                    {project.programName && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {project.portfolioName && `${project.portfolioName} → `}
                        {project.programName}
                      </div>
                    )}
                  </div>

                  {/* Timeline area */}
                  <div className="relative h-full min-h-[48px] flex-1">
                    {/* Quarter background grid */}
                    <div className="pointer-events-none absolute inset-0 flex">
                      {periods.map((period, index) => {
                        const quarterStart = startOfQuarter(period)
                        const quarterEnd = endOfQuarter(period)
                        const quarterBar = calculateBarPosition(quarterStart, quarterEnd)
                        const isEven = index % 2 === 0
                        return (
                          <div
                            key={index}
                            className="h-full border-r border-border/30"
                            style={{
                              left: `${quarterBar.left}%`,
                              width: `${quarterBar.width}%`,
                              backgroundColor: isEven ? "rgba(0,0,0,0.015)" : "transparent",
                            }}
                          />
                        )
                      })}
                    </div>

                    {/* Phase bars - no project bar, just phases */}
                    {project.phases && project.phases.length > 0 && (
                      <div className="absolute left-0 right-0 top-2 flex h-6">
                        {project.phases
                          .sort((a, b) => a.order - b.order)
                          .map((phase) => {
                            const phaseStart = phase.startDate
                              ? new Date(phase.startDate)
                              : undefined
                            const phaseEnd =
                              phase.actualEndDate || phase.targetEndDate
                                ? new Date(phase.actualEndDate || phase.targetEndDate!)
                                : undefined

                            if (!phaseStart || !phaseEnd) return null

                            // Use drag position if this phase is being dragged
                            const isDragging =
                              draggingPhase?.phaseId === phase.id &&
                              dragPosition !== null &&
                              timelineRef.current

                            let displayBar = calculateBarPosition(phaseStart, phaseEnd)
                            let displayStart = phaseStart
                            let displayEnd = phaseEnd

                            if (isDragging && timelineRef.current) {
                              const rect = timelineRef.current.getBoundingClientRect()
                              const containerWidth = rect.width - 256
                              const adjustedPosition = Math.max(
                                0,
                                Math.min(
                                  containerWidth,
                                  dragPosition - (draggingPhase?.startOffset || 0)
                                )
                              )
                              displayStart = pixelToDate(adjustedPosition, containerWidth)
                              const phaseDuration = differenceInDays(phaseEnd, phaseStart)
                              displayEnd = addDays(displayStart, phaseDuration)
                              displayBar = calculateBarPosition(displayStart, displayEnd)
                            }

                            const phaseColor = getPhaseColor(phase.name, phase.status)
                            const phaseAbbr = getPhaseAbbreviation(phase.name)

                            return (
                              <div
                                key={phase.id}
                                className={`flex cursor-move items-center justify-center truncate rounded-sm border border-white/20 px-1 text-xs font-semibold text-white transition-all ${
                                  isDragging ? "z-20 opacity-80 shadow-lg" : "hover:opacity-90"
                                }`}
                                style={{
                                  left: `${displayBar.left}%`,
                                  width: `${displayBar.width}%`,
                                  backgroundColor: phaseColor,
                                  minWidth: displayBar.width > 2 ? "auto" : "2px",
                                  cursor: "grab",
                                }}
                                title={`${phase.name}: ${format(displayStart, "MMM d")} - ${format(displayEnd, "MMM d")} (${phase.status}). Drag to adjust dates.`}
                                onMouseDown={(e) =>
                                  handleDragStart(e, phase, project.id, phaseStart, phaseEnd)
                                }
                              >
                                {displayBar.width > 3 && phaseAbbr}
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {projects.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No projects to display. Create a project to see it on the timeline.
          </div>
        )}
      </div>
    </div>
  )
}
