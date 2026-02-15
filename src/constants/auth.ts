/**
 * Authentication-related constants
 * Centralized auth configuration and defaults
 */

import { ROUTES } from "./routes"

export const AUTH_PAGES = {
  SIGNIN: ROUTES.AUTH.SIGNIN,
  SIGNOUT: ROUTES.AUTH.SIGNOUT,
  ERROR: ROUTES.AUTH.ERROR,
} as const

export const AUTH_REDIRECTS = {
  AFTER_SIGNIN: ROUTES.DASHBOARD,
  AFTER_SIGNOUT: ROUTES.AUTH.SIGNIN,
} as const

// Admin users (can be moved to environment variables if needed)
export const ADMIN_USERS: string[] = import.meta.env.VITE_ADMIN_USERS?.split(",") || []
