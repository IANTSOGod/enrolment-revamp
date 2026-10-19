import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, useNow, useOnlineStatus } from "@/lib/utils"
import { notificationKeys, notificationService } from "@/services/notifications"
import NotificationList from "@/components/custom/NotificationList"

export default function AppHeader({
  title,
  subtitle,
  agentInitials = "TM",
}: AppHeaderProps) {
  const online = useOnlineStatus()
  const now = useNow()
  const queryClient = useQueryClient()

  const { data: notifications = [] } = useQuery({
    queryKey: notificationKeys.all,
    queryFn: notificationService.getAll,
    refetchInterval: 60_000,
    enabled: online,
  })

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: notificationKeys.all })

  const { mutate: markAsRead } = useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: refresh,
  })

  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: refresh,
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const date = now.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const time = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      {/* Gauche : titre + sous-titre */}
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <div className="flex min-w-0 flex-col leading-tight">
          <h1 className="truncate text-base font-semibold">{title}</h1>
          {subtitle ? (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>

      {/* Droite : statut, date, notifications, agent */}
      <div className="flex shrink-0 items-center gap-3 md:gap-4">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
            online
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full",
              online ? "bg-emerald-500" : "bg-amber-500"
            )}
          />
          {online ? "Connecté" : "Hors ligne"}
        </span>

        <div className="hidden h-6 w-px bg-border sm:block" />

        <span className="hidden text-sm text-muted-foreground sm:block">
          {date} · {time}
        </span>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Notifications"
            className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            <Bell className="size-4" />
            {unreadCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
            ) : null}
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-0">
            {/* En-tête */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold">Notifications</span>
              {unreadCount > 0 ? (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                  {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                </span>
              ) : null}
            </div>

            <DropdownMenuSeparator className="m-0" />

            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Aucune notification
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto p-1">
                {notifications.map((n) => (
                  <NotificationList key={n.id} read={markAsRead} notif={n} />
                ))}
              </div>
            )}

            {/* Pied */}
            {notifications.length > 0 ? (
              <>
                <DropdownMenuSeparator className="m-0" />
                <div className="p-1">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault() // garde le menu ouvert
                      markAllAsRead()
                    }}
                    disabled={unreadCount === 0 || isMarkingAll}
                    className="cursor-pointer justify-center rounded-md py-2 text-xs font-medium text-blue-700"
                  >
                    Tout marquer comme lu
                  </DropdownMenuItem>
                </div>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="size-9">
          <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700">
            {agentInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
