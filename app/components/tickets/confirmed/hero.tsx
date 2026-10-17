import { PopCard } from '~/components/ui/pop-card'
import { SectionHeading } from '~/components/ui/section-heading'
import { Text } from '~/components/ui/text'
import { CONFIRMED_COPY } from '~/data/tickets/page'

export interface BookingHeroProps {
    bookingCode: string
    email: string
}

export function BookingHero({ bookingCode, email }: BookingHeroProps) {
    return (
        <div>
            <SectionHeading
                level='h1'
                eyebrow={CONFIRMED_COPY.sticker}
                title={CONFIRMED_COPY.title}
                lead={CONFIRMED_COPY.lead(email)}
                tone='lime'
                className='mb-6 md:mb-8'
            />
            <PopCard
                tone='yellow'
                tilt='right'
                className='inline-block px-5 py-3'>
                <Text
                    variant='meta'
                    tone='on-pop'>
                    {CONFIRMED_COPY.bookingId}
                </Text>
                <Text
                    variant='title'
                    tone='on-pop'>
                    {bookingCode}
                </Text>
            </PopCard>
        </div>
    )
}
