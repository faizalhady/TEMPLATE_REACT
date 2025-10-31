import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ShoppingCart } from "lucide-react"

export function SidebarHeaderTitle() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="cursor-default data-[state=open]:bg-transparent data-[state=open]:text-inherit"
                >
                    {/* Icon container (keeps same visual size/alignment) */}
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <ShoppingCart className="size-4" />
                    </div>

                    {/* App title and version */}
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-medium">IPK Calculator</span>
                        <span className="text-sm text-muted-foreground">v1.0.0</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
