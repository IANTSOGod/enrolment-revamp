import { identityFields } from "@/mock"
import { useEnrollmentStore } from "@/stores/enrollment-store"

export default function IdentityCompliancePanel() {
  const identify = useEnrollmentStore((state) => state.identify)

  return (
    <section
      aria-labelledby="identity-checks-title"
      className="rounded-xl border border-slate-200 p-4"
    >
      <h2
        id="identity-checks-title"
        className="mb-3 text-sm font-bold text-slate-900"
      >
        Contrôles de conformité
      </h2>
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
            <span className="text-xs text-slate-500">
              {identify[field as keyof typeof identify] || "À analyser"}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
