"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthProtection } from "@/components/auth-protection"
import { Skeleton } from "@/components/ui/skeleton"
import { projectService } from "@/services/project.service"
import { dataConnect } from "@/lib/firebase"
import { listUsers, listUserAssignments } from "@firebasegen/default-connector"
import { isWithinInterval, parseISO } from "date-fns"
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  FolderKanban,
  Zap,
  BarChart3,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export default function DashboardPage() {
  const { data: activeProjects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["dashboard-active-projects"],
    queryFn: async () => {
      return await projectService.listProjectsByStatus("ACTIVE")
    },
  })

  const { data: users = [] } = useQuery({
    queryKey: ["dashboard-users", MOCK_ORGANIZATION_ID],
    queryFn: async () => {
      const result = await listUsers(dataConnect, { organizationId: MOCK_ORGANIZATION_ID })
      return result.data.users
    },
  })

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

  const resourceStats = useMemo(() => {
    if (users.length === 0) {
      return { averageUtilization: 0, overAllocatedCount: 0, totalAllocations: 0 }
    }

    const now = new Date()
    const userUtilizations: number[] = []
    let overAllocatedCount = 0

    users.forEach((user) => {
      const userAssignments = allAssignments.filter((a: any) => a.userId === user.id)
      const currentAllocation = userAssignments
        .filter((assignment) => {
          const start = parseISO(assignment.startDate)
          const end = assignment.endDate ? parseISO(assignment.endDate) : new Date("2099-12-31")
          return isWithinInterval(now, { start, end })
        })
        .reduce((sum, assignment) => sum + assignment.allocationPercent, 0)

      userUtilizations.push(currentAllocation)
      if (currentAllocation > 100) overAllocatedCount++
    })

    const averageUtilization =
      userUtilizations.length > 0
        ? Math.round(userUtilizations.reduce((sum, util) => sum + util, 0) / userUtilizations.length)
        : 0

    return { averageUtilization, overAllocatedCount, totalAllocations: userUtilizations.length }
  }, [users, allAssignments])

  const recentProjects = useMemo(() => {
    return activeProjects.slice(0, 5)
  }, [activeProjects])

  return (
    <AuthProtection>
      <AppLayout
        title="Dashboard"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      >
        <div className="space-y-6 animate-fade-in">
          {/* Stat Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Active Projects */}
            <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Projects
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <FolderKanban className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingProjects ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight">{activeProjects.length}</div>
                    <p className="mt-1 text-xs text-muted-foreground">Currently in progress</p>
                    <Link
                      href="/projects"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View all <ArrowRight className="h-3 w-3" />
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Resource Utilization */}
            <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resource Utilization
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingProjects ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight">
                      {resourceStats.averageUtilization}%
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Organization-wide average</p>
                    <Link
                      href="/resources"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View resources <ArrowRight className="h-3 w-3" />
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Over-allocated */}
            <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Over-allocated
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingProjects ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-3xl font-bold tracking-tight text-red-500">
                      {resourceStats.overAllocatedCount}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Team members at &gt;100%
                    </p>
                    {resourceStats.overAllocatedCount > 0 && (
                      <Link
                        href="/resources"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Review <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quick Actions
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                  >
                    <FolderKanban className="h-3.5 w-3.5" />
                    New Project
                  </Link>
                  <Link
                    href="/timeline"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    View Timeline
                  </Link>
                  <Link
                    href="/instructions"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                  >
                    <Activity className="h-3.5 w-3.5" />
                    Build Instructions
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest active projects</CardDescription>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingProjects ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-3 w-[120px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 mb-3">
                    <Activity className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">No recent activity</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Create your first project to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentProjects.map((project, i) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}` as any}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">
                            {project.name}
                          </p>
                          {project.programId && (
                            <p className="text-xs text-muted-foreground">
                              Program: {project.programId}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] border-border/50"
                      >
                        {project.status}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </AuthProtection>
  )
}
