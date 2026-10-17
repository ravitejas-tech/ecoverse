import { OrderActions } from '~/components/orders/actions/panel'
import { OrderAnswers } from '~/components/orders/detail/answers'
import { OrderBuyer } from '~/components/orders/detail/buyer'
import { OrderHero } from '~/components/orders/detail/hero'
import { OrderItems } from '~/components/orders/detail/items'
import { OrderNotesForm } from '~/components/orders/detail/notes-form'
import { OrderOrigin } from '~/components/orders/detail/origin'
import { OrderPayment } from '~/components/orders/detail/payment'
import { OrderTickets } from '~/components/orders/detail/tickets'
import { EmptyState } from '~/components/ui/empty-state'
import { Spinner } from '~/components/ui/spinner'
import { ORDERS_COPY } from '~/data/orders/copy'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useOrder } from '~/hooks/orders/queries'
import { requirePermission } from '~/lib/guards'
import type { Route } from './+types/$id'

export async function clientLoader() {
    await requirePermission('viewOrders')
    return null
}

export default function OrderPage({ params }: Route.ComponentProps) {
    const { data: order, isPending } = useOrder({ variables: params.id })

    if (isPending) return <Spinner label={LOADING_LABEL} />
    if (!order) return <EmptyState {...ORDERS_COPY.detail.notFound} />

    return (
        <div className='space-y-6'>
            <OrderHero order={order} />
            <OrderActions order={order} />
            <div className='grid gap-6 lg:grid-cols-2'>
                <div className='space-y-6'>
                    <OrderBuyer order={order} />
                    <OrderAnswers order={order} />
                    <OrderTickets order={order} />
                    <OrderItems order={order} />
                </div>
                <div className='space-y-6'>
                    <OrderPayment order={order} />
                    <OrderOrigin order={order} />
                    <OrderNotesForm order={order} />
                </div>
            </div>
        </div>
    )
}
