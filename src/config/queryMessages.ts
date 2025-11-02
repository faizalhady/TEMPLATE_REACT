// src/config/queryMessages.ts
export const queryMessageMap: Record<
  string,
  { error: string; success: string }
> = {
  "example list": {
    error: "Couldn’t load example items",
    success: "Items loaded successfully",
  },
  "example id": {
    error: "Couldn’t load item details",
    success: "Item details loaded successfully",
  },
  "example create": {
    error: "Failed to create new item",
    success: "Item created successfully",
  },
  "example update": {
    error: "Failed to update item",
    success: "Item updated successfully",
  },
  "example delete": {
    error: "Failed to delete item",
    success: "Item deleted successfully",
  },
}

// Fallbacks
export const defaultMessages = {
  error: "Something went wrong",
  success: "Action completed successfully",
}
