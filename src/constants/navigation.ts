/**
 * Navigation menu configuration
 * Centralized navigation items for sidebar and menus
 */

import { LayoutDashboard, FolderKanban, Users, Calendar, Settings } from "lucide-react"
import { ROUTES } from "./routes"

export interface NavigationItem {
  name: string
  href: string
  icon: typeof LayoutDashboard
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: "Timeline", href: ROUTES.TIMELINE, icon: Calendar },
  { name: "Projects", href: ROUTES.PROJECTS, icon: FolderKanban },
  { name: "Resources", href: ROUTES.RESOURCES, icon: Users },
  { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
] as const
