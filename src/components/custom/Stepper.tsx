import { PHASES, TOTAL_SEGMENTS } from "@/mock"

export function Stepper({
  currentPhase,
  //activeLabel,
  // nextLabel,
  filledSegments,
}: StepperProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 p-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {PHASES.map((phase) => {
          const active = phase.id === currentPhase
          const done = phase.id < currentPhase
          return (
            <div
              key={phase.id}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                active || done
                  ? "border border-blue-100 bg-blue-50"
                  : "bg-slate-50"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  active || done
                    ? "bg-blue-600 text-white"
                    : "border border-slate-300 bg-white text-slate-500"
                }`}
              >
                {phase.id}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`truncate text-xs font-semibold ${active || done ? "text-slate-900" : "text-slate-500"}`}
                  >
                    {phase.title}
                  </span>
                  {phase.steps && (
                    <span
                      className={`text-[10px] ${active ? "font-semibold text-blue-600" : "text-slate-400"}`}
                    >
                      {phase.steps}
                    </span>
                  )}
                </div>
                <p
                  className={`truncate text-[10px] ${active || done ? "text-blue-600" : "text-slate-400"}`}
                >
                  {done
                    ? `Terminé · ${phase.sub}`
                    : active && phase.id === 1
                      ? `En cours · ${phase.sub}`
                      : phase.sub}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* <div className="mt-4 flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-slate-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Étape active : <span className="font-semibold text-blue-600">{activeLabel}</span>
        </span>
        <span className="hidden text-slate-500 md:block">Prochaine étape : {nextLabel}</span>
      </div> */}

      <div className="mt-5 flex gap-1">
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${index < filledSegments ? "bg-blue-600" : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  )
}
