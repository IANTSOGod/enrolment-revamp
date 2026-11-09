import {
  CalendarDays,
  Clock,
  FileX,
  Landmark,
  MapPin,
  RefreshCw,
  Settings,
  User,
  UserRound,
  CloudUpload,
  FileText,
  Monitor,
  ScanLine,
  Wifi,
  Zap,
} from "lucide-react"

export const navItems: NavItem[] = [
  { title: "Vue d'ensemble", url: "/admin/dashboard", icon: Landmark },
  { title: "Nouvel enrôlement", url: "/admin/enrolmenthome", icon: User },
  { title: "Dossiers & historique", url: "/dossiers", icon: Clock },
  {
    title: "File de synchronisation",
    url: "/synchronisation",
    icon: RefreshCw,
    badge: 3,
  },
  { title: "Paramètres appareil", url: "/parametres", icon: Settings },
]

export const PHASES = [
  { id: 1, title: "Identification", sub: "Citoyen", steps: null },
  { id: 2, title: "Biométrie", sub: "Empreintes & Photo", steps: "3 étapes" },
  {
    id: 3,
    title: "Contrôle & Revue",
    sub: "Données & Validation",
    steps: "2 étapes",
  },
  {
    id: 4,
    title: "Clôture",
    sub: "Consentement & Récépissé",
    steps: "3 étapes",
  },
]

export const TOTAL_SEGMENTS = 11

export const PROCEDURES = [
  {
    id: "new",
    icon: User,
    title: "Nouveau dossier",
    desc: "Première création d'une identité numérique",
  },
  {
    id: "update",
    icon: RefreshCw,
    title: "Mise à jour",
    desc: "Modifier des informations existantes",
  },
  {
    id: "fix",
    icon: FileX,
    title: "Correction",
    desc: "Corriger une donnée après contrôle",
  },
] as const

export const CHECKS = [
  "Le citoyen est présent au guichet",
  "Une pièce d'identité originale est disponible",
  "Les périphériques sont connectés",
]
export const identityFields = [
  { icon: UserRound, label: "Nom", field: "nom" },
  { icon: UserRound, label: "Prénom(s)", field: "prenoms" },
  { icon: CalendarDays, label: "Date de naissance", field: "date_naissance" },
  { icon: MapPin, label: "Lieu de naissance", field: "lieu_naissance" },
  { icon: UserRound, label: "Nom de la mère", field: "nom_mere" },
  { icon: UserRound, label: "Nom du père", field: "nom_pere" },
  { icon: UserRound, label: "Genre", field: "genre" },
]

export const IMAGES = [
  { key: "face", label: "Photo de face" },
  { key: "left", label: "Profil gauche" },
  { key: "right", label: "Profil droit" },
] as const

export const FINGERS = ["Pouce", "Index", "Majeur", "Annulaire", "Auriculaire"]

export const IDENTITY_FIELDS = [
  { label: "Nom", value: "DEMOKAPAHA" },
  { label: "Prénoms", value: "EVLOKICO VLOK" },
  { label: "Genre", value: "MASCULIN" },
]

export const BIRTH_FIELDS = [
  { label: "Date de naissance", value: "21 / 08 / 2000" },
  { label: "Lieu de naissance", value: "CU MAROANTSETRA" },
  { label: "Pays de naissance", value: "Madagascar" },
  { label: "Nationalité", value: "Malagasy" },
]

export const PARENT_FIELDS = [
  { label: "Père", value: "DEMOKAPAHA VLOK" },
  { label: "Mère", value: "SOA KALO" },
]

export const recentEnrolments = [
  {
    reference: "ENR-2026-00428",
    applicant: "Rakoto Jean",
    step: "Vérification documentaire",
    status: "En cours",
  },
  {
    reference: "ENR-2026-00427",
    applicant: "Rasoanaivo Mialy",
    step: "Soumis au registre",
    status: "Validé",
  },
  {
    reference: "ENR-2026-00426",
    applicant: "Andriamihaja Tojo",
    step: "Capture biométrique",
    status: "En cours",
  },
  {
    reference: "ENR-2026-00425",
    applicant: "Raharison Fara",
    step: "Synchronisation",
    status: "En attente",
  },
] as const

export const metrics = [
  {
    label: "Dossiers aujourd'hui",
    value: "28",
    detail: "+12 % vs. hier",
    detailClass: "text-emerald-600",
    icon: FileText,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "En cours",
    value: "7",
    detail: "3 nécessitent votre action",
    detailClass: "text-slate-500",
    icon: Zap,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Soumis au registre",
    value: "19",
    detail: "Taux de réussite 96 %",
    detailClass: "text-emerald-600",
    icon: CloudUpload,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "En attente de sync",
    value: "3",
    detail: "Connexion instable",
    detailClass: "text-orange-700",
    icon: Wifi,
    iconClass: "bg-amber-50 text-amber-600",
  },
] as const

export const operationalServices = [
  {
    name: "Connexion réseau",
    detail: "Stable · 42 Mbps",
    icon: Wifi,
  },
  {
    name: "Identity Registry",
    detail: "Opérationnel",
    icon: Monitor,
  },
  {
    name: "Service documentaire",
    detail: "Opérationnel",
    icon: ScanLine,
  },
  {
    name: "Périphériques",
    detail: "3 sur 3 connectés",
    icon: Monitor,
  },
] as const
