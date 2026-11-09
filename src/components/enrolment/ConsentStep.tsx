import { ArrowLeft } from "lucide-react"
import { EnrollmentService } from "@/services/enrollment"
import { uploadReviewedImage } from "@/services/document-upload"
import { useEnrollmentStore } from "@/stores/enrollment-store"
import { Stepper } from "../custom/Stepper"
import { PageShell } from "./EnrollmentShared"
import { useMutation } from "@tanstack/react-query"

export default function ConsentStep({ onBack }: { onBack?: () => void }) {
  const enrollmentStore: EnrollmentData = useEnrollmentStore()
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: async (data: EnrollmentData) => {
      if (!data.idImage) {
        throw new Error("La photo de la pièce d'identité est manquante.")
      }

      let currentData = useEnrollmentStore.getState()
      if (!currentData.uploadedImages["identity-document"]) {
        const metadata = await uploadReviewedImage(
          data.idImage,
          "identity-document"
        )
        currentData.setUploadedImage("identity-document", metadata)
        currentData = useEnrollmentStore.getState()
      }
      return EnrollmentService(currentData)
    },
  })
  const informationConfirmed = useEnrollmentStore(
    (state) => state.informationConfirmed
  )
  const biometricConsent = useEnrollmentStore((state) => state.biometricConsent)
  const setInformationConfirmed = useEnrollmentStore(
    (state) => state.setInformationConfirmed
  )
  const setBiometricConsent = useEnrollmentStore(
    (state) => state.setBiometricConsent
  )

  return (
    <PageShell
      title="Consentement"
      subtitle="Vérifiez la cohérence et la complétude du dossier avant de recueillir le consentement."
      caseId="ENR-2026-00429"
      footer={
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft size={14} /> Retour
          </button>
          <button
            type="button"
            onClick={() => mutate(enrollmentStore)}
            disabled={isPending || !informationConfirmed || !biometricConsent}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "En cours…" : "Confirmer"}
          </button>
        </div>
      }
    >
      <Stepper
        currentPhase={4}
        activeLabel="Consentement & Récépissé"
        nextLabel=""
        filledSegments={11}
      />

      <section className="mt-6 min-h-105 rounded-2xl border border-slate-200 bg-white p-4 md:p-8">
        <div className="mx-auto max-w-5xl space-y-2">
          <article className="rounded-lg border border-slate-300 p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Systèmes nationaux d’identité - Déclaration de consentement
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Je consens à la collecte, au traitement et au stockage de mes
              données biométriques (empreintes digitales, scans de l’iris et
              photographie faciale) et de mes données démographiques par le
              Système national d’identité aux fins d’établir mon identité
              unique.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Je comprends que mes données seront stockées en toute sécurité
              dans des bases de données gouvernementales et pourront être
              partagées avec les organismes autorisés uniquement dans les
              conditions prévues par la loi, à des fins d’authentification et de
              vérification d’identité.
            </p>
          </article>

          <div className="rounded-lg border border-slate-300 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={informationConfirmed}
                onChange={(event) =>
                  setInformationConfirmed(event.target.checked)
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
              />
              <span>
                Je déclare que les informations fournies sont vraies et exactes.
              </span>
            </label>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={biometricConsent}
                onChange={(event) => setBiometricConsent(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
              />
              <span>
                Je consens à la collecte et au stockage de mes données
                biométriques et démographiques.
                <span className="mt-1 block font-normal text-slate-500">
                  Nécessaire pour l’établissement de l’identité.
                </span>
              </span>
            </label>
          </div>
        </div>
      </section>
      {isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error.message}
        </p>
      )}
      {isSuccess && (
        <p role="status" className="mt-3 text-sm text-green-700">
          L’enrôlement a été enregistré avec succès.
        </p>
      )}
    </PageShell>
  )
}
