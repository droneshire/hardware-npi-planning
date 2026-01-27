/**
 * User Service
 *
 * Handles all User CRUD operations using Firebase Data Connect.
 */

import { User } from "@/types"
import type { UserRole as AppUserRole } from "@/types"
import { dataConnect } from "@/lib/firebase"
import {
  listUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  UserRole,
} from "@firebasegen/default-connector"
import { validateRequired, validateEmail, validateNonEmptyString } from "@/lib/utils"

type UUID = string

interface CreateUserInput {
  organizationId: UUID
  email: string
  name: string
  role?: AppUserRole
  firebaseUid?: string // Optional for CSV imports - will be generated if not provided
}

interface UpdateUserInput {
  id: UUID
  name?: string
  role?: AppUserRole
}

/**
 * User Service class
 */
export class UserService {
  /**
   * List all users for an organization
   */
  async listUsers(organizationId: UUID): Promise<User[]> {
    const result = await listUsers(dataConnect, { organizationId })
    return result.data.users.map((u) => ({
      id: u.id,
      organizationId: organizationId, // organizationId is not in list query result, use parameter
      email: u.email,
      name: u.name,
      role: u.role as AppUserRole,
      firebaseUid: "", // Not returned in list query
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }))
  }

  /**
   * Get a single user by ID
   */
  async getUser(id: UUID): Promise<User | null> {
    const result = await getUser(dataConnect, { id })
    if (!result.data.user) {
      return null
    }

    const user = result.data.user
    return {
      id: user.id,
      organizationId: user.organizationId,
      email: user.email,
      name: user.name,
      role: user.role as AppUserRole,
      firebaseUid: user.firebaseUid || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const result = await getUserByEmail(dataConnect, { email })
    if (result.data.users.length === 0) {
      return null
    }

    const user = result.data.users[0]
    return {
      id: user.id,
      organizationId: user.organizationId,
      email: user.email,
      name: user.name,
      role: user.role as AppUserRole,
      firebaseUid: user.firebaseUid || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  /**
   * Create a new user
   */
  async createUser(input: CreateUserInput): Promise<User> {
    // Validate input
    validateRequired(input.email, "Email")
    validateRequired(input.name, "Name")
    validateRequired(input.organizationId, "Organization ID")
    validateEmail(input.email)

    // Generate a temporary Firebase UID if not provided
    // In production, this would be created via Firebase Auth first
    const firebaseUid =
      input.firebaseUid || `temp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

    const roleValue: UserRole | null | undefined = input.role ? (input.role as UserRole) : UserRole.MEMBER
    const result = await createUser(dataConnect, {
      organizationId: input.organizationId,
      email: input.email,
      name: input.name,
      role: roleValue,
      firebaseUid,
    })

    const user = result.data.user_insert
    // user_insert only returns User_Key (id), so we need to fetch the full user
    const createdUser = await this.getUser(user.id)
    if (!createdUser) {
      throw new Error("Failed to fetch created user")
    }
    return createdUser
  }

  /**
   * Update an existing user
   */
  async updateUser(input: UpdateUserInput): Promise<User> {
    // Validate input
    validateRequired(input.id, "User ID")
    validateNonEmptyString(input.name, "Name")

    const roleValue: UserRole | null | undefined = input.role ? (input.role as UserRole) : null
    await updateUser(dataConnect, {
      id: input.id,
      name: input.name ?? null,
      role: roleValue,
    })

    // Fetch the updated user
    const updated = await this.getUser(input.id)
    if (!updated) {
      throw new Error("Failed to fetch updated user")
    }

    return updated
  }

  /**
   * Delete a user
   *
   * WARNING: This will delete all assignments and team memberships for the user.
   */
  async deleteUser(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("User ID is required")
    }

    await deleteUser(dataConnect, { id })
  }

  /**
   * Validate email uniqueness
   */
  async isEmailAvailable(email: string, excludeId?: UUID): Promise<boolean> {
    const existing = await this.getUserByEmail(email)
    return !existing || existing.id === excludeId
  }

  /**
   * Bulk create users from CSV data
   */
  async bulkCreateUsers(
    organizationId: UUID,
    users: Array<{ email: string; name: string; role?: AppUserRole }>
  ): Promise<{ created: User[]; errors: Array<{ email: string; error: string }> }> {
    const created: User[] = []
    const errors: Array<{ email: string; error: string }> = []

    for (const userData of users) {
      try {
        // Check if user already exists
        const existing = await this.getUserByEmail(userData.email)
        if (existing) {
          errors.push({
            email: userData.email,
            error: "User with this email already exists",
          })
          continue
        }

        const user = await this.createUser({
          organizationId,
          email: userData.email,
          name: userData.name,
          role: userData.role || ("MEMBER" as AppUserRole),
        })
        created.push(user)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create user"
        errors.push({
          email: userData.email,
          error: errorMessage,
        })
      }
    }

    return { created, errors }
  }
}

// Export singleton instance
export const userService = new UserService()
