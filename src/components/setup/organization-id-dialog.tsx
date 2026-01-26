"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createOrUpdateUserDocument, getUserDocument } from "@/hooks/use-firestore"
import { useQueryClient } from "@tanstack/react-query"

const organizationNameSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
})

type OrganizationNameFormData = z.infer<typeof organizationNameSchema>

interface OrganizationIdDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userEmail: string
  currentOrganizationName?: string
  onSuccess?: () => void
}

export function OrganizationIdDialog({
  open,
  onOpenChange,
  userEmail,
  currentOrganizationName,
  onSuccess,
}: OrganizationIdDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<OrganizationNameFormData>({
    resolver: zodResolver(organizationNameSchema),
    defaultValues: {
      organizationName: currentOrganizationName || "",
    },
  })

  useEffect(() => {
    if (currentOrganizationName) {
      setValue("organizationName", currentOrganizationName)
    }
  }, [currentOrganizationName, setValue])

  // Reset justSaved flag when dialog opens
  useEffect(() => {
    if (open) {
      setJustSaved(false)
    }
  }, [open])

  const onSubmit = async (data: OrganizationNameFormData) => {
    setIsSaving(true)
    try {
      // Generate UUID for organization ID if it doesn't exist
      // First, get existing settings to preserve the UUID if it exists
      const existingDoc = await getUserDocument(userEmail)
      const existingOrgId = existingDoc?.settings?.organization?.organizationId

      // Generate new UUID only if one doesn't exist
      const organizationId = existingOrgId || crypto.randomUUID()

      // Use client-side Firestore function which has auth context
      await createOrUpdateUserDocument(userEmail, {
        settings: {
          organization: {
            organizationName: data.organizationName,
            organizationId: organizationId,
          },
        },
      })

      // Invalidate queries to refresh organization ID
      queryClient.invalidateQueries({ queryKey: ["organization-id"] })
      queryClient.invalidateQueries({ queryKey: ["organization-name"] })
      queryClient.invalidateQueries({ queryKey: ["user-settings"] })

      toast({
        title: "Organization name saved",
        description: "Your organization name has been saved successfully.",
      })

      setJustSaved(true)
      onSuccess?.()
      // Close the dialog after a brief delay to allow the query to update
      setTimeout(() => {
        onOpenChange(false)
      }, 100)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save organization name",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        // Allow closing if we just saved, or if organization name is already set
        if (justSaved || currentOrganizationName || newOpen) {
          onOpenChange(newOpen)
          return
        }
        // Prevent closing if organization name is not set and we haven't just saved
        if (!newOpen) {
          return
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          // Allow closing if we just saved, otherwise prevent if organization name is not set
          if (!justSaved && !currentOrganizationName) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          // Allow closing if we just saved, otherwise prevent if organization name is not set
          if (!justSaved && !currentOrganizationName) {
            e.preventDefault()
          }
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Set Organization Name</DialogTitle>
            <DialogDescription>
              Please set your organization name to continue. A unique ID will be automatically
              generated for your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                An organization name is required to use this application. A unique identifier will
                be automatically generated.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                {...register("organizationName")}
                placeholder="e.g., Acme Hardware Corp, My Company"
                disabled={isSaving}
                autoFocus
              />
              {errors.organizationName && (
                <p className="text-sm text-destructive">{errors.organizationName.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                This name will be used to identify your organization. A unique ID will be generated
                automatically.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save & Continue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
