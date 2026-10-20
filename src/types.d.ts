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
