/**
 * Hook to get the current user's organization ID and name
 * Returns the organization ID (UUID) and name from user settings
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthStateWatcher } from "./use-auth"

export function useOrganizationId() {
  const { user } = useAuthStateWatcher()

  const { data, isLoading } = useQuery({
    queryKey: ["organization-id", user?.email],
    queryFn: async () => {
      if (!user?.email) return { organizationId: null, organizationName: null }

      try {
        const response = await fetch(`/api/settings?userEmail=${encodeURIComponent(user.email)}`)
        if (!response.ok) {
          return { organizationId: null, organizationName: null }
        }
        const data = await response.json()
        return {
          organizationId: data.settings?.organization?.organizationId || null,
          organizationName: data.settings?.organization?.organizationName || null,
        }
      } catch (error) {
        console.error("Error fetching organization ID:", error)
        return { organizationId: null, organizationName: null }
      }
    },
    enabled: !!user?.email,
  })

  return {
    organizationId: data?.organizationId || null,
    organizationName: data?.organizationName || null,
    isLoading
  }
}
