import { CheckInEventCard } from '~/components/check-in/events/event-card'
import { PastEvents } from '~/components/check-in/events/past-events'
import { EmptyState } from '~/components/ui/empty-state'
import { PageHeader } from '~/components/ui/page-header'
import { Spinner } from '~/components/ui/spinner'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useCheckInEvents } from '~/hooks/check-in/queries'
import { requirePermission } from '~/lib/guards'

const { events: copy } = CHECK_IN_COPY

export async function clientLoader() {
    await requirePermission('checkIn')
    return null
}

export default function CheckInEvents() {
    const { data, isPending } = useCheckInEvents()

    return (
        <>
            <PageHeader
                title={copy.title}
                description={copy.description}
            />
            {isPending || !data ? (
                <Spinner label={LOADING_LABEL} />
            ) : (
                <div className='space-y-8'>
                    {data.upcoming.length === 0 ? (
                        <EmptyState {...copy.empty} />
                    ) : (
                        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                            {data.upcoming.map((event) => (
                                <CheckInEventCard
                                    key={event.id}
                                    event={event}
                                    today={data.today.has(event.id)}
                                />
                            ))}
                        </div>
                    )}
                    <PastEvents events={data.past} />
                </div>
            )}
        </>
    )
}
