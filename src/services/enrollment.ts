import { createFaceEmbedding } from "./face-embedding"

const baseURL = import.meta.env.VITE_BACK_URL
const ocrURL = `${baseURL}/ocr`

const IDENTITY_DOCUMENT_TYPE_ID = "13fc6b6a-bdd5-41cd-ae99-4c8e5ca99413"

function required(value: string | null | undefined, field: string) {
  const normalized = value?.trim()
  if (!normalized) {
    throw new Error(`Le champ « ${field} » est obligatoire pour l'enrôlement.`)
  }
  return normalized
}

function formatDateOfBirth(value: string) {
  const date = value.trim()
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const localizedDate = /^(\d{2})[/-](\d{2})[/-](\d{4})$/.exec(date)
  const parts = isoDate
    ? [Number(isoDate[1]), Number(isoDate[2]), Number(isoDate[3])]
    : localizedDate
      ? [
          Number(localizedDate[3]),
          Number(localizedDate[2]),
          Number(localizedDate[1]),
        ]
      : null

  if (!parts) {
    throw new Error("La date de naissance doit être au format JJ/MM/AAAA.")
  }

  const [year, month, day] = parts
  const parsedDate = new Date(Date.UTC(year, month - 1, day))
  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day
  ) {
    throw new Error("La date de naissance n'est pas valide.")
  }

  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
}

function normalizeSex(value: string | undefined): "M" | "F" {
  const sex = value?.trim().toLocaleUpperCase()
  if (sex && ["M", "H", "HOMME", "MASCULIN", "MALE"].includes(sex)) return "M"
  if (sex && ["F", "FEMME", "FEMININ", "FÉMININ", "FEMALE"].includes(sex))
    return "F"
  throw new Error("Le genre retourné par l'OCR est absent ou non reconnu.")
}

function toDocumentFile(metadata: UploadedDocumentMetadata) {
  const fileSize = metadata.file_size
  if (
    typeof fileSize !== "number" ||
    !Number.isFinite(fileSize) ||
    fileSize < 0
  ) {
    throw new Error("La taille du fichier d'identité est absente ou invalide.")
  }

  return {
    side: "FRONT" as const,
    storage_key: required(metadata.storage_key, "storage_key du document"),
    original_filename: required(
      metadata.original_filename,
      "nom original du document"
    ),
    mime_type: required(metadata.mime_type, "type MIME du document"),
    file_size: fileSize,
    checksum: required(metadata.checksum, "checksum du document"),
  }
}

function imagePath(metadata: UploadedDocumentMetadata, label: string) {
  return required(metadata.storage_key, `chemin de l'image ${label}`)
}

