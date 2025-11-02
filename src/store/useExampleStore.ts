import { create } from "zustand"
import { persist } from "zustand/middleware"

/* -------------------------------------------------
   🧠 Example Store — global app state demo
---------------------------------------------------*/
interface ExampleStore {
  count: number
  isSidebarOpen: boolean
  increment: () => void
  decrement: () => void
  toggleSidebar: () => void
  reset: () => void
}

/* -------------------------------------------------
   💾 Persistent + Dev-friendly store setup
---------------------------------------------------*/
export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      count: 0,
      isSidebarOpen: true,

      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      reset: () => set({ count: 0, isSidebarOpen: true }),
    }),
    {
      name: "example-store", // key for localStorage
    }
  )
)
