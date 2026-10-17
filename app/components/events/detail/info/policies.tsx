import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Disclosure } from '~/components/ui/disclosure'
import { Text } from '~/components/ui/text'
import { EVENT_SECTIONS, POLICY_COPY } from '~/data/events/page'
import { PATHS } from '~/data/navigation'
import type { EventDetail } from '~/types/events'

export interface PoliciesProps {
    event: Pick<EventDetail, 'refundPolicy' | 'terms'>
}

export function Policies({ event: { refundPolicy, terms } }: PoliciesProps) {
    const policies = [
        { title: POLICY_COPY.refund, body: refundPolicy, link: POLICY_COPY.siteRefunds, to: PATHS.refundPolicy },
        { title: POLICY_COPY.terms, body: terms, link: POLICY_COPY.siteTerms, to: PATHS.terms },
    ]

    return (
        <DetailBlock title={EVENT_SECTIONS.policies}>
            <div className='space-y-3'>
                {policies.map(({ title, body, link, to }) => (
                    <Disclosure
                        key={title}
                        title={title}>
                        {body && <Text tone='secondary'>{body}</Text>}
                        <AnchorLink
                            to={to}
                            layout='list'
                            className='-ml-1'>
                            {link}
                        </AnchorLink>
                    </Disclosure>
                ))}
            </div>
        </DetailBlock>
    )
}
