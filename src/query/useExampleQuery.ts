import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { exampleApi } from "@/api/exampleApi"
import type {
  ExampleItem,
  ExampleItemQuery,
  ExampleItemListResponse,
  CreateExampleItemRequest,
  UpdateExampleItemRequest,
} from "@/api/exampleApi"
import { devLog } from "@/lib/devLog"

/* -------------------------------------------------
   Query Keys — central reference for cache identity
---------------------------------------------------*/
export const EXAMPLE_KEYS = {
  all: ["example", "all"] as const,
  search: (params: ExampleItemQuery) => ["example", "list", params] as const,
  id: (id: number) => ["example", "id", id] as const,
}

/* -------------------------------------------------
   useExampleAll — fetch all example items
---------------------------------------------------*/
export function useExampleAll(params?: ExampleItemQuery) {
  return useQuery<ExampleItemListResponse, Error>({
    queryKey: EXAMPLE_KEYS.search(params ?? {}),
    queryFn: async () => {
      devLog("useExampleAll", "📡 Fetching all example items...", params)
      const res = await exampleApi.getExampleItems(params)
      devLog("useExampleAll", "✅ Example items fetched:", res)
      return res
    },
  })
}

/* -------------------------------------------------
   useExampleById — fetch single item by ID
---------------------------------------------------*/
export function useExampleById(id: number) {
  return useQuery<ExampleItem, Error>({
    queryKey: EXAMPLE_KEYS.id(id),
    queryFn: async () => {
      devLog("useExampleById", "📡 Fetching example item by ID:", id)
      const res = await exampleApi.getExampleItems({ limit: 1 })
      const item = res.find((i) => i.id === id)
      devLog("useExampleById", "✅ Example item data:", item)
      return item as ExampleItem
    },
    enabled: !!id, // avoid running without valid ID
  })
}

/* -------------------------------------------------
   🟢 useCreateExampleItem — add new item
---------------------------------------------------*/
export function useCreateExampleItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["example", "create"],
    mutationFn: async (payload: CreateExampleItemRequest) => {
      devLog("useCreateExampleItem", "📦 Creating new item...", payload)
      const res = await exampleApi.postExampleItem(payload)
      devLog("useCreateExampleItem", "✅ Created item:", res)
      return res
    },
    onSuccess: () => {
      devLog("useCreateExampleItem", "♻️ Invalidating cache after create...")
      queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.all })
    },
  })
}

/* -------------------------------------------------
   🟡 useUpdateExampleItem — update existing item
---------------------------------------------------*/
export function useUpdateExampleItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["example", "update"],
    mutationFn: async (payload: UpdateExampleItemRequest) => {
      devLog("useUpdateExampleItem", "✏️ Updating item...", payload)
      const res = await exampleApi.putExampleItem(payload)
      devLog("useUpdateExampleItem", "✅ Updated item:", res)
      return res
    },
    onSuccess: () => {
      devLog("useUpdateExampleItem", "♻️ Invalidating cache after update...")
      queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.all })
    },
  })
}

/* -------------------------------------------------
   🔴 useDeleteExampleItem — remove item by ID
---------------------------------------------------*/
export function useDeleteExampleItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["example", "delete"],
    mutationFn: async (id: number) => {
      devLog("useDeleteExampleItem", "🗑️ Deleting item with ID:", id)
      const res = await exampleApi.deleteExampleItem(id)
      devLog("useDeleteExampleItem", "✅ Item deleted:", res)
      return res
    },
    onSuccess: () => {
      devLog("useDeleteExampleItem", "♻️ Invalidating cache after delete...")
      queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.all })
    },
  })
}
