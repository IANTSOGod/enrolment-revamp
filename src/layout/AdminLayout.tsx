import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar"
import AppHeader from "./AdminHeader"
import { associateurl } from "@/lib/utils"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          title={associateurl(window.location.pathname) as string}
          subtitle="Centre Antananarivo · Guichet 04"
        />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
