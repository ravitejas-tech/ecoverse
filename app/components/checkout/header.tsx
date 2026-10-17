import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { IconText } from '~/components/ui/icon-text'
import { SectionHeading } from '~/components/ui/section-heading'
import { CHECKOUT_HEADER } from '~/data/checkout/page'
import { eventPath } from '~/data/navigation'
import { eventWhen, eventWhere } from '~/lib/checkout/event-labels'
import type { EventWithTickets } from '~/types/events'

export interface CheckoutHeaderProps {
    event: Pick<EventWithTickets, 'slug' | 'title' | 'tone' | 'starts_at' | 'venue_name' | 'city'>
}

export function CheckoutHeader({ event: { slug, title, tone, starts_at, venue_name, city } }: CheckoutHeaderProps) {
    return (
        <div className='mb-6 space-y-3 sm:mb-10'>
            <Button
                asChild
                variant='ghost'
                size='sm'
                className='-ml-3'>
                <Link to={eventPath(slug)}>
                    <ArrowLeft />
                    {CHECKOUT_HEADER.back}
                </Link>
            </Button>
            <SectionHeading
                level='h1'
                eyebrow={CHECKOUT_HEADER.sticker}
                title={title}
                tone={tone}
                className='mb-0 md:mb-0 md:space-y-4'
            />
            <div className='flex flex-col gap-1 sm:flex-row sm:gap-6'>
                <IconText
                    icon={CalendarDays}
                    variant='label'>
                    <time dateTime={starts_at}>{eventWhen(starts_at)}</time>
                </IconText>
                <IconText
                    icon={MapPin}
                    variant='label'>
                    {eventWhere(venue_name, city)}
                </IconText>
            </div>
        </div>
    )
}
