const MODEL_URL = "/models/face-api"
const MODEL_NAME = "faceRecognitionNet"
const MODEL_VERSION = "1.7.15"

let modelsLoaded: Promise<void> | null = null
let faceApiModule: Promise<typeof import("@vladmandic/face-api")> | null = null

function getFaceApi() {
  if (!faceApiModule) {
    faceApiModule = import("@vladmandic/face-api")
  }
  return faceApiModule
}

async function loadModels() {
  const faceapi = await getFaceApi()
  if (!modelsLoaded) {
    modelsLoaded = Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ])
      .then(() => undefined)
      .catch((error: unknown) => {
        modelsLoaded = null
        throw error
      })
  }

  await modelsLoaded
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () =>
      reject(new Error("Impossible de lire une image faciale."))
    image.src = source
  })
}

export async function createFaceEmbedding(imageSource: string) {
  await loadModels()
  const faceapi = await getFaceApi()
  const image = await loadImage(imageSource)
  const result = await faceapi
    .detectSingleFace(
      image,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 320,
        scoreThreshold: 0.5,
      })
    )
    .withFaceLandmarks(true)
    .withFaceDescriptor()

  if (!result) {
    throw new Error(
      "Aucun visage exploitable n'a été détecté dans une des photos."
    )
  }

  return {
    modelName: MODEL_NAME,
    modelVersion: MODEL_VERSION,
    embedding: JSON.stringify(Array.from(result.descriptor)),
    detectionConfidence: result.detection.score * 100,
  }
}
