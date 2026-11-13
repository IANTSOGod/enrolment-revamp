import { useRef, useState } from "react"
import { OCRService } from "@/services/enrollment"
import { useEnrollmentStore } from "@/stores/enrollment-store"
import { StepFooter } from "../../custom/StepFooter"
import { Stepper } from "../../custom/Stepper"
import { PageShell } from "../EnrollmentShared"
import IdentityCompliancePanel from "./IdentityCompliancePanel"
import IdentityImagePanel from "./IdentityImagePanel"

export default function IdentificationStep({
  onBack,
  onNext,
  onSave,
  onScan,
  onImport,
  image,
}: IdentificationStepProps) {
  const setIdentify = useEnrollmentStore((state) => state.setIdentify)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [ocrError, setOcrError] = useState<string | null>(null)
  const requestId = useRef(0)

  async function analyzeImage(
    capturedImage: string,
    saveImage: IdentificationStepProps["onScan"]
  ) {
    saveImage?.(capturedImage)
    const currentRequestId = ++requestId.current
    setIsAnalyzing(true)
    setOcrError(null)

    try {
      const imageBlob = await fetch(capturedImage).then((response) =>
        response.blob()
      )
      const formData = new FormData()
      formData.append("file", imageBlob,"captured-image.png")

      const identify = await OCRService(formData)
      if (currentRequestId === requestId.current) {
        setIdentify(identify)
      }
    } catch (error) {
      if (currentRequestId === requestId.current) {
        setOcrError(
          error instanceof Error
            ? error.message
            : "L'analyse OCR a échoué. Veuillez réessayer."
        )
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setIsAnalyzing(false)
      }
    }
  }

  const handleScan = (capturedImage: string) =>
    analyzeImage(capturedImage, onScan)
  const handleImport = (capturedImage: string) =>
    analyzeImage(capturedImage, onImport)

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
              onCapture={handleScan}
              onImport={handleImport}
            />
            <IdentityCompliancePanel />
          </div>
        ) : (
          <IdentityImagePanel
            image={null}
            onCapture={handleScan}
            onImport={handleImport}
          />
        )}
      </div>
      {isAnalyzing && (
        <p role="status" className="mt-3 text-sm text-slate-500">
          Analyse du document en cours…
        </p>
      )}
      {ocrError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {ocrError}
        </p>
      )}
    </PageShell>
  )
}
