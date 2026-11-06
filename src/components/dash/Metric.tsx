import type { LucideIcon } from "lucide-react"

import { useOnlineStatus } from "@/lib/utils"
export default function Metric({
  metric,
}: {
  metric: {
    label: string
    value: string
    detail: string
    detailClass: string
    icon: LucideIcon
    iconClass: string
  }
}) {
  const online = useOnlineStatus()
  return (
    <article
      key={metric.label}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-slate-600">{metric.label}</h3>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${metric.iconClass}`}
        >
          <metric.icon className="size-4" />
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        {metric.value}
      </p>
      <p className={`mt-0.5 text-xs font-medium ${metric.detailClass}`}>
        {metric.label === "En attente de sync" && !online
          ? "Hors connexion"
          : metric.detail}
      </p>
    </article>
  )
}
