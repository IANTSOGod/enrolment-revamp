import { useState } from "react"
import { useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "@/services/auth"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"

export default function Loginform() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      console.log(response.user.name)
      navigate("/admin/dashboard")
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ email: username, mdp: password } satisfies LoginBase)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6" noValidate>
      {/* Identifiant */}
      <label
        htmlFor="identifiant"
        className="mb-1.5 block text-xs font-semibold text-slate-800"
      >
        Identifiant de l'agent
      </label>
      <div className="relative">
        <Mail
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          id="identifiant"
          type="email"
          autoComplete="username"
          placeholder="you@example.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      {/* Mot de passe */}
      <label
        htmlFor="motDePasse"
        className="mt-4 mb-1.5 block text-xs font-semibold text-slate-800"
      >
        Code de passe
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
        {isError && (
          <p className="mt-2 text-xs text-red-600">
            {error instanceof Error ? error.message : "Échec de la connexion"}
          </p>
        )}
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
        {isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Se connecter
      </button>
    </form>
  )
}
