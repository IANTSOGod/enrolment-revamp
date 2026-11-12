import { lock, unlock, type Vault } from "@/lib/secureVault"

const baseURL = import.meta.env.VITE_BACK_URL
const ACCOUNTS_STORAGE_KEY = "citizen-auth-accounts"
const ACTIVE_ACCOUNT_STORAGE_KEY = "citizen-auth-active-account"
const LEGACY_VAULT_STORAGE_KEY = "citizen-auth-vault"
const LEGACY_ACTIVE_STORAGE_KEY = "citizen-auth-active-session"
const LEGACY_ACCOUNT_ID = "legacy-citizen-session"
const PIN = import.meta.env.VITE_PIN ?? "214365"
export interface CitizenLoginCredentials {
  email: string
  password: string
}

export interface CitizenAuthResponse {
  message: string
  data: {
    token: string
    expires_at: string
    user: {
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
    }
    citizen: {
      id: string
      national_unique_id: string
      person: {
        first_name: string
        last_name: string
        date_of_birth: string
        birth_place: string
        sex: string
      }
    }
  }
}

interface StoredCitizenAccount {
  // Display metadata is readable; the full response, including the token, stays in the encrypted vault.
  id: string
  name: string
  email: string
  expiresAt: string
  vault: Vault
}

export interface CitizenAccountSummary {
  id: string
  name: string
  email: string
  connected: boolean
  active: boolean
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isCitizenAuthResponse(value: unknown): value is CitizenAuthResponse {
  if (!isRecord(value) || typeof value.message !== "string") return false

  const data = value.data
  if (!isRecord(data) || typeof data.token !== "string") return false
  if (typeof data.expires_at !== "string") return false

  const user = data.user
  if (
    !isRecord(user) ||
    typeof user.id !== "string" ||
    typeof user.name !== "string" ||
    typeof user.email !== "string" ||
    typeof user.emailVerified !== "boolean" ||
    (typeof user.image !== "string" && user.image !== null)
  ) {
    return false
  }

  const citizen = data.citizen
  if (
    !isRecord(citizen) ||
    typeof citizen.id !== "string" ||
    typeof citizen.national_unique_id !== "string"
  ) {
    return false
  }

  const person = citizen.person
  return (
    isRecord(person) &&
    typeof person.first_name === "string" &&
    typeof person.last_name === "string" &&
    typeof person.date_of_birth === "string" &&
    typeof person.birth_place === "string" &&
    typeof person.sex === "string"
  )
}

function isVault(value: unknown): value is Vault {
  return (
    isRecord(value) &&
    typeof value.salt === "string" &&
    typeof value.iv === "string" &&
    typeof value.data === "string"
  )
}

function isStoredCitizenAccount(value: unknown): value is StoredCitizenAccount {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.expiresAt === "string" &&
    isVault(value.vault)
  )
}

function readStoredAccounts(): StoredCitizenAccount[] {
  const rawAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY)
  if (rawAccounts === null) return []

  let parsedAccounts: unknown
  try {
    parsedAccounts = JSON.parse(rawAccounts)
  } catch {
    throw new Error("La liste des comptes citoyens enregistrés est invalide.")
  }

  if (
    !Array.isArray(parsedAccounts) ||
    !parsedAccounts.every(isStoredCitizenAccount)
  ) {
    throw new Error("La liste des comptes citoyens enregistrés est invalide.")
  }

  return parsedAccounts
}

function isNotExpired(expiresAt: string): boolean {
  const expirationTime = Date.parse(expiresAt)
  return Number.isFinite(expirationTime) && expirationTime > Date.now()
}

function persistAccount(response: CitizenAuthResponse, vault: Vault): void {
  const accounts = readStoredAccounts()
  const account: StoredCitizenAccount = {
    id: response.data.user.id,
    name: response.data.user.name,
    email: response.data.user.email,
    expiresAt: response.data.expires_at,
    vault,
  }
  const updatedAccounts = [
    ...accounts.filter((stored) => stored.id !== account.id),
    account,
  ]

  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updatedAccounts))
  localStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, account.id)
}

async function login(
  credentials: CitizenLoginCredentials
): Promise<CitizenAuthResponse> {
  if (!PIN.trim()) {
    throw new Error("Le code PIN du coffre est obligatoire.")
  }

  const response = await fetch(
    `${baseURL.replace(/\/$/, "")}/citizen/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    }
  )

  const responseText = await response.text()
  let result: unknown

  try {
    result = responseText ? JSON.parse(responseText) : null
  } catch {
    if (response.ok) {
      throw new Error("La réponse du serveur d'authentification est invalide.")
    }
  }

  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : `Échec de l'authentification (${response.status}).`
    throw new Error(message)
  }

  if (!isCitizenAuthResponse(result)) {
    throw new Error("La réponse du serveur d'authentification est invalide.")
  }

  const encryptedSession = await lock(JSON.stringify(result), PIN)
  persistAccount(result, encryptedSession)

  return result
}

