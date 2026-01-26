"use client"

import { useState, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Users, AlertTriangle, MoreVertical, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { CapacityBadge } from "@/components/resources/capacity-badge"
import { CreateUserDialog } from "@/components/resources/create-user-dialog"
import { EditUserDialog } from "@/components/resources/edit-user-dialog"
import { ImportUsersDialog } from "@/components/resources/import-users-dialog"
import { userService } from "@/services/user.service"
import { dataConnect } from "@/lib/firebase"
import { listUsers, listUserAssignments } from "@firebasegen/default-connector"
import { parseISO, isWithinInterval } from "date-fns"
import { getCapacityStatus } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Mock organization ID - in production, this would come from authentication
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

interface ResourceWithAllocation {
  id: string
  name: string
  email: string
  role: string
  totalAllocation: number
  status: "normal" | "warning" | "critical"
  team?: string
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingUser, setEditingUser] = useState<{
    id: string
    name: string
    email: string
    role: string
  } | null>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Fetch users
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users", MOCK_ORGANIZATION_ID],
    queryFn: async () => {
      const result = await listUsers(dataConnect, { organizationId: MOCK_ORGANIZATION_ID })
      return result.data.users
    },
  })

  // Fetch all assignments for all users
  const { data: allAssignments = [] } = useQuery({
    queryKey: ["all-user-assignments", users.map((u) => u.id).join(",")],
    queryFn: async () => {
      const assignments: any[] = []
      for (const user of users) {
        try {
          const result = await listUserAssignments(dataConnect, { userId: user.id })
          // Add userId to each assignment for easier filtering
          const userAssignments = result.data.projectAssignments.map((a: any) => ({
            ...a,
            userId: user.id,
          }))
          assignments.push(...userAssignments)
        } catch (error) {
          // Skip users with no assignments
        }
      }
      return assignments
    },
    enabled: users.length > 0,
  })

  // Calculate allocation for each user
  const resources: ResourceWithAllocation[] = useMemo(() => {
    const now = new Date()
    return users.map((user) => {
      // Filter assignments for this user
      const userAssignments = allAssignments.filter((a) => a.userId === user.id)
      const currentAllocation = userAssignments
        .filter((assignment) => {
          const start = parseISO(assignment.startDate)
          const end = assignment.endDate
            ? parseISO(assignment.endDate)
            : new Date("2099-12-31")
          return isWithinInterval(now, { start, end })
        })
        .reduce((sum, assignment) => sum + assignment.allocationPercent, 0)

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        totalAllocation: currentAllocation,
        status: getCapacityStatus(currentAllocation),
        team: undefined, // TODO: Get from team memberships
      }
    })
  }, [users, allAssignments])

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete user")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["all-user-assignments"] })
      toast({
        title: "User deleted",
        description: "User has been removed successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      })
    },
  })

  const handleDelete = (user: ResourceWithAllocation) => {
    if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      deleteMutation.mutate(user.id)
    }
  }

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.team && resource.team.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSearch
    })
  }, [resources, searchQuery])

  const overAllocatedCount = resources.filter((r) => r.totalAllocation > 100).length
  const warningCount = resources.filter(
    (r) => r.totalAllocation > 90 && r.totalAllocation <= 100
  ).length

  const isLoading = isLoadingUsers

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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Resource List</CardTitle>
                <CardDescription>
                  View all team members and their current allocation status
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <ImportUsersDialog
                  organizationId={MOCK_ORGANIZATION_ID}
                  onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ["users"] })
                    queryClient.invalidateQueries({ queryKey: ["all-user-assignments"] })
                  }}
                />
                <CreateUserDialog
                  organizationId={MOCK_ORGANIZATION_ID}
                  onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ["users"] })
                    queryClient.invalidateQueries({ queryKey: ["all-user-assignments"] })
                  }}
                />
              </div>
            </div>
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
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Allocation</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                        <Badge variant="outline">{resource.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{resource.totalAllocation}%</TableCell>
                      <TableCell className="text-right">
                        <CapacityBadge status={resource.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                setEditingUser({
                                  id: resource.id,
                                  name: resource.name,
                                  email: resource.email,
                                  role: resource.role,
                                })
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(resource)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <EditUserDialog
        open={!!editingUser}
        onOpenChange={(open) => {
          if (!open) setEditingUser(null)
        }}
        user={editingUser}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["users"] })
          queryClient.invalidateQueries({ queryKey: ["all-user-assignments"] })
          setEditingUser(null)
        }}
      />
    </AppLayout>
    </AuthProtection>
  )
}
