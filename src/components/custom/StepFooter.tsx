import { ArrowLeft, ArrowRight } from "lucide-react"

export function StepFooter({
  onBack,
  onSave,
  onNext,
  nextDisabled,
}: StepFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={14} /> Retour
      </button>
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Enregistrer et quitter
        </button>
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Continuer <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
