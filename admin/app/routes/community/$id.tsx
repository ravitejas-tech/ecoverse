import { MemberBookings } from '~/components/community/member/bookings'
import { MemberDetails } from '~/components/community/member/details'
import { MemberHero } from '~/components/community/member/hero'
import { EmptyState } from '~/components/ui/empty-state'
import { Spinner } from '~/components/ui/spinner'
import { StatCardGrid } from '~/components/ui/stat-card-grid'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { MEMBER_STAT_CARDS } from '~/data/community/stat-cards'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useCommunityMember } from '~/hooks/community/queries'
import { requirePermission } from '~/lib/guards'
import type { Route } from './+types/$id'

export async function clientLoader() {
    await requirePermission('viewCommunity')
    return null
}

export default function CommunityMemberPage({ params }: Route.ComponentProps) {
    const { data: member, isPending } = useCommunityMember({ variables: params.id })

    if (isPending) return <Spinner label={LOADING_LABEL} />
    if (!member) return <EmptyState {...COMMUNITY_COPY.member.notFound} />

    return (
        <div className='space-y-6'>
            <MemberHero member={member} />
            <StatCardGrid
                cards={MEMBER_STAT_CARDS}
                source={member}
            />
            <div className='grid items-start gap-6 xl:grid-cols-3'>
                <MemberDetails member={member} />
                <div className='min-w-0 xl:col-span-2'>
                    <MemberBookings customerId={member.id} />
                </div>
            </div>
        </div>
    )
}
