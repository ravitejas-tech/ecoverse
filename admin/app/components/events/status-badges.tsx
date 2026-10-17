import { Badge } from '~/components/ui/badge'
import { eventBadges } from '~/lib/events/status'
import type { EventRow } from '~/types/events'

export function StatusBadges({ event }: { event: EventRow }) {
    return (
        <div className='flex flex-wrap gap-2'>
            {eventBadges(event).map(({ label, tone }) => (
                <Badge
                    key={label}
                    tone={tone}>
                    {label}
                </Badge>
            ))}
        </div>
    )
}
