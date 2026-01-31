"use client"

import { useState, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ClipboardList,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ListChecks,
  Wrench,
  Package,
  Cpu,
  ArrowRight,
  Loader2,
  GripVertical,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuthStateWatcher } from "@/hooks/use-auth"
import { getFirebaseIdToken } from "@/lib/firebase"
import Link from "next/link"

// Build instruction types
interface BuildInstruction {
  id: string
  title: string
  description: string
  phase: string
  category: InstructionCategory
  priority: InstructionPriority
  status: InstructionStatus
  steps: InstructionStep[]
  createdAt: string
  updatedAt: string
  assignedTo?: string
  estimatedDuration?: string
  tags: string[]
}

interface InstructionStep {
  id: string
  order: number
  title: string
  description: string
  completed: boolean
}

type InstructionCategory = "ASSEMBLY" | "TESTING" | "QUALITY" | "PACKAGING" | "DOCUMENTATION" | "TOOLING"
type InstructionPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
type InstructionStatus = "DRAFT" | "ACTIVE" | "COMPLETED" | "ARCHIVED"

const CATEGORY_CONFIG: Record<InstructionCategory, { label: string; icon: typeof Wrench; color: string }> = {
  ASSEMBLY: { label: "Assembly", icon: Wrench, color: "text-blue-400" },
  TESTING: { label: "Testing", icon: CheckCircle2, color: "text-green-400" },
  QUALITY: { label: "Quality", icon: AlertCircle, color: "text-yellow-400" },
  PACKAGING: { label: "Packaging", icon: Package, color: "text-purple-400" },
  DOCUMENTATION: { label: "Documentation", icon: FileText, color: "text-cyan-400" },
  TOOLING: { label: "Tooling", icon: Cpu, color: "text-orange-400" },
}

const PRIORITY_CONFIG: Record<InstructionPriority, { label: string; className: string }> = {
  LOW: { label: "Low", className: "border-muted-foreground/30 text-muted-foreground" },
  MEDIUM: { label: "Medium", className: "border-blue-500/30 text-blue-400" },
  HIGH: { label: "High", className: "border-yellow-500/30 text-yellow-400" },
  CRITICAL: { label: "Critical", className: "border-red-500/30 text-red-400" },
}

const STATUS_CONFIG: Record<InstructionStatus, { label: string; className: string }> = {
  DRAFT: { label: "Draft", className: "bg-muted text-muted-foreground" },
  ACTIVE: { label: "Active", className: "bg-primary/20 text-primary" },
  COMPLETED: { label: "Completed", className: "bg-green-500/20 text-green-400" },
  ARCHIVED: { label: "Archived", className: "bg-muted text-muted-foreground/60" },
}

const PHASES = ["EVT", "DVT", "PVT", "MP", "Pre-Production", "Mass Production"]

