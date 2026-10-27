import { useState } from "react";
import { ArrowRight, CheckCircle2, FileX, Info, RefreshCw, User } from "lucide-react";
import { Stepper } from "./EnrollmentShared";

const PROCEDURES = [
  { id: "new", icon: User, title: "Nouveau dossier", desc: "Première création d'une identité numérique" },
  { id: "update", icon: RefreshCw, title: "Mise à jour", desc: "Modifier des informations existantes" },
  { id: "fix", icon: FileX, title: "Correction", desc: "Corriger une donnée après contrôle" },
] as const;
const CHECKS = [
  "Le citoyen est présent au guichet",
  "Une pièce d'identité originale est disponible",
  "Les périphériques sont connectés",
];

type ProcedureId = "new" | "update" | "fix";

type EnrollmentStartStepProps = {
  onStart?: (procedure: ProcedureId) => void;
};

export default function EnrollmentStartStep({ onStart }: EnrollmentStartStepProps) {
  const [selected, setSelected] = useState<ProcedureId>("new");
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <div className="w-full">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">Parcours d'enrôlement</p>
        <h1 className="mt-1 text-2xl font-bold">Commencer un nouvel enrôlement</h1>
        <p className="mt-1 text-sm text-slate-500">
          Créez un dossier sécurisé et accompagnez le citoyen dans les étapes de vérification.
        </p>

        <Stepper
          currentPhase={1}
          activeLabel="Informations citoyen"
          nextLabel="Empreintes & Photo"
          filledSegments={1}
        />

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold">Type de procédure</h2>
          <p className="text-xs text-slate-500">Sélectionnez la finalité de la demande.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {PROCEDURES.map(({ id, icon: Icon, title, desc }) => {
              const isSelected = selected === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`flex h-36 flex-col rounded-xl border p-4 text-left transition ${
                    isSelected ? "border-2 border-blue-600 bg-white" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className={`mb-4 flex h-8 w-8 items-center justify-center rounded-lg ${isSelected ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-700"}`}>
                    <Icon size={16} />
                  </span>
                  <span className="text-base font-semibold">{title}</span>
                  <span className="mt-1 text-xs text-slate-500">{desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold">Avant de commencer</h2>
          <ul className="mt-3 space-y-2">
            {CHECKS.map((check) => (
              <li key={check} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 size={14} className="text-green-600" /> {check}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            <Info size={14} className="text-slate-500" />
            Le dossier est enregistré localement et peut être complété hors connexion.
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onStart?.(selected)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Commencer <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}