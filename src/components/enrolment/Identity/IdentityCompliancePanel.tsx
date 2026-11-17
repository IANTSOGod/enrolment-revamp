import { Check, Pencil, X } from "lucide-react"
import { useState } from "react"
import { identityFields } from "@/mock"
import { useEnrollmentStore } from "@/stores/enrollment-store"

export default function IdentityCompliancePanel() {
  const identify = useEnrollmentStore((state) => state.identify)
  const setIdentify = useEnrollmentStore((state) => state.setIdentify)
  const [draft, setDraft] = useState<Identify | null>(null)
  const hasResults = Object.values(identify).some((value) => value?.trim())

  return (
    <section
      aria-labelledby="identity-checks-title"
      className="rounded-xl border border-slate-200 p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="identity-checks-title"
          className="text-sm font-bold text-slate-900"
        >
          Contrôles de conformité
        </h2>
        {draft ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIdentify(draft)
                setDraft(null)
              }}
              className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              <Check size={14} aria-hidden="true" />
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <X size={14} aria-hidden="true" />
              Annuler
            </button>
          </div>
        ) : (
          hasResults && (
            <button
              type="button"
              onClick={() => setDraft({ ...identify })}
              className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={14} aria-hidden="true" />
              Modifier
            </button>
          )
        )}
      </div>
      <div className="space-y-2">
        {identityFields.map(({ icon: Icon, label, field }) => (
          <div
            key={label}
            className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-white text-blue-600">
              <Icon size={14} />
            </span>
            <span className="w-28 shrink-0 text-xs font-medium text-slate-700">
              {label} :
            </span>
            {draft ? (
              <input
                aria-label={label}
                value={draft[field as keyof Identify] ?? ""}
                onChange={(event) =>
                  setDraft({ ...draft, [field]: event.currentTarget.value })
                }
                className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900"
              />
            ) : (
              <span className="text-xs text-slate-500">
                {identify[field as keyof typeof identify] || "À analyser"}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