// Default template instructions
const DEFAULT_INSTRUCTIONS: BuildInstruction[] = [
  {
    id: "1",
    title: "PCB Assembly Process",
    description: "Standard operating procedure for PCB assembly including SMT placement, reflow soldering, and through-hole component insertion.",
    phase: "EVT",
    category: "ASSEMBLY",
    priority: "HIGH",
    status: "ACTIVE",
    steps: [
      { id: "1-1", order: 1, title: "Solder paste application", description: "Apply solder paste to PCB pads using stencil printer", completed: false },
      { id: "1-2", order: 2, title: "SMT component placement", description: "Place surface-mount components using pick-and-place machine", completed: false },
      { id: "1-3", order: 3, title: "Reflow soldering", description: "Run PCB through reflow oven with specified temperature profile", completed: false },
      { id: "1-4", order: 4, title: "Through-hole insertion", description: "Insert and solder through-hole components manually or via wave solder", completed: false },
      { id: "1-5", order: 5, title: "Visual inspection", description: "Inspect all solder joints and component placements", completed: false },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    estimatedDuration: "4 hours",
    tags: ["PCB", "SMT", "soldering"],
  },
  {
    id: "2",
    title: "Functional Test Procedure",
    description: "Complete functional testing protocol for verifying all hardware subsystems and interfaces operate within specification.",
    phase: "DVT",
    category: "TESTING",
    priority: "CRITICAL",
    status: "ACTIVE",
    steps: [
      { id: "2-1", order: 1, title: "Power supply verification", description: "Verify all voltage rails within spec (3.3V, 5V, 12V)", completed: false },
      { id: "2-2", order: 2, title: "Communication interface test", description: "Test USB, UART, SPI, and I2C interfaces", completed: false },
      { id: "2-3", order: 3, title: "Sensor calibration", description: "Calibrate all onboard sensors against reference standards", completed: false },
      { id: "2-4", order: 4, title: "Stress test", description: "Run 24-hour burn-in test at elevated temperature", completed: false },
    ],
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-02-01T11:00:00Z",
    estimatedDuration: "8 hours",
    tags: ["testing", "validation", "burn-in"],
  },
  {
    id: "3",
    title: "Enclosure Assembly",
    description: "Step-by-step procedure for mechanical enclosure assembly including gasket installation, fastener torque specs, and cosmetic inspection.",
    phase: "PVT",
    category: "ASSEMBLY",
    priority: "MEDIUM",
    status: "DRAFT",
    steps: [
      { id: "3-1", order: 1, title: "Clean enclosure parts", description: "IPA wipe all internal surfaces", completed: false },
      { id: "3-2", order: 2, title: "Install gaskets", description: "Apply gaskets to mating surfaces per drawing", completed: false },
      { id: "3-3", order: 3, title: "Insert PCB assembly", description: "Mount PCB with standoffs, torque to 0.5 Nm", completed: false },
      { id: "3-4", order: 4, title: "Close enclosure", description: "Install top cover, torque all fasteners to 1.2 Nm in star pattern", completed: false },
      { id: "3-5", order: 5, title: "Label application", description: "Apply product label, serial number, and regulatory marks", completed: false },
    ],
    createdAt: "2024-02-05T08:00:00Z",
    updatedAt: "2024-02-05T08:00:00Z",
    estimatedDuration: "2 hours",
    tags: ["mechanical", "enclosure", "assembly"],
  },
  {
    id: "4",
    title: "Incoming Quality Inspection",
    description: "Quality control inspection checklist for incoming components and raw materials before they enter the production line.",
    phase: "MP",
    category: "QUALITY",
    priority: "HIGH",
    status: "ACTIVE",
    steps: [
      { id: "4-1", order: 1, title: "Visual inspection", description: "Check packaging integrity and component condition", completed: false },
      { id: "4-2", order: 2, title: "Dimensional verification", description: "Measure critical dimensions per incoming spec", completed: false },
      { id: "4-3", order: 3, title: "Sample electrical test", description: "Test sample batch for electrical characteristics", completed: false },
    ],
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-02-15T16:00:00Z",
    estimatedDuration: "1 hour",
    tags: ["IQC", "quality", "inspection"],
  },
  {
    id: "5",
    title: "Final Packaging & Shipping",
    description: "Packaging instructions for finished goods including ESD protection, accessories inclusion, and shipping label generation.",
    phase: "MP",
    category: "PACKAGING",
    priority: "MEDIUM",
    status: "DRAFT",
    steps: [
      { id: "5-1", order: 1, title: "ESD bag insertion", description: "Place unit in ESD-safe bag and seal", completed: false },
      { id: "5-2", order: 2, title: "Accessory kit", description: "Include power adapter, cables, and quick start guide", completed: false },
      { id: "5-3", order: 3, title: "Box and cushion", description: "Place in retail box with foam inserts", completed: false },
      { id: "5-4", order: 4, title: "Seal and label", description: "Seal box and apply shipping label", completed: false },
    ],
    createdAt: "2024-02-20T14:00:00Z",
    updatedAt: "2024-02-20T14:00:00Z",
    estimatedDuration: "30 minutes",
    tags: ["packaging", "shipping", "ESD"],
  },
  {
    id: "6",
    title: "Test Fixture Setup",
    description: "Instructions for setting up and calibrating the production test fixture including pogo pin alignment and software configuration.",
    phase: "DVT",
    category: "TOOLING",
    priority: "HIGH",
    status: "ACTIVE",
    steps: [
      { id: "6-1", order: 1, title: "Mount fixture base", description: "Secure test fixture to bench with clamps", completed: false },
      { id: "6-2", order: 2, title: "Align pogo pins", description: "Verify pogo pin alignment with test points on DUT", completed: false },
      { id: "6-3", order: 3, title: "Connect interfaces", description: "Connect power supply, JTAG, and data cables", completed: false },
      { id: "6-4", order: 4, title: "Run self-test", description: "Execute fixture self-test routine to verify connectivity", completed: false },
      { id: "6-5", order: 5, title: "Calibration check", description: "Run calibration against golden unit", completed: false },
    ],
    createdAt: "2024-01-25T11:00:00Z",
    updatedAt: "2024-02-08T09:00:00Z",
    estimatedDuration: "3 hours",
    tags: ["fixture", "tooling", "calibration"],
  },
]

export default function InstructionsPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { user } = useAuthStateWatcher()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<InstructionCategory | "ALL">("ALL")
  const [statusFilter, setStatusFilter] = useState<InstructionStatus | "ALL">("ALL")
  const [phaseFilter, setPhaseFilter] = useState<string>("ALL")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingInstruction, setEditingInstruction] = useState<BuildInstruction | null>(null)
  const [expandedInstruction, setExpandedInstruction] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phase: "EVT",
    category: "ASSEMBLY" as InstructionCategory,
    priority: "MEDIUM" as InstructionPriority,
    status: "DRAFT" as InstructionStatus,
    estimatedDuration: "",
    tags: "",
    steps: [{ title: "", description: "" }],
  })

  // Fetch instructions from Firestore
  const { data: instructions = DEFAULT_INSTRUCTIONS, isLoading } = useQuery({
    queryKey: ["build-instructions", user?.email],
    queryFn: async () => {
      if (!user?.email) return DEFAULT_INSTRUCTIONS
      try {
        const idToken = await getFirebaseIdToken()
        const headers: HeadersInit = {}
        if (idToken) {
          headers.Authorization = `Bearer ${idToken}`
        }
        const response = await fetch(
          `/api/settings?userEmail=${encodeURIComponent(user.email)}`,
          { headers }
        )
        if (!response.ok) return DEFAULT_INSTRUCTIONS
        const data = await response.json()
        const saved = data.settings?.buildInstructions
        if (saved && Array.isArray(saved) && saved.length > 0) {
          return saved as BuildInstruction[]
        }
        return DEFAULT_INSTRUCTIONS
      } catch {
        return DEFAULT_INSTRUCTIONS
      }
    },
    enabled: !!user?.email,
  })

  // Save instructions mutation
  const saveMutation = useMutation({
    mutationFn: async (updatedInstructions: BuildInstruction[]) => {
      if (!user?.email) throw new Error("Not authenticated")
      const idToken = await getFirebaseIdToken()
      const headers: HeadersInit = { "Content-Type": "application/json" }
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`
      }
      const response = await fetch("/api/settings", {
        method: "POST",
        headers,
        body: JSON.stringify({
          userEmail: user.email,
          settings: { buildInstructions: updatedInstructions },
        }),
      })
      if (!response.ok) throw new Error("Failed to save instructions")
      return updatedInstructions
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["build-instructions"] })
    },
  })

  const filteredInstructions = useMemo(() => {
    return instructions.filter((instruction) => {
      const matchesSearch =
        instruction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instruction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instruction.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = categoryFilter === "ALL" || instruction.category === categoryFilter
      const matchesStatus = statusFilter === "ALL" || instruction.status === statusFilter
      const matchesPhase = phaseFilter === "ALL" || instruction.phase === phaseFilter
      return matchesSearch && matchesCategory && matchesStatus && matchesPhase
    })
  }, [instructions, searchQuery, categoryFilter, statusFilter, phaseFilter])

  const stats = useMemo(() => {
    return {
      total: instructions.length,
      active: instructions.filter((i) => i.status === "ACTIVE").length,
      draft: instructions.filter((i) => i.status === "DRAFT").length,
      completed: instructions.filter((i) => i.status === "COMPLETED").length,
    }
  }, [instructions])

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      phase: "EVT",
      category: "ASSEMBLY",
      priority: "MEDIUM",
      status: "DRAFT",
      estimatedDuration: "",
      tags: "",
      steps: [{ title: "", description: "" }],
    })
  }

  const handleCreate = () => {
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" })
      return
    }

    const newInstruction: BuildInstruction = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      phase: formData.phase,
      category: formData.category,
      priority: formData.priority,
      status: formData.status,
      steps: formData.steps
        .filter((s) => s.title.trim())
        .map((s, i) => ({
          id: crypto.randomUUID(),
          order: i + 1,
          title: s.title,
          description: s.description,
          completed: false,
        })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDuration: formData.estimatedDuration || undefined,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }

    const updated = editingInstruction
      ? instructions.map((i) => (i.id === editingInstruction.id ? { ...newInstruction, id: editingInstruction.id, createdAt: editingInstruction.createdAt } : i))
      : [...instructions, newInstruction]

    saveMutation.mutate(updated, {
      onSuccess: () => {
        toast({
          title: editingInstruction ? "Instruction updated" : "Instruction created",
          description: `"${formData.title}" has been ${editingInstruction ? "updated" : "created"} successfully.`,
        })
        setIsCreateOpen(false)
        setEditingInstruction(null)
        resetForm()
      },
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this instruction?")) return
    const updated = instructions.filter((i) => i.id !== id)
    saveMutation.mutate(updated, {
      onSuccess: () => {
        toast({ title: "Instruction deleted", description: "The instruction has been removed." })
      },
    })
  }

  const handleEdit = (instruction: BuildInstruction) => {
    setEditingInstruction(instruction)
    setFormData({
      title: instruction.title,
      description: instruction.description,
      phase: instruction.phase,
      category: instruction.category,
      priority: instruction.priority,
      status: instruction.status,
      estimatedDuration: instruction.estimatedDuration || "",
      tags: instruction.tags.join(", "),
      steps: instruction.steps.map((s) => ({ title: s.title, description: s.description })),
    })
    setIsCreateOpen(true)
  }

  const handleToggleStep = (instructionId: string, stepId: string) => {
    const updated = instructions.map((instruction) => {
      if (instruction.id !== instructionId) return instruction
      return {
        ...instruction,
        updatedAt: new Date().toISOString(),
        steps: instruction.steps.map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        ),
      }
    })
    saveMutation.mutate(updated)
  }

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: "", description: "" }],
    })
  }

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    })
  }

  return (
    <AuthProtection>
      <AppLayout
        title="Build Instructions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Build Instructions" }]}
        actions={
          <Button
            onClick={() => {
              setEditingInstruction(null)
              resetForm()
              setIsCreateOpen(true)
            }}
            className="gap-2 gradient-primary text-white"
          >
            <Plus className="h-4 w-4" />
            New Instruction
          </Button>
        }
      >
        <div className="space-y-6 animate-fade-in">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Instructions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Edit className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.draft}</p>
                  <p className="text-xs text-muted-foreground">Drafts</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search instructions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-input/50 border-border/50"
                    />
                  </div>
                </div>
                <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                  <SelectTrigger className="w-[140px] bg-input/50 border-border/50">
                    <SelectValue placeholder="Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Phases</SelectItem>
                    {PHASES.map((phase) => (
                      <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as InstructionCategory | "ALL")}>
                  <SelectTrigger className="w-[160px] bg-input/50 border-border/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Categories</SelectItem>
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as InstructionStatus | "ALL")}>
                  <SelectTrigger className="w-[140px] bg-input/50 border-border/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Instructions List */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-3 w-[400px]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredInstructions.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="py-12">
                  <EmptyState
                    title="No instructions found"
                    description={searchQuery || categoryFilter !== "ALL" || statusFilter !== "ALL" || phaseFilter !== "ALL"
                      ? "Try adjusting your filters"
                      : "Create your first build instruction to get started"
                    }
                    action={
                      !searchQuery && categoryFilter === "ALL" ? (
                        <Button
                          onClick={() => {
                            resetForm()
                            setIsCreateOpen(true)
                          }}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Create Instruction
                        </Button>
                      ) : null
                    }
                  />
                </CardContent>
              </Card>
            ) : (
              filteredInstructions.map((instruction) => {
                const catConfig = CATEGORY_CONFIG[instruction.category]
                const CatIcon = catConfig.icon
                const priorityConfig = PRIORITY_CONFIG[instruction.priority]
                const statusConfig = STATUS_CONFIG[instruction.status]
                const isExpanded = expandedInstruction === instruction.id
                const completedSteps = instruction.steps.filter((s) => s.completed).length
                const totalSteps = instruction.steps.length
                const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

                return (
                  <Card
                    key={instruction.id}
                    className="group border-border/50 transition-all duration-200 hover:border-border"
                  >
                    <CardContent className="p-0">
                      {/* Main row */}
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer"
                        onClick={() => setExpandedInstruction(isExpanded ? null : instruction.id)}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50`}>
                          <CatIcon className={`h-5 w-5 ${catConfig.color}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold truncate">{instruction.title}</h3>
                            <Badge variant="outline" className={`text-[10px] shrink-0 ${statusConfig.className}`}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{instruction.description}</p>
                        </div>

                        <div className="hidden md:flex items-center gap-3 shrink-0">
                          <Badge variant="outline" className="text-[10px]">{instruction.phase}</Badge>
                          <Badge variant="outline" className={`text-[10px] ${priorityConfig.className}`}>
                            {priorityConfig.label}
                          </Badge>
                          {totalSteps > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <ListChecks className="h-3.5 w-3.5" />
                              <span>{completedSteps}/{totalSteps}</span>
                            </div>
                          )}
                          {instruction.estimatedDuration && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {instruction.estimatedDuration}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(instruction)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(instruction.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                        </div>
                      </div>

                      {/* Expanded steps */}
                      {isExpanded && (
                        <div className="border-t border-border/50 bg-muted/20 px-4 py-3 animate-fade-in">
                          {/* Progress bar */}
                          {totalSteps > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-medium text-muted-foreground">Progress</span>
                                <span className="text-xs font-medium">{progress}%</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-muted">
                                <div
                                  className="h-1.5 rounded-full gradient-primary transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Steps */}
                          <div className="space-y-1.5">
                            {instruction.steps.map((step) => (
                              <div
                                key={step.id}
                                className="flex items-start gap-3 rounded-md px-2 py-2 hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleToggleStep(instruction.id, step.id)
                                }}
                              >
                                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  step.completed
                                    ? "border-green-500 bg-green-500/20"
                                    : "border-border/50"
                                }`}>
                                  {step.completed && <CheckCircle2 className="h-3 w-3 text-green-400" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${step.completed ? "line-through text-muted-foreground" : ""}`}>
                                    {step.order}. {step.title}
                                  </p>
                                  {step.description && (
                                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          {instruction.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                              {instruction.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        {/* Create/Edit Dialog */}
        <Dialog
          open={isCreateOpen}
          onOpenChange={(open) => {
            setIsCreateOpen(open)
            if (!open) {
              setEditingInstruction(null)
              resetForm()
            }
          }}
        >
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto glass-card">
            <DialogHeader>
              <DialogTitle>{editingInstruction ? "Edit Instruction" : "New Build Instruction"}</DialogTitle>
              <DialogDescription>
                {editingInstruction
                  ? "Update the build instruction details and steps"
                  : "Create a new build instruction for your NPI process"
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., PCB Assembly Process"
                  className="bg-input/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the instruction..."
                  className="flex min-h-[80px] w-full rounded-lg border border-border/50 bg-input/50 px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Phase</Label>
                  <Select value={formData.phase} onValueChange={(v) => setFormData({ ...formData, phase: v })}>
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PHASES.map((phase) => (
                        <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v as InstructionCategory })}
                  >
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(v) => setFormData({ ...formData, priority: v as InstructionPriority })}
                  >
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => setFormData({ ...formData, status: v as InstructionStatus })}
                  >
                    <SelectTrigger className="bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Estimated Duration</Label>
                  <Input
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                    placeholder="e.g., 4 hours"
                    className="bg-input/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g., PCB, SMT, soldering"
                    className="bg-input/50 border-border/50"
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Steps</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addStep} className="h-7 text-xs gap-1">
                    <Plus className="h-3 w-3" /> Add Step
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2 rounded-lg bg-muted/30 p-3">
                      <span className="mt-2 text-xs font-bold text-muted-foreground w-5 shrink-0">
                        {index + 1}.
                      </span>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...formData.steps]
                            newSteps[index].title = e.target.value
                            setFormData({ ...formData, steps: newSteps })
                          }}
                          placeholder="Step title"
                          className="bg-input/50 border-border/50 h-8 text-sm"
                        />
                        <Input
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...formData.steps]
                            newSteps[index].description = e.target.value
                            setFormData({ ...formData, steps: newSteps })
                          }}
                          placeholder="Step description (optional)"
                          className="bg-input/50 border-border/50 h-8 text-sm"
                        />
                      </div>
                      {formData.steps.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(index)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive mt-0.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false)
                  setEditingInstruction(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!formData.title.trim() || saveMutation.isPending}
                className="gap-2 gradient-primary text-white"
              >
                {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingInstruction ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AppLayout>
    </AuthProtection>
  )
}
