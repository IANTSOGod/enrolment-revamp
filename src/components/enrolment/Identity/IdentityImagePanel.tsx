import { useRef, useState, type ChangeEvent } from "react"
import { Camera, Paperclip, Scan } from "lucide-react"
import IdentityCameraDialog from "./IdentityCameraDialog"

type IdentityImagePanelProps = {
  image: string | null
  onCapture?: (image: string) => void
  onImport?: (image: string) => void
}

export default function IdentityImagePanel({
  image,
  onCapture,
  onImport,
}: IdentityImagePanelProps) {
  const [cameraOpen, setCameraOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function importImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ""
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setErrorMessage(
        "Le fichier sélectionné n'est pas une image. Choisissez un fichier image."
      )
      return
    }

    setErrorMessage(null)
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setErrorMessage("Impossible de lire l'image sélectionnée. Réessayez.")
        return
      }
      onImport?.(reader.result)
    }
    reader.onerror = () => {
      setErrorMessage(
        "La lecture de l'image a échoué. Vérifiez le fichier puis réessayez."
      )
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div
        className={
          image
            ? "flex min-h-72 flex-col items-center justify-between gap-3 rounded-lg bg-slate-300 p-3"
            : "mx-auto flex min-h-80 max-w-xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center"
        }
      >
        {image ? (
          <img
            src={image}
            alt="Copie d'identité"
            className="max-h-60 min-h-0 max-w-full flex-1 object-contain"
          />
        ) : (
          <>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Scan size={18} />
            </span>
            <h2 className="mt-4 text-lg font-bold">
              La copie d'identité Malagasy
            </h2>
            <p className="mt-2 max-w-sm text-xs text-slate-500">
              Utilisez le scanner ou la caméra. La zone MRZ et les éléments de
              sécurité seront analysés automatiquement.
            </p>
          </>
        )}
        <div className="mt-3 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setCameraOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Camera size={16} className="text-blue-600" />
            {image ? "Recapturer" : "Photographier la copie d'identité"}
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Paperclip size={16} className="text-blue-600" />
            Importer une image de la copie nationale
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={importImage}
        />
      </div>
      {errorMessage && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
      {cameraOpen && (
        <IdentityCameraDialog
          open={cameraOpen}
          onClose={() => setCameraOpen(false)}
          onCapture={(capturedImage) => {
            onCapture?.(capturedImage)
            setErrorMessage(null)
          }}
        />
      )}
    </>
  )
}
