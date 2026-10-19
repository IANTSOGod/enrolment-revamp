import { cn } from "cn"
import { DropdownMenuItem } from "../ui/dropdown-menu"

interface NotificationListProps {
  read: (id: string) => void
  notif: AppNotification
}

export default function NotificationList({
  read,
  notif,
}: NotificationListProps) {
  return (
    <DropdownMenuItem
      key={notif.id}
      onClick={() => {
        if (!notif.read) read(notif.id)
      }}
      className="flex cursor-pointer items-start gap-3 rounded-md px-3 py-2.5"
    >
      <span
        className={cn(
          "mt-1.5 size-2 shrink-0 rounded-full",
          notif.read ? "bg-transparent" : "bg-blue-500"
        )}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-sm",
            notif.read ? "font-normal" : "font-medium"
          )}
        >
          {notif.title}
        </span>
        {notif.description ? (
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {notif.description}
          </span>
        ) : null}
        <span className="text-xs text-muted-foreground/70">{notif.time}</span>
      </div>
    </DropdownMenuItem>
  )
}
