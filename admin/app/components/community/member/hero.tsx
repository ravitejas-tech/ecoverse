import { Mail, Phone } from 'lucide-react'
import { MemberBadges } from '~/components/community/member-badges'
import { BackLink } from '~/components/ui/back-link'
import { Button } from '~/components/ui/button'
import { PageHeader } from '~/components/ui/page-header'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { COMMUNITY_PATHS } from '~/data/community/query'
import { memberSummary } from '~/lib/community/members'
import type { CommunityMember } from '~/types/community'

const { member: copy } = COMMUNITY_COPY

export function MemberHero({ member }: { member: CommunityMember }) {
    return (
        <PageHeader
            title={member.name}
            description={memberSummary(member)}
            eyebrow={
                <>
                    <BackLink
                        to={COMMUNITY_PATHS.list}
                        label={copy.back}
                    />
                    <MemberBadges member={member} />
                </>
            }
            actions={
                <>
                    <Button
                        asChild
                        variant='secondary'>
                        <a href={`mailto:${member.email}`}>
                            <Mail />
                            {copy.emailAction}
                        </a>
                    </Button>
                    <Button
                        asChild
                        variant='secondary'>
                        <a href={`tel:${member.phone}`}>
                            <Phone />
                            {copy.callAction}
                        </a>
                    </Button>
                </>
            }
        />
    )
}
