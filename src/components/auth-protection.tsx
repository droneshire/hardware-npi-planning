import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        navigate(redirectTo, { replace: true })
      } else if (!requireAuth && user) {
        navigate(DEFAULT_REDIRECT, { replace: true })
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, navigate])

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
