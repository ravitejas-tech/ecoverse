import { QrCode } from '~/components/landing/hero/qr-code'
import { Perforation } from '~/components/ui/perforation'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { TicketStrip } from '~/components/ui/ticket-strip'
import { SAMPLE_TICKET } from '~/data/landing/ticket'
import { formatEventDay, formatEventTime, formatRupees } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface TicketPreviewProps {
    event?: EventSummary
}

export function TicketPreview({ event }: TicketPreviewProps) {
    const when = event
        ? `${formatEventDay(event.startsAt)} · ${formatEventTime(event.startsAt)} · ${event.city}`
        : SAMPLE_TICKET.fallbackWhen

    return (
        <PopCard
            tilt='right'
            className='w-full max-w-sm overflow-hidden sm:shadow-pop-lg'>
            <TicketStrip tone='pink'>
                <Text
                    variant='sticker'
                    tone='on-pop'>
                    {SAMPLE_TICKET.header}
                </Text>
            </TicketStrip>
            <div className='space-y-3 p-5 sm:space-y-4 sm:p-6'>
                <Text variant='heading'>{event?.title ?? SAMPLE_TICKET.fallbackTitle}</Text>
                <Text
                    variant='label'
                    tone='secondary'>
                    {when}
                </Text>
                <div className='flex items-center gap-3'>
                    <Sticker
                        tone='lime'
                        tilt='left'>
                        {event?.categoryLabel ?? SAMPLE_TICKET.pass}
                    </Sticker>
                    {event?.priceFrom != null && (
                        <Text
                            as='span'
                            variant='price'>
                            {formatRupees(event.priceFrom)}
                        </Text>
                    )}
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
