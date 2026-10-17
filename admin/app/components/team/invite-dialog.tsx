import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { RoleField } from '~/components/team/role-field'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { DEFAULT_INVITE_ROLE, TEAM_COPY } from '~/data/team/copy'
import { CONFIRM_DEFAULTS } from '~/data/ui/dialog'
import { useInviteStaff } from '~/hooks/team/mutations'
import { inviteSchema, type InviteValues } from '~/schemas/team'

const { inviteDialog: copy } = TEAM_COPY

export function InviteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { mutate, isPending } = useInviteStaff()
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<InviteValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { name: '', email: '', role: DEFAULT_INVITE_ROLE },
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
            title={copy.title}
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
                        form='invite-form'
                        disabled={isPending}>
                        {copy.submit}
                    </Button>
                </>
            }>
            <form
                id='invite-form'
                noValidate
                className='space-y-5'
                onSubmit={handleSubmit((values) => mutate(values, { onSuccess: close }))}>
                <Field
                    label={copy.name}
                    htmlFor='invite-name'
                    error={errors.name?.message}
                    required>
                    <Input
                        id='invite-name'
                        autoComplete='off'
                        aria-invalid={Boolean(errors.name)}
                        {...register('name')}
                    />
                </Field>
                <Field
                    label={copy.email}
                    htmlFor='invite-email'
                    error={errors.email?.message}
                    required>
                    <Input
                        id='invite-email'
                        type='email'
                        autoComplete='off'
                        aria-invalid={Boolean(errors.email)}
                        {...register('email')}
                    />
                </Field>
                <RoleField
                    id='invite-role'
                    label={copy.role}
                    role={role}
                    registration={register('role')}
                />
            </form>
        </Dialog>
    )
}
