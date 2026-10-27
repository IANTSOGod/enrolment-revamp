import { ProfilePanel } from "../custom/ProfilePanel"
import { StepFooter } from "../custom/StepFooter"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"

export default function FacialProfileStep({
  leftProfile,
  rightProfile,
  onCapture,
  onBack,
  onSave,
  onNext,
}: FacialProfileStepProps) {
  const ready = Boolean(leftProfile && rightProfile)

  return (
    <PageShell
      title="Profil gauche et droit"
      subtitle="Capturez les profils gauche et droit du citoyen."
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
        <ProfilePanel side="left" image={leftProfile} onCapture={onCapture} />
        <ProfilePanel side="right" image={rightProfile} onCapture={onCapture} />
      </div>
    </PageShell>
  )
}
