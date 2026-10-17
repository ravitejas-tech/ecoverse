import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { RoleField } from '~/components/team/role-field'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { TEAM_COPY } from '~/data/team/copy'
import { CONFIRM_DEFAULTS } from '~/data/ui/dialog'
import { useUpdateStaff } from '~/hooks/team/mutations'
import { roleSchema, type RoleValues } from '~/schemas/team'
import type { StaffMember } from '~/types/staff'

const { roleDialog: copy } = TEAM_COPY

export interface RoleDialogProps {
    member: StaffMember
    open: boolean
    onClose: () => void
}

export function RoleDialog({ member, open, onClose }: RoleDialogProps) {
    const { mutate, isPending } = useUpdateStaff()
    const { register, handleSubmit, reset, control } = useForm<RoleValues>({
        resolver: zodResolver(roleSchema),
        values: { role: member.role },
    })
    const role = useWatch({ control, name: 'role' })

    const close = () => {
        reset()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            title={copy.title(member.name)}
            description={copy.description}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={close}>
                        {CONFIRM_DEFAULTS.cancel}
                    </Button>
                    <Button
                        type='submit'
                        form={`role-form-${member.user_id}`}
                        disabled={isPending || role === member.role}>
                        {copy.submit}
                    </Button>
                </>
            }>
            <form
                id={`role-form-${member.user_id}`}
                noValidate
                onSubmit={handleSubmit((values) =>
                    mutate({ userId: member.user_id, changes: { role: values.role } }, { onSuccess: onClose }),
                )}>
                <RoleField
                    id={`role-${member.user_id}`}
                    label={copy.role}
                    role={role}
                    registration={register('role')}
                />
            </form>
        </Dialog>
    )
}
