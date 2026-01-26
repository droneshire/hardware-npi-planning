"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { NAVIGATION_ITEMS } from "@/constants/navigation"
import { ROUTES } from "@/constants/routes"
import { useAuthStateWatcher } from "@/hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuthStateWatcher()

  // Fetch logo URL
  const { data: logoUrl } = useQuery({
    queryKey: ["company-logo", user?.email],
    queryFn: async () => {
      if (!user?.email) return null
      try {
        const response = await fetch(`/api/logo?userEmail=${encodeURIComponent(user.email)}`)
        const data = await response.json()
        return data.logoUrl || null
      } catch (error) {
        console.error("Error fetching logo:", error)
        return null
      }
    },
    enabled: !!user?.email,
  })

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed ? (
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
            {logoUrl ? (
              <div className="flex items-center gap-2">
                <Image
                  src={logoUrl}
                  alt="Company Logo"
                  width={32}
                  height={32}
                  className="rounded object-contain"
                  unoptimized
                />
                <span className="text-lg font-semibold">NPI Planning</span>
              </div>
            ) : (
              <span className="text-lg font-semibold">NPI Planning</span>
            )}
          </Link>
        ) : (
          logoUrl && (
            <Link href={ROUTES.DASHBOARD} className="flex items-center justify-center">
              <Image
                src={logoUrl}
                alt="Company Logo"
                width={32}
                height={32}
                className="rounded object-contain"
                unoptimized
              />
            </Link>
          )
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
