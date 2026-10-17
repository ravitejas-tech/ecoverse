import { Link } from 'react-router'
import { CheckoutHeader, type CheckoutHeaderProps } from '~/components/checkout/header'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { Container } from '~/components/ui/container'
import { EmptyState } from '~/components/ui/empty-state'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { BLOCKED_ACTIONS, BLOCKED_COPY } from '~/data/checkout/blocked'
import { PATHS } from '~/data/navigation'
import { formatEventDay } from '~/lib/format'
import type { BlockedReason } from '~/types/checkout'

export interface CheckoutBlockedProps extends CheckoutHeaderProps {
    reason: BlockedReason
    opensOn: string
}

export function CheckoutBlocked({ event, reason, opensOn }: CheckoutBlockedProps) {
    const { emoji, tone, title, body } = BLOCKED_COPY[reason]

    return (
        <Container className='py-6 sm:py-10 lg:pb-20'>
            <CheckoutHeader event={event} />
            <EmptyState
                emoji={emoji}
                tone={tone}
                title={title}
                body={body(opensOn)}
                action={
                    <ButtonRow
                        align='center'
                        className='mt-2'>
                        <Button asChild>
                            <Link to={PATHS.events}>{BLOCKED_ACTIONS.explore}</Link>
                        </Button>
                        <WhatsAppButton
                            message={WHATSAPP_MESSAGES.eventQuestion(event.title, formatEventDay(event.starts_at))}
                        />
                    </ButtonRow>
                }
            />
        </Container>
    )
}
