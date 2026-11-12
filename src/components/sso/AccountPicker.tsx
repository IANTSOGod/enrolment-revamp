import { useMutation } from "@tanstack/react-query"
import { useRef, useState } from "react"

export interface Account {
  id: string
  name: string
  email: string
  connected: boolean
  active: boolean
}

interface AccountPickerProps {
  accounts: Account[]
  onSelect: (account: Account) => Promise<void>
  onUseAnother: () => void
  /** Optionnel : remplace l'image intégrée par la tienne. */
  imageSrc?: string
}

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Instrument+Sans:wght@400;500;600&display=swap');"

const stroke = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}
const ShieldIcon = () => (
  <svg {...stroke}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

/* Classes Tailwind partagées par les deux écrans */
const ui = {
  page: "grid min-h-screen grid-cols-1 bg-white p-3 font-[family-name:Instrument_Sans] text-[#0F172A] md:grid-cols-2 md:p-5",
  side: "relative h-[260px] overflow-hidden rounded-3xl bg-[#8BA9D9] md:h-auto md:min-h-[calc(100vh-40px)] md:rounded-[32px]",
  img: "absolute inset-0 h-full w-full object-cover",
  overlay:
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(139,169,217,0.9)_0%,rgba(139,169,217,0)_32%,rgba(15,23,42,0)_60%,rgba(18,60,160,0.55)_100%)]",
  brand:
    "absolute inset-x-0 top-5 z-10 m-0 text-center font-[family-name:Sora] text-2xl font-bold tracking-tight text-white md:top-10 md:text-[34px]",
  glass:
    "absolute inset-x-7 bottom-7 z-10 hidden items-center gap-3.5 rounded-[20px] border border-white/40 bg-white/20 px-[18px] py-4 text-white backdrop-blur-md md:flex",
  panel: "flex items-center justify-center bg-white px-3 py-5 md:p-8",
  card: "flex w-full max-w-[440px] flex-col gap-5 rounded-[28px] bg-white px-[18px] py-7 shadow-[0_20px_50px_-12px_rgba(18,98,255,0.18),0_4px_14px_rgba(15,23,42,0.06)] sm:px-9 sm:py-10",
  logo: "grid h-[52px] w-[52px] place-items-center rounded-2xl border border-[#DCE3EE] bg-white text-[#1262FF]",
  title: "m-0 mb-1.5 font-[family-name:Sora] text-[28px] font-bold",
  subtitle: "m-0 text-[15px] text-[#4A6490]",
  error:
    "m-0 rounded-2xl bg-[#FDECEC] px-3.5 py-2.5 text-sm leading-snug text-[#D61F1F]",
}

function Side({ imageSrc }: { imageSrc: string }) {
  return (
    <aside className={ui.side}>
      <img
        src={imageSrc}
        alt="Agent d'enrôlement accueillant une personne au guichet"
        className={ui.img}
      />
      <div className={ui.overlay} />
      <h2 className={ui.brand}>Enrolment App</h2>
      <div className={ui.glass}>
        <ShieldIcon />
        <div className="flex flex-col gap-0.5">
          <strong className="font-[family-name:Sora] text-[15px] font-semibold">
            Accueil &amp; enrôlement sécurisé
          </strong>
          <span className="text-[13px] opacity-90">
            Identification rapide des citoyens, en toute confidentialité.
          </span>
        </div>
      </div>
    </aside>
  )
}

const errorMessage = (err: unknown) => {
  const msg = err instanceof Error ? err.message : ""
  return /network|fetch/i.test(msg)
    ? "Le serveur est injoignable. Vérifie ta connexion et la configuration CORS de l'API."
    : msg || "Connexion impossible. Réessaie."
}

const ChevronIcon = () => (
  <svg {...stroke} width={18} height={18} className="flex-none text-[#4A6490]">
    <path d="m9 6 6 6-6 6" />
  </svg>
)

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")

const palette = ["#1262FF", "#3F7DE0", "#5B8DEF", "#2F5FB8", "#4A6490"]
const colorFor = (s: string) =>
  palette[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length]

const row =
  "flex w-full items-center gap-3.5 rounded-[18px] border-[1.5px] border-[#DCE3EE] bg-white px-3.5 py-3 text-left text-[#0F172A] transition hover:-translate-y-px hover:border-[#1262FF] hover:shadow-[0_6px_16px_rgba(18,98,255,0.12)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#1262FF] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none"
const avatarBase =
  "grid h-11 w-11 flex-none place-items-center rounded-full object-cover font-[family-name:Sora] text-[15px] font-semibold text-white"

export default function AccountPicker({
  accounts,
  onSelect,
  onUseAnother,
  imageSrc = IMAGE,
}: AccountPickerProps) {
  const selectionMutation = useMutation({
    mutationFn: ({ account }: { account: Account }) => {
      return onSelect(account)
    },
    gcTime: 0,
  })

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <main className={ui.page}>
        <Side imageSrc={imageSrc} />

        <section className={ui.panel}>
          <div className={ui.card}>
            <div className={ui.logo}>
              <ShieldIcon />
            </div>
            <header>
              <h1 className={ui.title}>Tes comptes citoyens</h1>
              <p className={ui.subtitle}>
                Sélectionne un compte déjà enregistré.
              </p>
            </header>

            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {accounts.map((acc) => (
                <li key={acc.id}>
                  <button
                    type="button"
                    className={row}
                    disabled={selectionMutation.isPending || !acc.connected}
                    onClick={() => {
                      selectionMutation.mutate({ account: acc })
                    }}
                  >
                    <span
                      className={avatarBase}
                      style={{ background: colorFor(acc.email) }}
                    >
                      {initials(acc.name)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <strong className="text-[15px] font-semibold">
                        {acc.name}
                      </strong>
                      <span className="truncate text-[13px] text-[#4A6490]">
                        {acc.email}
                      </span>
                    </span>
                    {selectionMutation.isPending &&
                    selectionMutation.variables?.account.id === acc.id ? (
                      <span className="flex-none font-semibold text-[#4A6490]">
                        …
                      </span>
                    ) : (
                      <span
                        className={`hidden flex-none items-center rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${
                          acc.active
                            ? "bg-[#12A150]/10 text-[#12A150]"
                            : "bg-[#E8EDF5] text-[#4A6490]"
                        }`}
                      >
                        {acc.active && (
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#12A150]" />
                        )}
                        {acc.active ? "Actif" : "Connecté"}
                      </span>
                    )}
                    <ChevronIcon />
                  </button>
                </li>
              ))}
            </ul>

            {accounts.length === 0 && (
              <p className={ui.subtitle}>Aucun compte citoyen enregistré.</p>
            )}
            {selectionMutation.isError && (
              <p role="alert" className={ui.error}>
                {errorMessage(selectionMutation.error)}
              </p>
            )}
            {selectionMutation.isSuccess && (
              <p className="m-0 rounded-2xl bg-[#12A150]/10 px-3.5 py-2.5 text-sm text-[#12A150]">
                Session active. Les données sont déchiffrées pour ce compte.
              </p>
            )}

            <button
              type="button"
              disabled={selectionMutation.isPending}
              className="h-[52px] rounded-full border border-[#DCE3EE] bg-white text-sm font-semibold text-[#1262FF] hover:bg-[#E8EDF5] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={onUseAnother}
            >
              Utiliser un autre compte
            </button>

            <p className="m-0 text-center text-[13px] text-[#4A6490]">
              Le PIN sert uniquement à déchiffrer la session enregistrée.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

/* Image intégrée (base64) : aucun fichier à copier. */
const IMAGE =
  "data:image/jpeg;base64,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"
