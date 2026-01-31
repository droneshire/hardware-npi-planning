"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
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
        "relative flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />

      {/* Header */}
      <div className="relative flex h-16 items-center justify-between px-4">
        {!collapsed ? (
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2.5 group">
            {logoUrl ? (
              <>
                <Image
                  src={logoUrl}
                  alt="Company Logo"
                  width={32}
                  height={32}
                  className="rounded-lg object-contain"
                  unoptimized
                />
                <span className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                  NPI Planning
                </span>
              </>
            ) : (
              <>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <span className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                  NPI Planning
                </span>
              </>
            )}
          </Link>
        ) : (
          <Link href={ROUTES.DASHBOARD} className="mx-auto flex items-center justify-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Company Logo"
                width={32}
                height={32}
                className="rounded-lg object-contain"
                unoptimized
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Cpu className="h-4 w-4 text-white" />
              </div>
            )}
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-7 w-7 text-muted-foreground hover:text-foreground transition-all",
            collapsed && "mx-auto"
          )}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
        </Button>
      </div>

      <div className="mx-3 h-px bg-border/50" />

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-2 pt-3">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href as any}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                collapsed && "justify-center px-2"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-lg gradient-primary opacity-90" />
              )}
              {isActive && (
                <div className="absolute inset-0 rounded-lg glow-primary opacity-40" />
              )}

              <item.icon className={cn(
                "relative z-10 h-[18px] w-[18px] flex-shrink-0 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />

              {!collapsed && (
                <span className="relative z-10">{item.name}</span>
              )}

              {collapsed && (
                <div className="absolute left-full ml-2 hidden rounded-md bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-lg group-hover:block z-50 border border-border/50">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="relative p-3">
        <div className="mx-1 mb-2 h-px bg-border/50" />
        {!collapsed && (
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">HW NPI Planning</p>
            <p className="text-[10px] text-muted-foreground/60">v0.1.0</p>
          </div>
        )}
      </div>
    </div>
  )
}
