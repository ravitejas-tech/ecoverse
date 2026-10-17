import type { UseFormRegisterReturn } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Select } from '~/components/ui/select'
import { ROLE_DESCRIPTIONS } from '~/data/staff/roles'
import { ROLE_OPTIONS } from '~/data/team/roles'
import type { StaffRole } from '~/types/staff'

export interface RoleFieldProps {
    id: string
    label: string
    role: StaffRole
    registration: UseFormRegisterReturn<'role'>
}

export function RoleField({ id, label, role, registration }: RoleFieldProps) {
    return (
        <Field
            label={label}
            htmlFor={id}
            hint={ROLE_DESCRIPTIONS[role]}
            required>
            <Select
                id={id}
                options={ROLE_OPTIONS}
                {...registration}
            />
        </Field>
    )
}
