"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Chrome, Cpu, Loader2, ArrowRight, Mail, Lock } from "lucide-react"
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

  const getValidCallbackUrl = () => {
    const rawCallbackUrl = searchParams.get("callbackUrl") || DEFAULT_SIGNIN_REDIRECT
    if (rawCallbackUrl.startsWith(ROUTES.AUTH.BASE) || rawCallbackUrl === pathname) {
      return DEFAULT_SIGNIN_REDIRECT
    }
    return rawCallbackUrl
  }

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await handleRedirectResult()
        if (result?.user) {
          console.log("Successfully signed in via redirect, waiting for auth state update...")
        }
      } catch (error) {
        console.error("Error getting redirect result:", error)
      }
    }

    if (!user && !authLoading) {
      handleRedirect()
    }
  }, [user, authLoading])

  useEffect(() => {
    if (user && !authLoading && !hasRedirected.current) {
      const callbackUrl = getValidCallbackUrl()
      console.log("User authenticated, redirecting to:", callbackUrl)
      hasRedirected.current = true
      router.replace(callbackUrl as any)
    }
  }, [user, authLoading, router, pathname, searchParams])

  const handleGoogleSignIn = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await signInWithGoogle()
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-lg glow-primary">
            <Cpu className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">NPI Planning</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Hardware product lifecycle management
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold">
              {isRegister ? "Create an account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {isRegister
                ? "Enter your details to get started"
                : "Sign in to your account to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-3 border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-200"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Chrome className="h-4 w-4" />
              )}
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-border/50 bg-input/50 pl-10 pr-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="name@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-border/50 bg-input/50 pl-10 pr-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {emailError && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {emailError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 gap-2 gradient-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {isRegister ? "Create Account" : "Sign in"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister)
                  setEmailError("")
                }}
                disabled={isLoading}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {isRegister ? (
                  <>Already have an account? <span className="font-medium text-primary">Sign in</span></>
                ) : (
                  <>Don&apos;t have an account? <span className="font-medium text-primary">Register</span></>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
