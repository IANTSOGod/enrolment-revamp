
import { authClient } from "@/lib/auth-client"

const baseURL = import.meta.env.VITE_BACK_URL

export const authKeys = {
  all: ["auth"] as const,
}

async function Login(data: LoginBase) {
  const { data: result, error } = await authClient.signIn.email({
    email: data.email,
    password: data.mdp,
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!result) {
    throw new Error("Connexion échouée")
  }

  // Enregistrer le token si d'autres services l'utilisent.
  if (result.token) {
    localStorage.setItem("token", result.token)
  }

  // Récupérer l'agent avec le cookie Better Auth.
  const userId = await getUserId()

  localStorage.setItem("agentId", userId)

  return result satisfies LoginResult
}

async function Logout() {
  const { error } = await authClient.signOut()

  if (error) {
    throw new Error(error.message)
  }

  localStorage.removeItem("token")
  localStorage.removeItem("agentId")
}

async function getUserId(): Promise<string> {
  const response = await fetch(`${baseURL}/agents/me`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la récupération de l'agent : ${response.status}`
    )
  }

  const data = await response.json()

  if (!data.agent) {
    throw new Error("Aucun agent associé à cet utilisateur")
  }

  return data.agent.id
}

export const AuthService = {
  login: (data: LoginBase) => Login(data),
  logout: () => Logout(),
}
