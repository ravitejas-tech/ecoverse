import { EventLayout } from '~/components/events/detail/event-layout'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { EVENT_LOADING_LABEL } from '~/data/events/page'

export function EventPageSkeleton() {
    return (
        <EventLayout
            asideOnPhones={false}
            main={
                <div
                    role='status'
                    className='space-y-6'>
                    <Text
                        as='span'
                        variant='inherit'
                        className='sr-only'>
                        {EVENT_LOADING_LABEL}
                    </Text>
                    <Skeleton className='h-6 w-28' />
                    <Skeleton className='aspect-video w-full rounded-3xl lg:aspect-auto lg:h-96' />
                    <Skeleton className='h-8 w-40' />
                    <Skeleton className='h-12 w-4/5' />
                    <Skeleton className='h-24 w-full' />
                    <Skeleton className='h-40 w-full rounded-3xl' />
                </div>
            }
            aside={<Skeleton className='h-80 rounded-3xl' />}
        />
    )
}
