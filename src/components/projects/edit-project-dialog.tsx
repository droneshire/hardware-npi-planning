"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { projectService } from "@/services/project.service"
import { ProjectStatus, Project } from "@/types"
import { useToast } from "@/hooks/use-toast"

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  status: z.enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
  startDate: z.string().optional(),
  targetCompletionDate: z.string().optional(),
  programId: z.string().min(1, "Program is required"),
  productTypeId: z.string().optional(),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface EditProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
}

export function EditProjectDialog({ open, onOpenChange, project }: EditProjectDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "PLANNING",
    },
  })

  // Populate form when project changes
  useEffect(() => {
    if (project && open) {
      setValue("name", project.name)
      setValue("description", project.description || "")
      setValue("status", project.status)
      setValue("startDate", project.startDate || "")
      setValue("targetCompletionDate", project.targetCompletionDate || "")
      setValue("programId", project.programId)
      setValue("productTypeId", project.productTypeId || "")
    }
  }, [project, open, setValue])

  const updateMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      if (!project) throw new Error("No project selected")
      return await projectService.updateProject({
        id: project.id,
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
      queryClient.invalidateQueries({ queryKey: ["project", project?.id] })
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      })
      reset()
      onOpenChange(false)
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

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    updateMutation.mutate(data)
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update project details. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input id="name" {...register("name")} placeholder="Enter project name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Enter project description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="programId">Program *</Label>
            <Select
              onValueChange={(value) => setValue("programId", value)}
              value={watch("programId")}
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
            {errors.programId && (
              <p className="text-sm text-destructive">{errors.programId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => setValue("status", value as ProjectStatus)}
              value={watch("status")}
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
              <Input id="startDate" type="date" {...register("startDate")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetCompletionDate">Target Completion</Label>
              <Input id="targetCompletionDate" type="date" {...register("targetCompletionDate")} />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
