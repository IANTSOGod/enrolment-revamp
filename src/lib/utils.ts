import { navItems } from "@/mock"
import { useState, useEffect } from "react"
export { cn } from "cn"

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api"

export function associateurl(url: string) {
  const item = navItems.find((item) => item.url === url)
  return item?.title
}

export function useOnlineStatus() {
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  )

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener("online", on)
    window.addEventListener("offline", off)
    return () => {
      window.removeEventListener("online", on)
      window.removeEventListener("offline", off)
    }
  }, [])

  return online
}

export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })

  if (!res.ok) {
    throw new Error(`Erreur ${res.status} : ${res.statusText}`)
  }

  return res.status === 204 ? (undefined as T) : res.json()
}
