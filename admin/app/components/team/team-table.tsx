import { useState } from 'react'
import { MemberActions } from '~/components/team/member-actions'
import { RoleDialog } from '~/components/team/role-dialog'
import { Badge } from '~/components/ui/badge'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { DataTable } from '~/components/ui/data-table'
import { Text } from '~/components/ui/text'
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from '~/data/staff/roles'
import { TEAM_COPY } from '~/data/team/copy'
import { ROLE_TONES } from '~/data/team/roles'
import { useUpdateStaff } from '~/hooks/team/mutations'
import { useStaff } from '~/hooks/staff/use-staff'
import type { StaffMember } from '~/types/staff'
import type { TableColumn } from '~/types/table'

const { columns, status, deactivateDialog } = TEAM_COPY

export function TeamTable({ members }: { members: StaffMember[] }) {
    const me = useStaff()
    const [editing, setEditing] = useState<{ member: StaffMember; action: 'role' | 'deactivate' } | null>(null)
    const { mutate, isPending } = useUpdateStaff()
    const close = () => setEditing(null)

    const tableColumns: TableColumn<StaffMember>[] = [
        {
            key: 'name',
            header: columns.name,
            cell: (member) => (member.user_id === me.user_id ? `${member.name} (${TEAM_COPY.you})` : member.name),
        },
        { key: 'email', header: columns.email, cell: (member) => member.email, wideOnPhone: true },
        {
            key: 'role',
            header: columns.role,
            cell: (member) => (
                <span className='inline-flex flex-col items-start gap-1 whitespace-normal'>
                    <Badge tone={ROLE_TONES[member.role]}>{ROLE_LABELS[member.role]}</Badge>
                    <Text
                        as='span'
                        variant='small'
                        tone='muted'>
                        {ROLE_DESCRIPTIONS[member.role]}
                    </Text>
                </span>
            ),
            wideOnPhone: true,
        },
        {
            key: 'status',
            header: columns.status,
            cell: (member) => (
                <Badge tone={member.active ? 'lime' : 'muted'}>{member.active ? status.active : status.inactive}</Badge>
            ),
        },
        {
            key: 'actions',
            header: columns.actions,
            cell: (member) => (
                <MemberActions
                    member={member}
                    isMe={member.user_id === me.user_id}
                    onRole={() => setEditing({ member, action: 'role' })}
                    onDeactivate={() => setEditing({ member, action: 'deactivate' })}
                />
            ),
            wideOnPhone: true,
        },
    ]

    return (
        <>
            <DataTable
                columns={tableColumns}
                rows={members}
                rowKey={(member) => member.user_id}
                caption={TEAM_COPY.caption}
            />
            {editing && (
                <RoleDialog
                    member={editing.member}
                    open={editing.action === 'role'}
                    onClose={close}
                />
            )}
            <ConfirmDialog
                open={editing?.action === 'deactivate'}
                onClose={close}
                onConfirm={() =>
                    editing &&
                    mutate({ userId: editing.member.user_id, changes: { active: false } }, { onSuccess: close })
                }
                title={deactivateDialog.title(editing?.member.name ?? '')}
                description={deactivateDialog.description}
                confirmLabel={deactivateDialog.confirm}
                danger
                pending={isPending}
            />
        </>
    )
}
