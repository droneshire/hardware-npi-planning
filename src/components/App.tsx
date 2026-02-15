import React, { useEffect, useRef } from "react"
import {
  Navigate,
  useNavigate,
  useLocation,
  Routes,
  Route,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuthStateWatcher } from "@/hooks/use-auth"
import { ROUTES, DEFAULT_REDIRECT } from "@/constants/routes"
import { AuthProtection } from "@/components/auth-protection"
import { Skeleton } from "@/components/ui/skeleton"

// Import pages
import SignInPage from "@/pages/SignInPage"
import SignOutPage from "@/pages/SignOutPage"
import AuthErrorPage from "@/pages/AuthErrorPage"
import DashboardPage from "@/pages/DashboardPage"
import TimelinePage from "@/pages/TimelinePage"
import ProjectsPage from "@/pages/ProjectsPage"
import ProjectDetailPage from "@/pages/ProjectDetailPage"
import ProjectResourcesPage from "@/pages/ProjectResourcesPage"
import ResourcesPage from "@/pages/ResourcesPage"
import PersonDetailPage from "@/pages/PersonDetailPage"
import SettingsPage from "@/pages/SettingsPage"

// Create a client with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoading } = useAuthStateWatcher()
  const hasRedirected = useRef(false)

  // Global login checks
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = location.pathname.startsWith(ROUTES.AUTH.BASE)
      const isProtectedRoute =
        location.pathname.startsWith(ROUTES.DASHBOARD) ||
        location.pathname.startsWith(ROUTES.PROJECTS) ||
        location.pathname.startsWith(ROUTES.RESOURCES) ||
        location.pathname.startsWith(ROUTES.TIMELINE) ||
        location.pathname.startsWith(ROUTES.SETTINGS)

      if (!user && isProtectedRoute && !hasRedirected.current) {
        hasRedirected.current = true
        navigate(ROUTES.AUTH.SIGNIN, {
          state: { from: location },
          replace: true,
        })
      } else if (user && isAuthRoute && location.pathname !== ROUTES.AUTH.SIGNOUT) {
        navigate(DEFAULT_REDIRECT, { replace: true })
      }
    }
  }, [user, isLoading, navigate, location])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="h-8 w-32" />
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Auth routes */}
        <Route
          path={ROUTES.AUTH.SIGNIN}
          element={
            <AuthProtection requireAuth={false}>
              <SignInPage />
            </AuthProtection>
          }
        />
        <Route path={ROUTES.AUTH.SIGNOUT} element={<SignOutPage />} />
        <Route path={ROUTES.AUTH.ERROR} element={<AuthErrorPage />} />

        {/* Protected routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <AuthProtection>
              <DashboardPage />
            </AuthProtection>
          }
        />
        <Route
          path={ROUTES.TIMELINE}
          element={
            <AuthProtection>
              <TimelinePage />
            </AuthProtection>
          }
        />
        <Route
          path={ROUTES.PROJECTS}
          element={
            <AuthProtection>
              <ProjectsPage />
            </AuthProtection>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <AuthProtection>
              <ProjectDetailPage />
            </AuthProtection>
          }
        />
        <Route
          path="/projects/:id/resources"
          element={
            <AuthProtection>
              <ProjectResourcesPage />
            </AuthProtection>
          }
        />
        <Route
          path={ROUTES.RESOURCES}
          element={
            <AuthProtection>
              <ResourcesPage />
            </AuthProtection>
          }
        />
        <Route
          path="/resources/people/:id"
          element={
            <AuthProtection>
              <PersonDetailPage />
            </AuthProtection>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <AuthProtection>
              <SettingsPage />
            </AuthProtection>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to={DEFAULT_REDIRECT} replace />} />
        <Route path="*" element={<Navigate to={DEFAULT_REDIRECT} replace />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
