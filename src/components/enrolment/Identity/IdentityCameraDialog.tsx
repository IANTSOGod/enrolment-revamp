import { useState } from "react"
import { Camera, X } from "lucide-react"
import useIdentityCamera, {
  IRIS_CROP_HEIGHT_RATIO,
  IRIS_FRAME_POINTS,
  IRIS_CROP_WIDTH_RATIO,
} from "./useIdentityCamera"

type IdentityCameraDialogProps = {
  open: boolean
  onClose: () => void
  onCapture?: (image: string) => void
  title?: string
  cropCenter?: boolean
}

export default function IdentityCameraDialog({
  open,
  onClose,
  onCapture,
  title = "Photographier la copie d'identité",
  cropCenter = false,
}: IdentityCameraDialogProps) {
  const [videoDimensions, setVideoDimensions] = useState<{
    width: number
    height: number
  } | null>(null)
  const {
    videoRef,
    starting,
    stream,
    errorMessage,
    closeCamera,
    captureImage,
  } = useIdentityCamera(open, onClose, onCapture, cropCenter)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="identity-camera-title"
        className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="identity-camera-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={closeCamera}
            aria-label="Fermer la caméra"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div
          className={
            cropCenter
              ? "relative mx-auto w-full max-w-sm overflow-hidden bg-slate-950"
              : "relative mx-auto w-full overflow-hidden rounded-xl bg-slate-950"
          }
          style={
            cropCenter
              ? {
                  aspectRatio: `${IRIS_CROP_WIDTH_RATIO} / ${IRIS_CROP_HEIGHT_RATIO}`,
                  maxWidth: "min(24rem, 65vh)",
                  clipPath: `polygon(${IRIS_FRAME_POINTS.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
                }
              : videoDimensions
                ? {
                    aspectRatio: `${videoDimensions.width} / ${videoDimensions.height}`,
                    maxHeight: "65vh",
                  }
                : undefined
          }
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            aria-label="Aperçu de la caméra"
            onLoadedMetadata={(event) =>
              setVideoDimensions({
                width: event.currentTarget.videoWidth,
                height: event.currentTarget.videoHeight,
              })
            }
            className={
              cropCenter && videoDimensions
                ? "absolute top-1/2 left-1/2 block max-w-none -translate-x-1/2 -translate-y-1/2"
                : cropCenter
                  ? "block h-full w-full object-contain"
                  : "block max-h-[65vh] min-h-48 w-full object-contain"
            }
            style={
              cropCenter && videoDimensions
                ? {
                    width: `${(videoDimensions.width / Math.floor(Math.min(videoDimensions.width, videoDimensions.height) * IRIS_CROP_WIDTH_RATIO)) * 100}%`,
                  }
                : undefined
            }
          />
          {cropCenter && (
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <polygon
                points={IRIS_FRAME_POINTS.map(([x, y]) => `${x},${y}`).join(
                  " "
                )}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </div>
        {cropCenter && (
          <p className="mt-3 text-sm text-slate-600">
            Centrez l’œil dans le cadre. Seule cette zone sera affichée et
            capturée.
          </p>
        )}
        {starting && (
          <p className="mt-3 text-sm text-slate-500">Connexion à la caméra…</p>
        )}
        {errorMessage && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={captureImage}
            disabled={starting || !stream}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <Camera size={16} />
            Capturer l'image
          </button>
        </div>
      </div>
    </div>
  )
}
