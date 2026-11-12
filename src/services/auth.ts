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
  const userId = await getUserId()
  localStorage.setItem("token", result.token)
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

async function getUserId() {
  const response = await fetch("" + baseURL + "/agents/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  })
  if (!response.ok) throw new Error("Failed to fetch user ID")
  const data = await response.json()
  return data.agent.id
}

export const AuthService = {
  login: (data: LoginBase) => Login(data),
  logout: () => Logout(),
}
