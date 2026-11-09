const baseURL = import.meta.env.VITE_BACK_URL

type DashboardResponse = {
  stats: {
    dossiersToday: number
    inProgress: number
    submittedToRegistry: number
    pendingSync: number
  }
  recentEnrolments: Array<{
    id: string
    reference: string
    applicant: string
    step: string
    status: string
    createdAt: string
  }>
}

export async function getDashboard(): Promise<DashboardResponse> {
  const agentId = localStorage.getItem("agentId") ?? localStorage.getItem("id")
  if (!agentId) {
    throw new Error(
      "Identifiant de l'agent manquant. Veuillez vous reconnecter."
    )
  }

  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Session absente. Veuillez vous reconnecter.")
  }
  console.log("Fetching dashboard for agentId:", agentId)
  const response = await fetch(
    `${baseURL}/dashboard?agentId=${encodeURIComponent(agentId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error(
      `Le chargement du tableau de bord a échoué (${response.status}).`
    )
  }

  const result: unknown = await response.json()
  if (
    typeof result !== "object" ||
    result === null ||
    !("stats" in result) ||
    !("recentEnrolments" in result) ||
    typeof result.stats !== "object" ||
    result.stats === null ||
    !Array.isArray(result.recentEnrolments)
  ) {
    throw new Error("La réponse du tableau de bord est invalide.")
  }

  return result as DashboardResponse
}
