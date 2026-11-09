import { useEnrollmentStore } from "@/stores/enrollment-store"
import { StepFooter } from "../../custom/StepFooter"
import { Stepper } from "../../custom/Stepper"
import { PageShell } from "../EnrollmentShared"

function ReviewField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900">
        {value || "Non renseigné"}
      </dd>
    </div>
  )
}

export default function LocationReviewStep({
  onBack,
  onNext,
}: {
  onBack?: () => void
  onNext?: () => void
}) {
  const location = useEnrollmentStore((state) => state.location)
  const fields = [
    { label: "Pays", value: location.country?.name ?? "" },
    { label: "Région", value: location.region?.name ?? "" },
    { label: "District", value: location.district?.name ?? "" },
    { label: "Commune", value: location.commune?.name ?? "" },
    { label: "Fokotany", value: location.fokontany?.name ?? "" },
    { label: "Adresse", value: location.address },
    { label: "Contact", value: location.contact },
  ]

  return (
    <PageShell
      title="Vérification de la localisation"
      subtitle="Veuillez vérifier l’adresse et les coordonnées du citoyen."
      caseId="ENR-2026-00429"
      footer={<StepFooter onBack={onBack} onNext={onNext} />}
    >
      <Stepper
        currentPhase={3}
        activeLabel="Données & Validation"
        nextLabel="Consentement & Récépissé"
        filledSegments={8}
      />
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Adresse et contact
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <ReviewField key={field.label} {...field} />
          ))}
        </dl>
      </section>
    </PageShell>
  )
}
