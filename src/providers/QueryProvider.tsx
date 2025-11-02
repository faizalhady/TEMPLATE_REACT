import React, { useEffect } from "react"
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
  Query,
  type QueryCacheNotifyEvent,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { toast } from "sonner"
import axios from "axios"

/* -------------------------------------------------
   Helper: Log in Dev Only
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") console.log("[QueryProvider]", ...args)
}


/* -------------------------------------------------
   Deduped Toast Notifications
---------------------------------------------------*/
const errorThrottle = new Set<string>()
function showErrorToast(title: string, message: string) {
  const key = `${title}:${message}`
  if (errorThrottle.has(key)) return
  errorThrottle.add(key)

  toast.error(title, { description: message })

  // Clear throttle after 4s (to allow re-toast after cooldown)
  setTimeout(() => errorThrottle.delete(key), 4000)
}

/* -------------------------------------------------
   Helper: Extract readable error message
---------------------------------------------------*/
function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return "An unexpected error occurred."
}

/* -------------------------------------------------
   Global QueryClient
---------------------------------------------------*/
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const message = extractErrorMessage(error)
      showErrorToast("Query Error", message)
      console.error("❌ Query Error:", query.queryKey, message)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      const message = extractErrorMessage(error)
      showErrorToast("Mutation Error", message)
      console.error("❌ Mutation Error:", mutation.options.mutationKey, message)
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
})


/* -------------------------------------------------
   Dev Cache Logger — Realtime State Monitor (v5-compatible)
---------------------------------------------------*/
function useQueryCacheLogger() {
  useEffect(() => {
    if (import.meta.env.MODE !== "development") return

    const unsubscribe = queryClient.getQueryCache().subscribe((event: QueryCacheNotifyEvent) => {
      // The v5 event.type system is now "added" | "removed" | "updated" | ...
      if (event.type === "updated" && (event as any).query) {
        const query = (event as any).query as Query
        const status = query.state.status

        if (status === "error") {
          devLog("🧩 Cache Event: Error", {
            key: query.queryKey,
            error: query.state.error,
          })
        }

        if (status === "success") {
          devLog("🧩 Cache Event: Success", {
            key: query.queryKey,
            data: query.state.data,
          })
        }
      }
    })

    return () => unsubscribe()
  }, [])
}

/* -------------------------------------------------
   Provider Wrapper
---------------------------------------------------*/
export function QueryProvider({ children }: { children: React.ReactNode }) {
  useQueryCacheLogger() // ✅ dev-only logging

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