async function getStoredSession(
  accountId?: string
): Promise<CitizenAuthResponse | null> {
  if (!PIN.trim()) {
    throw new Error("Le code PIN du coffre est obligatoire.")
  }

  if (accountId === LEGACY_ACCOUNT_ID) {
    return migrateLegacySession()
  }

  const accounts = readStoredAccounts().filter((account) =>
    isNotExpired(account.expiresAt)
  )
  const selectedAccountId =
    accountId ?? localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY)
  if (!selectedAccountId) return null

  const account = accounts.find(({ id }) => id === selectedAccountId)
  if (!account) {
    if (
      localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY) === selectedAccountId
    ) {
      localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY)
    }
    return null
  }

  const decryptedSession = await unlock(account.vault, PIN)
  let parsedSession: unknown
  try {
    parsedSession = JSON.parse(decryptedSession)
  } catch {
    throw new Error("Les données du coffre de session citoyen sont invalides.")
  }
  if (!isCitizenAuthResponse(parsedSession)) {
    throw new Error("Les données du coffre de session citoyen sont invalides.")
  }
  if (parsedSession.data.user.id !== account.id) {
    throw new Error("Le coffre ne correspond pas au compte sélectionné.")
  }

  localStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, account.id)
  return parsedSession
}

async function migrateLegacySession(): Promise<CitizenAuthResponse | null> {
  const legacyVaultText = localStorage.getItem(LEGACY_VAULT_STORAGE_KEY)
  if (legacyVaultText === null) return null

  let legacyVault: unknown
  try {
    legacyVault = JSON.parse(legacyVaultText)
  } catch {
    throw new Error("L'ancien coffre de session citoyen est invalide.")
  }
  if (!isVault(legacyVault)) {
    throw new Error("L'ancien coffre de session citoyen est invalide.")
  }

  const decryptedSession = await unlock(legacyVault, PIN)
  let parsedSession: unknown
  try {
    parsedSession = JSON.parse(decryptedSession)
  } catch {
    throw new Error("Les données de l'ancien coffre sont invalides.")
  }
  if (!isCitizenAuthResponse(parsedSession)) {
    throw new Error("Les données de l'ancien coffre sont invalides.")
  }

  if (!isNotExpired(parsedSession.data.expires_at)) {
    localStorage.removeItem(LEGACY_VAULT_STORAGE_KEY)
    localStorage.removeItem(LEGACY_ACTIVE_STORAGE_KEY)
    return null
  }

  persistAccount(parsedSession, legacyVault)
  localStorage.removeItem(LEGACY_VAULT_STORAGE_KEY)
  localStorage.removeItem(LEGACY_ACTIVE_STORAGE_KEY)
  return parsedSession
}

function getStoredAccounts(): CitizenAccountSummary[] {
  const allAccounts = readStoredAccounts()
  const activeAccountId = localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY)
  const validAccounts = allAccounts.filter((account) =>
    isNotExpired(account.expiresAt)
  )

  if (validAccounts.length !== allAccounts.length) {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(validAccounts))
  }
  if (
    activeAccountId &&
    !validAccounts.some((account) => account.id === activeAccountId)
  ) {
    localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY)
  }

  const summaries = validAccounts.map((account) => ({
    id: account.id,
    name: account.name,
    email: account.email,
    connected: true,
    active: account.id === activeAccountId,
  }))

  const legacyExpiresAt = localStorage.getItem(LEGACY_ACTIVE_STORAGE_KEY)
  if (
    localStorage.getItem(LEGACY_VAULT_STORAGE_KEY) &&
    legacyExpiresAt &&
    isNotExpired(legacyExpiresAt)
  ) {
    summaries.push({
      id: LEGACY_ACCOUNT_ID,
      name: "Compte citoyen enregistré",
      email: "Saisis le PIN du coffre pour le restaurer",
      connected: true,
      active: false,
    })
  }

  return summaries
}

function isSessionActive(): boolean {
  const activeAccountId = localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY)
  return (
    activeAccountId !== null &&
    readStoredAccounts().some(
      (account) =>
        account.id === activeAccountId && isNotExpired(account.expiresAt)
    )
  )
}

function clearStoredSession() {
  localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY)
}

export const CitizenAuthService = {
  login,
  getStoredSession,
  getStoredAccounts,
  isSessionActive,
  clearStoredSession,
}
