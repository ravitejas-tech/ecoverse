import { MailCheck } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { BOOKING_ROW_COPY } from '~/data/account/my-tickets'
import { useResendTickets } from '~/hooks/account/mutations'

export function ResendTicketsButton({ orderId }: { orderId: string }) {
    const resend = useResendTickets()

    return (
        <Button
            type='button'
            variant='ghost'
            size='sm'
            className='-ml-3'
            disabled={resend.isPending}
            aria-busy={resend.isPending}
            onClick={() => resend.mutate(orderId)}>
            {resend.isPending ? <Spinner /> : <MailCheck aria-hidden />}
            {BOOKING_ROW_COPY.resend}
        </Button>
    )
}
