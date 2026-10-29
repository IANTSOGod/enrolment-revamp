import { FINGERS } from "@/mock"
import FingerStatus from "../custom/FingerStatus"
import HandIllustration from "../custom/HandIllustration"
import { StepFooter } from "../custom/StepFooter"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"

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
                <th className="border-r border-slate-300 px-2 py-3 font-semibold">
                  Doigts
                </th>
                <th className="border-r border-slate-300 px-2 py-3 font-semibold">
                  main gauche
                </th>
                <th className="px-2 py-3 font-semibold">main droite</th>
              </tr>
            </thead>
            <tbody>
              {FINGERS.map((finger, index) => {
                const status =
                  index === 0 ? "done" : index === 1 ? "active" : "waiting"
                return (
                  <tr
                    key={finger}
                    className="border-t border-slate-300 bg-slate-50"
                  >
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
