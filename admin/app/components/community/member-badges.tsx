import { Badge } from '~/components/ui/badge'
import { memberBadges } from '~/lib/community/members'
import type { CommunityMember } from '~/types/community'

export function MemberBadges({ member }: { member: Pick<CommunityMember, 'is_new' | 'is_regular'> }) {
    const badges = memberBadges(member)
    if (badges.length === 0) return null

    return (
        <span className='flex flex-wrap gap-1.5'>
            {badges.map(({ key, label, tone }) => (
                <Badge
                    key={key}
                    tone={tone}>
                    {label}
                </Badge>
            ))}
        </span>
    )
}
