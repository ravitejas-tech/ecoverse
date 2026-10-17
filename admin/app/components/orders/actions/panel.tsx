import { useState } from 'react'
import { Ban, Send, Undo2 } from 'lucide-react'
import { CancelOrderDialog } from '~/components/orders/actions/cancel-dialog'
import { RefundOrderDialog } from '~/components/orders/actions/refund-dialog'
import { Button } from '~/components/ui/button'
import { ExternalLinkButton } from '~/components/ui/external-link-button'
import { Panel } from '~/components/ui/panel'
import { ORDERS_COPY } from '~/data/orders/copy'
import { TICKET_PAGE_STATUSES } from '~/data/orders/status'
import { useResendTickets } from '~/hooks/orders/mutations'
import { useCan } from '~/hooks/staff/use-can'
import { canCancel, canRefund, ticketPageUrl } from '~/lib/orders'
import type { OrderDetail } from '~/types/orders'

const { actions } = ORDERS_COPY

export function OrderActions({ order }: { order: OrderDetail }) {
    const [dialog, setDialog] = useState<'cancel' | 'refund' | null>(null)
    const resend = useResendTickets()
    const showRefund = useCan('refundOrders') && canRefund(order)
    const showCancel = useCan('cancelOrders') && canCancel(order)
    const showResend = useCan('resendTickets') && order.status === 'paid' && order.tickets.length > 0
    const showTicketPage = TICKET_PAGE_STATUSES.includes(order.status)
    const closeDialog = () => setDialog(null)

    if (!showRefund && !showCancel && !showResend && !showTicketPage) return null

    return (
        <Panel title={actions.title}>
            <div className='grid gap-3 sm:flex sm:flex-wrap'>
                {showRefund && (
                    <Button
                        variant={order.needs_refund ? 'primary' : 'secondary'}
                        onClick={() => setDialog('refund')}>
                        <Undo2 />
                        {actions.refund}
                    </Button>
                )}
                {showResend && (
                    <Button
                        variant='secondary'
                        disabled={resend.isPending}
                        onClick={() => resend.mutate(order.id)}>
                        <Send />
                        {actions.resend}
                    </Button>
                )}
                {showTicketPage && (
                    <ExternalLinkButton href={ticketPageUrl(order.access_token)}>
                        {actions.ticketPage}
                    </ExternalLinkButton>
                )}
                {showCancel && (
                    <Button
                        variant='danger'
                        onClick={() => setDialog('cancel')}>
                        <Ban />
                        {actions.cancel}
                    </Button>
                )}
            </div>
            {showCancel && (
                <CancelOrderDialog
                    orderId={order.id}
                    open={dialog === 'cancel'}
                    onClose={closeDialog}
                />
            )}
            {showRefund && (
                <RefundOrderDialog
                    orderId={order.id}
                    total={order.total}
                    open={dialog === 'refund'}
                    onClose={closeDialog}
                />
            )}
        </Panel>
    )
}