async function buildEnrollmentPayload(
  data: EnrollmentData
): Promise<EnrollmentPayload> {
  const identify = data.identify
  const location = data.location
  const uploadedImages = data.uploadedImages

  if (!data.informationConfirmed || !data.biometricConsent) {
    throw new Error("Les deux consentements doivent être confirmés.")
  }

  const identityDocument = uploadedImages["identity-document"]
  if (!identityDocument) {
    throw new Error("La pièce d'identité n'a pas encore été envoyée.")
  }
  const leftEye = uploadedImages["iris-left"]
  const rightEye = uploadedImages["iris-right"]
  const face = uploadedImages.face
  const leftProfile = uploadedImages["profile-left"]
  const rightProfile = uploadedImages["profile-right"]
  if (!leftEye || !rightEye || !face || !leftProfile || !rightProfile) {
    throw new Error("Toutes les images biométriques doivent être envoyées.")
  }

  const sourceImage = required(data.facialImage, "image face")
  const descriptor = await createFaceEmbedding(sourceImage)
  const faceBiometrics: EnrollmentPayload["face_biometrics"] = [
    {
      image_file_path: imagePath(face, "face"),
      model_name: descriptor.modelName,
      model_version: descriptor.modelVersion,
      embedding: descriptor.embedding,
      quality_score: descriptor.detectionConfidence,
      face_detected: true,
    },
  ]

  const relationships: EnrollmentPayload["relationships"] = []
  if (identify.nom_pere.trim()) {
    relationships.push({
      related_person_name: identify.nom_pere.trim(),
      relationship_type: "FATHER",
    })
  }
  if (identify.nom_mere.trim()) {
    relationships.push({
      related_person_name: identify.nom_mere.trim(),
      relationship_type: "MOTHER",
    })
  }

  const phone = location.contact.trim()
  const email = location.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("L'adresse e-mail du citoyen n'est pas valide.")
  }

  const contacts: EnrollmentPayload["contacts"] = []
  if (phone) {
    contacts.push({
      type: "PHONE",
      value: phone,
      is_primary: !email,
      is_verified: false,
    })
  }
  if (email) {
    contacts.push({
      type: "EMAIL",
      value: email,
      is_primary: true,
      is_verified: false,
    })
  }

  return {
    person: {
      first_name: required(identify.prenoms, "prénom"),
      last_name: required(identify.nom, "nom"),
      date_of_birth: formatDateOfBirth(
        required(identify.date_naissance, "date de naissance")
      ),
      birth_place: required(identify.lieu_naissance, "lieu de naissance"),
      country_of_birth_id: required(location.country?.id, "pays de naissance"),
      sex: normalizeSex(identify.genre),
    },
    address: {
      house_number: required(location.address, "adresse"),
      fokontany_id: required(location.fokontany?.id, "fokotany"),
      occupancy_type: "OWNER",
    },
    contacts,
    relationships,
    documents: [
      {
        document_type_id: IDENTITY_DOCUMENT_TYPE_ID,
        files: [toDocumentFile(identityDocument)],
      },
    ],
    face_biometrics: faceBiometrics,
    created_offline: false,
    enrolment_type:
      data.procedure === "update"
        ? "UPDATE"
        : data.procedure === "fix"
          ? "CORRECTION"
          : "NEW",
  }
}

export async function EnrollmentService(data: EnrollmentData) {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Vous devez être connecté pour soumettre l'enrôlement.")
  }

  console.log(data)
  const payload = await buildEnrollmentPayload(data)
  const response = await fetch(`${baseURL}/enrolments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`L'enregistrement a échoué (${response.status}).`)
  }

  if (response.status === 204) {
    throw new Error(
      "L'enrôlement a été enregistré, mais le serveur n'a pas retourné sa référence pour le QR code."
    )
  }

  const result: unknown = await response.json()
  const applicationId = getApplicationId(result)
  if (!applicationId) {
    throw new Error(
      "L'enrôlement a été enregistré, mais sa référence est absente de la réponse du serveur."
    )
  }

  return { applicationId }
}

function getApplicationId(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined

  const idKeys = ["applicationId", "application_id", "id"]
  const readId = (value: unknown) => {
    if (typeof value !== "object" || value === null) return undefined
    for (const key of idKeys) {
      const id = Reflect.get(value, key)
      if (typeof id === "string" && id.trim()) return id.trim()
    }
    return undefined
  }

  const directId = readId(result)
  if (directId) return directId

  const application = Reflect.get(result, "application")
  const applicationId = readId(application)
  if (applicationId) return applicationId

  return readId(Reflect.get(result, "data"))
}

export async function OCRService(formData: FormData) {
  console.log("Sending OCR request with formData:", formData)
  const response = await fetch(`${baseURL}/person/fictive`, {
    method: "GET",
    credentials: "include",
    // body: formData,
  })

  if (!response.ok) {
    const responseBody = await response.text()
    let detail = responseBody || response.statusText

    try {
      const errorBody: unknown = JSON.parse(responseBody)

      if (typeof errorBody === "object" && errorBody !== null) {
        const errorDetail = Reflect.get(errorBody, "detail")

        if (typeof errorDetail === "string") {
          detail = errorDetail
        } else if (errorDetail !== undefined) {
          detail = JSON.stringify(errorDetail)
        }
      }
    } catch {
      detail = responseBody || response.statusText
    }

    throw new Error(`L'analyse OCR a échoué (${response.status}) : ${detail}`)
  }

  return (await response.json()) as Identify
}
