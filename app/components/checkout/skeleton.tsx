import { Container } from '~/components/ui/container'
import { PopCard } from '~/components/ui/pop-card'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { CHECKOUT_LOADING_LABEL } from '~/data/checkout/page'

export function CheckoutSkeleton() {
    return (
        <Container
            className='pt-4 pb-16 sm:pt-8'
            aria-busy>
            <Text
                variant='inherit'
                className='sr-only'
                role='status'>
                {CHECKOUT_LOADING_LABEL}
            </Text>
            <div className='mb-6 space-y-4 sm:mb-10'>
                <Skeleton className='h-8 w-32' />
                <Skeleton className='h-10 w-3/4 max-w-xl' />
                <Skeleton className='h-5 w-1/2 max-w-sm' />
            </div>
            <div className='grid gap-6 lg:grid-cols-3 lg:gap-8'>
                <PopCard className='space-y-5 p-4 sm:p-6 lg:col-span-2'>
                    <Skeleton className='h-8 w-48' />
                    <Skeleton className='h-20' />
                    <Skeleton className='h-20' />
                    <Skeleton className='h-20' />
                </PopCard>
                <PopCard className='hidden space-y-4 p-6 lg:block'>
                    <Skeleton className='h-8 w-40' />
                    <Skeleton className='h-24' />
                    <Skeleton className='h-14 rounded-full' />
                </PopCard>
            </div>
        </Container>
    )
}
