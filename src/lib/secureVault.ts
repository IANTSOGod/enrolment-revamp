/**
 * Coffre local : chiffre une donnée sensible avec un code PIN / mot de passe de poste (Web Crypto).
 * - AES-GCM 256 bits, clé dérivée du PIN par PBKDF2 (310 000 itérations, sel aléatoire).
 * - La clé n'est jamais stockée : seul le « coffre » chiffré l'est.
 * Limite : protège le stockage au repos, pas contre un script qui s'exécute pendant que le coffre est ouvert.
 */

const enc = new TextEncoder()
const dec = new TextDecoder()

const toB64 = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
const fromB64 = (s: string): Uint8Array<ArrayBuffer> => {
  const binary = atob(s)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

export interface Vault {
  salt: string
  iv: string
  data: string
}

async function deriveKey(pin: string, salt: Uint8Array<ArrayBuffer>) {
  const base = await crypto.subtle.importKey(
    "raw",
    enc.encode(pin),
    "PBKDF2",
    false,
    ["deriveKey"]
  )
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 310_000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false, // clé non exportable
    ["encrypt", "decrypt"]
  )
}

/** Chiffre une donnée sensible avant son stockage dans localStorage. */
export async function lock(token: string, pin: string): Promise<Vault> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(pin, salt)
  const data = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(token)
  )
  return { salt: toB64(salt), iv: toB64(iv), data: toB64(data) }
}

/** Déchiffre une donnée. Lève une erreur si le PIN est faux ou si le coffre a été modifié. */
export async function unlock(vault: Vault, pin: string): Promise<string> {
  console.log("vault", vault, pin)
  try {
    const key = await deriveKey(pin, fromB64(vault.salt))
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromB64(vault.iv) },
      key,
      fromB64(vault.data)
    )
    return dec.decode(plain)
  } catch {
    throw new Error("Code PIN incorrect.")
  }
}
