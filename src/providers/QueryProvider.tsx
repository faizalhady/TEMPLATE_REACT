// src/providers/QueryProvider.tsx
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
import { getQueryMessage } from "@/lib/getQueryMessage"

/* -------------------------------------------------
   Developer Logger (only in dev)
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

  setTimeout(() => errorThrottle.delete(key), 4000)
}

/* -------------------------------------------------
   Helper — Extract readable error message
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
   Global QueryClient Setup
---------------------------------------------------*/
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const message = extractErrorMessage(error)
      const title = getQueryMessage(query.queryKey, "error")
      showErrorToast(title, message)
      console.error("❌ Query Error:", query.queryKey, message)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      const message = extractErrorMessage(error)
      const title = getQueryMessage(mutation.options.mutationKey, "error")
      showErrorToast(title, message)
      console.error("❌ Mutation Error:", mutation.options.mutationKey, message)
    },
    onSuccess: (_data, _vars, _ctx, mutation) => {
      const title = getQueryMessage(mutation.options.mutationKey, "success")
      toast.success(title)
      devLog("✅ Mutation Success:", mutation.options.mutationKey)
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
   Dev Cache Logger — Realtime State Monitor
---------------------------------------------------*/
function useQueryCacheLogger() {
  useEffect(() => {
    if (import.meta.env.MODE !== "development") return

    const unsubscribe = queryClient.getQueryCache().subscribe((event: QueryCacheNotifyEvent) => {
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
  useQueryCacheLogger()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
