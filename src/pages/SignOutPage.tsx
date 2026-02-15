import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "@/hooks/use-auth"
import { AUTH_REDIRECTS } from "@/constants/auth"

export default function SignOutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate(AUTH_REDIRECTS.AFTER_SIGNOUT, { replace: true })
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Signing out...</p>
    </div>
  )
}
