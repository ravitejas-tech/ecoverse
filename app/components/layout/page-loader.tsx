import { Logo } from '~/components/ui/logo'
import { Skeleton } from '~/components/ui/skeleton'
import { Text } from '~/components/ui/text'
import { PAGE_LOADING_LABEL } from '~/data/layout/loading'

export function PageLoader() {
    return (
        <div
            role='status'
            className='flex min-h-screen flex-col items-center justify-center gap-5'>
            <Logo />
            <Skeleton className='h-3 w-40 rounded-full' />
            <Text
                as='span'
                variant='inherit'
                className='sr-only'>
                {PAGE_LOADING_LABEL}
            </Text>
        </div>
    )
}
