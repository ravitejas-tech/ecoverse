import type { LucideIcon } from 'lucide-react'
import type { Permission } from '~/types/staff'

export interface NavItem {
    label: string
    to: string
    icon: LucideIcon
    permission: Permission
    end?: boolean
}
