import { useMemo } from 'react'
import { CircleAlert } from 'lucide-react'
import { Link } from 'react-router'
import { BookingGroupList } from '~/components/account/bookings/group'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Notice } from '~/components/ui/notice'
import { Skeleton } from '~/components/ui/skeleton'
import { ACCOUNT_COPY, BOOKING_GROUPS, NO_BOOKINGS } from '~/data/account/my-tickets'
import { PATHS } from '~/data/navigation'
import { useMyBookings } from '~/hooks/account/queries'
import { groupBookings } from '~/lib/account/group-bookings'

export function BookingsList({ email }: { email: string }) {
    const { data, isPending, isError, refetch, dataUpdatedAt } = useMyBookings({ variables: email })
    const groups = useMemo(() => groupBookings(data ?? [], dataUpdatedAt), [data, dataUpdatedAt])

    if (isPending) {
        return (
            <div
                className='space-y-4'
                aria-busy>
                <Skeleton className='h-28 rounded-3xl' />
                <Skeleton className='h-28 rounded-3xl' />
            </div>
        )
    }

    if (isError) {
        return (
            <Notice
                tone='orange'
                icon={CircleAlert}
                title={ACCOUNT_COPY.loadFailed}
                live='polite'
                action={
                    <Button
                        type='button'
                        size='sm'
                        variant='secondary'
                        className='mt-2'
                        onClick={() => void refetch()}>
                        {ACCOUNT_COPY.retry}
                    </Button>
                }
            />
        )
    }

    if (data.length === 0) {
        return (
            <EmptyState
                emoji={NO_BOOKINGS.emoji}
                title={NO_BOOKINGS.title}
                body={NO_BOOKINGS.body}
                action={
                    <Button asChild>
                        <Link to={PATHS.events}>{NO_BOOKINGS.action}</Link>
                    </Button>
                }
            />
        )
    }

    return (
        <div className='space-y-10'>
            {BOOKING_GROUPS.filter(({ key }) => groups[key].length > 0).map(({ key, title, tone }) => (
                <BookingGroupList
                    key={key}
                    group={key}
                    title={title}
                    tone={tone}
                    bookings={groups[key]}
                />
            ))}
        </div>
    )
}
