"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"
import { GanttChart } from "@/components/visualizations/gantt-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { portfolioService } from "@/services/portfolio.service"
import { programService } from "@/services/program.service"
import { projectService } from "@/services/project.service"
import { Project, ProjectStatus, ProjectPhase } from "@/types"
import { Calendar, Filter } from "lucide-react"

interface ProjectWithDetails extends Project {
  phases?: ProjectPhase[]
  portfolioName?: string
  programName?: string
  productTypeName?: string
}

// Mock organization ID for development - in production, this would come from user session
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export default function TimelinePage() {
  const [portfolioFilter, setPortfolioFilter] = useState<string>("ALL")
  const [programFilter, setProgramFilter] = useState<string>("ALL")
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">("ALL")
  const [useFiscalYear, setUseFiscalYear] = useState(false)
  const [granularity, setGranularity] = useState<"quarter" | "month">("quarter")

  // Fetch portfolios
  const { data: portfolios = [] } = useQuery({
    queryKey: ["portfolios", MOCK_ORGANIZATION_ID],
    queryFn: async () => {
      try {
        return await portfolioService.listPortfolios(MOCK_ORGANIZATION_ID)
      } catch (error) {
        console.error("Failed to fetch portfolios:", error)
        return []
      }
    },
  })

  // Fetch programs for selected portfolio
  const { data: programs = [] } = useQuery({
    queryKey: ["programs", portfolioFilter],
    queryFn: async () => {
      if (portfolioFilter === "ALL") {
        // Fetch programs from all portfolios
        const allPrograms = []
        for (const portfolio of portfolios) {
          try {
            const portfolioPrograms = await programService.listPrograms(portfolio.id)
            allPrograms.push(...portfolioPrograms)
          } catch (error) {
            console.error(`Failed to fetch programs for portfolio ${portfolio.id}:`, error)
          }
        }
        return allPrograms
      } else {
        try {
          return await programService.listPrograms(portfolioFilter)
        } catch (error) {
          console.error("Failed to fetch programs:", error)
          return []
        }
      }
    },
    enabled: portfolios.length > 0,
  })

  // Fetch projects for selected programs
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["timeline-projects", programFilter, statusFilter],
    queryFn: async () => {
      const allProjects: ProjectWithDetails[] = []

      const programsToFetch = programFilter === "ALL" ? programs : programs.filter((p) => p.id === programFilter)

      for (const program of programsToFetch) {
        try {
          const programProjects = await projectService.listProjects(program.id)

          // Filter by status if needed
          const filteredProjects = statusFilter === "ALL"
            ? programProjects
            : programProjects.filter((p) => p.status === statusFilter)

          // Fetch phases for each project
          for (const project of filteredProjects) {
            try {
              const projectDetails = await projectService.getProject(project.id)
              if (projectDetails) {
                // Find portfolio and program names
                const foundProgram = programs.find((p) => p.id === project.programId)
                const portfolio = foundProgram
                  ? portfolios.find((p) => p.id === foundProgram.portfolioId)
                  : undefined

                allProjects.push({
                  ...projectDetails,
                  portfolioName: portfolio?.name,
                  programName: foundProgram?.name,
                })
              }
            } catch (error) {
              console.error(`Failed to fetch details for project ${project.id}:`, error)
              // Add project without details
              const foundProgram = programs.find((p) => p.id === project.programId)
              const portfolio = foundProgram
                ? portfolios.find((p) => p.id === foundProgram.portfolioId)
                : undefined
              allProjects.push({
                ...project,
                phases: [],
                portfolioName: portfolio?.name,
                programName: foundProgram?.name,
              })
            }
          }
        } catch (error) {
          console.error(`Failed to fetch projects for program ${program.id}:`, error)
        }
      }

      return allProjects
    },
    enabled: programs.length > 0,
  })

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects
  }, [projects])

  return (
    <AuthProtection>
      <AppLayout
        title="Timeline"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Timeline" }]}
      >
        <div className="space-y-6">
          {/* Filters and Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & View Options
              </CardTitle>
              <CardDescription>Customize the timeline view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Portfolio Filter */}
                <div className="space-y-2">
                  <Label>Portfolio</Label>
                  <Select value={portfolioFilter} onValueChange={setPortfolioFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Portfolios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Portfolios</SelectItem>
                      {portfolios.map((portfolio) => (
                        <SelectItem key={portfolio.id} value={portfolio.id}>
                          {portfolio.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Program Filter */}
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Select value={programFilter} onValueChange={setProgramFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Programs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Programs</SelectItem>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as ProjectStatus | "ALL")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Statuses</SelectItem>
                      <SelectItem value="PLANNING">Planning</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="ON_HOLD">On Hold</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Granularity */}
                <div className="space-y-2">
                  <Label>Granularity</Label>
                  <Select
                    value={granularity}
                    onValueChange={(value) => setGranularity(value as "quarter" | "month")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Quarter</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fiscal Year Toggle */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
                <Switch
                  id="fiscal-year"
                  checked={useFiscalYear}
                  onCheckedChange={setUseFiscalYear}
                />
                <Label htmlFor="fiscal-year" className="flex items-center gap-2 cursor-pointer">
                  <Calendar className="h-4 w-4" />
                  Use Fiscal Year
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Gantt Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} displayed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingProjects ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : (
                <GanttChart
                  projects={filteredProjects}
                  granularity={granularity}
                  useFiscalYear={useFiscalYear}
                  fiscalYearStart={1} // TODO: Get from organization settings
                />
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </AuthProtection>
  )
}
