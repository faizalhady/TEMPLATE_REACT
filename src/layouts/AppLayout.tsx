import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Outlet, useLocation } from "react-router-dom"

export default function AppLayout() {
  const location = useLocation()
  const path = location.pathname.replace("/", "") || "Dashboard"

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main inset area */}
      <SidebarInset className="flex flex-col h-screen">
        {/* Fixed Header */}
        <header className="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        {/* Global notifications */}
        <Toaster richColors position="top-right" />
      </SidebarInset>
    </SidebarProvider>
  )
}
