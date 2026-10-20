import { cn } from "cn"
import { NavLink } from "react-router"
import { SidebarMenuBadge, SidebarMenuItem } from "../ui/sidebar"

export default function SidebarMenuCustom({ item }: { item: NavItem }) {
  return (
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
  )
}
