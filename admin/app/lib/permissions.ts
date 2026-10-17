import { PERMISSIONS } from '~/data/staff/roles'
import type { Permission, StaffRole } from '~/types/staff'

export function can(role: StaffRole | undefined, permission: Permission) {
    return role !== undefined && (PERMISSIONS[permission] as readonly StaffRole[]).includes(role)
}
