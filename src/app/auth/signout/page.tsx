"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/hooks/use-auth"
import { AUTH_REDIRECTS } from "@/constants/auth"

export default function SignOutPage() {
  const router = useRouter()

  useEffect(() => {
    logout()
    router.push(AUTH_REDIRECTS.AFTER_SIGNOUT)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Signing out...</p>
    </div>
  )
}
