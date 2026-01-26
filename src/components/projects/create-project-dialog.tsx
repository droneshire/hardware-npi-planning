"use client"

import { useState } from "react"
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
import { phaseTemplateService } from "@/services/phaseTemplate.service"
import { ProjectStatus } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  status: z.enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
  startDate: z.string().optional(),
  targetCompletionDate: z.string().optional(),
  programId: z.string().min(1, "Program is required"),
  productTypeId: z.string().optional(),
  templateId: z.string().optional(), // Phase template ID
})

type ProjectFormData = z.infer<typeof projectSchema>

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch phase templates for selection
  const { data: templates = [] } = useQuery({
    queryKey: ["phase-templates"],
    queryFn: async () => {
      try {
        // Use a mock organization ID for now
        const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"
        return await phaseTemplateService.listTemplates(MOCK_ORGANIZATION_ID)
      } catch (error) {
        console.error("Failed to load templates:", error)
        return []
      }
    },
    enabled: open, // Only fetch when dialog is open
  })

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

  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      return await projectService.createProject({
        programId: data.programId,
        name: data.name,
        description: data.description,
        status: data.status,
        startDate: data.startDate,
        targetCompletionDate: data.targetCompletionDate,
        productTypeId: data.productTypeId,
        templateId: data.templateId, // Include template ID for phase generation
      })
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", project.id] })
      toast({
        title: "Project created",
        description: watch("templateId")
          ? "The project has been created with phases from the selected template."
          : "The project has been successfully created.",
      })
      reset()
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project",
        variant: "destructive",
      })
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    createMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project within a program. You can assign phases and resources later.
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
              defaultValue={watch("programId")}
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
              defaultValue={watch("status")}
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

          <div className="space-y-2">
            <Label htmlFor="templateId">Phase Template (Optional)</Label>
            <Select
              onValueChange={(value) => setValue("templateId", value)}
              value={watch("templateId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a phase template to auto-generate phases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None - Create phases manually</SelectItem>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                    {template.isDefault && " (Default)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {watch("templateId") && (
              <p className="text-xs text-muted-foreground">
                Phases will be automatically generated from this template when the project is created.
                Start date is required for phase generation.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start Date {watch("templateId") && <span className="text-destructive">*</span>}
              </Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {watch("templateId") && !watch("startDate") && (
                <p className="text-xs text-destructive">
                  Start date is required when using a phase template
                </p>
              )}
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
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
