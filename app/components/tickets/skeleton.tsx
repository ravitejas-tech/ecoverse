import { PopCard } from '~/components/ui/pop-card'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { TICKET_LOADING_LABEL } from '~/data/tickets/page'

export function TicketPageSkeleton() {
    return (
        <div
            className='space-y-8'
            aria-busy>
            <Text
                variant='inherit'
                className='sr-only'
                role='status'>
                {TICKET_LOADING_LABEL}
            </Text>
            <div className='space-y-4'>
                <Skeleton className='h-8 w-44 rounded-full' />
                <Skeleton className='h-12 w-2/3 max-w-md' />
                <Skeleton className='h-6 w-5/6 max-w-xl' />
            </div>
            <PopCard className='w-4/5 max-w-sm space-y-4 p-5'>
                <Skeleton className='h-7 w-3/4' />
                <Skeleton className='h-5 w-1/2' />
                <Skeleton className='mx-auto aspect-square w-full max-w-56' />
            </PopCard>
        </div>
    )
}
