import { IMAGES } from "@/mock"
import { StepFooter } from "../custom/StepFooter"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"

export default function FacialImageVerificationStep({
  facialImage,
  leftProfile,
  rightProfile,
  onBack,
  onNext,
}: FacialImageVerificationStepProps) {
  const images = {
    face: facialImage,
    left: leftProfile,
    right: rightProfile,
  }

  return (
    <PageShell
      title="Vérification des images"
      subtitle="Veuillez vérifier les images capturées."
      caseId="ENR-2026-00429"
      footer={<StepFooter onBack={onBack} onNext={onNext} />}
    >
      <Stepper
        currentPhase={3}
        activeLabel="Données & Validation"
        nextLabel="Consentement & Récépissé"
        filledSegments={7}
      />

      <section
        aria-label="Vérification des images faciales"
        className="mt-6 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3 md:p-8"
      >
        {IMAGES.map(({ key, label }) => (
          <div
            key={key}
            className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-slate-200 p-4 md:p-8"
          >
            {images[key] && (
              <img
                src={images[key]}
                alt={label}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>
        ))}
      </section>
    </PageShell>
  )
}
