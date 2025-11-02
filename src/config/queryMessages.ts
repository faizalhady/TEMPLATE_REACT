// src/config/queryMessages.ts
export const queryMessageMap: Record<string, { title: string; fallback?: string }> = {
  "example list": { title: "Couldn’t load example items" },
  "example id": { title: "Couldn’t load item details" },
  "example create": { title: "Failed to create new item" },
  "example update": { title: "Failed to update item" },
  "example delete": { title: "Failed to delete item" },
}

// Optional: generic fallback for undefined or unlisted keys
export const defaultErrorMessage = {
  title: "Something went wrong",
  fallback: "Please try again later.",
}
