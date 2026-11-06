import { Landmark, Fingerprint, IdCard } from "lucide-react"
import Loginform from "@/components/custom/Loginform"

export default function LoginEnrolment() {
  return (
    <main className="flex h-screen items-center justify-center bg-[#DDE3F0] p-4">
      <div className="w-full max-w-[1040px] rounded-[32px] bg-[#F5F6FA] p-10">
        <div className="grid items-stretch gap-7 lg:grid-cols-[436px_1fr]">
          {/* ───────── Carte image (gauche) ───────── */}
          <aside className="relative hidden min-h-[648px] overflow-hidden rounded-[28px] bg-[#9DB7DE] lg:block">
            <h1 className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#C3D4E2] to-[#A9C2E3] px-6 pt-9 pb-8 text-center text-[34px] font-bold tracking-tight text-white">
              ENROLMENT APP
            </h1>

            <img
              src={"/assets/background_auth.jpg"}
              alt="Agent d'enrôlement accueillant une personne devant un terminal biométrique"
              className="absolute inset-x-[15px] top-[148px] bottom-[37px] h-[calc(100%-185px)] w-[calc(100%-30px)] object-cover"
            />

            {/* Voile bleu */}
            <div className="pointer-events-none absolute inset-0 bg-[#6F95D0]/35" />
          </aside>

          {/* ───────── Carte formulaire (droite) ───────── */}
          <section className="rounded-[28px] border border-slate-100 bg-white px-8 py-10 shadow-sm sm:px-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Landmark className="h-5 w-5" aria-hidden />
            </div>

            <div className="mt-24">
              <h2 className="text-[26px] leading-tight font-bold text-slate-900">
                Bienvenue !
              </h2>
              <p className="mt-0.5 text-[13px] text-slate-500">
                Connecté à ton compte Agent d&apos;Enrôlement
              </p>
            </div>

            <Loginform></Loginform>

            <p className="mt-6 text-center text-[11px] text-slate-400">
              Ou Continuer Avec
            </p>

            <div className="mx-0 mt-5 grid grid-cols-2 gap-1 sm:pr-1.5">
              <button
                type="button"
                // onClick={onBiometric}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 text-[13px] font-medium text-slate-800 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <Fingerprint
                  className="h-[18px] w-[18px] text-blue-500"
                  aria-hidden
                />
                Biométriques
              </button>
              <button
                type="button"
                // onClick={onBadgeScan}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 text-[13px] font-medium text-slate-800 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <IdCard
                  className="h-[18px] w-[18px] text-blue-500"
                  aria-hidden
                />
                Scanner un badge
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
