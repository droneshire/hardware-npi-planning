

import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import { dataConnect } from "@/lib/firebase"
import { listUserAssignments, getUser } from "@firebasegen/default-connector"
import { CapacityBadge } from "@/components/resources/capacity-badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  format,
  startOfQuarter,
  endOfQuarter,
  eachQuarterOfInterval,
  startOfYear,
  endOfYear,
  addQuarters,
  isWithinInterval,
  parseISO,
} from "date-fns"
import { ArrowLeft, AlertTriangle, Calendar, Users } from "lucide-react"
import { Link } from "react-router-dom"

interface QuarterlyAllocation {
  quarter: string
  startDate: Date
  endDate: Date
  totalAllocation: number
  assignments: Array<{
    projectId: string
    projectName: string
    allocationPercent: number
  }>
}

export default function PersonViewPage() {
  const params = useParams()
  const userId = params.id as string

  // Fetch user details
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const result = await getUser(dataConnect, { id: userId })
      if (!result.data.user) {
        throw new Error("User not found")
      }
      return result.data.user
    },
  })

  // Fetch all user assignments
  const { data: assignments = [], isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["user-assignments", userId],
    queryFn: async () => {
      const result = await listUserAssignments(dataConnect, { userId })
      return result.data.projectAssignments.map((a) => ({
        id: a.id,
        projectId: a.projectId,
        allocationPercent: a.allocationPercent,
        startDate: a.startDate,
        endDate: a.endDate ?? undefined,
        notes: a.notes ?? undefined,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        project: {
          id: a.project.id,
          name: a.project.name,
          status: a.project.status,
          program: a.project.program
            ? {
                id: a.project.program.id,
                name: a.project.program.name,
                portfolio: a.project.program.portfolio
                  ? {
                      id: a.project.program.portfolio.id,
                      name: a.project.program.portfolio.name,
                    }
                  : undefined,
              }
            : undefined,
        },
      }))
    },
    enabled: !!user,
  })

  // Calculate quarterly breakdown
  const quarterlyBreakdown = useMemo(() => {
    if (assignments.length === 0) return []

    // Determine date range
    const allDates: Date[] = []
    assignments.forEach((assignment) => {
      allDates.push(parseISO(assignment.startDate))
      if (assignment.endDate) {
        allDates.push(parseISO(assignment.endDate))
      }
    })

    if (allDates.length === 0) return []

    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())))

    // Generate quarters
    const quarters = eachQuarterOfInterval({
      start: startOfQuarter(startOfYear(minDate)),
      end: endOfQuarter(endOfQuarter(maxDate)),
    })

    return quarters.map((quarterStart) => {
      const quarterEnd = endOfQuarter(quarterStart)
      const quarterKey = format(quarterStart, "yyyy-QQ")

      // Find all assignments that overlap with this quarter
      const quarterAssignments: QuarterlyAllocation["assignments"] = []
      let totalAllocation = 0

      assignments.forEach((assignment) => {
        const assignmentStart = parseISO(assignment.startDate)
        const assignmentEnd = assignment.endDate
          ? parseISO(assignment.endDate)
          : new Date("2099-12-31")

        // Check if assignment overlaps with quarter
        const overlaps =
          isWithinInterval(quarterStart, {
            start: assignmentStart,
            end: assignmentEnd,
          }) ||
          isWithinInterval(quarterEnd, {
            start: assignmentStart,
            end: assignmentEnd,
          }) ||
          (assignmentStart <= quarterStart && assignmentEnd >= quarterEnd)

        if (overlaps) {
          quarterAssignments.push({
            projectId: assignment.projectId,
            projectName: assignment.project.name,
            allocationPercent: assignment.allocationPercent,
          })
          totalAllocation += assignment.allocationPercent
        }
      })

      return {
        quarter: quarterKey,
        startDate: quarterStart,
        endDate: quarterEnd,
        totalAllocation,
        assignments: quarterAssignments,
      }
    })
  }, [assignments])

  // Calculate current total allocation
  const currentTotalAllocation = useMemo(() => {
    const now = new Date()
    return assignments
      .filter((assignment) => {
        const start = parseISO(assignment.startDate)
        const end = assignment.endDate ? parseISO(assignment.endDate) : new Date("2099-12-31")
        return isWithinInterval(now, { start, end })
      })
      .reduce((sum, assignment) => sum + assignment.allocationPercent, 0)
  }, [assignments])

  // Prepare data for bar chart
  const chartData = useMemo(() => {
    return quarterlyBreakdown.map((q) => ({
      quarter: format(q.startDate, "MMM yyyy"),
      allocation: q.totalAllocation,
    }))
  }, [quarterlyBreakdown])

  // Prepare project allocation data for bar chart
  const projectChartData = useMemo(() => {
    const projectMap = new Map<string, number>()

    assignments.forEach((assignment) => {
      const now = new Date()
      const start = parseISO(assignment.startDate)
      const end = assignment.endDate ? parseISO(assignment.endDate) : new Date("2099-12-31")

      if (isWithinInterval(now, { start, end })) {
        const current = projectMap.get(assignment.project.name) || 0
        projectMap.set(assignment.project.name, current + assignment.allocationPercent)
      }
    })

    return Array.from(projectMap.entries())
      .map(([name, allocation]) => ({ name, allocation }))
      .sort((a, b) => b.allocation - a.allocation)
  }, [assignments])

  if (isLoadingUser || isLoadingAssignments) {
    return (

        <AppLayout
          title="Person View"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Loading..." },
          ]}
        >
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </AppLayout>

    )
  }

  if (!user) {
    return (

        <AppLayout
          title="User Not Found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Not Found" },
          ]}
        >
          <EmptyState
            title="User not found"
            description="The user you're looking for doesn't exist."
            action={
              <Button asChild>
                <Link to="/resources">Back to Resources</Link>
              </Button>
            }
          />
        </AppLayout>

    )
  }

  const capacityStatus: "normal" | "warning" | "critical" =
    currentTotalAllocation > 100 ? "critical" : currentTotalAllocation > 90 ? "warning" : "normal"

  return (

      <AppLayout
        title={`${user.name} - Allocations`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: user.name },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link to="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>
          </div>

          {/* User Info and Current Allocation */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{user.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{user.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Role</div>
                    <Badge>{user.role}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Allocation</span>
                      <span className="text-2xl font-bold">{currentTotalAllocation}%</span>
                    </div>
                    <CapacityBadge status={capacityStatus} />
                  </div>
                  {currentTotalAllocation > 100 && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Over-allocated</AlertTitle>
                      <AlertDescription>
                        This user is currently allocated {currentTotalAllocation}% across all
                        projects, which exceeds 100%.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quarterly Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Allocation Breakdown</CardTitle>
              <CardDescription>Total allocation percentage by quarter over time</CardDescription>
            </CardHeader>
            <CardContent>
              {quarterlyBreakdown.length === 0 ? (
                <EmptyState
                  title="No allocations"
                  description="This user has no project assignments yet."
                />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis
                      domain={[0, 150]}
                      label={{ value: "Allocation %", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Allocation"]}
                      labelFormatter={(label) => `Quarter: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="allocation" fill="#3b82f6" name="Allocation %" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Project Allocation Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Current Project Allocations</CardTitle>
              <CardDescription>
                Allocation percentage by project (current assignments only)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projectChartData.length === 0 ? (
                <EmptyState
                  title="No active assignments"
                  description="This user has no active project assignments."
                />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      domain={[0, 150]}
                      label={{ value: "Allocation %", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Allocation"]} />
                    <Legend />
                    <Bar dataKey="allocation" fill="#10b981" name="Allocation %" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Historical Assignments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Assignments</CardTitle>
              <CardDescription>Complete history of all project assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <EmptyState
                  title="No assignments"
                  description="This user has no project assignments yet."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Portfolio → Program</TableHead>
                      <TableHead>Allocation</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments
                      .sort((a, b) => {
                        // Sort by start date, most recent first
                        return parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime()
                      })
                      .map((assignment) => {
                        const start = parseISO(assignment.startDate)
                        const end = assignment.endDate ? parseISO(assignment.endDate) : null
                        const now = new Date()
                        const isActive = end ? isWithinInterval(now, { start, end }) : now >= start
                        const isPast = end ? now > end : false
                        const isFuture = now < start

                        return (
                          <TableRow key={assignment.id}>
                            <TableCell className="font-medium">
                              <Link
                                to={`/projects/${assignment.projectId}`}
                                className="hover:underline"
                              >
                                {assignment.project.name}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {assignment.project.program ? (
                                <div className="text-sm">
                                  {assignment.project.program.portfolio?.name && (
                                    <span className="text-muted-foreground">
                                      {assignment.project.program.portfolio.name} →
                                    </span>
                                  )}{" "}
                                  {assignment.project.program.name}
                                </div>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{assignment.allocationPercent}%</Badge>
                            </TableCell>
                            <TableCell>{format(start, "MMM d, yyyy")}</TableCell>
                            <TableCell>{end ? format(end, "MMM d, yyyy") : "Ongoing"}</TableCell>
                            <TableCell>
                              {isActive ? (
                                <Badge className="bg-green-500">Active</Badge>
                              ) : isPast ? (
                                <Badge variant="outline">Past</Badge>
                              ) : (
                                <Badge variant="outline">Future</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>

  )
}
