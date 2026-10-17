import { QuantityStepper } from '~/components/ui/quantity-stepper'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { TICKET_ROW_COPY } from '~/data/checkout/tickets'
import { TICKET_COPY } from '~/data/events/page'
import { STATUS_STICKERS } from '~/data/events/status'
import { isBookable, withOpeningDay } from '~/lib/events'
import { formatRupees } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { TicketOption } from '~/types/checkout'

export interface TicketRowProps {
    option: TicketOption
    quantity: number
    canAdd: boolean
    onChange: (option: TicketOption, delta: 1 | -1) => void
}

export function TicketRow({ option, quantity, canAdd, onChange }: TicketRowProps) {
    const { type, status } = option
    const sticker = status === 'on-sale' ? null : STATUS_STICKERS[status]
    const buyable = isBookable(status)

    return (
        <li className={cn('space-y-3 py-5 first:pt-0 last:pb-0', !buyable && 'opacity-70')}>
            <div className='space-y-1.5'>
                <div className='flex flex-wrap items-center gap-2'>
                    <Text
                        as='h3'
                        variant='title'>
                        {type.name}
                    </Text>
                    {type.admits > 1 && <Sticker tone='lime'>{TICKET_COPY.admits(type.admits)}</Sticker>}
                    {sticker && (
                        <Sticker tone={sticker.tone}>{withOpeningDay(sticker.label, status, type.sales_start)}</Sticker>
                    )}
                </div>
                {type.description && (
                    <Text
                        variant='small'
                        tone='secondary'>
                        {type.description}
                    </Text>
                )}
            </div>
            <div className='flex items-center justify-between gap-4'>
                <Text variant='price'>{formatRupees(type.price)}</Text>
                {buyable && (
                    <QuantityStepper
                        value={quantity}
                        canDecrease={quantity > 0}
                        canIncrease={canAdd}
                        onChange={(delta) => onChange(option, delta)}
                        label={TICKET_ROW_COPY.quantity(type.name)}
                        decreaseLabel={TICKET_ROW_COPY.remove(type.name)}
                        increaseLabel={TICKET_ROW_COPY.add(type.name)}
                    />
                )}
            </div>
        </li>
    )
}
