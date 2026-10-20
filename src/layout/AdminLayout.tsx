import { SidebarProvider } from "@/components/ui/sidebar"
import { associateurl } from "@/lib/utils"
import { Outlet, useLocation } from "react-router"
import AppHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayout() {
  const location = useLocation()
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          title={associateurl(location.pathname) as string}
          subtitle="Centre Antananarivo · Guichet 04"
        />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
