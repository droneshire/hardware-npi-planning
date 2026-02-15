/**
 * Hook to get the current user's organization ID and name
 * Returns the organization ID (UUID) and name from user settings.
 * Only returns organizationId if it is a valid UUID (Data Connect requires UUID).
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthStateWatcher } from "./use-auth"

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isValidUUID(value: string | null | undefined): boolean {
  return typeof value === "string" && UUID_REGEX.test(value)
}

export function useOrganizationId() {
  const { user } = useAuthStateWatcher()

  const { data, isLoading } = useQuery({
    queryKey: ["organization-id", user?.email],
    queryFn: async () => {
      if (!user?.email) return { organizationId: null, organizationName: null }

      try {
        const { getUserDocument } = await import("./use-firestore")
        const userDoc = await getUserDocument(user.email)
        const rawId = userDoc?.settings?.organization?.organizationId || null
        const organizationName = userDoc?.settings?.organization?.organizationName || null
        return {
          organizationId: isValidUUID(rawId) ? rawId : null,
          organizationName,
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
    isLoading,
  }
}
