"use client"

import { User, LogOut, Settings, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout, useAuthStateWatcher } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { AUTH_REDIRECTS } from "@/constants/auth"
import { ROUTES } from "@/constants/routes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface HeaderProps {
  title?: string
  actions?: React.ReactNode
}

export function Header({ title, actions }: HeaderProps) {
  const router = useRouter()
  const { user } = useAuthStateWatcher()

  const handleSignOut = () => {
    logout()
    router.push(AUTH_REDIRECTS.AFTER_SIGNOUT)
  }

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "U"

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
      <div className="flex items-center gap-4">
        {title && (
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}

        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full border border-border/50 bg-muted/50 hover:bg-accent/50">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium">{initials}</span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.displayName || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={ROUTES.SETTINGS}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
