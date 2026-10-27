import { Check, Circle } from "lucide-react"
import { PageShell, StepFooter, Stepper } from "./EnrollmentShared"

const FINGERS = ["Pouce", "Index", "Majeur", "Annulaire", "Auriculaire"]

function HandIllustration({ active = false }: { active?: boolean }) {
  const outline = active ? "#667085" : "#b0b8c2"
  const accent = active ? "#00a878" : outline

  return (
    <svg
      viewBox="0 0 220 210"
      role="img"
      aria-label={active ? "Illustration de la main droite" : "Illustration de la main gauche"}
      className="h-full w-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <g transform={active ? "translate(220 0) scale(-1 1)" : undefined}>
        <g stroke={outline}>
          <path d="M58 105 48 57c-2-9 1-15 7-16 6-1 10 4 12 12l8 40" />
          <path d="M75 97V37c0-9 4-14 10-14s10 5 10 14v60" />
          <path d="M95 97V27c0-9 4-14 10-14s10 5 10 14v70" />
          <path d="M115 97V43c0-9 4-14 10-14s10 5 10 14v60" />
          <path d="M135 100V58c0-8 4-12 9-12 6 0 9 5 8 13l-6 44" />
          <path d="M58 105c-2 37 9 72 35 91 7 5 14 8 20 8s13-3 20-8c26-19 37-54 35-91H58Z" />
          <path d="M168 119c19 2 28 11 31 24 2 9-3 20-10 23-8 3-13-7-19-17" />
        </g>
        {active && (
          <path
            d="M58 105c-4 12-10 18-17 23-8 6-11 16-7 23 5 9 14 8 21 0 8-9 12-22 12-37"
            fill="#d1fae5"
            stroke={accent}
          />
        )}
        {active && <path d="M85 28v68" stroke="#f4e9a7" strokeWidth="12" />}
        {active && <path d="M85 28v68" stroke="#667085" />}
        {active && <circle cx="85" cy="27" r="7" fill="#72b8b8" stroke="none" />}
      </g>
    </svg>
  )
}

function FingerStatus({ status }: { status: "done" | "active" | "waiting" }) {
  if (status === "done") {
    return (
      <span className="flex items-center justify-between gap-2">
        <Check aria-label="Terminé" size={16} className="shrink-0 rounded-full border-2 border-emerald-500 p-0.5 text-emerald-600" />
        <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
          100%
        </span>
      </span>
    )
  }

  if (status === "active") {
    return (
      <span className="flex items-center justify-between gap-2">
        <Circle aria-label="En cours" size={16} className="shrink-0 fill-amber-100 text-amber-300" />
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] text-slate-600">
          En cours...
        </span>
      </span>
    )
  }

  return (
    <span className="flex items-center gap-2 text-xs text-slate-600">
      <Circle aria-label="En attente" size={16} className="shrink-0 text-slate-400" />
      En attente
    </span>
  )
}

export default function FingerprintCaptureStep({
  onBack,
  onNext,
}: {
  onBack?: () => void
  onNext?: () => void
}) {
  return (
    <PageShell
      title="Capture Empreinte digitale"
      subtitle="Capturez une preuve d’identité et contrôlez automatiquement son authenticité."
      caseId="ENR-2026-00429"
      footer={<StepFooter onBack={onBack} onNext={onNext} />}
    >
      <Stepper
        currentPhase={2}
        activeLabel="Empreintes & Photo"
        nextLabel="Données & Validation"
        filledSegments={4}
      />

      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.7fr_1fr] md:p-6">
        <div className="flex min-h-64 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 md:gap-8 md:p-8">
          <div className="h-52 min-w-0 flex-1">
            <HandIllustration />
          </div>
          <div className="h-52 min-w-0 flex-1">
            <HandIllustration active />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-300">
          <h2 className="border-b border-slate-300 bg-white px-3 py-3 text-center text-sm font-semibold">
            Séquence de capture
          </h2>
          <table className="w-full table-fixed border-collapse text-left text-xs">
            <thead className="bg-blue-200 text-slate-900">
              <tr>
                <th className="border-r border-slate-300 px-2 py-3 font-semibold">Doigts</th>
                <th className="border-r border-slate-300 px-2 py-3 font-semibold">main gauche</th>
                <th className="px-2 py-3 font-semibold">main droite</th>
              </tr>
            </thead>
            <tbody>
              {FINGERS.map((finger, index) => {
                const status = index === 0 ? "done" : index === 1 ? "active" : "waiting"
                return (
                  <tr key={finger} className="border-t border-slate-300 bg-slate-50">
                    <th className="border-r border-slate-300 px-2 py-3 font-medium text-slate-600">
                      {finger}
                    </th>
                    <td className="border-r border-slate-300 px-2 py-3">
                      <FingerStatus status={status} />
                    </td>
                    <td className="px-2 py-3">
                      <FingerStatus status={status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
