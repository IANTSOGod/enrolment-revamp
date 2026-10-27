import { useEffect, useRef, useState } from "react"

export const IRIS_CROP_WIDTH_RATIO = 0.3
export const IRIS_CROP_HEIGHT_RATIO = 0.2
export const IRIS_FRAME_POINTS: readonly [number, number][] = [
  [0, 50],
  [7, 36],
  [18, 23],
  [32, 12],
  [50, 5],
  [68, 12],
  [82, 23],
  [93, 36],
  [100, 50],
  [93, 64],
  [82, 77],
  [68, 88],
  [50, 95],
  [32, 88],
  [18, 77],
  [7, 64],
]

function getCameraErrorMessage(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "SecurityError") {
      return "L'accès à la caméra a été refusé. Autorisez la caméra dans votre navigateur puis réessayez."
    }
    if (
      error.name === "NotFoundError" ||
      error.name === "OverconstrainedError"
    ) {
      return "Aucune caméra compatible n'a été trouvée sur cet appareil."
    }
    if (error.name === "NotReadableError") {
      return "La caméra est déjà utilisée par une autre application."
    }
  }
  return error instanceof Error
    ? error.message
    : "Impossible d'accéder à la caméra."
}

export default function useIdentityCamera(
  open: boolean,
  onClose: () => void,
  onCapture?: (image: string) => void,
  cropCenter = false,
  closeAfterCapture = true
) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const starting = open && !stream && !errorMessage

  useEffect(() => {
    if (!open) return
    let cancelled = false
    let cameraStream: MediaStream | null = null

    async function startCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            "La caméra nécessite un navigateur compatible et une connexion sécurisée (HTTPS)."
          )
        }
        cameraStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: { ideal: "environment" } },
        })
        if (cancelled) {
          cameraStream.getTracks().forEach((track) => track.stop())
          return
        }
        setStream(cameraStream)
      } catch (error) {
        if (!cancelled) setErrorMessage(getCameraErrorMessage(error))
      }
    }

    void startCamera()
    return () => {
      cancelled = true
      cameraStream?.getTracks().forEach((track) => track.stop())
    }
  }, [open])

  useEffect(() => {
    if (!stream || !videoRef.current) return
    const video = videoRef.current
    video.srcObject = stream
    void video.play().catch((error: unknown) => {
      setErrorMessage(getCameraErrorMessage(error))
    })
    return () => {
      video.srcObject = null
      stream.getTracks().forEach((track) => track.stop())
    }
  }, [stream])

  function closeCamera() {
    setStream(null)
    onClose()
  }

  function captureImage() {
    const video = videoRef.current
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setErrorMessage(
        "La caméra n'a pas encore fourni d'image. Réessayez dans un instant."
      )
      return
    }
    const cropBase = Math.min(video.videoWidth, video.videoHeight)
    const cropWidth = cropCenter
      ? Math.floor(cropBase * IRIS_CROP_WIDTH_RATIO)
      : video.videoWidth
    const cropHeight = cropCenter
      ? Math.floor(cropBase * IRIS_CROP_HEIGHT_RATIO)
      : video.videoHeight
    const canvas = document.createElement("canvas")
    canvas.width = cropWidth
    canvas.height = cropHeight
    const context = canvas.getContext("2d")
    if (!context) {
      setErrorMessage("Impossible de préparer l'image capturée. Réessayez.")
      return
    }
    if (cropCenter) {
      const cropX = Math.floor((video.videoWidth - cropWidth) / 2)
      const cropY = Math.floor((video.videoHeight - cropHeight) / 2)
      context.beginPath()
      IRIS_FRAME_POINTS.forEach(([x, y], index) => {
        const pointX = (cropWidth * x) / 100
        const pointY = (cropHeight * y) / 100
        if (index === 0) context.moveTo(pointX, pointY)
        else context.lineTo(pointX, pointY)
      })
      context.closePath()
      context.clip()
      context.drawImage(
        video,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      )
    } else {
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
    }
    onCapture?.(canvas.toDataURL(cropCenter ? "image/png" : "image/jpeg", 0.92))
    if (closeAfterCapture) closeCamera()
  }

  return { videoRef, starting, stream, errorMessage, closeCamera, captureImage }
}
