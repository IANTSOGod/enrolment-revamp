import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"
import { oauthProviderClient } from "@better-auth/oauth-provider/client"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACK_URL,
  basePath: "/api/auth/",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [jwtClient(), oauthProviderClient()],
})
