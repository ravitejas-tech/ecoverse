import { BookingRow } from '~/components/account/bookings/row'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { bookingGroupTitleId } from '~/data/account/my-tickets'
import type { PopTone } from '~/data/ui/pop-tones'
import type { BookingGroup, MyBooking } from '~/types/account'

export interface BookingGroupListProps {
    group: BookingGroup
    title: string
    tone: PopTone
    bookings: MyBooking[]
}

export function BookingGroupList({ group, title, tone, bookings }: BookingGroupListProps) {
    const titleId = bookingGroupTitleId(group)

    return (
        <section
            aria-labelledby={titleId}
            className='space-y-4'>
            <Text
                as='h2'
                id={titleId}
                variant='inherit'>
                <Sticker
                    tone={tone}
                    tilt='left'>
                    {title}
                </Sticker>
            </Text>
            <ul className='space-y-4'>
                {bookings.map((booking) => (
                    <BookingRow
                        key={booking.id}
                        booking={booking}
                        group={group}
                    />
                ))}
            </ul>
        </section>
    )
}
