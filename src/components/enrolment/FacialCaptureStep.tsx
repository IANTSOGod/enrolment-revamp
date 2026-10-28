import { Camera, Check, RotateCcw } from "lucide-react"
import { useState } from "react"
import useIdentityCamera from "../../hooks/useIdentityCamera"
import { StepFooter } from "../custom/StepFooter"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"

export default function FacialCaptureStep({
  image,
  onCapture,
  onClear,
  onBack,
  onSave,
  onNext,
}: FacialCaptureStepProps) {
  const [validated, setValidated] = useState(false)
  const { videoRef, starting, stream, errorMessage, captureImage } =
    useIdentityCamera(true, () => {}, onCapture, false, false)

  function captureFace() {
    setValidated(false)
    captureImage()
  }

  function retake() {
    onClear?.()
    setValidated(false)
  }

  return (
    <PageShell
      title="Capture Faciale"
      subtitle="Capturez une photo de face claire et vérifiez-la avant de continuer."
      caseId="ENR-2026-00429"
      footer={
        <StepFooter
          onBack={onBack}
          onSave={onSave}
          onNext={onNext}
          nextDisabled={!image || !validated}
        />
      }
    >
      <Stepper
        currentPhase={2}
        activeLabel="Empreintes & Photo"
        nextLabel="Données & Validation"
        filledSegments={3}
      />
      <div className="mt-6 grid gap-6 rounded-2xl border border-slate-200 p-4 md:grid-cols-2 md:p-8">
        <section
          aria-label="Aperçu caméra pour la capture faciale"
          className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-xl bg-slate-200 p-4"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            aria-label="Aperçu en direct de la caméra"
            className="h-full w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={captureFace}
            disabled={starting || !stream}
            aria-label="Capturer le profil facial"
            className="absolute bottom-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-blue-950 text-white shadow-lg hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <Camera size={22} />
          </button>
        </section>

        <section className="mx-auto flex w-full max-w-xs flex-col rounded-xl border border-slate-300 p-4">
          <h2 className="text-lg font-semibold text-blue-950">
            Dernière capture
          </h2>
          <div className="mt-4 flex aspect-4/3 items-center justify-center overflow-hidden rounded border border-slate-200 bg-slate-100">
            {image ? (
              <img
                src={image}
                alt="Dernière photo faciale capturée"
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="px-4 text-center text-sm text-slate-500">
                La photo capturée apparaîtra ici.
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={retake}
              disabled={!image}
              className="flex min-w-28 items-center justify-center gap-2 rounded border border-blue-950 px-3 py-1.5 text-sm font-medium text-blue-950 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={14} />
              Reprendre
            </button>
            <button
              type="button"
              onClick={() => setValidated(true)}
              disabled={!image}
              className="flex min-w-28 items-center justify-center gap-2 rounded bg-blue-950 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={14} />
              {validated ? "Photo validée" : "Valider la photo"}
            </button>
          </div>
        </section>
      </div>
      {starting && (
        <p className="mt-3 text-center text-sm text-slate-500">
          Connexion à la caméra…
        </p>
      )}
      {errorMessage && (
        <p role="alert" className="mt-3 text-center text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </PageShell>
  )
}
