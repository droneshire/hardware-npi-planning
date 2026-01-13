"use client"

// This file defines a Providers component for use in a Next.js app.
// It configures and supplies the React Query context to all child components.
// Explanation follows each key part below.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

// The Providers component wraps its children in the QueryClientProvider
// so they can access React Query features (caching, fetching, etc).
export function Providers({ children }: { children: React.ReactNode }) {
  // The QueryClient instance is created once using useState with a lazy initializer.
  // This prevents a new QueryClient from being created on every render.
  // The defaultOptions object customizes query behavior:
  //   - staleTime: Data stays fresh for 60 seconds before being considered stale.
  //   - refetchOnWindowFocus: Disables automatic refetching when window regains focus.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  // The QueryClientProvider makes the QueryClient available to descendants in the React component tree.
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
