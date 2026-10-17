import type { PERMISSIONS } from '~/data/staff/roles'
import type { Enums, Tables } from '~/types/database'

export type StaffRole = Enums<'staff_role'>

export type StaffMember = Tables<'staff'>

export type Permission = keyof typeof PERMISSIONS
