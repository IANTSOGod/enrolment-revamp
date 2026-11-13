import { useEnrollmentStore } from "@/stores/enrollment-store"
import { StepFooter } from "../../custom/StepFooter"
import { Stepper } from "../../custom/Stepper"
import { PageShell } from "../EnrollmentShared"

function ReadOnlyField({
  label,
  value,
}: {
  label: string
  value: string | undefined
}) {
  return (
    <label className="block min-w-0 text-xs text-slate-800">
      <span>{label}</span>
      <input
        aria-label={label}
        readOnly
        value={value?.trim() || "Non renseigné"}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900"
      />
    </label>
  )
}

function formatGender(value: string | undefined) {
  const gender = value?.trim().toLocaleUpperCase()
  if (gender && ["M", "H", "HOMME", "MASCULIN", "MALE"].includes(gender)) {
    return "Masculin"
  }
  if (gender && ["F", "FEMME", "FEMININ", "FÉMININ", "FEMALE"].includes(gender)) {
    return "Féminin"
  }
  return value
}

export default function PersonalInformationReviewStep({
  onBack,
  onNext,
}: {
  onBack?: () => void
  onNext?: () => void
}) {
  const identify = useEnrollmentStore((state) => state.identify)

  return (
    <PageShell
      title="Vérification des Informations Personnelles"
      subtitle="Veuillez vérifier les informations saisies."
      footer={<StepFooter onBack={onBack} onNext={onNext} />}
    >
      <Stepper
        currentPhase={3}
        activeLabel="Données & Validation"
        nextLabel="Consentement & Récépissé"
        filledSegments={7}
      />

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-2">
        <div className="grid gap-6 rounded-lg border border-slate-300 p-4 md:grid-cols-[1.7fr_1fr] md:p-5">
          <div className="space-y-3">
            <section>
              <h2 className="text-xs font-semibold text-slate-900 uppercase">
                Identité &amp; nom
              </h2>
              <div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                <ReadOnlyField label="Nom" value={identify.nom} />
                <ReadOnlyField label="Prénoms" value={identify.prenoms} />
                <ReadOnlyField
                  label="Genre"
                  value={formatGender(identify.genre)}
                />
              </div>
            </section>

            <section className="border-t border-slate-200 pt-3">
              <h2 className="text-xs font-semibold text-slate-900 uppercase">
                Naissance
              </h2>
              <div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                <ReadOnlyField
                  label="Date de naissance"
                  value={identify.date_naissance}
                />
                <ReadOnlyField
                  label="Lieu de naissance"
                  value={identify.lieu_naissance}
                />
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-xs font-semibold text-slate-900 uppercase">
              Parents
            </h2>
            <div className="mt-4 space-y-3">
              <ReadOnlyField label="Père" value={identify.nom_pere} />
              <ReadOnlyField label="Mère" value={identify.nom_mere} />
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  )
}
