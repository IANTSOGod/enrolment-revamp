import { createFaceEmbedding } from "./face-embedding"

const baseURL = import.meta.env.VITE_BACK_URL
const ocrURL = import.meta.env.VITE_OCR_URL

const IDENTITY_DOCUMENT_TYPE_ID = "e5fd7e09-ccd0-4c4d-b308-6f6879df36cf"

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
  const fileSize = metadata.file_size ?? metadata.size
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
      metadata.original_filename ?? metadata.original_name,
      "nom original du document"
    ),
    mime_type: required(metadata.mime_type, "type MIME du document"),
    file_size: fileSize,
    checksum: required(metadata.checksum, "checksum du document"),
  }
}

function imagePath(metadata: UploadedDocumentMetadata, label: string) {
  return required(
    metadata.storage_key ?? metadata.url,
    `chemin de l'image ${label}`
  )
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

  const faceImages = [
    { key: "face", source: data.facialImage, metadata: face },
    {
      key: "profile gauche",
      source: data.profiles.left,
      metadata: leftProfile,
    },
    {
      key: "profile droit",
      source: data.profiles.right,
      metadata: rightProfile,
    },
  ]
  const faceBiometrics: EnrollmentPayload["face_biometrics"] = []
  for (const { key, source, metadata } of faceImages) {
    const sourceImage = required(source, `image ${key}`)
    const descriptor = await createFaceEmbedding(sourceImage)
    faceBiometrics.push({
      image_file_path: imagePath(metadata, key),
      model_name: descriptor.modelName,
      model_version: descriptor.modelVersion,
      embedding: descriptor.embedding,
      quality_score: descriptor.detectionConfidence,
      face_detected: true,
    })
  }

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
    contacts: location.contact.trim()
      ? [
          {
            type: "PHONE",
            value: location.contact.trim(),
            is_primary: true,
            is_verified: false,
          },
        ]
      : [],
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

  return response.status === 204 ? undefined : response.json()
}

export async function OCRService(formData: FormData) {
  const response = await fetch(`${ocrURL}/extract`, {
    method: "POST",
    body: formData,
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

    throw new Error(
      `L'analyse OCR a échoué (${response.status})${detail ? ` : ${detail}` : "."}`
    )
  }

  const result = await response.json()

  return result as Identify
}
