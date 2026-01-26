// Firestore user types
// User document key is the login email

export interface UserSettings {
  notifications?: {
    email?: {
      email?: string
      updatesEnabled?: boolean
    }
  }
  organization?: {
    organizationName?: string // User-friendly organization name
    organizationId?: string // UUID used as the key in the database
    fiscalYearStartMonth?: number // 1-12, where 1 = January
    logoUrl?: string // URL to company logo
  }
  // Add other user settings as needed
}

export interface UserDocument {
  email: string
  settings?: UserSettings
  createdAt?: string
  updatedAt?: string
  // Add other user fields as needed
}

export interface AdminDocument {
  // Add admin-specific fields as needed
  createdAt?: string
  updatedAt?: string
}
