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
