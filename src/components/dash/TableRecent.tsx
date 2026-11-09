export default function TableRecent({
  recentEnrolments,
}: {
  recentEnrolments: readonly {
    id: string
    reference: string
    applicant: string
    step: string
    status: string
    createdAt: string
  }[]
}) {
  function statusStyle(status: string) {
    switch (status) {
      case "Validé":
        return "border-emerald-200 bg-emerald-50 text-emerald-700"
      case "En attente":
        return "border-slate-200 bg-slate-100 text-slate-600"
      case "En cours":
        return "border-blue-200 bg-blue-50 text-blue-700"
      default:
        return "border-slate-200 bg-slate-100 text-slate-600"
    }
  }
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-slate-50 text-[11px] font-medium tracking-wide text-slate-500 uppercase">
            <th scope="col" className="px-3 py-2">
              Référence
            </th>
            <th scope="col" className="px-3 py-2">
              Demandeur
            </th>
            <th scope="col" className="px-3 py-2">
              Étape
            </th>
            <th scope="col" className="px-3 py-2 text-right">
              Statut
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {recentEnrolments.map((enrolment) => (
            <tr key={enrolment.id}>
              <td className="px-3 py-3.5 font-medium whitespace-nowrap text-blue-700">
                {enrolment.reference}
              </td>
              <td className="px-3 py-3.5 font-medium whitespace-nowrap text-slate-800">
                {enrolment.applicant}
              </td>
              <td className="px-3 py-3.5 whitespace-nowrap text-slate-600">
                {enrolment.step}
              </td>
              <td className="px-3 py-3 text-right">
                <span
                  className={`inline-flex min-w-22 items-center justify-center rounded-full border px-3 py-1.5 text-xs font-medium ${statusStyle(enrolment.status)}`}
                >
                  {enrolment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
