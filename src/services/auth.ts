import { authClient } from "@/lib/auth-client"

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
  localStorage.setItem("token", result.token)
  localStorage.setItem("agentId", "56c84d6f-9cb5-464c-834d-b07a5b9541ca")
  return result satisfies LoginResult
}

async function Logout() {
  const { error } = await authClient.signOut()

  if (error) {
    throw new Error(error.message)
  }
  localStorage.removeItem("token")
  localStorage.removeItem("agentId")
  localStorage.removeItem("id")
}

export const AuthService = {
  login: (data: LoginBase) => Login(data),
  logout: () => Logout(),
}
