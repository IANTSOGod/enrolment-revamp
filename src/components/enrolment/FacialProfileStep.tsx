import { useState } from "react"
import { Camera, Scan } from "lucide-react"
import { PageShell, StepFooter, Stepper } from "./EnrollmentShared"
import IdentityCameraDialog from "./Identity/IdentityCameraDialog"

export type ProfileSide = "left" | "right"

type ProfilePanelProps = {
  side: ProfileSide
  image: string | null
  onCapture?: (side: ProfileSide, image: string) => void
}

type FacialProfileStepProps = {
  leftProfile: string | null
  rightProfile: string | null
  onCapture?: (side: ProfileSide, image: string) => void
  onBack?: () => void
  onSave?: () => void
  onNext?: () => void
}

function ProfilePanel({ side, image, onCapture }: ProfilePanelProps) {
  const [cameraOpen, setCameraOpen] = useState(false)
  const label = side === "left" ? "gauche" : "droit"

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-slate-200 p-4 md:p-6">
      <div className="flex aspect-square w-full max-w-48 items-center justify-center overflow-hidden bg-white">
        {image ? (
          <img
            src={image}
            alt={`Profil ${label}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-12 w-20 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Scan size={16} />
          </span>
        )}
      </div>
      <div className="mt-6 flex w-full max-w-64 justify-center">
        <button
          type="button"
          onClick={() => setCameraOpen(true)}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Camera size={16} className="shrink-0 text-slate-800" />
          <span>
            {image ? "Recapturer" : "Capturer"} le profil {label}
          </span>
        </button>
      </div>
      <IdentityCameraDialog
        open={cameraOpen}
        title={`Photographier le profil ${label}`}
        onClose={() => setCameraOpen(false)}
        onCapture={(capturedImage) => onCapture?.(side, capturedImage)}
      />
    </div>
  )
}

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
