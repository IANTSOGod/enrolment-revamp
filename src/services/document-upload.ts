const baseURL = import.meta.env.VITE_BACK_URL

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
    throw new Error(
      `L'envoi de « ${filename} » a échoué (${response.status}).`
    )
  }

  const result: unknown = await response.json()
  const metadata = Array.isArray(result)
    ? result.length === 1
      ? result[0]
      : null
    : result

  if (!metadata || typeof metadata !== "object") {
    throw new Error(
      `Le serveur a accepté « ${filename} », mais sa réponse est invalide.`
    )
  }

  const document = metadata as Record<string, unknown>
  const hasMetadata = [
    "id",
    "storage_key",
    "filename",
    "original_name",
    "original_filename",
    "url",
  ].some((key) => typeof document[key] === "string")
  if (!hasMetadata) {
    throw new Error(
      `Le serveur a accepté « ${filename} », mais n'a pas retourné les métadonnées du document.`
    )
  }

  return metadata as UploadedDocumentMetadata
}
