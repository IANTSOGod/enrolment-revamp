import { useQuery } from "@tanstack/react-query"
import { useEnrollmentStore } from "@/stores/enrollment-store"
import {
  getCommunes,
  getCountries,
  getDistricts,
  getFokontany,
  getRegions,
} from "@/services/location"
import { StepFooter } from "../../custom/StepFooter"
import { Stepper } from "../../custom/Stepper"
import { PageShell } from "../EnrollmentShared"
import { LocationSelect } from "./LocationSelect"

function errorMessage(error: Error | null) {
  return error?.message ?? "Une erreur inattendue est survenue."
}

export default function LocationStep({
  onBack,
  onNext,
}: {
  onBack?: () => void
  onNext?: () => void
}) {
  const location = useEnrollmentStore((state) => state.location)
  const setLocation = useEnrollmentStore((state) => state.setLocation)
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  })
  const regionsQuery = useQuery({
    queryKey: ["regions", location.country?.id],
    queryFn: () => getRegions(location.country!.id),
    enabled: Boolean(location.country),
  })
  const districtsQuery = useQuery({
    queryKey: ["districts", location.region?.id],
    queryFn: () => getDistricts(location.region!.id),
    enabled: Boolean(location.region),
  })
  const communesQuery = useQuery({
    queryKey: ["communes", location.district?.id],
    queryFn: () => getCommunes(location.district!.id),
    enabled: Boolean(location.district),
  })
  const fokontanyQuery = useQuery({
    queryKey: ["fokontany", location.commune?.id],
    queryFn: () => getFokontany(location.commune!.id),
    enabled: Boolean(location.commune),
  })

  const ready = Boolean(
    location.country &&
    location.region &&
    location.district &&
    location.commune &&
    location.fokontany
  )

  return (
    <PageShell
      title="Localisation"
      subtitle="Sélectionnez le pays et l’adresse du citoyen."
      caseId="ENR-2026-00429"
      footer={
        <StepFooter onBack={onBack} onNext={onNext} nextDisabled={!ready} />
      }
    >
      <Stepper
        currentPhase={1}
        activeLabel="Informations citoyen"
        nextLabel="Empreintes & Photo"
        filledSegments={2}
      />
      <section className="mt-6 rounded-2xl border border-slate-200 p-5 md:p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Adresse de résidence
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Choisissez chaque niveau pour charger les localités correspondantes.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <LocationSelect
            label="Pays"
            value={location.country?.id ?? ""}
            options={countriesQuery.data ?? []}
            loading={countriesQuery.isLoading}
            disabled={false}
            error={
              countriesQuery.isError
                ? errorMessage(countriesQuery.error)
                : undefined
            }
            onChange={(id) => {
              const country =
                countriesQuery.data?.find((option) => option.id === id) ?? null
              setLocation({
                ...location,
                country,
                region: null,
                district: null,
                commune: null,
                fokontany: null,
              })
            }}
          />
          <LocationSelect
            label="Région"
            value={location.region?.id ?? ""}
            options={regionsQuery.data ?? []}
            loading={regionsQuery.isLoading}
            disabled={!location.country}
            error={
              regionsQuery.isError
                ? errorMessage(regionsQuery.error)
                : undefined
            }
            onChange={(id) => {
              const region =
                regionsQuery.data?.find((option) => option.id === id) ?? null
              setLocation({
                ...location,
                region,
                district: null,
                commune: null,
                fokontany: null,
              })
            }}
          />
          <LocationSelect
            label="District"
            value={location.district?.id ?? ""}
            options={districtsQuery.data ?? []}
            loading={districtsQuery.isLoading}
            disabled={!location.region}
            error={
              districtsQuery.isError
                ? errorMessage(districtsQuery.error)
                : undefined
            }
            onChange={(id) => {
              const district =
                districtsQuery.data?.find((option) => option.id === id) ?? null
              setLocation({
                ...location,
                district,
                commune: null,
                fokontany: null,
              })
            }}
          />
          <LocationSelect
            label="Commune"
            value={location.commune?.id ?? ""}
            options={communesQuery.data ?? []}
            loading={communesQuery.isLoading}
            disabled={!location.district}
            error={
              communesQuery.isError
                ? errorMessage(communesQuery.error)
                : undefined
            }
            onChange={(id) => {
              const commune =
                communesQuery.data?.find((option) => option.id === id) ?? null
              setLocation({
                ...location,
                commune,
                fokontany: null,
              })
            }}
          />
          <div className="md:col-span-2">
            <LocationSelect
              label="Fokotany"
              value={location.fokontany?.id ?? ""}
              options={fokontanyQuery.data ?? []}
              loading={fokontanyQuery.isLoading}
              disabled={!location.commune}
              error={
                fokontanyQuery.isError
                  ? errorMessage(fokontanyQuery.error)
                  : undefined
              }
              onChange={(id) => {
                const fokontany =
                  fokontanyQuery.data?.find((option) => option.id === id) ??
                  null
                setLocation({ ...location, fokontany })
              }}
            />
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Adresse
            <input
              type="text"
              autoComplete="street-address"
              value={location.address}
              onChange={(event) =>
                setLocation({ ...location, address: event.target.value })
              }
              placeholder="Saisir l'adresse complète"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Contact
            <input
              type="tel"
              autoComplete="tel"
              value={location.contact}
              onChange={(event) =>
                setLocation({ ...location, contact: event.target.value })
              }
              placeholder="Saisir le numéro de téléphone"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>
      </section>
    </PageShell>
  )
}
