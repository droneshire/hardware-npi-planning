

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { dataConnect, getFirebaseIdToken, storage } from "@/lib/firebase"
import { runSeed } from "@/lib/seedClient"
import {
  listPhaseTemplates,
  createPhaseTemplate,
  updatePhaseTemplate,
  deletePhaseTemplate,
  getOrganization,
  createOrganization,
  updateOrganization,
} from "@firebasegen/default-connector"
import { phaseTemplateService } from "@/services/phaseTemplate.service"
import { portfolioService } from "@/services/portfolio.service"
import { programService } from "@/services/program.service"
import { projectService } from "@/services/project.service"
import { Calendar, FileText, Plus, Edit, Trash2, Database, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuthStateWatcher } from "@/hooks/use-auth"
import { getUserDocument, createOrUpdateUserDocument } from "@/hooks/use-firestore"
import { useOrganizationId } from "@/hooks/use-organization-id"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
// Image component removed - use img tag instead

// Mock organization ID for development (must be valid UUID format)
const MOCK_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000001"

export default function SettingsPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { user } = useAuthStateWatcher()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null)
  const [fiscalYearStart, setFiscalYearStart] = useState(1)
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const {
    organizationName: orgNameFromHook,
    organizationId: orgIdFromHook,
    isLoading: isLoadingOrgId,
  } = useOrganizationId()
  const [organizationName, setOrganizationName] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isDefault: false,
  })

  // Load user settings from API
  const { data: userSettings, refetch: refetchSettings } = useQuery({
    queryKey: ["user-settings", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        setIsLoadingSettings(false)
        return null
      }

      try {
        const userDoc = await getUserDocument(user.email)
        const settings = userDoc?.settings || null
        console.log("Settings from Firestore:", settings)
        console.log("Logo URL from Firestore:", settings?.organization?.logoUrl)
        setIsLoadingSettings(false)
        return settings
      } catch (error) {
        console.error("Error loading user settings:", error)
        setIsLoadingSettings(false)
        return null
      }
    },
    enabled: !!user?.email,
  })

  // Update state when settings are loaded
  useEffect(() => {
    // userSettings can be null (no settings) or an object (settings exist)
    // undefined means query hasn't completed yet
    if (userSettings !== undefined) {
      // Set organization name from API response or hook
      const orgName = userSettings?.organization?.organizationName || orgNameFromHook
      if (orgName) {
        setOrganizationName(orgName)
      } else if (userSettings !== null) {
        // Clear if settings were loaded but no name found
        setOrganizationName("")
      }

      if (userSettings?.organization?.fiscalYearStartMonth) {
        setFiscalYearStart(userSettings.organization.fiscalYearStartMonth)
      }

      // Set logo URL - ALWAYS update from settings if present
      const logo = userSettings?.organization?.logoUrl
      if (logo) {
        setLogoUrl(logo)
      } else if (userSettings === null) {
        // Only clear if we got null (no settings document exists)
        // Don't clear if userSettings is an object but logoUrl is missing (might be partial data)
        setLogoUrl(null)
      }
    }
  }, [userSettings, orgNameFromHook])

  // Update organization name when it changes from the hook
  useEffect(() => {
    if (orgNameFromHook) {
      setOrganizationName(orgNameFromHook)
    }
  }, [orgNameFromHook])

  // Resolved organization ID: user's org from settings, or mock for legacy/seed
  const effectiveOrgId = orgIdFromHook || MOCK_ORGANIZATION_ID

  // Fetch phase templates (only when we have an org ID)
  const { data: templates = [], isLoading: isLoadingTemplates } = useQuery({
    queryKey: ["phase-templates", effectiveOrgId],
    queryFn: async () => {
      const result = await listPhaseTemplates(dataConnect, {
        organizationId: effectiveOrgId,
      })
      return result.data.phaseTemplates.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description ?? undefined,
        isDefault: t.isDefault,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }))
    },
    enabled: !!effectiveOrgId,
  })

  // Create template mutation (requires user's org to exist in Data Connect)
  const createMutation = useMutation({
    mutationFn: async () => {
      if (!formData.name.trim()) {
        throw new Error("Template name is required")
      }
      if (!orgIdFromHook) {
        throw new Error("Set your organization in the Organization Settings tab first, then save.")
      }

      await createPhaseTemplate(dataConnect, {
        organizationId: orgIdFromHook,
        name: formData.name,
        description: formData.description || null,
        isDefault: formData.isDefault || null,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phase-templates"] })
      setIsCreateDialogOpen(false)
      setFormData({ name: "", description: "", isDefault: false })
      toast({
        title: "Template created",
        description: "The phase template has been successfully created.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create template",
        variant: "destructive",
      })
    },
  })

  // Update template mutation
  const updateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      if (!formData.name.trim()) {
        throw new Error("Template name is required")
      }

      await updatePhaseTemplate(dataConnect, {
        id: templateId,
        name: formData.name,
        description: formData.description || null,
        isDefault: formData.isDefault || null,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phase-templates"] })
      setEditingTemplate(null)
      setIsCreateDialogOpen(false)
      setFormData({ name: "", description: "", isDefault: false })
      toast({
        title: "Template updated",
        description: "The phase template has been successfully updated.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update template",
        variant: "destructive",
      })
    },
  })

  // Delete template mutation
  const deleteMutation = useMutation({
    mutationFn: async (templateId: string) => {
      await deletePhaseTemplate(dataConnect, { id: templateId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phase-templates"] })
      toast({
        title: "Template deleted",
        description: "The phase template has been successfully deleted.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete template",
        variant: "destructive",
      })
    },
  })

  const handleEdit = (template: (typeof templates)[0]) => {
    setEditingTemplate(template.id)
    setFormData({
      name: template.name,
      description: template.description || "",
      isDefault: template.isDefault,
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = (templateId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this template? This will also delete all phases in the template."
      )
    ) {
      deleteMutation.mutate(templateId)
    }
  }

  const handleSubmit = () => {
    if (editingTemplate) {
      updateMutation.mutate(editingTemplate)
    } else {
      createMutation.mutate()
    }
  }

  // Initialize default templates mutation
  const initializeDefaultsMutation = useMutation({
    mutationFn: async () => {
      if (!orgIdFromHook) {
        throw new Error("Set your organization in the Organization Settings tab first, then save.")
      }
      return await phaseTemplateService.initializeDefaultTemplates(orgIdFromHook)
    },
    onSuccess: (templates) => {
      queryClient.invalidateQueries({ queryKey: ["phase-templates"] })
      toast({
        title: "Default templates created",
        description: `Successfully created ${templates.length} default phase templates.`,
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to initialize default templates",
        variant: "destructive",
      })
    },
  })

  const handleInitializeDefaults = () => {
    if (
      confirm(
        "This will create the standard NPI phase templates (Standard NPI, Fast Track, Extended NPI, Software-Focused). Continue?"
      )
    ) {
      initializeDefaultsMutation.mutate()
    }
  }

  return (

      <AppLayout
        title="Settings"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Settings" }]}
      >
        <div className="space-y-6">
          <Tabs defaultValue="organization" className="w-full">
            <TabsList>
              <TabsTrigger value="organization">
                <Calendar className="mr-2 h-4 w-4" />
                Organization
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileText className="mr-2 h-4 w-4" />
                Phase Templates
              </TabsTrigger>
            </TabsList>

            {/* Organization Settings Tab */}
            <TabsContent value="organization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Settings</CardTitle>
                  <CardDescription>
                    Configure organization-wide settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Organization Name */}
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="e.g., Acme Hardware Corp, My Company"
                      disabled={isSavingSettings || isLoadingSettings}
                    />
                    <p className="text-sm text-muted-foreground">
                      The name of your organization. A unique ID is automatically generated and used
                      as the key in the database.
                    </p>
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    {/* Debug info */}
                    {import.meta.env.DEV && (
                      <div className="mb-2 text-xs text-muted-foreground">
                        Debug: logoUrl = {logoUrl ? `"${logoUrl.substring(0, 50)}..."` : "null"}
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      {logoUrl ? (
                        <div className="relative">
                          <img
                            src={logoUrl}
                            alt="Company Logo"
                            width={80}
                            height={80}
                            className="rounded border object-contain"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={async () => {
                              if (!user?.email) return
                              try {
                                // Get existing settings and update logo URL
                                const userDoc = await getUserDocument(user.email)
                                const existingSettings = userDoc?.settings || {}
                                await createOrUpdateUserDocument(user.email, {
                                  settings: {
                                    ...existingSettings,
                                    organization: {
                                      ...existingSettings.organization,
                                      logoUrl: null,
                                    },
                                  },
                                })

                                setLogoUrl(null)
                                queryClient.invalidateQueries({ queryKey: ["company-logo"] })
                                queryClient.invalidateQueries({ queryKey: ["user-settings"] })
                                await refetchSettings()
                                toast({
                                  title: "Logo removed",
                                  description: "Company logo has been removed.",
                                })
                              } catch (error: any) {
                                toast({
                                  title: "Error",
                                  description: error.message || "Failed to remove logo",
                                  variant: "destructive",
                                })
                              }
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded border border-dashed text-muted-foreground">
                          No logo
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file || !user?.email) return

                            // Validate file type
                            if (!file.type.startsWith("image/")) {
                              toast({
                                title: "Invalid file type",
                                description: "Please select an image file",
                                variant: "destructive",
                              })
                              e.target.value = ""
                              return
                            }

                            // Validate file size (max 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              toast({
                                title: "File too large",
                                description: "File size must be less than 5MB",
                                variant: "destructive",
                              })
                              e.target.value = ""
                              return
                            }

                            setIsUploadingLogo(true)
                            try {
                              // Sanitize email for use in path
                              const sanitizedEmail = user.email.replace(/[@.]/g, "_")

                              // Create storage reference
                              const logoRef = ref(
                                storage,
                                `logos/${sanitizedEmail}/${Date.now()}_${file.name}`
                              )

                              // Upload file directly from client (has auth context)
                              await uploadBytes(logoRef, file)

                              // Get download URL
                              const downloadURL = await getDownloadURL(logoRef)
                              console.log("Logo uploaded, download URL:", downloadURL)

                              // Save logo URL to user document via API
                              const idToken = await getFirebaseIdToken()
                              const headers: HeadersInit = { "Content-Type": "application/json" }
                              if (idToken) {
                                headers.Authorization = `Bearer ${idToken}`
                              }

                              // Get existing settings and update logo URL
                              const userDoc = await getUserDocument(user.email)
                              const existingSettings = userDoc?.settings || {}
                              await createOrUpdateUserDocument(user.email, {
                                settings: {
                                  ...existingSettings,
                                  organization: {
                                    ...existingSettings.organization,
                                    logoUrl: downloadURL,
                                  },
                                },
                              })
                              console.log("Logo URL saved to Firestore:", downloadURL)

                              // Set logo URL immediately for instant feedback
                              setLogoUrl(downloadURL)

                              // Invalidate and refetch to ensure consistency
                              queryClient.invalidateQueries({ queryKey: ["company-logo"] })
                              queryClient.invalidateQueries({ queryKey: ["user-settings"] })

                              // Refetch settings to sync with server
                              const refetchResult = await refetchSettings()
                              console.log(
                                "Refetched settings after logo upload:",
                                refetchResult.data
                              )

                              // Ensure logo URL is still set after refetch
                              if (refetchResult.data?.organization?.logoUrl) {
                                console.log(
                                  "Setting logo from refetched data:",
                                  refetchResult.data.organization.logoUrl
                                )
                                setLogoUrl(refetchResult.data.organization.logoUrl)
                              } else if (downloadURL) {
                                // Keep the downloadURL we just uploaded if refetch doesn't have it yet
                                console.log("Keeping uploaded logo URL:", downloadURL)
                                setLogoUrl(downloadURL)
                              }
                              toast({
                                title: "Logo uploaded",
                                description: "Company logo has been uploaded successfully.",
                              })
                            } catch (error: any) {
                              console.error("Logo upload error:", error)
                              toast({
                                title: "Error",
                                description: error.message || "Failed to upload logo",
                                variant: "destructive",
                              })
                            } finally {
                              setIsUploadingLogo(false)
                              // Reset input
                              e.target.value = ""
                            }
                          }}
                          disabled={isUploadingLogo}
                          className="cursor-pointer"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Upload a company logo (max 5MB). Recommended size: 200x200px or larger.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fiscalYear">Fiscal Year Start Month</Label>
                    <Select
                      value={fiscalYearStart.toString()}
                      onValueChange={(value) => setFiscalYearStart(parseInt(value))}
                    >
                      <SelectTrigger id="fiscalYear">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {new Date(2000, month - 1).toLocaleString("default", {
                              month: "long",
                            })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      The month when your organization&apos;s fiscal year begins (1 = January, 12 =
                      December)
                    </p>
                  </div>
                  <Button
                    onClick={async () => {
                      if (!user?.email) {
                        toast({
                          title: "Error",
                          description: "You must be logged in to save settings",
                          variant: "destructive",
                        })
                        return
                      }

                      setIsSavingSettings(true)
                      try {
                        const name = organizationName?.trim() || "My Organization"

                        // Ensure organization exists in Data Connect (satisfies phase_template FK)
                        let organizationId: string
                        if (orgIdFromHook) {
                          try {
                            const res = await getOrganization(dataConnect, { id: orgIdFromHook })
                            if (res.data.organization) {
                              organizationId = orgIdFromHook
                              await updateOrganization(dataConnect, {
                                id: organizationId,
                                name,
                                fiscalYearStartMonth: fiscalYearStart,
                              })
                            } else {
                              const created = await createOrganization(dataConnect, {
                                name,
                                fiscalYearStartMonth: fiscalYearStart,
                              })
                              organizationId = created.data.organization_insert.id
                            }
                          } catch {
                            const created = await createOrganization(dataConnect, {
                              name,
                              fiscalYearStartMonth: fiscalYearStart,
                            })
                            organizationId = created.data.organization_insert.id
                          }
                        } else {
                          const created = await createOrganization(dataConnect, {
                            name,
                            fiscalYearStartMonth: fiscalYearStart,
                          })
                          organizationId = created.data.organization_insert.id
                        }

                        // Get existing settings and merge with new organization settings
                        const userDoc = await getUserDocument(user.email)
                        const existingSettings = userDoc?.settings || {}
                        await createOrUpdateUserDocument(user.email, {
                          settings: {
                            ...existingSettings,
                            organization: {
                              ...existingSettings.organization,
                              organizationName: name,
                              organizationId,
                              fiscalYearStartMonth: fiscalYearStart,
                              logoUrl: logoUrl || undefined,
                            },
                          },
                        })

                        // Invalidate queries to refresh organization ID
                        queryClient.invalidateQueries({ queryKey: ["organization-id"] })
                        queryClient.invalidateQueries({ queryKey: ["user-settings"] })

                        toast({
                          title: "Settings saved",
                          description: "Organization settings have been updated.",
                        })
                      } catch (error: any) {
                        console.error("Error saving settings:", error)
                        toast({
                          title: "Error",
                          description: error.message || "Failed to save settings",
                          variant: "destructive",
                        })
                      } finally {
                        setIsSavingSettings(false)
                      }
                    }}
                    disabled={isSavingSettings || isLoadingSettings}
                  >
                    {isSavingSettings ? "Saving..." : "Save Settings"}
                  </Button>
                </CardContent>
              </Card>

              {/* Seed Data Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Seed Sample Data</CardTitle>
                  <CardDescription>
                    Create sample portfolios, programs, and projects for testing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    disabled={isSeeding}
                    onClick={async () => {
                      if (
                        !confirm(
                          "This will create sample portfolios, programs, and projects. Continue?"
                        )
                      ) {
                        return
                      }
                      const organizationId = orgIdFromHook || MOCK_ORGANIZATION_ID
                      setIsSeeding(true)
                      try {
                        const data = await runSeed(organizationId)
                        if (data.success) {
                          const created = data.summary.created
                          const errors = data.summary.errors
                          const createdCount =
                            created.templates + created.portfolios + created.programs + created.projects
                          const errorCount =
                            errors.templates + errors.portfolios + errors.programs + errors.projects
                          if (errorCount > 0) {
                            toast({
                              title: "Seeding completed with errors",
                              description: `Created ${createdCount} items. ${errorCount} errors occurred. Check console for details.`,
                              variant: "destructive",
                            })
                          } else {
                            toast({
                              title: "Sample data created",
                              description: `Created ${created.templates} templates, ${created.portfolios} portfolios, ${created.programs} programs, and ${created.projects} projects.`,
                            })
                          }
                          queryClient.invalidateQueries({ queryKey: ["projects"] })
                          queryClient.invalidateQueries({ queryKey: ["portfolios"] })
                          queryClient.invalidateQueries({ queryKey: ["programs"] })
                          queryClient.invalidateQueries({ queryKey: ["phase-templates"] })
                        } else {
                          throw new Error(data.error || "Failed to seed data")
                        }
                      } catch (error: unknown) {
                        const message = error instanceof Error ? error.message : "Failed to seed sample data"
                        toast({
                          title: "Error",
                          description: message,
                          variant: "destructive",
                        })
                      } finally {
                        setIsSeeding(false)
                      }
                    }}
                  >
                    <Database className="mr-2 h-4 w-4" />
                    {isSeeding ? "Seeding..." : "Seed Sample Data"}
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Creates 3 portfolios, 4 programs, and 5 projects with phases for testing.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Phase Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Phase Templates</CardTitle>
                      <CardDescription>
                        Manage NPI phase templates used for project creation
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleInitializeDefaults}
                        disabled={initializeDefaultsMutation.isPending}
                      >
                        {initializeDefaultsMutation.isPending
                          ? "Initializing..."
                          : "Initialize Defaults"}
                      </Button>
                      <Dialog
                        open={isCreateDialogOpen}
                        onOpenChange={(open) => {
                          setIsCreateDialogOpen(open)
                          if (!open) {
                            setEditingTemplate(null)
                            setFormData({ name: "", description: "", isDefault: false })
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setEditingTemplate(null)
                              setFormData({ name: "", description: "", isDefault: false })
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            New Template
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {editingTemplate ? "Edit Template" : "Create Template"}
                            </DialogTitle>
                            <DialogDescription>
                              {editingTemplate
                                ? "Update the phase template details"
                                : "Create a new phase template for your organization"}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Template Name *</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Standard NPI"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                  setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="Template description"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="isDefault"
                                checked={formData.isDefault}
                                onChange={(e) =>
                                  setFormData({ ...formData, isDefault: e.target.checked })
                                }
                                className="rounded border-gray-300"
                              />
                              <Label htmlFor="isDefault" className="cursor-pointer">
                                Mark as default template
                              </Label>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsCreateDialogOpen(false)
                                setEditingTemplate(null)
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSubmit}
                              disabled={
                                !formData.name.trim() ||
                                createMutation.isPending ||
                                updateMutation.isPending
                              }
                            >
                              {editingTemplate ? "Update" : "Create"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingTemplates ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : templates.length === 0 ? (
                    <EmptyState
                      title="No templates"
                      description="Create your first phase template or initialize default templates."
                      action={
                        <Button onClick={handleInitializeDefaults}>
                          Initialize Default Templates
                        </Button>
                      }
                    />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {templates.map((template) => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium">{template.name}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {template.description || "-"}
                            </TableCell>
                            <TableCell>
                              {template.isDefault ? (
                                <Badge>Default</Badge>
                              ) : (
                                <Badge variant="outline">Custom</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(template)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(template.id)}
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
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>

  )
}
