"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"

export default function SettingsPage() {
  return (
    <AuthProtection>
      <AppLayout title="Settings" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Settings" }]}>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Settings page coming soon. This will contain application and user preferences.
        </p>
      </div>
    </AppLayout>
    </AuthProtection>
  )
}
