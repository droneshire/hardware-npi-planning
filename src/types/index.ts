// Re-export all type definitions
// Note: next-auth types are declared globally via module augmentation in next-auth.d.ts
// They don't need to be exported here

// Application-specific types
export type UserRole = "ADMIN" | "MANAGER" | "MEMBER" | "VIEWER"

export type ProjectStatus = "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED"

export type PhaseStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED"

export type CapacityStatus = "normal" | "warning" | "critical"

// Entity types (will be generated from Data Connect, these are placeholders)
export interface Organization {
  id: string
  name: string
  fiscalYearStartMonth: number
  createdAt: string
  updatedAt: string
}

export interface Portfolio {
  id: string
  organizationId: string
  name: string
  description?: string
  ownerId?: string
  createdAt: string
  updatedAt: string
}

export interface Program {
  id: string
  portfolioId: string
  name: string
  description?: string
  ownerId?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  programId: string
  productTypeId?: string
  name: string
  description?: string
  status: ProjectStatus
  startDate?: string
  targetCompletionDate?: string
  actualCompletionDate?: string
  ownerId?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectPhase {
  id: string
  projectId: string
  name: string
  description?: string
  status: PhaseStatus
  startDate?: string
  targetEndDate?: string
  actualEndDate?: string
  order: number
  percentComplete: number
  createdAt: string
  updatedAt: string
}

export interface ProjectAssignment {
  id: string
  projectId: string
  userId: string
  allocationPercent: number
  startDate: string
  endDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Team {
  id: string
  organizationId: string
  parentTeamId?: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  teamId: string
  userId: string
  role?: string
  createdAt: string
}

export interface User {
  id: string
  organizationId: string
  email: string
  name: string
  role: UserRole
  firebaseUid: string
  createdAt: string
  updatedAt: string
}
