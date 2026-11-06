const baseURL = import.meta.env.VITE_BACK_URL

export async function EnrollmentService(data: EnrollmentData) {
  const response = await fetch(`${baseURL}/api/enrollment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`L'enregistrement a échoué (${response.status}).`)
  }
}

export async function OCRService(formData: FormData) {
  const response = await fetch(`${baseURL}/api/ocr`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`L'analyse OCR a échoué (${response.status}).`)
  }

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      "La réponse OCR ne contient pas les données d'identité attendues."
    )
  }

  return result as Identify
}
