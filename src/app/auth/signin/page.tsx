"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Chrome } from "lucide-react"
import {
  useAuthStateWatcher,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  handleRedirectResult,
} from "@/hooks/use-auth"
import { DEFAULT_SIGNIN_REDIRECT, ROUTES } from "@/constants/routes"

export default function SignInPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user, isLoading: authLoading } = useAuthStateWatcher()
  const hasRedirected = useRef(false)

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  // Validate and sanitize callbackUrl to prevent redirect loops
  const getValidCallbackUrl = () => {
    const rawCallbackUrl = searchParams.get("callbackUrl") || DEFAULT_SIGNIN_REDIRECT
    // Prevent redirecting to auth pages or current page
    if (rawCallbackUrl.startsWith(ROUTES.AUTH.BASE) || rawCallbackUrl === pathname) {
      return DEFAULT_SIGNIN_REDIRECT
    }
    return rawCallbackUrl
  }

  // Handle redirect result on component mount (for Google OAuth redirect flow)
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await handleRedirectResult()
        if (result?.user) {
          console.log("Successfully signed in via redirect, waiting for auth state update...")
          // Don't redirect here - let the auth state watcher handle it
          // The user state will update and trigger the redirect below
        }
      } catch (error) {
        console.error("Error getting redirect result:", error)
      }
    }

    // Only check for redirect result if we're not already authenticated
    if (!user && !authLoading) {
      handleRedirect()
    }
  }, [user, authLoading])

  // Redirect if already authenticated (this handles both popup and redirect flows)
  useEffect(() => {
    if (user && !authLoading && !hasRedirected.current) {
      const callbackUrl = getValidCallbackUrl()
      console.log("User authenticated, redirecting to:", callbackUrl)
      hasRedirected.current = true
      // Use replace instead of push to avoid adding to history
      router.replace(callbackUrl)
    }
  }, [user, authLoading, router, pathname, searchParams])

  const handleGoogleSignIn = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await signInWithGoogle()
      // Navigation will happen via auth state change
    } catch (error: any) {
      console.error("Google sign in error:", error)
      setEmailError(error.message || "Failed to sign in with Google")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")

    if (!email || !password) {
      setEmailError("Email and password are required")
      return
    }

    setIsLoading(true)
    try {
      if (isRegister) {
        await registerWithEmailAndPassword({ email, password })
      } else {
        await logInWithEmailAndPassword({ email, password })
      }
      // Navigation will happen via auth state change
    } catch (error: any) {
      console.error("Sign in error:", error)
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setEmailError("Invalid email or password")
      } else if (error.code === "auth/email-already-in-use") {
        setEmailError("Email already in use. Please sign in instead.")
        setIsRegister(false)
      } else {
        setEmailError(error.message || "An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="name@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {emailError && <div className="text-sm text-destructive">{emailError}</div>}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading
                  ? isRegister
                    ? "Creating account..."
                    : "Signing in..."
                  : isRegister
                    ? "Create Account"
                    : "Sign in with Email"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRegister(!isRegister)}
                disabled={isLoading}
              >
                {isRegister ? "Sign in instead" : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
