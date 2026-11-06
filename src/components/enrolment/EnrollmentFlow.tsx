import { useEnrollmentStore } from "@/stores/enrollment-store"
import EnrollmentStartStep from "./EnrollmentStartStep"
import FacialCaptureStep from "./Biometrie/FacialCaptureStep"
import FacialProfileStep from "./Biometrie/FacialProfileStep"
import IdentificationStep from "./Identity/IdentificationStep"
import IrisCaptureStep from "./Biometrie/IrisCaptureStep"
import FingerprintCaptureStep from "./Biometrie/FingerprintCaptureStep"
import PersonalInformationReviewStep from "./Revue/PersonalInformationReviewStep"
import ImageVerificationStep from "./Revue/ImageVerificationStep"
import FacialImageVerificationStep from "./Revue/FacialImageVerificationStep"
import ConsentStep from "./ConsentStep"

export default function EnrollmentFlow() {
  const enrollmentStore = useEnrollmentStore()

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
      <IrisCaptureStep
        rightEye={enrollmentStore.eyes.right}
        leftEye={enrollmentStore.eyes.left}
        onCapture={enrollmentStore.setEyeImage}
        onBack={() => enrollmentStore.setStep(1)}
        onNext={() => enrollmentStore.setStep(3)}
      />
    )

  if (enrollmentStore.step === 3)
    return (
      <FacialProfileStep
        leftProfile={enrollmentStore.profiles.left}
        rightProfile={enrollmentStore.profiles.right}
        onCapture={enrollmentStore.setProfileImage}
        onBack={() => enrollmentStore.setStep(2)}
        onNext={() => enrollmentStore.setStep(4)}
      />
    )

  if (enrollmentStore.step === 4)
    return (
      <FacialCaptureStep
        image={enrollmentStore.facialImage}
        onCapture={enrollmentStore.setFacialImage}
        onClear={() => enrollmentStore.setFacialImage(null)}
        onBack={() => enrollmentStore.setStep(3)}
        onNext={() => enrollmentStore.setStep(5)}
      />
    )

  if (enrollmentStore.step === 5)
    return (
      <FingerprintCaptureStep
        onBack={() => enrollmentStore.setStep(4)}
        onNext={() => enrollmentStore.setStep(6)}
      />
    )

  if (enrollmentStore.step === 6)
    return (
      <PersonalInformationReviewStep
        onBack={() => enrollmentStore.setStep(5)}
        onNext={() => enrollmentStore.setStep(7)}
      />
    )
  if (enrollmentStore.step === 7)
    return (
      <ImageVerificationStep
        rightEye={enrollmentStore.eyes.right}
        leftEye={enrollmentStore.eyes.left}
        onBack={() => enrollmentStore.setStep(6)}
        onNext={() => enrollmentStore.setStep(8)}
      />
    )

  if (enrollmentStore.step === 8)
    return (
      <FacialImageVerificationStep
        facialImage={enrollmentStore.facialImage}
        leftProfile={enrollmentStore.profiles.left}
        rightProfile={enrollmentStore.profiles.right}
        onBack={() => enrollmentStore.setStep(7)}
        onNext={() => enrollmentStore.setStep(9)}
      />
    )

  return <ConsentStep onBack={() => enrollmentStore.setStep(8)} />
}
