import { useState } from "react"
import { authClient } from "../lib/auth-client"

export default function SSOLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await authClient.signIn.email({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    }
    // Pas besoin de redirection manuelle, Better Auth gère la suite
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Connexion à Citizen App</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter</button>
    </form>
  )
}
