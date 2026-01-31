"use client"

import { useQuery } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import { projectService } from "@/services/project.service"
import { dataConnect } from "@/lib/firebase"
import { listProjectAssignments } from "@firebasegen/default-connector"
import { ProjectStatus, PhaseStatus, Project, ProjectPhase } from "@/types"

interface ProjectWithPhases extends Project {
  phases?: ProjectPhase[]
}
import { format } from "date-fns"
import {
  ArrowLeft,
  Calendar,
  FileText,
  Users,
  Edit,
  Trash2,
  ClipboardList,
  CheckCircle2,
  Clock,
  Wrench,
  Package,
  AlertCircle,
  Cpu,
  ListChecks,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    programId: "prog-1",
    name: "Project Alpha",
    description: "Next-gen hardware product",
    status: "ACTIVE" as ProjectStatus,
    startDate: "2024-01-01",
    targetCompletionDate: "2024-12-31",
    ownerId: "user-1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    programId: "prog-1",
    name: "Project Beta",
    description: "Advanced sensor system",
    status: "PLANNING" as ProjectStatus,
    startDate: "2024-06-01",
    targetCompletionDate: "2025-06-30",
    ownerId: "user-2",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

const STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNING: "bg-muted text-muted-foreground",
  ACTIVE: "bg-green-500/20 text-green-400",
  ON_HOLD: "bg-yellow-500/20 text-yellow-400",
  COMPLETED: "bg-blue-500/20 text-blue-400",
  CANCELLED: "bg-red-500/20 text-red-400",
}

const PHASE_STATUS_COLORS: Record<string, string> = {
  NOT_STARTED: "#6b7280",
  IN_PROGRESS: "#60a5fa",
  COMPLETED: "#4ade80",
  BLOCKED: "#f87171",
}

// Sample phase instructions for demo
const PHASE_INSTRUCTIONS: Record<string, { title: string; steps: number; completed: number; category: string }[]> = {
  EVT: [
    { title: "PCB Assembly Process", steps: 5, completed: 2, category: "ASSEMBLY" },
    { title: "Initial Power-On Test", steps: 3, completed: 0, category: "TESTING" },
  ],
  DVT: [
    { title: "Functional Test Procedure", steps: 4, completed: 1, category: "TESTING" },
    { title: "Test Fixture Setup", steps: 5, completed: 3, category: "TOOLING" },
  ],
  PVT: [
    { title: "Enclosure Assembly", steps: 5, completed: 0, category: "ASSEMBLY" },
    { title: "Quality Inspection", steps: 3, completed: 0, category: "QUALITY" },
  ],
  MP: [
    { title: "Incoming Quality Inspection", steps: 3, completed: 2, category: "QUALITY" },
    { title: "Final Packaging & Shipping", steps: 4, completed: 0, category: "PACKAGING" },
  ],
}

