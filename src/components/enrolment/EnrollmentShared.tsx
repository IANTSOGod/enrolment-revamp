import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import type { ReactNode } from "react";

const PHASES = [
  { id: 1, title: "Identification", sub: "Citoyen", steps: null },
  { id: 2, title: "Biométrie", sub: "Empreintes & Photo", steps: "3 étapes" },
  { id: 3, title: "Contrôle & Revue", sub: "Données & Validation", steps: "2 étapes" },
  { id: 4, title: "Clôture", sub: "Consentement & Récépissé", steps: "3 étapes" },
];
const TOTAL_SEGMENTS = 9;

type PageShellProps = {
  title: string;
  subtitle: string;
  caseId?: string;
  children: ReactNode;
  footer?: ReactNode;
};

type StepperProps = {
  currentPhase: number;
  activeLabel: string;
  nextLabel: string;
  filledSegments: number;
};

type StepFooterProps = {
  onBack?: () => void;
  onSave?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
};

export function PageShell({ title, subtitle, caseId, children, footer }: PageShellProps) {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">
              Parcours d'enrôlement
            </p>
            <h1 className="mt-1 text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          {caseId && (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
              <Lock size={12} />
              Données chiffrées
              <span className="font-mono text-[10px] text-slate-400">{caseId}</span>
            </span>
          )}
        </div>
        {children}
        {footer}
      </div>
    </div>
  );
}

export function Stepper({ currentPhase, activeLabel, nextLabel, filledSegments }: StepperProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 p-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {PHASES.map((phase) => {
          const active = phase.id === currentPhase;
          const done = phase.id < currentPhase;
          return (
            <div
              key={phase.id}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                active || done ? "bg-blue-50 border border-blue-100" : "bg-slate-50"
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
                  <span className={`truncate text-xs font-semibold ${active || done ? "text-slate-900" : "text-slate-500"}`}>
                    {phase.title}
                  </span>
                  {phase.steps && (
                    <span className={`text-[10px] ${active ? "font-semibold text-blue-600" : "text-slate-400"}`}>
                      {phase.steps}
                    </span>
                  )}
                </div>
                <p className={`truncate text-[10px] ${active || done ? "text-blue-600" : "text-slate-400"}`}>
                  {done ? `Terminé · ${phase.sub}` : active && phase.id === 1 ? `En cours · ${phase.sub}` : phase.sub}
                </p>
              </div>
            </div>
          );
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
  );
}

export function StepFooter({ onBack, onSave, onNext, nextDisabled }: StepFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
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
  );
}