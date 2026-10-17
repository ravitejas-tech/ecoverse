import { redirect } from 'react-router'
import { AUTH_PATHS, NOT_STAFF_REASON } from '~/data/auth/session'
import { can } from '~/lib/permissions'
import { getSessionUser } from '~/services/auth'
import { getCurrentStaff } from '~/services/staff'
import type { Permission } from '~/types/staff'

export async function requireStaff() {
    const user = await getSessionUser()
    if (!user) throw redirect(AUTH_PATHS.login)
    const staff = await getCurrentStaff(user.id)
    if (!staff) throw redirect(`${AUTH_PATHS.login}?reason=${NOT_STAFF_REASON}`)
    return staff
}

export async function requirePermission(permission: Permission) {
    const staff = await requireStaff()
    if (!can(staff.role, permission)) throw redirect(AUTH_PATHS.home)
    return staff
}
