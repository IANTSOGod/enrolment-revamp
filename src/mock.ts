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
  UsersRound,
  VenusAndMars,
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

export const TOTAL_SEGMENTS = 9

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
  { icon: UserRound, label: "Nom" },
  { icon: UserRound, label: "Prénom(s)" },
  { icon: VenusAndMars, label: "Genre" },
  { icon: CalendarDays, label: "Date de naissance" },
  { icon: MapPin, label: "Lieu de naissance" },
  { icon: UserRound, label: "Nom de la mère" },
  { icon: UserRound, label: "Nom du père" },
  { icon: UsersRound, label: "Accompagnateur" },
]

export const IMAGES = [
  { key: "face", label: "Photo de face" },
  { key: "left", label: "Profil gauche" },
  { key: "right", label: "Profil droit" },
] as const

export const FINGERS = ["Pouce", "Index", "Majeur", "Annulaire", "Auriculaire"]

