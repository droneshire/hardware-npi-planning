"use client"

import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Breadcrumbs, BreadcrumbItem } from "./breadcrumbs"
import { OrganizationIdDialog } from "@/components/setup/organization-id-dialog"
import { useAuthStateWatcher } from "@/hooks/use-auth"
import { useOrganizationId } from "@/hooks/use-organization-id"

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
}

export function AppLayout({ children, title, breadcrumbs, actions }: AppLayoutProps) {
  const { user } = useAuthStateWatcher()
  const { organizationName, isLoading: isLoadingOrgId } = useOrganizationId()
  const [showOrgIdDialog, setShowOrgIdDialog] = useState(false)
  const [hasCheckedOrg, setHasCheckedOrg] = useState(false)
  const queryClient = useQueryClient()

  // Show dialog if user is logged in but has no organization name
  // Only check once after loading is complete
  useEffect(() => {
    if (user && !isLoadingOrgId && !hasCheckedOrg) {
      setHasCheckedOrg(true)
      if (!organizationName) {
        setShowOrgIdDialog(true)
      }
    }
  }, [user, isLoadingOrgId, organizationName, hasCheckedOrg])

  // Reset check when user changes
  useEffect(() => {
    if (!user) {
      setHasCheckedOrg(false)
      setShowOrgIdDialog(false)
    }
  }, [user])

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title={title} actions={actions} />

          <main className="flex-1 overflow-y-auto">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="border-b border-border/50 bg-background/50 px-6 py-3">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}

            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>

      {user?.email && (
        <OrganizationIdDialog
          open={showOrgIdDialog}
          onOpenChange={setShowOrgIdDialog}
          userEmail={user.email}
          currentOrganizationName={organizationName || undefined}
          onSuccess={() => {
            // Invalidate queries to refresh organization data
            queryClient.invalidateQueries({ queryKey: ["organization-id"] })
            queryClient.invalidateQueries({ queryKey: ["organization-name"] })
            queryClient.invalidateQueries({ queryKey: ["user-settings"] })
            // Close the dialog and mark as checked so it doesn't show again
            setShowOrgIdDialog(false)
            setHasCheckedOrg(true)
          }}
        />
      )}
    </>
  )
}
