// import { useEffect } from "react"
import { authClient } from "../lib/auth-client"

export default function Consent() {
  const handleConsent = async () => {
    // Le client OAuth doit être configuré avec oauthProviderClient
    // authClient.oauth2.consent() envoie la réponse à Better Auth
    await authClient.oauth2.consent({
      accept: true,
    })
  }

  return (
    <div>
      <h1>Autoriser l'application ?</h1>
      <p>Cette application souhaite accéder à vos informations de citoyen.</p>
      <button onClick={handleConsent}>Autoriser</button>
    </div>
  )
}
