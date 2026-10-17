import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { InviteDialog } from '~/components/team/invite-dialog'
import { TeamTable } from '~/components/team/team-table'
import { Button } from '~/components/ui/button'
import { PageHeader } from '~/components/ui/page-header'
import { Spinner } from '~/components/ui/spinner'
import { TEAM_COPY } from '~/data/team/copy'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useTeam } from '~/hooks/team/queries'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('manageTeam')
    return null
}

export default function Team() {
    const [inviting, setInviting] = useState(false)
    const { data: members } = useTeam()

    return (
        <>
            <PageHeader
                title={TEAM_COPY.title}
                description={TEAM_COPY.description}
                actions={
                    <Button
                        size='lg'
                        onClick={() => setInviting(true)}>
                        <UserPlus />
                        {TEAM_COPY.invite}
                    </Button>
                }
            />
            {members ? <TeamTable members={members} /> : <Spinner label={LOADING_LABEL} />}
            <InviteDialog
                open={inviting}
                onClose={() => setInviting(false)}
            />
        </>
    )
}
