import {
    CalendarDays,
    HeartHandshake,
    History,
    Images,
    LayoutDashboard,
    Receipt,
    ScanLine,
    TicketPercent,
    Users,
} from 'lucide-react'
import type { NavItem } from '~/types/navigation'

export const NAV_ITEMS: readonly NavItem[] = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, permission: 'viewReports', end: true },
    { label: 'Events', to: '/events', icon: CalendarDays, permission: 'viewEvents' },
    { label: 'Orders', to: '/orders', icon: Receipt, permission: 'viewOrders' },
    { label: 'Community', to: '/community', icon: HeartHandshake, permission: 'viewCommunity' },
    { label: 'Check-in', to: '/check-in', icon: ScanLine, permission: 'checkIn' },
    { label: 'Promo codes', to: '/promo-codes', icon: TicketPercent, permission: 'viewPromoCodes' },
    { label: 'Gallery', to: '/gallery', icon: Images, permission: 'manageGallery' },
    { label: 'Team', to: '/team', icon: Users, permission: 'manageTeam' },
    { label: 'Activity', to: '/activity', icon: History, permission: 'viewActivity' },
]

export const SHELL_COPY = {
    navLabel: 'Admin',
    productBadge: 'Admin',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    signOut: 'Sign out',
    openWebsite: 'Open website',
} as const
