import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { formatCount, formatRupees } from '~/lib/format'
import type { DashboardTicketType } from '~/types/dashboard'

const { tickets } = DASHBOARD_COPY

export interface TicketSaleRowProps {
    ticket: DashboardTicketType
    showEvent: boolean
}

export function TicketSaleRow({
    ticket: { name, event_title, sold, quantity, revenue },
    showEvent,
}: TicketSaleRowProps) {
    return (
        <li className='min-w-0 space-y-2'>
            <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                    <Text
                        variant='label'
                        className='truncate'>
                        {name}
                    </Text>
                    {showEvent && (
                        <Text
                            variant='small'
                            tone='muted'
                            className='truncate'>
                            {event_title}
                        </Text>
                    )}
                </div>
                <Text
                    variant='label'
                    className='shrink-0'>
                    {formatRupees(revenue)}
                </Text>
            </div>
            <ProgressBar
                value={sold}
                max={quantity}
                label={tickets.barLabel(event_title, name)}
                size='sm'
            />
            <Text
                variant='small'
                tone='secondary'>
                {tickets.sold(formatCount(sold), formatCount(quantity))}
            </Text>
        </li>
    )
}
