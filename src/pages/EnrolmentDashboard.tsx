import { metrics, operationalServices, recentEnrolments } from "@/mock"
import { ArrowRight, Check, UserRoundPlus } from "lucide-react"
import { Link } from "react-router"
import { useOnlineStatus } from "@/lib/utils"
import Metric from "@/components/dash/Metric"
import TableRecent from "@/components/dash/TableRecent"

export default function EnrolmentDashboard() {
  const online = useOnlineStatus()

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
            Pilotage du centre
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Bonjour, Tiana
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Voici l'activité de votre centre d'enrôlement pour aujourd'hui.
          </p>
        </div>
        <Link
          to="/admin/enrolmenthome"
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 sm:self-auto"
        >
          <UserRoundPlus className="size-4" />
          Nouvel enrôlement
        </Link>
      </section>

      <section
        aria-label="Indicateurs d'activité"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((metric) => (
          <Metric key={metric.label} metric={metric}></Metric>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Dossiers récents
            </h2>
            <p className="text-xs text-slate-500">
              Les dernières opérations du centre
            </p>
          </div>
          <Link
            to="/admin/enrolmenthome"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Voir tout <ArrowRight className="size-4" />
          </Link>
        </div>

        <TableRecent recentEnrolments={recentEnrolments}></TableRecent>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            État opérationnel
          </h2>
          <p className="text-xs text-slate-500">
            Surveillance du poste et des services
          </p>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operationalServices.map((service, index) => (
            <li
              key={service.name}
              className="flex min-w-0 items-center gap-2.5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <service.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-800">
                  {service.name}
                </p>
                <p className="truncate text-[10px] text-slate-500">
                  {index === 0 && !online ? "Hors connexion" : service.detail}
                </p>
              </div>
              {online ? (
                <Check
                  aria-label="Opérationnel"
                  className="size-3.5 shrink-0 text-emerald-600"
                />
              ) : index === 0 ? (
                <span
                  aria-label="Hors connexion"
                  className="size-2 shrink-0 rounded-full bg-orange-500"
                />
              ) : (
                <Check
                  aria-label="Opérationnel"
                  className="size-3.5 shrink-0 text-emerald-600"
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
