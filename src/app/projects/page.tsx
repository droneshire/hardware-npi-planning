import { AppLayout } from "@/components/layout/app-layout"

export default function ProjectsPage() {
  return (
    <AppLayout
      title="Projects"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects" },
      ]}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Projects view coming soon. This will show all projects across portfolios and programs.
        </p>
      </div>
    </AppLayout>
  )
}
