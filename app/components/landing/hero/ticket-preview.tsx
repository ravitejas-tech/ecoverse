import { QrCode } from '~/components/landing/hero/qr-code'
import { Perforation } from '~/components/ui/perforation'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { FEATURED_EVENT } from '~/data/landing/events'
import { SAMPLE_TICKET } from '~/data/landing/ticket'
import { formatEventDay, formatEventTime, formatRupees } from '~/lib/format'

export function TicketPreview() {
    const { title, startsAt, city, priceFrom } = FEATURED_EVENT

    return (
        <PopCard
            tilt='right'
            className='w-full max-w-sm overflow-hidden sm:shadow-pop-lg'>
            <div className='border-b-2 border-border bg-pop-pink px-5 py-3 sm:px-6'>
                <Text
                    variant='sticker'
                    tone='on-pop'>
                    {SAMPLE_TICKET.header}
                </Text>
            </div>
            <div className='space-y-3 p-5 sm:space-y-4 sm:p-6'>
                <Text variant='heading'>{title}</Text>
                <Text
                    variant='label'
                    tone='secondary'>
                    {`${formatEventDay(startsAt)} · ${formatEventTime(startsAt)} · ${city}`}
                </Text>
                <div className='flex items-center gap-3'>
                    <Sticker
                        tone='lime'
                        tilt='left'>
                        {SAMPLE_TICKET.pass}
                    </Sticker>
                    <Text
                        as='span'
                        variant='price'>
                        {formatRupees(priceFrom)}
                    </Text>
                </div>
            </div>
            <Perforation />
            <div className='flex items-center justify-between gap-4 p-5 sm:p-6'>
                <div className='space-y-1'>
                    <Text variant='meta'>{SAMPLE_TICKET.scanHint}</Text>
                    <Text
                        variant='label'
                        className='whitespace-nowrap'>
                        {SAMPLE_TICKET.bookingId}
                    </Text>
                </div>
                <div className='rounded-xl border-2 border-border bg-pop-yellow p-2'>
                    <QrCode />
                </div>
            </div>
        </PopCard>
    )
}
