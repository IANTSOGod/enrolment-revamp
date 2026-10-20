import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  ChevronUp,
  CircleHelp,
  CircleUserRound,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react"
import { useNavigate } from "react-router"

export default function AdminSideFooter() {
  const navigate = useNavigate()

  function handleLogout() {
    // Remplacer par signOut() de Better Auth
    navigate("/login")
  }

  return (
    <SidebarFooter className="border-t p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-14 w-full items-center gap-3 rounded-xl border border-border px-3 text-left hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <Avatar className="size-9 shrink-0">
                <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-700">
                  TM
                </AvatarFallback>
              </Avatar>

              <span className="flex min-w-0 flex-1 flex-col items-start">
                <span className="truncate text-sm font-medium">Agent</span>
                <span className="truncate text-xs text-muted-foreground">
                  CTR-ANT-024
                </span>
              </span>

              <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="end"
              sideOffset={8}
              className="w-56"
            >
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <CircleUserRound />
                Profil
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings />
                Paramètres
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/security")}>
                <ShieldCheck />
                Sécurité
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/help")}>
                <CircleHelp />
                Aide et assistance
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
