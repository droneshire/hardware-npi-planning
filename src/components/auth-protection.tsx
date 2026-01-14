"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStateWatcher } from "@/hooks/use-auth"
import { ROUTES, DEFAULT_REDIRECT } from "@/constants/routes"

interface AuthProtectionProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthProtection({
  children,
  requireAuth = true,
  redirectTo = ROUTES.AUTH.SIGNIN,
}: AuthProtectionProps) {
  const { user, isLoading } = useAuthStateWatcher()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push(redirectTo as any)
      } else if (!requireAuth && user) {
        router.push(DEFAULT_REDIRECT as any)
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
}
