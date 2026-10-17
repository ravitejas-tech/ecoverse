import { DetailList } from '~/components/ui/detail-list'
import { Panel } from '~/components/ui/panel'
import { TextLink } from '~/components/ui/text-link'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { eventLabel } from '~/lib/community/members'
import type { CommunityMember } from '~/types/community'

const { member: copy, none } = COMMUNITY_COPY

export function MemberDetails({ member }: { member: CommunityMember }) {
    return (
        <Panel title={copy.details}>
            <DetailList
                items={[
                    { label: copy.email, value: <TextLink href={`mailto:${member.email}`}>{member.email}</TextLink> },
                    { label: copy.phone, value: <TextLink href={`tel:${member.phone}`}>{member.phone}</TextLink> },
                    { label: copy.city, value: member.city ?? none },
                    { label: copy.news, value: member.marketing_consent ? copy.newsYes : copy.newsNo },
                    {
                        label: copy.nextEvent,
                        value: eventLabel(member.next_event_title, member.next_event_at) ?? copy.nothingBooked,
                    },
                    { label: copy.lastEvent, value: eventLabel(member.last_event_title, member.last_event_at) ?? none },
                ]}
            />
        </Panel>
    )
}
