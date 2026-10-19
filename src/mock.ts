import { Clock, Landmark, RefreshCw, Settings, User } from "lucide-react"

export const navItems: NavItem[] = [
  { title: "Vue d'ensemble", url: "/admin/dashboard", icon: Landmark },
  { title: "Nouvel enrôlement", url: "/admin/enrolment", icon: User },
  { title: "Dossiers & historique", url: "/dossiers", icon: Clock },
  {
    title: "File de synchronisation",
    url: "/synchronisation",
    icon: RefreshCw,
    badge: 3,
  },
  { title: "Paramètres appareil", url: "/parametres", icon: Settings },
]
