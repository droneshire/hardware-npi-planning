"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { CapacityBadge } from "@/components/resources/capacity-badge"

// Mock data for development
const MOCK_RESOURCES = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    team: "Engineering",
    totalAllocation: 85,
    status: "normal" as const,
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    team: "Design",
    totalAllocation: 120,
    status: "critical" as const,
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob@example.com",
    team: "Engineering",
    totalAllocation: 95,
    status: "warning" as const,
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      // TODO: Replace with actual service call once SDK is generated
      return MOCK_RESOURCES
    },
  })

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.team.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [resources, searchQuery])

  const overAllocatedCount = resources.filter((r) => r.totalAllocation > 100).length
  const warningCount = resources.filter(
    (r) => r.totalAllocation > 90 && r.totalAllocation <= 100
  ).length

  return (
    <AuthProtection>
      <AppLayout
        title="Resources"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
      >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
              <p className="text-xs text-muted-foreground">Active team members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Over-allocated</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{overAllocatedCount}</div>
              <p className="text-xs text-muted-foreground">Resources at &gt;100%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Capacity</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{warningCount}</div>
              <p className="text-xs text-muted-foreground">Resources at 90-100%</p>
            </CardContent>
          </Card>
        </div>

        {/* Resources Table */}
        <Card>
          <CardHeader>
            <CardTitle>Resource List</CardTitle>
            <CardDescription>
              View all team members and their current allocation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredResources.length === 0 ? (
              <EmptyState
                title="No resources found"
                description="Try adjusting your search query"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Allocation</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">
                        <Link href={`/resources/people/${resource.id}`} className="hover:underline">
                          {resource.name}
                        </Link>
                      </TableCell>
                      <TableCell>{resource.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.team}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{resource.totalAllocation}%</TableCell>
                      <TableCell className="text-right">
                        <CapacityBadge status={resource.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
    </AuthProtection>
  )
}
