import { useRef, useState } from "react"
import { uploadReviewedImage } from "@/services/document-upload"
import { useEnrollmentStore } from "@/stores/enrollment-store"
import { StepFooter } from "../../custom/StepFooter"
import { Stepper } from "../../custom/Stepper"
import { PageShell } from "../EnrollmentShared"

export default function ImageVerificationStep({
  rightEye,
  leftEye,
  onBack,
  onNext,
}: ImageVerificationStepProps) {
  const setUploadedImage = useEnrollmentStore((state) => state.setUploadedImage)
  const isUploadingRef = useRef(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const ready = Boolean(leftEye && rightEye)

  async function handleNext() {
    if (isUploadingRef.current || !leftEye || !rightEye) return

    isUploadingRef.current = true
    setIsUploading(true)
    setUploadError(null)
    const images = [
      { key: "iris-left", image: leftEye, filename: "iris-left" },
      { key: "iris-right", image: rightEye, filename: "iris-right" },
    ] as const

    try {
      for (const { key, image, filename } of images) {
        if (useEnrollmentStore.getState().uploadedImages[key]) continue
        const metadata = await uploadReviewedImage(image, filename)
        setUploadedImage(key, metadata)
      }
      onNext?.()
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "L'envoi des iris a échoué."
      )
    } finally {
      isUploadingRef.current = false
      setIsUploading(false)
    }
  }

  return (
    <PageShell
      title="Vérifications des images"
      subtitle="Veuillez vérifier les images capturées."
      caseId="ENR-2026-00429"
      footer={
        <StepFooter
          onBack={onBack}
          onNext={handleNext}
          nextDisabled={!ready || isUploading}
          nextLabel={isUploading ? "Envoi en cours…" : "Continuer"}
        />
      }
    >
      <Stepper
        currentPhase={3}
        activeLabel="Données & Validation"
        nextLabel="Consentement & Récépissé"
        filledSegments={9}
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
      {uploadError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {uploadError}
        </p>
      )}
    </PageShell>
  )
}
