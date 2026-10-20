import SidebarMenuCustom from "@/components/custom/SidebarMenuCustom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { navItems } from "@/mock"
import { Landmark } from "lucide-react"
import Adminsidefooter from "./Adminsidefooter"

export default function AdminSidebar() {
  return (
    <Sidebar>
      {/* En-tête */}
      <SidebarHeader className="border-b px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Landmark className="size-6" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold">Enrolment App</span>
            <span className="text-xs text-muted-foreground">
              Centre d'enrôlement
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3 px-2 text-xs tracking-wide uppercase">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {navItems.map((item) => (
                <SidebarMenuCustom item={item} key={item.url} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Adminsidefooter></Adminsidefooter>
    </Sidebar>
  )
}
