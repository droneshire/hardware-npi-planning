// Firestore user types
// User document key is the login email

export interface UserSettings {
  notifications?: {
    email?: {
      email?: string
      updatesEnabled?: boolean
    }
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
