import { useCallback, useEffect, useState } from "react"
import AccountPicker from "@/components/sso/AccountPicker"
import LoginSSO from "@/components/sso/LoginSSO"
import {
  CitizenAuthService,
  type CitizenAccountSummary,
} from "@/services/citizen-auth"

export default function SSOLogin() {
  const [accounts, setAccounts] = useState<CitizenAccountSummary[]>([])
  const [showAccountPicker, setShowAccountPicker] = useState(false)
  const [accountsLoaded, setAccountsLoaded] = useState(false)
  const [storageError, setStorageError] = useState<string | null>(null)

  const refreshAccounts = useCallback(() => {
    try {
      const savedAccounts = CitizenAuthService.getStoredAccounts()
      setAccounts(savedAccounts)
      setStorageError(null)
      setShowAccountPicker(savedAccounts.length > 0)
      setAccountsLoaded(true)
    } catch (error) {
      setStorageError(
        error instanceof Error
          ? error.message
          : "Impossible de charger les comptes enregistrés."
      )
      setShowAccountPicker(false)
      setAccountsLoaded(true)
    }
  }, [])

  useEffect(() => {
    refreshAccounts()
  }, [refreshAccounts])

  const chooseAccount = async (account: CitizenAccountSummary) => {
    const session = await CitizenAuthService.getStoredSession(account.id)
    if (!session) {
      throw new Error("Cette session est expirée ou n'existe plus.")
    }
    refreshAccounts()
  }

  const useAnotherAccount = () => {
    CitizenAuthService.clearStoredSession()
    setShowAccountPicker(false)
  }

  return (
    <div>
      {!accountsLoaded && (
        <p role="status" className="p-6 text-center text-sm text-slate-600">
          Chargement des comptes enregistrés…
        </p>
      )}
      {storageError && (
        <p
          role="alert"
          className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {storageError}
        </p>
      )}
      {accountsLoaded && showAccountPicker ? (
        <AccountPicker
          accounts={accounts}
          onSelect={chooseAccount}
          onUseAnother={useAnotherAccount}
        />
      ) : accountsLoaded ? (
        <LoginSSO onLoginSuccess={refreshAccounts} />
      ) : null}
    </div>
  )
}
