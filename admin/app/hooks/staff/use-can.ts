import { useStaff } from '~/hooks/staff/use-staff'
import { can } from '~/lib/permissions'
import type { Permission } from '~/types/staff'

export function useCan(permission: Permission) {
    return can(useStaff().role, permission)
}
