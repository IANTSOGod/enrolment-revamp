import { useState } from "react"
import EnrollmentStartStep from "./EnrollmentStartStep"
import IdentificationStep from "./IdentificationStep"
import IrisCaptureStep, { type EyeSide } from "./IrisCaptureStep"
import FacialProfileStep, { type ProfileSide } from "./FacialProfileStep"
import FacialCaptureStep from "./FacialCaptureStep"
import FingerprintCaptureStep from "./FingerprintCaptureStep"
import PersonalInformationReviewStep from "./PersonalInformationReviewStep"
import ImageVerificationStep from "./ImageVerificationStep"
import FacialImageVerificationStep from "./FacialImageVerificationStep"
import ConsentStep from "./ConsentStep"

export default function EnrollmentFlow() {
  const [screen, setScreen] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>(0)
  const [idImage, setIdImage] = useState<string | null>(null)
  const [eyes, setEyes] = useState<Record<EyeSide, string | null>>({
    right: null,
    left: null,
  })
  const [profiles, setProfiles] = useState<Record<ProfileSide, string | null>>({
    left: null,
    right: null,
  })
  const [facialImage, setFacialImage] = useState<string | null>(null)

  if (screen === 0) return <EnrollmentStartStep onStart={() => setScreen(1)} />

  if (screen === 1)
    return (
      <IdentificationStep
        image={idImage}
        onScan={setIdImage}
        onImport={setIdImage}
        onBack={() => setScreen(0)}
        onNext={() => setScreen(2)}
      />
    )

  if (screen === 2)
    return (
      <IrisCaptureStep
        rightEye={eyes.right}
        leftEye={eyes.left}
        onCapture={(side: EyeSide, image: string) =>
          setEyes((currentEyes) => ({
            ...currentEyes,
            [side]: image,
          }))
        }
        onBack={() => setScreen(1)}
        onNext={() => setScreen(3)}
      />
    )

  if (screen === 3)
    return (
      <FacialProfileStep
        leftProfile={profiles.left}
        rightProfile={profiles.right}
        onCapture={(side: ProfileSide, image: string) =>
          setProfiles((currentProfiles) => ({
            ...currentProfiles,
            [side]: image,
          }))
        }
        onBack={() => setScreen(2)}
        onNext={() => setScreen(4)}
      />
    )

  if (screen === 4)
    return (
      <FacialCaptureStep
        image={facialImage}
        onCapture={setFacialImage}
        onClear={() => setFacialImage(null)}
        onBack={() => setScreen(3)}
        onNext={() => setScreen(5)}
      />
    )

  if (screen === 5)
    return (
      <FingerprintCaptureStep
        onBack={() => setScreen(4)}
        onNext={() => setScreen(6)}
      />
    )

  if (screen === 6)
    return (
      <PersonalInformationReviewStep
        onBack={() => setScreen(5)}
        onNext={() => setScreen(7)}
      />
    )
  if (screen === 7)
    return (
      <ImageVerificationStep
        rightEye={eyes.right}
        leftEye={eyes.left}
        onBack={() => setScreen(6)}
        onNext={() => setScreen(8)}
      />
    )

  if (screen === 8)
    return (
      <FacialImageVerificationStep
        facialImage={facialImage}
        leftProfile={profiles.left}
        rightProfile={profiles.right}
        onBack={() => setScreen(7)}
        onNext={() => setScreen(9)}
      />
    )

  return <ConsentStep onBack={() => setScreen(8)} />
}
