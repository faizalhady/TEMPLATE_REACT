import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}
