import { ShareButton } from '~/components/events/detail/booking/share-button'
import { Text } from '~/components/ui/text'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { BOOKING_COPY } from '~/data/events/page'
import { formatEventDay } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface HelpActionsProps {
    event: EventSummary
}

export function HelpActions({ event }: HelpActionsProps) {
    return (
        <div className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
                <ShareButton event={event} />
                <WhatsAppButton
                    message={WHATSAPP_MESSAGES.eventQuestion(event.title, formatEventDay(event.startsAt))}
                    label={BOOKING_COPY.ask}
                />
            </div>
            <Text
                variant='small'
                tone='muted'
                className='text-center'>
                {BOOKING_COPY.help}
            </Text>
        </div>
    )
}
