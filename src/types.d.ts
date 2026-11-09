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
  nextLabel?: string
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
  token: string
}

type Identify = {
  nom: string
  prenoms: string
  date_naissance: string
  lieu_naissance: string
  genre?: string
  nom_mere: string
  nom_pere: string
}

type LocationOption = {
  id: string
  name: string
}

type CountryOption = LocationOption & {
  iso2_code: string
  iso3_code: string
  nationality_name: string
}

type RegionOption = LocationOption & {
  country_id: string
}

type DistrictOption = LocationOption & {
  region_id: string
}

type CommuneOption = LocationOption & {
  district_id: string
}

type FokontanyOption = LocationOption & {
  commune_id: string
}

type LocationSelection = {
  country: CountryOption | null
  region: RegionOption | null
  district: DistrictOption | null
  commune: CommuneOption | null
  fokontany: FokontanyOption | null
  address: string
  contact: string
}

type EnrollmentStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
type ReviewedImageKey =
  | "identity-document"
  | "iris-left"
  | "iris-right"
  | "face"
  | "profile-left"
  | "profile-right"

type UploadedDocumentMetadata = {
  id?: string
  storage_key?: string
  filename?: string
  original_name?: string
  original_filename?: string
  mime_type?: string
  size?: number
  file_size?: number
  checksum?: string
  url?: string
  created_at?: string
}

type EnrollmentPayload = {
  person: {
    first_name: string
    last_name: string
    date_of_birth: string
    birth_place: string
    country_of_birth_id: string
    sex: "M" | "F"
  }
  address: {
    house_number: string
    fokontany_id: string
    occupancy_type: "OWNER"
  }
  contacts: Array<{
    type: "PHONE"
    value: string
    is_primary: true
    is_verified: false
  }>
  relationships: Array<{
    related_person_name: string
    relationship_type: "FATHER" | "MOTHER"
  }>
  documents: Array<{
    document_type_id: string
    files: Array<{
      side: "FRONT"
      storage_key: string
      original_filename: string
      mime_type: string
      file_size: number
      checksum: string
    }>
  }>
  face_biometrics: Array<{
    image_file_path: string
    model_name: string
    model_version: string
    embedding: string
    quality_score: number
    face_detected: true
  }>
  created_offline: false
  enrolment_type: "NEW" | "UPDATE" | "CORRECTION"
}

type EnrollmentData = {
  step: EnrollmentStep
  procedure: ProcedureId | null
  identify: Identify
  location: LocationSelection
  idImage: string | null
  eyes: Record<EyeSide, string | null>
  profiles: Record<ProfileSide, string | null>
  uploadedImages: Partial<Record<ReviewedImageKey, UploadedDocumentMetadata>>
  facialImage: string | null
  facialImageValidated: boolean
  informationConfirmed: boolean
  biometricConsent: boolean
}

type EnrollmentStore = EnrollmentData & {
  setStep: (step: EnrollmentStep) => void
  setProcedure: (procedure: ProcedureId) => void
  setIdentify: (identify: Identify) => void
  setLocation: (location: LocationSelection) => void
  setIdImage: (image: string | null) => void
  setEyeImage: (side: EyeSide, image: string | null) => void
  setProfileImage: (side: ProfileSide, image: string | null) => void
  setUploadedImage: (
    key: ReviewedImageKey,
    metadata: UploadedDocumentMetadata
  ) => void
  setFacialImage: (image: string | null) => void
  setFacialImageValidated: (validated: boolean) => void
  setInformationConfirmed: (confirmed: boolean) => void
  setBiometricConsent: (consented: boolean) => void
  startEnrollment: (procedure: ProcedureId) => void
  resetEnrollment: () => void
}
