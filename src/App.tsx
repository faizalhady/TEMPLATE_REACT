import AppLayout from "@/layouts/AppLayout"
import AuthLayout from "@/layouts/AuthLayout"
import { Suspense } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

// Routes & pages
import NotFoundPage from "@/pages/error/NotFoundPage"
import { ExampleRoute } from "./routes/ExampleRoute"
import { DashboardRoute } from "./routes/DashboardRoute"
import { IPKGuidelineRoute } from "./routes/IPKGuidelineRoute"

// Router setup
const router = createBrowserRouter([
  {
    path: "/", // main app routes
    element: <AppLayout />,
    children: [
      DashboardRoute,
      ExampleRoute,
      IPKGuidelineRoute,
    ],
  },
  {
    // 🔥 separate layout for all "auth" or "special" routes
    element: <AuthLayout />,
    children: [
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
