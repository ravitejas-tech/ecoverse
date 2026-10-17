import { ROLE_LABELS } from '~/data/staff/roles'
import { Constants } from '~/types/database'

export const ROLE_OPTIONS = Constants.public.Enums.staff_role.map((role) => ({ value: role, label: ROLE_LABELS[role] }))

export const ROLE_TONES = {
    super_admin: 'pink',
    event_manager: 'violet',
    finance: 'lime',
    marketing: 'orange',
    gate_staff: 'cyan',
    viewer: 'muted',
} as const
