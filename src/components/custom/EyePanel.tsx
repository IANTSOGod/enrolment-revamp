import { Camera, Scan } from "lucide-react"
import { useState } from "react"
import IdentityCameraDialog from "../enrolment/Identity/IdentityCameraDialog"

export default function EyePanel({ side, image, onCapture }: EyePanelProps) {
  const [cameraOpen, setCameraOpen] = useState(false)
  const label = side === "right" ? "droit" : "gauche"

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-slate-200 p-4 md:p-6">
      <div className="flex aspect-square w-full max-w-48 items-center justify-center overflow-hidden bg-white">
        {image ? (
          <img
            src={image}
            alt={`Capture de l'œil ${label}`}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="flex h-12 w-20 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Scan size={16} />
          </span>
        )}
      </div>
      <div className="mt-6 flex w-full max-w-64 justify-center">
        <button
          type="button"
          onClick={() => setCameraOpen(true)}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Camera size={16} className="shrink-0 text-slate-800" />
          <span>
            {image ? "Recapturer" : "Capturer"} l'iris {label}
          </span>
        </button>
      </div>
      <IdentityCameraDialog
        open={cameraOpen}
        title={`Photographier l'œil ${label}`}
        cropCenter
        onClose={() => setCameraOpen(false)}
        onCapture={(capturedImage) => onCapture?.(side, capturedImage)}
      />
    </div>
  )
}
