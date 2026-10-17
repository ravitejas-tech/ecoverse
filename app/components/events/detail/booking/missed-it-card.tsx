import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { PAST_EVENT_COPY } from '~/data/events/page'
import { PATHS } from '~/data/navigation'

export function MissedItCard() {
    return (
        <EmptyState
            emoji={PAST_EVENT_COPY.emoji}
            title={PAST_EVENT_COPY.title}
            body={PAST_EVENT_COPY.body}
            tone='pink'
            action={
                <Button asChild>
                    <Link to={PATHS.events}>
                        {PAST_EVENT_COPY.cta}
                        <ArrowRight aria-hidden />
                    </Link>
                </Button>
            }
        />
    )
}
