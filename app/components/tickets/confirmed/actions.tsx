import { CalendarPlus, MessageCircle, Printer } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { TextLink } from '~/components/ui/text-link'
import { PATHS } from '~/data/navigation'
import { TICKET_ACTIONS_COPY } from '~/data/tickets/ticket'
import { useTicketActions } from '~/hooks/tickets/use-ticket-actions'
import type { Booking } from '~/types/booking'

export interface TicketActionsProps {
    accessToken: string
    booking: Booking
}

export function TicketActions({ accessToken, booking }: TicketActionsProps) {
    const { shareOnWhatsApp, addToCalendar, print } = useTicketActions(accessToken, booking)

    return (
        <div className='space-y-5 print:hidden'>
            <ButtonRow>
                <Button
                    type='button'
                    variant='sunny'
                    onClick={shareOnWhatsApp}>
                    <MessageCircle aria-hidden />
                    {TICKET_ACTIONS_COPY.whatsapp}
                </Button>
                <Button
                    type='button'
                    variant='secondary'
                    onClick={addToCalendar}>
                    <CalendarPlus aria-hidden />
                    {TICKET_ACTIONS_COPY.calendar}
                </Button>
                <Button
                    type='button'
                    variant='secondary'
                    className='hidden sm:inline-flex'
                    onClick={print}>
                    <Printer aria-hidden />
                    {TICKET_ACTIONS_COPY.print}
                </Button>
            </ButtonRow>
            <TextLink to={PATHS.myTickets}>{TICKET_ACTIONS_COPY.myTickets}</TextLink>
        </div>
    )
}
