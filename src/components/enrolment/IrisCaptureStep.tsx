import EyePanel from "../custom/EyePanel"
import { StepFooter } from "../custom/StepFooter"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"

export default function IrisCaptureStep({
  rightEye,
  leftEye,
  onCapture,
  onBack,
  onSave,
  onNext,
}: IrisCaptureStepProps) {
  const ready = Boolean(rightEye && leftEye)
  return (
    <PageShell
      title="Capture des iris"
      subtitle="Capturez l'iris de chaque œil."
      caseId="ENR-2026-00429"
      footer={
        <StepFooter
          onBack={onBack}
          onSave={onSave}
          onNext={onNext}
          nextDisabled={!ready}
        />
      }
    >
      <Stepper
        currentPhase={2}
        activeLabel="Empreintes & Photo"
        nextLabel="Données & Validation"
        filledSegments={2}
      />
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:p-6">
        <EyePanel side="right" image={rightEye} onCapture={onCapture} />
        <EyePanel side="left" image={leftEye} onCapture={onCapture} />
      </div>
    </PageShell>
  )
}
