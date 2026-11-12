import { Check, Printer } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

type ConsentSuccessStepProps = {
  onReset?: () => void
  id: string
}

export default function ConsentSuccessStep({
  onReset,
  id,
}: ConsentSuccessStepProps) {
  const submittedAt = "02 octobre 2026 · 09:44"

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-6">
      <div className="w-full max-w-[920px] rounded-[26px] border border-slate-200 bg-[#f8f8f8] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] md:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[5px] border-[#7cc7a0] bg-[#69c48d] shadow-[0_10px_20px_rgba(105,196,141,0.28)]">
            <Check className="h-10 w-10 stroke-[3] text-white" />
          </div>

          <p className="mt-5 text-[11px] font-bold tracking-[0.22em] text-slate-700">
            TRANSMISSION CONFIRMÉE
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-800">
            Enrôlement enregistré
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Le dossier a été transmis à l’autorité centrale avec succès.
          </p>
        </div>

        <div className="mt-8 rounded-[20px] border border-slate-200 bg-[#f6f6f6] p-5">
          <div className="grid items-center gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex justify-center">
              <QRCodeSVG
                value={id}
                size={150}
                level="M"
                title={`Identifiant de suivi ${id}`}
                className="rounded-lg border border-slate-300 bg-white p-3 shadow-sm"
              />
            </div>

            <div className="space-y-4 text-left">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.04em] text-slate-500 uppercase">
                  Référence de suivi
                </p>
                <p className="mt-1 text-[19px] font-semibold text-slate-800">
                  {id}
                </p>
              </div>

              <div className="text-sm text-slate-700">
                <span className="font-medium text-slate-800">Statut :</span>{" "}
                reçu par le registre
              </div>

              <p className="max-w-[420px] text-sm leading-relaxed text-slate-500">
                Présentez ce QR code ou la référence au citoyen pour le suivi de
                sa demande.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium tracking-[0.06em] text-slate-500 uppercase">
              Date de soumission
            </p>
            <p className="mt-2 text-base font-medium text-slate-800">
              {submittedAt}
            </p>
          </div>

          <div className="md:text-left">
            <p className="text-[11px] font-medium tracking-[0.06em] text-slate-500 uppercase">
              Centre d’enrôlement
            </p>
            <p className="mt-2 text-base font-medium text-slate-800">
              CTR-ANT-024 · Guichet 04
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-end">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            Imprimer le Récépissé
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_20px_rgba(29,78,216,0.22)] transition hover:bg-blue-800"
          >
            Nouveau Enrôlement
          </button>
        </div>
      </div>
    </div>
  )
}
