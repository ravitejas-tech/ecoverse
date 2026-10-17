import { UserCheck, UserCog, UserX } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { TEAM_COPY } from '~/data/team/copy'
import { useUpdateStaff } from '~/hooks/team/mutations'
import type { StaffMember } from '~/types/staff'

const { actions } = TEAM_COPY

export interface MemberActionsProps {
    member: StaffMember
    isMe: boolean
    onRole: () => void
    onDeactivate: () => void
}

export function MemberActions({ member, isMe, onRole, onDeactivate }: MemberActionsProps) {
    const { mutate, isPending } = useUpdateStaff()

    if (isMe) {
        return (
            <Text
                as='span'
                variant='small'
                tone='muted'>
                {TEAM_COPY.selfNote}
            </Text>
        )
    }

    return (
        <span className='flex flex-wrap gap-2'>
            <Button
                variant='secondary'
                size='sm'
                onClick={onRole}>
                <UserCog />
                {actions.role}
            </Button>
            {member.active ? (
                <Button
                    variant='secondary'
                    size='sm'
                    onClick={onDeactivate}>
                    <UserX />
                    {actions.deactivate}
                </Button>
            ) : (
                <Button
                    variant='secondary'
                    size='sm'
                    disabled={isPending}
                    onClick={() => mutate({ userId: member.user_id, changes: { active: true } })}>
                    <UserCheck />
                    {actions.reactivate}
                </Button>
            )}
        </span>
    )
}
