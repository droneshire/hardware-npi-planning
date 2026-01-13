import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Breadcrumbs, BreadcrumbItem } from "./breadcrumbs"

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
}

export function AppLayout({ children, title, breadcrumbs, actions }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} actions={actions} />

        <main className="flex-1 overflow-y-auto">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="border-b bg-background px-6 py-3">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}

          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
