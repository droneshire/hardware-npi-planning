import { AppLayout } from "@/components/layout/app-layout"

export default function ResourcesPage() {
  return (
    <AppLayout
      title="Resources"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources" },
      ]}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Resources view coming soon. This will show team members, capacity, and resource allocation.
        </p>
      </div>
    </AppLayout>
  )
}
