import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Notice } from '~/components/ui/notice'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { NEEDS_REFUND_FILTER } from '~/data/dashboard/orders'
import { ORDER_PARAMS, ORDERS_PATH } from '~/data/orders/query'
import { withParam } from '~/lib/search-params'

const { needsRefund } = DASHBOARD_COPY.orders

export interface RefundAlertProps {
    count: number
    eventId: string | null
}

export function RefundAlert({ count, eventId }: RefundAlertProps) {
    if (count === 0) return null

    const search = withParam(
        new URLSearchParams({ [ORDER_PARAMS.status]: NEEDS_REFUND_FILTER }),
        ORDER_PARAMS.event,
        eventId ?? '',
    )

    return (
        <Notice
            tone='pink'
            title={needsRefund.title(count)}
            action={
                <Button
                    asChild
                    variant='secondary'
                    size='sm'>
                    <Link to={{ pathname: ORDERS_PATH, search: search.toString() }}>{needsRefund.action}</Link>
                </Button>
            }>
            {needsRefund.body}
        </Notice>
    )
}
