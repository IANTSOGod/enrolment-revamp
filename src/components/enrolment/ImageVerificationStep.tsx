import { StepFooter } from "../custom/StepFooter"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"

export default function ImageVerificationStep({
  rightEye,
  leftEye,
  onBack,
  onNext,
}: ImageVerificationStepProps) {
  return (
    <PageShell
      title="Vérifications des images"
      subtitle="Veuillez vérifier les images capturées."
      caseId="ENR-2026-00429"
      footer={<StepFooter onBack={onBack} onNext={onNext} />}
    >
      <Stepper
        currentPhase={3}
        activeLabel="Données & Validation"
        nextLabel="Consentement & Récépissé"
        filledSegments={6}
      />

      <section
        aria-label="Images des iris capturées"
        className="mt-6 grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 md:grid-cols-2 md:p-5"
      >
        <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl border border-slate-200 p-2 md:p-4">
          {leftEye && (
            <img
              src={leftEye}
              alt="Iris de l’œil gauche"
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl border border-slate-200 p-2 md:p-4">
          {rightEye && (
            <img
              src={rightEye}
              alt="Iris de l’œil droit"
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </section>
    </PageShell>
  )
}
