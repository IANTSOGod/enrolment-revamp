import { useRef, useState } from "react"
import { IMAGES } from "@/mock"
import { uploadReviewedImage } from "@/services/document-upload"
import { useEnrollmentStore } from "@/stores/enrollment-store"
import { StepFooter } from "../../custom/StepFooter"
import { Stepper } from "../../custom/Stepper"
import { PageShell } from "../EnrollmentShared"

export default function FacialImageVerificationStep({
  facialImage,
  leftProfile,
  rightProfile,
  onBack,
  onNext,
}: FacialImageVerificationStepProps) {
  const setUploadedImage = useEnrollmentStore((state) => state.setUploadedImage)
  const isUploadingRef = useRef(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const images = {
    face: facialImage,
    left: leftProfile,
    right: rightProfile,
  }
  const ready = Boolean(facialImage && leftProfile && rightProfile)

  async function handleNext() {
    if (isUploadingRef.current || !facialImage || !leftProfile || !rightProfile)
      return

    isUploadingRef.current = true
    setIsUploading(true)
    setUploadError(null)
    const reviewedImages = [
      { key: "face", image: facialImage, filename: "face" },
      { key: "profile-left", image: leftProfile, filename: "profile-left" },
      {
        key: "profile-right",
        image: rightProfile,
        filename: "profile-right",
      },
    ] as const

    try {
      for (const { key, image, filename } of reviewedImages) {
        if (useEnrollmentStore.getState().uploadedImages[key]) continue
        const metadata = await uploadReviewedImage(image, filename)
        setUploadedImage(key, metadata)
      }
      onNext?.()
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "L'envoi des images faciales a échoué."
      )
    } finally {
      isUploadingRef.current = false
      setIsUploading(false)
    }
  }

  return (
    <PageShell
      title="Vérification des images"
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
        filledSegments={10}
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
      {uploadError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {uploadError}
        </p>
      )}
    </PageShell>
  )
}
