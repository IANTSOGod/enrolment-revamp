import {
  CalendarDays,
  MapPin,
  UserRound,
  UsersRound,
  VenusAndMars,
} from "lucide-react"

const identityFields = [
  { icon: UserRound, label: "Nom" },
  { icon: UserRound, label: "Prénom(s)" },
  { icon: VenusAndMars, label: "Genre" },
  { icon: CalendarDays, label: "Date de naissance" },
  { icon: MapPin, label: "Lieu de naissance" },
  { icon: UserRound, label: "Nom de la mère" },
  { icon: UserRound, label: "Nom du père" },
  { icon: UsersRound, label: "Accompagnateur" },
]

export default function IdentityCompliancePanel() {
  return (
    <section
      aria-labelledby="identity-checks-title"
      className="rounded-xl border border-slate-200 p-4"
    >
      <h2
        id="identity-checks-title"
        className="mb-3 text-sm font-bold text-slate-900"
      >
        Contrôles de conformité
      </h2>
      <div className="space-y-2">
        {identityFields.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-white text-blue-600">
              <Icon size={14} />
            </span>
            <span className="w-28 shrink-0 text-xs font-medium text-slate-700">
              {label} :
            </span>
            <span className="text-xs text-slate-500">À analyser</span>
          </div>
        ))}
      </div>
    </section>
  )
}
