import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { TICKET_COPY } from '~/data/events/page'
import { STATUS_STICKERS } from '~/data/events/status'
import { withOpeningDay } from '~/lib/events'
import { formatRupees } from '~/lib/format'
import type { TicketView } from '~/types/events'

export interface TicketRowProps {
    ticket: TicketView
}

export function TicketRow({ ticket: { name, description, price, admits, status, opensAt } }: TicketRowProps) {
    const statusSticker = status === 'on-sale' ? null : STATUS_STICKERS[status]

    return (
        <PopCard
            asChild
            className='flex items-start justify-between gap-4 p-4 shadow-pop-sm sm:p-5'>
            <li>
                <div className='min-w-0 space-y-2'>
                    <Text
                        as='h3'
                        variant='subtitle'>
                        {name}
                    </Text>
                    {(admits > 1 || statusSticker) && (
                        <div className='flex flex-wrap gap-2'>
                            {admits > 1 && <Sticker tone='lime'>{TICKET_COPY.admits(admits)}</Sticker>}
                            {statusSticker && (
                                <Sticker tone={statusSticker.tone}>
                                    {withOpeningDay(statusSticker.label, status, opensAt)}
                                </Sticker>
                            )}
                        </div>
                    )}
                    {description && (
                        <Text
                            variant='small'
                            tone='secondary'>
                            {description}
                        </Text>
                    )}
                </div>
                <Text
                    variant='price'
                    className='shrink-0'>
                    {formatRupees(price)}
                </Text>
            </li>
        </PopCard>
    )
}
