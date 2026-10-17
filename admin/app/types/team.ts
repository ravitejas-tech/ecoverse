import type { TablesUpdate } from '~/types/database'

export interface StaffChanges {
    userId: string
    changes: Pick<TablesUpdate<'staff'>, 'role' | 'active'>
}
