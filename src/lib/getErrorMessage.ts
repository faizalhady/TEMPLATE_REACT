import { queryMessageMap, defaultErrorMessage } from "@/config/queryMessages"

export function getUserFriendlyErrorTitle(key?: unknown): string {
  if (!key) return defaultErrorMessage.title

  const keyString = Array.isArray(key) ? key.join(" ") : String(key)
  const normalized = keyString.toLowerCase()

  for (const pattern in queryMessageMap) {
    if (normalized.includes(pattern.toLowerCase())) {
      return queryMessageMap[pattern].title
    }
  }

  return defaultErrorMessage.title
}
