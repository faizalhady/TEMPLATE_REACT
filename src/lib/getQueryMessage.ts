// src/lib/getQueryMessage.ts
import { queryMessageMap, defaultMessages } from "@/config/queryMessages"

/**
 * Returns a mapped success or error message for a given query/mutation key.
 * Falls back to generic defaults when not matched.
 */
export function getQueryMessage(
  key?: unknown,
  type: "error" | "success" = "error"
): string {
  if (!key) return defaultMessages[type]

  const keyString = Array.isArray(key) ? key.join(" ") : String(key)
  const normalized = keyString.toLowerCase()

  for (const pattern in queryMessageMap) {
    if (normalized.includes(pattern.toLowerCase())) {
      return queryMessageMap[pattern][type]
    }
  }

  return defaultMessages[type]
}