const CATEGORY_ICONS: Record<string, typeof Wrench> = {
  ASSEMBLY: Wrench,
  TESTING: CheckCircle2,
  QUALITY: AlertCircle,
  PACKAGING: Package,
  DOCUMENTATION: FileText,
  TOOLING: Cpu,
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string

  const {
    data: project,
    isLoading: isLoadingProject,
    error: projectError,
  } = useQuery<ProjectWithPhases>({
    queryKey: ["project", projectId],
    queryFn: async (): Promise<ProjectWithPhases> => {
      try {
        const projectData = await projectService.getProject(projectId)
        if (projectData) return projectData as ProjectWithPhases
      } catch (error) {
        console.log("Service fetch failed, using mock data:", error)
      }
      const mockProject = MOCK_PROJECTS.find((p) => p.id === projectId)
      if (mockProject) return mockProject as ProjectWithPhases
      throw new Error("Project not found")
    },
  })

  const { data: assignments = [], isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["project-assignments", projectId],
    queryFn: async () => {
      const result = await listProjectAssignments(dataConnect, { projectId })
      return result.data.projectAssignments.map((a: any) => ({
        id: a.id,
        projectId: a.projectId || projectId,
        userId: a.userId,
        allocationPercent: a.allocationPercent,
        startDate: a.startDate,
        endDate: a.endDate ?? undefined,
        notes: a.notes ?? undefined,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        user: {
          id: a.user.id,
          name: a.user.name,
          email: a.user.email,
          role: a.user.role,
        },
      }))
    },
    enabled: !!project,
  })

  if (isLoadingProject) {
    return (
      <AuthProtection>
        <AppLayout
          title="Project Details"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Loading..." },
          ]}
        >
          <div className="space-y-6 animate-fade-in">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </AppLayout>
      </AuthProtection>
    )
  }

  if (projectError || !project) {
    return (
      <AuthProtection>
        <AppLayout
          title="Project Not Found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Not Found" },
          ]}
        >
          <EmptyState
            title="Project not found"
            description="The project you're looking for doesn't exist or has been deleted."
            action={
              <Button asChild>
                <Link href="/projects">Back to Projects</Link>
              </Button>
            }
          />
        </AppLayout>
      </AuthProtection>
    )
  }

  const phases = project.phases || []
  const sortedPhases = [...phases].sort((a, b) => a.order - b.order)

  return (
    <AuthProtection>
      <AppLayout
        title={project.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      >
        <div className="space-y-6 animate-fade-in">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild className="gap-2 border-border/50">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-border/50">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          {/* Project Overview Card */}
          <Card className="border-border/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {project.name}
                    <Badge className={`${STATUS_COLORS[project.status] || "bg-muted"} font-medium`}>
                      {project.status}
                    </Badge>
                  </CardTitle>
                  {project.description && (
                    <CardDescription className="mt-2 text-sm">{project.description}</CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {project.startDate && (
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Start Date</div>
                      <div className="text-sm font-medium">
                        {format(new Date(project.startDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                )}
                {project.targetCompletionDate && (
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Target Completion</div>
                      <div className="text-sm font-medium">
                        {format(new Date(project.targetCompletionDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                )}
                {project.actualCompletionDate && (
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Actual Completion</div>
                      <div className="text-sm font-medium">
                        {format(new Date(project.actualCompletionDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                )}
                {phases.length > 0 && (
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Phases</div>
                      <div className="text-sm font-medium">
                        {phases.length} phase{phases.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Phases, Instructions, and Resources */}
          <Tabs defaultValue="phases" className="w-full">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="phases">Phases</TabsTrigger>
              <TabsTrigger value="instructions" className="gap-1.5">
                <ClipboardList className="h-3.5 w-3.5" />
                Instructions
              </TabsTrigger>
              <TabsTrigger value="resources">
                Resources
                {assignments.length > 0 && (
                  <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">
                    {assignments.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Phases Tab */}
            <TabsContent value="phases" className="space-y-4 mt-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Project Phases</CardTitle>
                  <CardDescription>
                    Track progress through each phase of the project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sortedPhases.length === 0 ? (
                    <EmptyState
                      title="No phases"
                      description="This project doesn't have any phases yet. Phases are typically generated from a phase template when the project is created."
                    />
                  ) : (
                    <div className="space-y-3">
                      {sortedPhases.map((phase) => (
                        <Card
                          key={phase.id}
                          className="border-l-4 border-border/50 transition-all hover:border-border"
                          style={{
                            borderLeftColor: PHASE_STATUS_COLORS[phase.status] || "#6b7280",
                          }}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{
                                    backgroundColor: PHASE_STATUS_COLORS[phase.status] || "#6b7280",
                                  }}
                                />
                                <CardTitle className="text-base">{phase.name}</CardTitle>
                                <Badge variant="outline" className="text-[10px] border-border/50">
                                  {phase.status}
                                </Badge>
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">
                                {phase.percentComplete}%
                              </span>
                            </div>
                            {phase.description && (
                              <CardDescription className="text-xs">{phase.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 text-sm">
                              {phase.startDate && (
                                <div>
                                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Start</span>
                                  <div className="font-medium">{format(new Date(phase.startDate), "MMM d, yyyy")}</div>
                                </div>
                              )}
                              {phase.targetEndDate && (
                                <div>
                                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Target End</span>
                                  <div className="font-medium">{format(new Date(phase.targetEndDate), "MMM d, yyyy")}</div>
                                </div>
                              )}
                              {phase.actualEndDate && (
                                <div>
                                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Actual End</span>
                                  <div className="font-medium">{format(new Date(phase.actualEndDate), "MMM d, yyyy")}</div>
                                </div>
                              )}
                            </div>
                            {phase.percentComplete > 0 && (
                              <div className="mt-3">
                                <div className="h-1.5 w-full rounded-full bg-muted">
                                  <div
                                    className="h-1.5 rounded-full gradient-primary transition-all"
                                    style={{ width: `${phase.percentComplete}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Instructions Tab */}
            <TabsContent value="instructions" className="space-y-4 mt-4">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Build Instructions</CardTitle>
                      <CardDescription>
                        Manufacturing and assembly instructions linked to project phases
                      </CardDescription>
                    </div>
                    <Button asChild className="gap-2 gradient-primary text-white" size="sm">
                      <Link href="/instructions">
                        <ClipboardList className="h-3.5 w-3.5" />
                        Manage All
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedPhases.length > 0 ? (
                      sortedPhases.map((phase) => {
                        const phaseInstructions = PHASE_INSTRUCTIONS[phase.name] || []
                        return (
                          <div key={phase.id}>
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: PHASE_STATUS_COLORS[phase.status] || "#6b7280",
                                }}
                              />
                              <h4 className="text-sm font-semibold">{phase.name}</h4>
                              <Badge variant="outline" className="text-[10px] border-border/50">
                                {phaseInstructions.length} instruction{phaseInstructions.length !== 1 ? "s" : ""}
                              </Badge>
                            </div>
                            {phaseInstructions.length > 0 ? (
                              <div className="space-y-1.5 ml-4">
                                {phaseInstructions.map((instr, i) => {
                                  const CatIcon = CATEGORY_ICONS[instr.category] || FileText
                                  const progress = instr.steps > 0 ? Math.round((instr.completed / instr.steps) * 100) : 0
                                  return (
                                    <Link
                                      key={i}
                                      href="/instructions"
                                      className="flex items-center gap-3 rounded-lg border border-border/30 bg-muted/20 p-3 transition-all hover:bg-muted/40 hover:border-border/50"
                                    >
                                      <CatIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{instr.title}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <ListChecks className="h-3 w-3" />
                                            {instr.completed}/{instr.steps} steps
                                          </div>
                                          <div className="flex-1 max-w-[100px]">
                                            <div className="h-1 rounded-full bg-muted">
                                              <div
                                                className="h-1 rounded-full gradient-primary"
                                                style={{ width: `${progress}%` }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <Badge variant="outline" className="text-[10px] border-border/50 shrink-0">
                                        {instr.category}
                                      </Badge>
                                    </Link>
                                  )
                                })}
                              </div>
                            ) : (
                              <p className="ml-4 text-xs text-muted-foreground/60 py-2">
                                No instructions linked to this phase yet
                              </p>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      // Show generic instructions when no phases
                      <div className="space-y-4">
                        {Object.entries(PHASE_INSTRUCTIONS).map(([phaseName, phaseInstrs]) => (
                          <div key={phaseName}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <h4 className="text-sm font-semibold">{phaseName}</h4>
                              <Badge variant="outline" className="text-[10px] border-border/50">
                                {phaseInstrs.length} instruction{phaseInstrs.length !== 1 ? "s" : ""}
                              </Badge>
                            </div>
                            <div className="space-y-1.5 ml-4">
                              {phaseInstrs.map((instr, i) => {
                                const CatIcon = CATEGORY_ICONS[instr.category] || FileText
                                const progress = instr.steps > 0 ? Math.round((instr.completed / instr.steps) * 100) : 0
                                return (
                                  <Link
                                    key={i}
                                    href="/instructions"
                                    className="flex items-center gap-3 rounded-lg border border-border/30 bg-muted/20 p-3 transition-all hover:bg-muted/40 hover:border-border/50"
                                  >
                                    <CatIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium">{instr.title}</p>
                                      <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                          <ListChecks className="h-3 w-3" />
                                          {instr.completed}/{instr.steps} steps
                                        </div>
                                        <div className="flex-1 max-w-[100px]">
                                          <div className="h-1 rounded-full bg-muted">
                                            <div
                                              className="h-1 rounded-full gradient-primary"
                                              style={{ width: `${progress}%` }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] border-border/50 shrink-0">
                                      {instr.category}
                                    </Badge>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-4 mt-4">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Resource Assignments</CardTitle>
                      <CardDescription>
                        People assigned to this project and their allocation percentages
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="gap-2">
                      <Link href={`/projects/${projectId}/resources`}>
                        <Users className="h-3.5 w-3.5" />
                        Manage Assignments
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingAssignments ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : assignments.length === 0 ? (
                    <EmptyState
                      title="No assignments"
                      description="No resources have been assigned to this project yet."
                      action={
                        <Button asChild>
                          <Link href={`/projects/${projectId}/resources`}>Assign Resources</Link>
                        </Button>
                      }
                    />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50">
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Allocation</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assignments.map((assignment) => (
                          <TableRow key={assignment.id} className="border-border/30">
                            <TableCell className="font-medium">{assignment.user.name}</TableCell>
                            <TableCell className="text-muted-foreground">{assignment.user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-border/50">{assignment.allocationPercent}%</Badge>
                            </TableCell>
                            <TableCell>
                              {format(new Date(assignment.startDate), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell>
                              {assignment.endDate
                                ? format(new Date(assignment.endDate), "MMM d, yyyy")
                                : "Ongoing"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {assignment.notes || "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </AuthProtection>
  )
}
