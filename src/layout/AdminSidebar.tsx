// src/components/app-sidebar.tsx
import { NavLink } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { navItems } from "@/mock"
import { ChevronDown, Landmark } from "lucide-react"

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
                <SidebarMenuItem key={item.url}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn(
                        "flex h-14 w-full items-center gap-3 rounded-xl border px-4 text-sm transition-colors outline-none",
                        "focus-visible:ring-2 focus-visible:ring-blue-300",
                        item.badge && "pr-12",
                        isActive
                          ? "border-blue-200 bg-blue-50 font-semibold text-blue-700"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      )
                    }
                  >
                    <item.icon className="size-5 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </NavLink>

                  {item.badge ? (
                    <SidebarMenuBadge className="top-1/2 right-3 h-6 min-w-6 -translate-y-1/2 rounded-full bg-amber-500 text-white">
                      {item.badge}
                    </SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Pied : agent connecté */}
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="h-14 gap-3 rounded-xl border border-border px-4"
            >
              <Avatar className="size-9">
                <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700">
                  TM
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate text-sm">
                Agent · CTR-ANT-024
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
