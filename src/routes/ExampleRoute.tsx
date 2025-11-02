import { lazy } from "react"
import type { RouteObject } from "react-router-dom"

const ExamplePage = lazy(() => import("@/pages/example/ExamplePage"))

export const ExampleRoute: RouteObject = {
  path: "/example",
  element: <ExamplePage />,
}
