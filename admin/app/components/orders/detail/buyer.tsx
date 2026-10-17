import { UserRound } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { DetailList } from '~/components/ui/detail-list'
import { Panel } from '~/components/ui/panel'
import { TextLink } from '~/components/ui/text-link'
import { COMMUNITY_PATHS } from '~/data/community/query'
import { ORDERS_COPY } from '~/data/orders/copy'
import type { OrderDetail } from '~/types/orders'

const { detail } = ORDERS_COPY

export function OrderBuyer({ order }: { order: OrderDetail }) {
    return (
        <Panel
            title={detail.buyer}
            action={
                <Button
                    asChild
                    variant='ghost'
                    size='sm'>
                    <Link to={COMMUNITY_PATHS.member(order.customer_id)}>
                        <UserRound />
                        {detail.profile}
                    </Link>
                </Button>
            }>
            <DetailList
                items={[
                    { label: detail.name, value: order.name },
                    { label: detail.email, value: <TextLink href={`mailto:${order.email}`}>{order.email}</TextLink> },
                    { label: detail.phone, value: <TextLink href={`tel:${order.phone}`}>{order.phone}</TextLink> },
                ]}
            />
        </Panel>
    )
}
