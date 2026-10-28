import { Lock } from "lucide-react"

export function PageShell({
  title,
  subtitle,
  caseId,
  children,
  footer,
}: PageShellProps) {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-blue-600 uppercase">
              Parcours d'enrôlement
            </p>
            <h1 className="mt-1 text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          {caseId && (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
              <Lock size={12} />
              Données chiffrées
              <span className="font-mono text-[10px] text-slate-400">
                {caseId}
              </span>
            </span>
          )}
        </div>
        {children}
        {footer}
      </div>
    </div>
  )
}
