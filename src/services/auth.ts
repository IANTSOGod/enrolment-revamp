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

  return result
}

export const AuthService = {
  login: (data: LoginBase) => Login(data),
}
