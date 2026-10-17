import { AccountBar } from '~/components/account/bookings/account-bar'
import { BookingsList } from '~/components/account/bookings/list'
import { SignInCard } from '~/components/account/sign-in/card'
import { Container } from '~/components/ui/container'
import { SectionHeading } from '~/components/ui/section-heading'
import { Skeleton } from '~/components/ui/skeleton'
import { MY_TICKETS_HEADING } from '~/data/account/my-tickets'
import { useSession } from '~/hooks/account/use-session'

export function MyTicketsPage() {
    const { data: session, isPending } = useSession()
    const email = session?.user.email

    return (
        <Container className='max-w-3xl py-8 sm:py-14'>
            <SectionHeading
                level='h1'
                {...MY_TICKETS_HEADING}
                tone='lime'
                className='md:mb-10'
            />
            {isPending && <Skeleton className='h-64 max-w-md rounded-3xl' />}
            {!isPending && !email && <SignInCard />}
            {email && (
                <>
                    <AccountBar email={email} />
                    <BookingsList email={email} />
                </>
            )}
        </Container>
    )
}
