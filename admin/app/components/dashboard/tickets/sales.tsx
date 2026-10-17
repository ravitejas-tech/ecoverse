import { TicketSaleRow } from '~/components/dashboard/tickets/sale-row'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import type { DashboardTicketType } from '~/types/dashboard'

const { tickets: copy } = DASHBOARD_COPY

export interface TicketSalesProps {
    tickets: DashboardTicketType[]
    showEvent: boolean
}

export function TicketSales({ tickets, showEvent }: TicketSalesProps) {
    return (
        <Panel title={copy.title}>
            {tickets.length === 0 ? (
                <Text tone='secondary'>{copy.empty}</Text>
            ) : (
                <ul className='grid gap-x-8 gap-y-5 md:grid-cols-2'>
                    {tickets.map((ticket) => (
                        <TicketSaleRow
                            key={ticket.id}
                            ticket={ticket}
                            showEvent={showEvent}
                        />
                    ))}
                </ul>
            )}
        </Panel>
    )
}
