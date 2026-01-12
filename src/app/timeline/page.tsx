import { AppLayout } from "@/components/layout/app-layout"

export default function TimelinePage() {
  return (
    <AppLayout
      title="Timeline"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Timeline" },
      ]}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Timeline view coming soon. This will show project timelines in a Gantt chart format.
        </p>
      </div>
    </AppLayout>
  )
}
