import { DetailList } from '~/components/ui/detail-list'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { ORDERS_COPY } from '~/data/orders/copy'
import { PAYMENT_PROVIDER_LABELS } from '~/data/orders/status'
import { formatDateTime, formatRupees } from '~/lib/format'
import type { OrderDetail } from '~/types/orders'

const { detail } = ORDERS_COPY

export function OrderPayment({ order }: { order: OrderDetail }) {
    const provider = order.payment_provider ?? ''
    return (
        <Panel title={detail.payment}>
            <DetailList
                items={[
                    { label: detail.provider, value: PAYMENT_PROVIDER_LABELS[provider] ?? (provider || detail.none) },
                    {
                        label: detail.paymentId,
                        value: order.provider_payment_id ? (
                            <Text
                                as='span'
                                variant='code'
                                className='break-all'>
                                {order.provider_payment_id}
                            </Text>
                        ) : (
                            detail.none
                        ),
                    },
                    { label: detail.paidAt, value: order.paid_at ? formatDateTime(order.paid_at) : detail.none },
                    { label: detail.promo, value: order.promo_codes?.code ?? detail.none },
                    ...(order.refunded_at
                        ? [
                              {
                                  label: detail.refunded,
                                  value: `${formatRupees(order.refund_amount ?? 0)} · ${formatDateTime(order.refunded_at)}`,
                              },
                          ]
                        : []),
                ]}
            />
        </Panel>
    )
}
