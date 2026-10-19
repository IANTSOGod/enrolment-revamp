import { request } from "@/lib/utils"

export const notificationKeys = {
  all: ["notifications"] as const,
}

export const notificationService = {
  getAll: () => request<AppNotification[]>("/notifications"),

  markAsRead: (id: string) =>
    request<void>(`/notifications/${id}/read`, { method: "PATCH" }),

  markAllAsRead: () =>
    request<void>("/notifications/read-all", { method: "PATCH" }),
}
