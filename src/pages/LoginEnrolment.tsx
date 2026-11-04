import { AuthService } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"
import {
  Eye,
  EyeOff,
  Fingerprint,
  IdCard,
  Landmark,
  Loader2,
  Lock,
  Mail,
} from "lucide-react"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"

export default function LoginEnrolment({
  heroImageSrc = "/assets/background_auth.jpg",
  onBiometric,
  onBadgeScan,
}: LoginEnrolmentProps) {
  const navigate = useNavigate()
  const [identifiant, setIdentifiant] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    mutate,
    isPending,
    //error,
    //isError,
  } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response: LoginResult) => {
      console.log(response.user.name)
      navigate("/admin/dashboard")
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ email: identifiant, mdp: motDePasse } satisfies LoginBase)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#DDE3F0] p-4 sm:p-6">
      <div className="w-full max-w-260 rounded-[32px] bg-[#F5F6FA] p-6 sm:p-12">
        <div className="grid items-stretch gap-7 lg:grid-cols-[436px_1fr]">
          <aside className="relative hidden min-h-162 overflow-hidden rounded-[28px] bg-[#9DB7DE] lg:block">
            <h1 className="absolute inset-x-0 top-0 z-10 bg-linear-to-b from-[#C3D4E2] to-[#A9C2E3] px-6 pt-9 pb-8 text-center text-[34px] font-bold tracking-tight text-white">
              ENROLMENT APP
            </h1>
            <img
              src={heroImageSrc}
              alt="Agent d'enrôlement accueillant une personne devant un terminal biométrique"
              className="absolute inset-x-3.75 top-37 bottom-9.25 h-[calc(100%-185px)] w-[calc(100%-30px)] object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#6F95D0]/35" />
          </aside>
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
            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              <label
                htmlFor="identifiant"
                className="mb-1.5 block text-xs font-semibold text-slate-800"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="identifiant"
                  type="email"
                  autoComplete="Email"
                  placeholder="you@example.com"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <label
                htmlFor="motDePasse"
                className="mt-4 mb-1.5 block text-xs font-semibold text-slate-800"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  id="motDePasse"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword
                      ? "Masquer le code de passe"
                      : "Afficher le code de passe"
                  }
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" aria-hidden />
                  ) : (
                    <EyeOff className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
              <hr className="mx-5 mt-8 mb-4 border-slate-200" />
              <button
                type="submit"
                disabled={isPending}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(37,99,235,0.45)] transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                )}
                Se connecter
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] text-slate-400">
              Ou Continuer Avec
            </p>

            <div className="mx-0 mt-5 grid grid-cols-2 gap-1 sm:pr-1.5">
              <button
                type="button"
                onClick={onBiometric}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 text-[13px] font-medium text-slate-800 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <Fingerprint
                  className="h-4.5 w-4.5 text-blue-500"
                  aria-hidden
                />
                Biométriques
              </button>
              <button
                type="button"
                onClick={onBadgeScan}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 text-[13px] font-medium text-slate-800 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <IdCard className="h-4.5 w-4.5 text-blue-500" aria-hidden />
                Scanner un badge
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
