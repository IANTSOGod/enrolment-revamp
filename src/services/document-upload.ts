const baseURL = import.meta.env.VITE_BACK_URL

export function isUploadedDocumentMetadata(
  value: unknown
): value is UploadedDocumentMetadata {
  if (typeof value !== "object" || value === null) return false

  const metadata = value as Record<string, unknown>
  return (
    typeof metadata.checksum === "string" &&
    typeof metadata.file_size === "number" &&
    Number.isFinite(metadata.file_size) &&
    metadata.file_size >= 0 &&
    typeof metadata.mime_type === "string" &&
    typeof metadata.original_filename === "string" &&
    typeof metadata.storage_key === "string" &&
    metadata.storage_key.trim().length > 0
  )
}

function getInvalidMetadataFields(value: unknown): string[] {
  if (typeof value !== "object" || value === null) {
    return [
      "checksum",
      "file_size",
      "mime_type",
      "original_filename",
      "storage_key",
    ]
  }

  const metadata = value as Record<string, unknown>
  return [
    typeof metadata.checksum === "string" ? null : "checksum",
    typeof metadata.file_size === "number" &&
    Number.isFinite(metadata.file_size) &&
    metadata.file_size >= 0
      ? null
      : "file_size",
    typeof metadata.mime_type === "string" ? null : "mime_type",
    typeof metadata.original_filename === "string" ? null : "original_filename",
    typeof metadata.storage_key === "string" &&
    metadata.storage_key.trim().length > 0
      ? null
      : "storage_key",
  ].filter((field): field is string => field !== null)
}

export async function uploadReviewedImage(
  image: string,
  filename: string
): Promise<UploadedDocumentMetadata> {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Vous devez être connecté pour envoyer les images.")
  }

  const imageResponse = await fetch(image)
  if (!imageResponse.ok) {
    throw new Error(`Impossible de préparer l'image « ${filename} ».`)
  }

  const imageBlob = await imageResponse.blob()
  if (!["image/png", "image/jpeg", "image/webp"].includes(imageBlob.type)) {
    throw new Error(`Le format de l'image « ${filename} » n'est pas accepté.`)
  }

  const extension = imageBlob.type.split("/")[1].replace("jpeg", "jpg")
  const formData = new FormData()
  formData.append("file", imageBlob, `${filename}.${extension}`)

  const response = await fetch(`${baseURL}/uploads/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`L'envoi de « ${filename} » a échoué (${response.status}).`)
  }

  const result: unknown = await response.json()
  const documents =
    typeof result === "object" && result !== null
      ? Reflect.get(result, "documents")
      : undefined
  const metadata =
    Array.isArray(documents) && documents.length === 1 ? documents[0] : null

  if (!isUploadedDocumentMetadata(metadata)) {
    console.log("Métadonnées d'upload manquantes ou invalides :", {
      filename,
      fields: getInvalidMetadataFields(metadata),
      metadata,
    })
    throw new Error(
      `Le serveur a accepté « ${filename} », mais ses métadonnées sont invalides. Vérifiez la présence de checksum, file_size, mime_type, original_filename et storage_key.`
    )
  }
  console.log(`Image « ${filename} » envoyée avec succès.`, metadata)
  return metadata
}
