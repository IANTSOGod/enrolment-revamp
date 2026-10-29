import { Check, Circle } from "lucide-react"

export default function FingerStatus({
  status,
}: {
  status: "done" | "active" | "waiting"
}) {
  if (status === "done") {
    return (
      <span className="flex items-center justify-between gap-2">
        <Check
          aria-label="Terminé"
          size={16}
          className="shrink-0 rounded-full border-2 border-emerald-500 p-0.5 text-emerald-600"
        />
        <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
          100%
        </span>
      </span>
    )
  }

  if (status === "active") {
    return (
      <span className="flex items-center justify-between gap-2">
        <Circle
          aria-label="En cours"
          size={16}
          className="shrink-0 fill-amber-100 text-amber-300"
        />
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] text-slate-600">
          En cours...
        </span>
      </span>
    )
  }

  return (
    <span className="flex items-center gap-2 text-xs text-slate-600">
      <Circle
        aria-label="En attente"
        size={16}
        className="shrink-0 text-slate-400"
      />
      En attente
    </span>
  )
}
