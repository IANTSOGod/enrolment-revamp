type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  badge?: number
}

type AppHeaderProps = {
  title: string
  subtitle?: string
  agentInitials?: string
  notificationCount?: number
}

type AppNotification = {
  id: string
  title: string
  description?: string
  time: string
  read?: boolean
}

type MessageResponse = {
  message: string
  status: number
}

type LoginBase = {
  email: string
  mdp: string
}

type PageShellProps = {
  title: string
  subtitle: string
  caseId?: string
  children: ReactNode
  footer?: ReactNode
}

type StepperProps = {
  currentPhase: number
  activeLabel: string
  nextLabel: string
  filledSegments: number
}

type StepFooterProps = {
  onBack?: () => void
  onSave?: () => void
  onNext?: () => void
  nextDisabled?: boolean
}

type ProcedureId = "new" | "update" | "fix"

type EnrollmentStartStepProps = {
  onStart?: (procedure: ProcedureId) => void
}

type FacialCaptureStepProps = {
  image: string | null
  onCapture?: (image: string) => void
  onClear?: () => void
  onBack?: () => void
  onSave?: () => void
  onNext?: () => void
}

type ProfileSide = "left" | "right"

type ProfilePanelProps = {
  side: ProfileSide
  image: string | null
  onCapture?: (side: ProfileSide, image: string) => void
}

type FacialProfileStepProps = {
  leftProfile: string | null
  rightProfile: string | null
  onCapture?: (side: ProfileSide, image: string) => void
  onBack?: () => void
  onSave?: () => void
  onNext?: () => void
}

type IdentificationStepProps = {
  onBack?: () => void
  onNext?: () => void
  onSave?: () => void
  onScan?: (image: string) => void
  onImport?: (image: string) => void
  image: string | null
}

type IdentityImagePanelProps = {
  image: string | null
  onCapture?: (image: string) => void
  onImport?: (image: string) => void
}

type EyePanelProps = {
  side: EyeSide
  image: string | null
  onCapture?: (side: EyeSide, image: string) => void
}

type IrisCaptureStepProps = {
  rightEye: string | null
  leftEye: string | null
  onCapture?: (side: EyeSide, image: string) => void
  onBack?: () => void
  onSave?: () => void
  onNext?: () => void
}
type EyeSide = "right" | "left"
type IdentityCameraDialogProps = {
  open: boolean
  onClose: () => void
  onCapture?: (image: string) => void
  title?: string
  cropCenter?: boolean
}

type FacialImageVerificationStepProps = {
  facialImage: string | null
  leftProfile: string | null
  rightProfile: string | null
  onBack?: () => void
  onNext?: () => void
}
type ImageVerificationStepProps = {
  rightEye: string | null
  leftEye: string | null
  onBack?: () => void
  onNext?: () => void
}

type LoginEnrolmentProps = {
  heroImageSrc?: string
  onSubmit?: (credentials: {
    identifiant: string
    motDePasse: string
  }) => void | Promise<void>
  onBiometric?: () => void
  onBadgeScan?: () => void
}

type Buser = {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  emailVerified: boolean
  name: string
  image?: string | null | undefined | undefined
}

type LoginResult = {
  user: Buser
}

type Identify = {
  nom: string
  prenom: string
  dateNaissance: string
  lieuNaissance: string
  nomMere: string
  nomPere: string
}

type EnrollmentStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type EnrollmentData = {
  step: EnrollmentStep
  procedure: ProcedureId | null
  identify: Identify
  idImage: string | null
  eyes: Record<EyeSide, string | null>
  profiles: Record<ProfileSide, string | null>
  facialImage: string | null
  facialImageValidated: boolean
  informationConfirmed: boolean
  biometricConsent: boolean
}

type EnrollmentStore = EnrollmentData & {
  setStep: (step: EnrollmentStep) => void
  setProcedure: (procedure: ProcedureId) => void
  setIdentify: (identify: Identify) => void
  setIdImage: (image: string | null) => void
  setEyeImage: (side: EyeSide, image: string | null) => void
  setProfileImage: (side: ProfileSide, image: string | null) => void
  setFacialImage: (image: string | null) => void
  setFacialImageValidated: (validated: boolean) => void
  setInformationConfirmed: (confirmed: boolean) => void
  setBiometricConsent: (consented: boolean) => void
  startEnrollment: (procedure: ProcedureId) => void
  resetEnrollment: () => void
}
