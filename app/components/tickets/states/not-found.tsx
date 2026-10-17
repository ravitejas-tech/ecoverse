import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { EmptyState } from '~/components/ui/empty-state'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { PATHS } from '~/data/navigation'
import { NOT_FOUND_COPY } from '~/data/tickets/page'

export function BookingNotFound() {
    const { emoji, title, body, action } = NOT_FOUND_COPY

    return (
        <EmptyState
            level='h1'
            emoji={emoji}
            tone='violet'
            title={title}
            body={body}
            action={
                <ButtonRow
                    align='center'
                    className='mt-2'>
                    <Button asChild>
                        <Link to={PATHS.myTickets}>{action}</Link>
                    </Button>
                    <WhatsAppButton message={WHATSAPP_MESSAGES.help} />
                </ButtonRow>
            }
        />
    )
}
