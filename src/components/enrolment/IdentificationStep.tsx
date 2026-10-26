import { PageShell, StepFooter, Stepper } from "./EnrollmentShared"
import IdentityCompliancePanel from "./Identity/IdentityCompliancePanel"
import IdentityImagePanel from "./Identity/IdentityImagePanel"

type IdentificationStepProps = {
  onBack?: () => void
  onNext?: () => void
  onSave?: () => void
  onScan?: (image: string) => void
  onImport?: (image: string) => void
  image: string | null
}

export default function IdentificationStep({
  onBack,
  onNext,
  onSave,
  onScan,
  onImport,
  image,
}: IdentificationStepProps) {
  return (
    <PageShell
      title="Identification"
      subtitle="Capturez une preuve d'identité et contrôlez automatiquement son authenticité."
      caseId="ENR-2026-00429"
      footer={
        <StepFooter
          onBack={onBack}
          onSave={onSave}
          onNext={onNext}
          nextDisabled={!image}
        />
      }
    >
      <Stepper
        currentPhase={1}
        activeLabel="Informations citoyen"
        nextLabel="3. Documents justificatifs"
        filledSegments={1}
      />
      <div className="mt-6 rounded-2xl border border-slate-200 p-6">
        {image ? (
          <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
            <IdentityImagePanel
              image={image}
              onCapture={onScan}
              onImport={onImport}
            />
            <IdentityCompliancePanel />
          </div>
        ) : (
          <IdentityImagePanel
            image={null}
            onCapture={onScan}
            onImport={onImport}
          />
        )}
      </div>
    </PageShell>
  )
}
