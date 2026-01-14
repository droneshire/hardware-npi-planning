/**
 * Application route constants
 * Centralized route definitions for consistency across the application
 */

export const ROUTES = {
  // Public routes
  HOME: "/",

  // Auth routes
  AUTH: {
    BASE: "/auth",
    SIGNIN: "/auth/signin",
    SIGNOUT: "/auth/signout",
    ERROR: "/auth/error",
  },

  // Protected routes
  DASHBOARD: "/dashboard",
  TIMELINE: "/timeline",
  PROJECTS: "/projects",
  RESOURCES: "/resources",
  SETTINGS: "/settings",

  // Dynamic routes
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  PROJECT_RESOURCES: (id: string) => `/projects/${id}/resources`,
  PERSON_DETAIL: (id: string) => `/resources/people/${id}`,
} as const

// Default redirect routes
export const DEFAULT_REDIRECT = ROUTES.DASHBOARD
export const DEFAULT_SIGNIN_REDIRECT = ROUTES.DASHBOARD

// Route prefixes for path matching
export const ROUTE_PREFIXES = {
  DASHBOARD: "/dashboard",
  AUTH: "/auth",
  PROJECTS: "/projects",
  RESOURCES: "/resources",
} as const
