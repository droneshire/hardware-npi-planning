// This file is no longer used - we're using Firebase Auth directly via hooks/use-auth.ts
// Keeping this stub to prevent import errors from old code
// TODO: Remove this file once all NextAuth references are removed

import { AUTH_PAGES, AUTH_REDIRECTS } from "@/constants/auth"
import { ROUTE_PREFIXES, DEFAULT_REDIRECT } from "@/constants/routes"

// Stub config - not actually used
export const authConfig = {
  pages: {
    signIn: AUTH_PAGES.SIGNIN,
    signOut: AUTH_PAGES.SIGNOUT,
    error: AUTH_PAGES.ERROR,
  },
  callbacks: {
    authorized() {
      return true
    },
  },
  providers: [],
}
