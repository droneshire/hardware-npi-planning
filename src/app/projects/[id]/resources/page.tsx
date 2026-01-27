"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { EmptyState } from "@/components/ui/empty-state"
import { projectService } from "@/services/project.service"
import { dataConnect } from "@/lib/firebase"
import {
  listProjectAssignments,
  createProjectAssignment,
  updateProjectAssignment,
  deleteProjectAssignment,
  listUsers,
  listUserAssignments,
} from "@firebasegen/default-connector"
import { format, isWithinInterval, parseISO } from "date-fns"
import { ArrowLeft, Users, Plus, AlertTriangle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock organization ID for development
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export default function ProjectAssignmentsPage() {
  const params = useParams()
  const projectId = params.id as string
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    userId: "",
    allocationPercent: 50,
    startDate: "",
    endDate: "",
    notes: "",
  })

  // Fetch project details
  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const projectData = await projectService.getProject(projectId)
      if (!projectData) {
        throw new Error("Project not found")
      }
      return projectData
    },
  })

  // Fetch all users in organization
  const { data: users = [] } = useQuery({
    queryKey: ["users", MOCK_ORGANIZATION_ID],
    queryFn: async () => {
      const result = await listUsers(dataConnect, { organizationId: MOCK_ORGANIZATION_ID })
      return result.data.users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
      }))
    },
  })

  // Fetch project assignments
  const { data: assignments = [], isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["project-assignments", projectId],
    queryFn: async () => {
      const result = await listProjectAssignments(dataConnect, { projectId })
      return result.data.projectAssignments.map((a) => ({
        id: a.id,
        projectId: projectId, // projectId is not in query result, use from query variable
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

  // Check for over-allocation when form data changes
  const { data: allocationWarning } = useQuery({
    queryKey: ["allocation-check", formData.userId, formData.startDate, formData.endDate],
    queryFn: async () => {
      if (!formData.userId || !formData.startDate) return null

      const result = await listUserAssignments(dataConnect, { userId: formData.userId })
      const userAssignments = result.data.projectAssignments

      const startDate = parseISO(formData.startDate)
      const endDate = formData.endDate ? parseISO(formData.endDate) : new Date("2099-12-31")

      // Calculate total allocation in the date range
      let totalAllocation = 0
      const overlappingAssignments = userAssignments.filter((assignment) => {
        if (assignment.projectId === projectId && assignment.id !== editingAssignment) {
          return false // Exclude current assignment if editing
        }

        const assignmentStart = parseISO(assignment.startDate)
        const assignmentEnd = assignment.endDate
          ? parseISO(assignment.endDate)
          : new Date("2099-12-31")

        const overlaps =
          isWithinInterval(startDate, {
            start: assignmentStart,
            end: assignmentEnd,
          }) ||
          isWithinInterval(endDate, {
            start: assignmentStart,
            end: assignmentEnd,
          }) ||
          (startDate <= assignmentStart && endDate >= assignmentEnd)

        if (overlaps) {
          totalAllocation += assignment.allocationPercent
          return true
        }
        return false
      })

      totalAllocation += formData.allocationPercent

      return {
        totalAllocation,
        isOverAllocated: totalAllocation > 100,
        overlappingAssignments,
      }
    },
    enabled: !!formData.userId && !!formData.startDate && isCreateDialogOpen,
  })

  // Create assignment mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      if (!formData.userId || !formData.startDate) {
        throw new Error("User and start date are required")
      }

      await createProjectAssignment(dataConnect, {
        projectId,
        userId: formData.userId,
        allocationPercent: formData.allocationPercent,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        notes: formData.notes || null,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-assignments", projectId] })
      setIsCreateDialogOpen(false)
      setFormData({
        userId: "",
        allocationPercent: 50,
        startDate: "",
        endDate: "",
        notes: "",
      })
      toast({
        title: "Assignment created",
        description: "The resource has been successfully assigned to the project.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create assignment",
        variant: "destructive",
      })
    },
  })

  // Update assignment mutation
  const updateMutation = useMutation({
    mutationFn: async (assignmentId: string) => {
      if (!formData.userId || !formData.startDate) {
        throw new Error("User and start date are required")
      }

      await updateProjectAssignment(dataConnect, {
        id: assignmentId,
        allocationPercent: formData.allocationPercent,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        notes: formData.notes || null,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-assignments", projectId] })
      setEditingAssignment(null)
      setFormData({
        userId: "",
        allocationPercent: 50,
        startDate: "",
        endDate: "",
        notes: "",
      })
      toast({
        title: "Assignment updated",
        description: "The assignment has been successfully updated.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update assignment",
        variant: "destructive",
      })
    },
  })

  // Delete assignment mutation
  const deleteMutation = useMutation({
    mutationFn: async (assignmentId: string) => {
      await deleteProjectAssignment(dataConnect, { id: assignmentId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-assignments", projectId] })
      toast({
        title: "Assignment deleted",
        description: "The assignment has been successfully removed.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete assignment",
        variant: "destructive",
      })
    },
  })

  const handleEdit = (assignment: (typeof assignments)[0]) => {
    setEditingAssignment(assignment.id)
    setFormData({
      userId: assignment.userId,
      allocationPercent: assignment.allocationPercent,
      startDate: assignment.startDate,
      endDate: assignment.endDate || "",
      notes: assignment.notes || "",
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = (assignmentId: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      deleteMutation.mutate(assignmentId)
    }
  }

  const handleSubmit = () => {
    if (editingAssignment) {
      updateMutation.mutate(editingAssignment)
    } else {
      createMutation.mutate()
    }
  }

  if (isLoadingProject) {
    return (
      <AuthProtection>
        <AppLayout
          title="Project Resources"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Loading..." },
          ]}
        >
          <Skeleton className="h-64 w-full" />
        </AppLayout>
      </AuthProtection>
    )
  }

  if (!project) {
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
            description="The project you're looking for doesn't exist."
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

  return (
    <AuthProtection>
      <AppLayout
        title={`${project.name} - Resources`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${projectId}` as any },
          { label: "Resources" },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}` as any}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project
              </Link>
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingAssignment(null)
                    setFormData({
                      userId: "",
                      allocationPercent: 50,
                      startDate: "",
                      endDate: "",
                      notes: "",
                    })
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Assign Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingAssignment ? "Edit Assignment" : "Assign Resource"}
                  </DialogTitle>
                  <DialogDescription>
                    Assign a team member to this project with an allocation percentage and date
                    range.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* User Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="user">User *</Label>
                    <Select
                      value={formData.userId}
                      onValueChange={(value) => setFormData({ ...formData, userId: value })}
                    >
                      <SelectTrigger id="user">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Allocation Percentage */}
                  <div className="space-y-2">
                    <Label htmlFor="allocation">Allocation Percentage *</Label>
                    <Input
                      id="allocation"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.allocationPercent}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          allocationPercent: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <div className="text-sm text-muted-foreground">
                      Percentage of time allocated to this project (0-100%)
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Additional notes about this assignment"
                    />
                  </div>

                  {/* Over-allocation Warning */}
                  {allocationWarning?.isOverAllocated && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Over-allocation Warning</AlertTitle>
                      <AlertDescription>
                        This assignment would result in {allocationWarning.totalAllocation}% total
                        allocation for this user in the selected date range. The user is already
                        assigned to {allocationWarning.overlappingAssignments.length} other project
                        {allocationWarning.overlappingAssignments.length !== 1 ? "s" : ""} in this
                        period.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false)
                      setEditingAssignment(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !formData.userId ||
                      !formData.startDate ||
                      createMutation.isPending ||
                      updateMutation.isPending
                    }
                  >
                    {editingAssignment ? "Update" : "Assign"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Assignments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Assignments</CardTitle>
              <CardDescription>
                Manage team member assignments and allocation percentages for this project
              </CardDescription>
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
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Assign Resource
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.user.name}</TableCell>
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
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(assignment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(assignment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
