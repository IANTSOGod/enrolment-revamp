const baseURL = import.meta.env.VITE_BACK_URL
const token = localStorage.getItem("token")
type LocationOption = {
  id: string
  name: string
}

export async function fetchOptions<T extends LocationOption>(
  path: string
): Promise<T[]> {
  const response = await fetch(`${baseURL}/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      credentials: "include",
    },
  })

  if (!response.ok) {
    throw new Error(
      `Le chargement des localités a échoué (${response.status}).`
    )
  }

  const result: unknown = await response.json()
  if (!Array.isArray(result)) {
    throw new Error("La réponse du serveur pour les localités est invalide.")
  }

  return result as T[]
}

export function getCountries() {
  return fetchOptions<CountryOption>("countries")
}

export function getRegions(countryId: string) {
  return fetchOptions<RegionOption>(
    `countries/${encodeURIComponent(countryId)}/regions`
  )
}

export function getDistricts(regionId: string) {
  return fetchOptions<DistrictOption>(
    `regions/${encodeURIComponent(regionId)}/districts`
  )
}

export function getCommunes(districtId: string) {
  return fetchOptions<CommuneOption>(
    `districts/${encodeURIComponent(districtId)}/communes`
  )
}

export function getFokontany(communeId: string) {
  return fetchOptions<FokontanyOption>(
    `communes/${encodeURIComponent(communeId)}/fokontany`
  )
}
