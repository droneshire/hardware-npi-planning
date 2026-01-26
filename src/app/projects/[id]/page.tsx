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
import { ProjectStatus, PhaseStatus, Project } from "@/types"
import { format } from "date-fns"
import { ArrowLeft, Calendar, FileText, Users, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for development - matches the mock data in projects page
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
  PLANNING: "bg-gray-500",
  ACTIVE: "bg-green-500",
  ON_HOLD: "bg-yellow-500",
  COMPLETED: "bg-blue-500",
  CANCELLED: "bg-red-500",
}

const PHASE_STATUS_COLORS: Record<PhaseStatus, string> = {
  NOT_STARTED: "#9ca3af", // gray-400
  IN_PROGRESS: "#60a5fa", // blue-400
  COMPLETED: "#4ade80", // green-400
  BLOCKED: "#f87171", // red-400
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string

  // Fetch project details
  const {
    data: project,
    isLoading: isLoadingProject,
    error: projectError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      try {
        // Try to fetch from service first
        const projectData = await projectService.getProject(projectId)
        if (projectData) {
          return projectData
        }
      } catch (error) {
        // If service fails, fall back to mock data
        console.log("Service fetch failed, using mock data:", error)
      }

      // Fall back to mock data if service doesn't have the project
      const mockProject = MOCK_PROJECTS.find((p) => p.id === projectId)
      if (mockProject) {
        return mockProject
      }

      throw new Error("Project not found")
    },
  })

  // Fetch project assignments
  const { data: assignments = [], isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["project-assignments", projectId],
    queryFn: async () => {
      const result = await listProjectAssignments(dataConnect, { projectId })
      return result.data.projectAssignments.map((a) => ({
        id: a.id,
        projectId: a.projectId,
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
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
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
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          {/* Project Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {project.name}
                    <Badge
                      className={STATUS_COLORS[project.status] || "bg-gray-500"}
                    >
                      {project.status}
                    </Badge>
                  </CardTitle>
                  {project.description && (
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.startDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Start Date</div>
                      <div className="font-medium">
                        {format(new Date(project.startDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                )}
                {project.targetCompletionDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Target Completion</div>
                      <div className="font-medium">
                        {format(new Date(project.targetCompletionDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                )}
                {project.actualCompletionDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Actual Completion</div>
                      <div className="font-medium">
                        {format(new Date(project.actualCompletionDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                )}
                {phases.length > 0 && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Phases</div>
                      <div className="font-medium">{phases.length} phase{phases.length !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Phases and Resources */}
          <Tabs defaultValue="phases" className="w-full">
            <TabsList>
              <TabsTrigger value="phases">Phases</TabsTrigger>
              <TabsTrigger value="resources">
                Resources
                {assignments.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {assignments.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Phases Tab */}
            <TabsContent value="phases" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Phases</CardTitle>
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
                    <div className="space-y-4">
                      {sortedPhases.map((phase) => (
                        <Card key={phase.id} className="border-l-4" style={{
                          borderLeftColor: PHASE_STATUS_COLORS[phase.status] || "#9ca3af"
                        }}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: PHASE_STATUS_COLORS[phase.status] || "#9ca3af"
                                  }}
                                />
                                <CardTitle className="text-lg">{phase.name}</CardTitle>
                                <Badge variant="outline">{phase.status}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {phase.percentComplete}% Complete
                              </div>
                            </div>
                            {phase.description && (
                              <CardDescription>{phase.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {phase.startDate && (
                                <div>
                                  <div className="text-sm text-muted-foreground">Start Date</div>
                                  <div className="font-medium">
                                    {format(new Date(phase.startDate), "MMM d, yyyy")}
                                  </div>
                                </div>
                              )}
                              {phase.targetEndDate && (
                                <div>
                                  <div className="text-sm text-muted-foreground">Target End</div>
                                  <div className="font-medium">
                                    {format(new Date(phase.targetEndDate), "MMM d, yyyy")}
                                  </div>
                                </div>
                              )}
                              {phase.actualEndDate && (
                                <div>
                                  <div className="text-sm text-muted-foreground">Actual End</div>
                                  <div className="font-medium">
                                    {format(new Date(phase.actualEndDate), "MMM d, yyyy")}
                                  </div>
                                </div>
                              )}
                            </div>
                            {phase.percentComplete > 0 && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{phase.percentComplete}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all"
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

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Resource Assignments</CardTitle>
                      <CardDescription>
                        People assigned to this project and their allocation percentages
                      </CardDescription>
                    </div>
                    <Button asChild>
                      <Link href={`/projects/${projectId}/resources`}>
                        <Users className="mr-2 h-4 w-4" />
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
                          <Link href={`/projects/${projectId}/resources`}>
                            Assign Resources
                          </Link>
                        </Button>
                      }
                    />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
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
                          <TableRow key={assignment.id}>
                            <TableCell className="font-medium">
                              {assignment.user.name}
                            </TableCell>
                            <TableCell>{assignment.user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{assignment.allocationPercent}%</Badge>
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
