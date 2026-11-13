import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

export const authCitizen = createAuthClient({
  baseURL: import.meta.env.VITE_BACK_URL,
  basePath: "/api/auth/",
  plugins: [jwtClient()],
})
