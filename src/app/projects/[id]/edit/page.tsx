"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, useParams } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { projectService } from "@/services/project.service"
import { ProjectStatus } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch project details
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectService.getProject(projectId),
    enabled: !!projectId,
  })

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING" as ProjectStatus,
    startDate: "",
    targetCompletionDate: "",
    programId: "",
    productTypeId: "",
  })

  // Populate form when project loads
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        status: project.status,
        startDate: project.startDate || "",
        targetCompletionDate: project.targetCompletionDate || "",
        programId: project.programId,
        productTypeId: project.productTypeId || "",
      })
    }
  }, [project])

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await projectService.updateProject({
        id: projectId,
        name: data.name,
        description: data.description,
        status: data.status,
        startDate: data.startDate,
        targetCompletionDate: data.targetCompletionDate,
        productTypeId: data.productTypeId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      })
      router.push(`/projects/${projectId}`)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project",
        variant: "destructive",
      })
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    updateMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <AuthProtection>
        <AppLayout
          title="Edit Project"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Edit" },
          ]}
        >
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </AppLayout>
      </AuthProtection>
    )
  }

  if (error || !project) {
    return (
      <AuthProtection>
        <AppLayout
          title="Edit Project"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Edit" },
          ]}
        >
          <Card>
            <CardContent className="pt-6">
              <p className="text-destructive">
                {error instanceof Error ? error.message : "Project not found"}
              </p>
              <Button asChild className="mt-4">
                <Link href="/projects">Back to Projects</Link>
              </Button>
            </CardContent>
          </Card>
        </AppLayout>
      </AuthProtection>
    )
  }

  return (
    <AuthProtection>
      <AppLayout
        title="Edit Project"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${projectId}` },
          { label: "Edit" },
        ]}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Update project information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter project description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="programId">Program *</Label>
                  <Select
                    value={formData.programId}
                    onValueChange={(value) => setFormData({ ...formData, programId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* TODO: Load programs from service */}
                      <SelectItem value="prog-1">Program 1</SelectItem>
                      <SelectItem value="prog-2">Program 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value as ProjectStatus })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLANNING">Planning</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="ON_HOLD">On Hold</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetCompletionDate">Target Completion</Label>
                    <Input
                      id="targetCompletionDate"
                      type="date"
                      value={formData.targetCompletionDate}
                      onChange={(e) =>
                        setFormData({ ...formData, targetCompletionDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/projects/${projectId}`)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Updating..." : "Update Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </AuthProtection>
  )
}
