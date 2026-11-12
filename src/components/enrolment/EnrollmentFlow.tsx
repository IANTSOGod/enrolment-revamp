import { useEnrollmentStore } from "@/stores/enrollment-store"
import EnrollmentStartStep from "./EnrollmentStartStep"
import FacialCaptureStep from "./Biometrie/FacialCaptureStep"
import FacialProfileStep from "./Biometrie/FacialProfileStep"
import IdentificationStep from "./Identity/IdentificationStep"
import LocationStep from "./Identity/LocationStep"
import IrisCaptureStep from "./Biometrie/IrisCaptureStep"
import FingerprintCaptureStep from "./Biometrie/FingerprintCaptureStep"
import PersonalInformationReviewStep from "./Revue/PersonalInformationReviewStep"
import LocationReviewStep from "./Revue/LocationReviewStep"
import ImageVerificationStep from "./Revue/ImageVerificationStep"
import FacialImageVerificationStep from "./Revue/FacialImageVerificationStep"
import ConsentStep from "./ConsentStep"
import ConsentSuccessStep from "./ConsentSuccessStep"
import { useState } from "react"

export default function EnrollmentFlow() {
  const enrollmentStore = useEnrollmentStore()
  const [idEnrollment, setIdEnrollment] = useState<string>("")

  if (idEnrollment) {
    return (
      <ConsentSuccessStep
        onReset={() => {
          setIdEnrollment("")
          enrollmentStore.resetEnrollment()
        }}
        id={idEnrollment}
      />
    )
  }

  if (enrollmentStore.step === 0)
    return <EnrollmentStartStep onStart={enrollmentStore.startEnrollment} />

  if (enrollmentStore.step === 1)
    return (
      <IdentificationStep
        image={enrollmentStore.idImage}
        onScan={enrollmentStore.setIdImage}
        onImport={enrollmentStore.setIdImage}
        onBack={() => enrollmentStore.setStep(0)}
        onNext={() => enrollmentStore.setStep(2)}
      />
    )

  if (enrollmentStore.step === 2)
    return (
      <LocationStep
        onBack={() => enrollmentStore.setStep(1)}
        onNext={() => enrollmentStore.setStep(3)}
      />
    )

  if (enrollmentStore.step === 3)
    return (
      <IrisCaptureStep
        rightEye={enrollmentStore.eyes.right}
        leftEye={enrollmentStore.eyes.left}
        onCapture={enrollmentStore.setEyeImage}
        onBack={() => enrollmentStore.setStep(2)}
        onNext={() => enrollmentStore.setStep(4)}
      />
    )

  if (enrollmentStore.step === 4)
    return (
      <FacialProfileStep
        leftProfile={enrollmentStore.profiles.left}
        rightProfile={enrollmentStore.profiles.right}
        onCapture={enrollmentStore.setProfileImage}
        onBack={() => enrollmentStore.setStep(3)}
        onNext={() => enrollmentStore.setStep(5)}
      />
    )

  if (enrollmentStore.step === 5)
    return (
      <FacialCaptureStep
        image={enrollmentStore.facialImage}
        onCapture={enrollmentStore.setFacialImage}
        onClear={() => enrollmentStore.setFacialImage(null)}
        onBack={() => enrollmentStore.setStep(4)}
        onNext={() => enrollmentStore.setStep(6)}
      />
    )

  if (enrollmentStore.step === 6)
    return (
      <FingerprintCaptureStep
        onBack={() => enrollmentStore.setStep(5)}
        onNext={() => enrollmentStore.setStep(7)}
      />
    )

  if (enrollmentStore.step === 7)
    return (
      <PersonalInformationReviewStep
        onBack={() => enrollmentStore.setStep(6)}
        onNext={() => enrollmentStore.setStep(8)}
      />
    )

  if (enrollmentStore.step === 8)
    return (
      <LocationReviewStep
        onBack={() => enrollmentStore.setStep(7)}
        onNext={() => enrollmentStore.setStep(9)}
      />
    )

  if (enrollmentStore.step === 9)
    return (
      <ImageVerificationStep
        rightEye={enrollmentStore.eyes.right}
        leftEye={enrollmentStore.eyes.left}
        onBack={() => enrollmentStore.setStep(8)}
        onNext={() => enrollmentStore.setStep(10)}
      />
    )

  if (enrollmentStore.step === 10)
    return (
      <FacialImageVerificationStep
        facialImage={enrollmentStore.facialImage}
        leftProfile={enrollmentStore.profiles.left}
        rightProfile={enrollmentStore.profiles.right}
        onBack={() => enrollmentStore.setStep(9)}
        onNext={() => enrollmentStore.setStep(11)}
      />
    )

  if (enrollmentStore.step === 11 && !idEnrollment)
    return (
      <ConsentStep
        onBack={() => enrollmentStore.setStep(10)}
        setIdEnrollment={setIdEnrollment}
      />
    )
  return null
}
