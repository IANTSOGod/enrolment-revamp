import { PageShell, StepFooter, Stepper } from "./EnrollmentShared"

const IDENTITY_FIELDS = [
  { label: "Nom", value: "DEMOKAPAHA" },
  { label: "Prénoms", value: "EVLOKICO VLOK" },
  { label: "Genre", value: "MASCULIN" },
]

const BIRTH_FIELDS = [
  { label: "Date de naissance", value: "21 / 08 / 2000" },
  { label: "Lieu de naissance", value: "CU MAROANTSETRA" },
  { label: "Pays de naissance", value: "Madagascar" },
  { label: "Nationalité", value: "Malagasy" },
]

const PARENT_FIELDS = [
  { label: "Père", value: "DEMOKAPAHA VLOK" },
  { label: "Mère", value: "SOA KALO" },
]

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block min-w-0 text-xs text-slate-800">
      <span>{label}</span>
      <input
        aria-label={label}
        readOnly
        value={value}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900"
      />
    </label>
  )
}

export default function PersonalInformationReviewStep({
  onBack,
  onNext,
}: {
  onBack?: () => void
  onNext?: () => void
}) {
  return (
    <PageShell
      title="Vérification des Informations Personnelles"
      subtitle="Veuillez vérifier les informations saisies."
      caseId="ENR-2026-00429"
      footer={<StepFooter onBack={onBack} onNext={onNext} />}
    >
      <Stepper
        currentPhase={3}
        activeLabel="Données & Validation"
        nextLabel="Consentement & Récépissé"
        filledSegments={5}
      />

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-2">
        <div className="grid gap-6 rounded-lg border border-slate-300 p-4 md:grid-cols-[1.7fr_1fr] md:p-5">
          <div className="space-y-3">
            <section>
              <h2 className="text-xs font-semibold uppercase text-slate-900">Identité & nom</h2>
              <div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {IDENTITY_FIELDS.map((field) => (
                  <ReadOnlyField key={field.label} {...field} />
                ))}
              </div>
            </section>

            <section className="border-t border-slate-200 pt-3">
              <h2 className="text-xs font-semibold uppercase text-slate-900">
                Naissance & nationalité
              </h2>
              <div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {BIRTH_FIELDS.map((field) => (
                  <ReadOnlyField key={field.label} {...field} />
                ))}
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-xs font-semibold uppercase text-slate-900">Parents</h2>
            <div className="mt-4 space-y-3">
              {PARENT_FIELDS.map((field) => (
                <ReadOnlyField key={field.label} {...field} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  )
}
