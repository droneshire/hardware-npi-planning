import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { projectService } from "@/services/project.service"
import { dataConnect } from "@/lib/firebase"
import { listUsers, listUserAssignments } from "@firebasegen/default-connector"
import { isWithinInterval, parseISO } from "date-fns"
import { Activity, TrendingUp, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock organization ID for development
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export default function DashboardPage() {
  // Fetch active projects
  const { data: activeProjects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["dashboard-active-projects"],
    queryFn: async () => {
      return await projectService.listProjectsByStatus("ACTIVE")
    },
  })

  // Fetch all users
  const { data: users = [] } = useQuery({
    queryKey: ["dashboard-users", MOCK_ORGANIZATION_ID],
    queryFn: async () => {
      const result = await listUsers(dataConnect, { organizationId: MOCK_ORGANIZATION_ID })
      return result.data.users
    },
  })

  // Fetch assignments for all users to calculate utilization
  const { data: allAssignments = [] } = useQuery({
    queryKey: ["dashboard-all-assignments"],
    queryFn: async () => {
      const assignments = []
      for (const user of users) {
        try {
          const result = await listUserAssignments(dataConnect, { userId: user.id })
          assignments.push(...result.data.projectAssignments)
        } catch (error) {
          console.error(`Failed to fetch assignments for user ${user.id}:`, error)
        }
      }
      return assignments
    },
    enabled: users.length > 0,
  })

  // Calculate resource utilization statistics
  const resourceStats = useMemo(() => {
    if (users.length === 0) {
      return {
        averageUtilization: 0,
        overAllocatedCount: 0,
        totalAllocations: 0,
      }
    }

    const now = new Date()
    const userUtilizations: number[] = []
    let overAllocatedCount = 0

    users.forEach((user) => {
      const userAssignments = allAssignments.filter((a) => a.userId === user.id)
      const currentAllocation = userAssignments
        .filter((assignment) => {
          const start = parseISO(assignment.startDate)
          const end = assignment.endDate ? parseISO(assignment.endDate) : new Date("2099-12-31")
          return isWithinInterval(now, { start, end })
        })
        .reduce((sum, assignment) => sum + assignment.allocationPercent, 0)

      userUtilizations.push(currentAllocation)
      if (currentAllocation > 100) {
        overAllocatedCount++
      }
    })

    const averageUtilization =
      userUtilizations.length > 0
        ? Math.round(
            userUtilizations.reduce((sum, util) => sum + util, 0) / userUtilizations.length
          )
        : 0

    return {
      averageUtilization,
      overAllocatedCount,
      totalAllocations: userUtilizations.length,
    }
  }, [users, allAssignments])

  // Calculate recent activity (projects updated in last 7 days)
  const recentProjects = useMemo(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // We'll use active projects as a proxy for recent activity
    // In a full implementation, we'd track actual update timestamps
    return activeProjects.slice(0, 5)
  }, [activeProjects])

  return (
    <AppLayout
      title="Dashboard"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Projects Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-3xl font-bold">{activeProjects.length}</div>
                <p className="text-xs text-muted-foreground">Currently in progress</p>
                <Link
                  to="/projects"
                  className="mt-2 inline-block text-xs text-primary hover:underline"
                >
                  View all projects →
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        {/* Resource Utilization Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-3xl font-bold">{resourceStats.averageUtilization}%</div>
                <p className="text-xs text-muted-foreground">Organization-wide average</p>
                <Link
                  to="/resources"
                  className="mt-2 inline-block text-xs text-primary hover:underline"
                >
                  View resources →
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        {/* Over-allocated Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Over-allocated</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-3xl font-bold text-destructive">
                  {resourceStats.overAllocatedCount}
                </div>
                <p className="text-xs text-muted-foreground">Team members at &gt;100%</p>
                {resourceStats.overAllocatedCount > 0 && (
                  <Link
                    to="/resources"
                    className="mt-2 inline-block text-xs text-primary hover:underline"
                  >
                    Review allocations →
                  </Link>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest active projects</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : recentProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              <div className="space-y-2">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="font-medium hover:underline"
                      >
                        {project.name}
                      </Link>
                      {project.programId && (
                        <p className="text-xs text-muted-foreground">
                          Program: {project.programId}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                ))}
                <Link
                  to="/projects"
                  className="mt-4 inline-block text-sm text-primary hover:underline"
                >
                  View all projects →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
