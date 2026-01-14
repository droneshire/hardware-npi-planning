"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { AuthProtection } from "@/components/auth-protection"

export default function TimelinePage() {
  return (
    <AuthProtection>
      <AppLayout title="Timeline" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Timeline" }]}>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Timeline view coming soon. This will show project timelines in a Gantt chart format.
        </p>
      </div>
    </AppLayout>
    </AuthProtection>
  )
}
