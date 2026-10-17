import { TicketScreen } from '~/components/tickets/ticket-screen'
import { QueryProvider } from '~/components/ui/query-provider'
import { ticketPath } from '~/data/navigation'
import { TICKET_META } from '~/data/tickets/page'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/tickets.$token'

export const meta: Route.MetaFunction = ({ params }) =>
    buildPageMeta({
        title: TICKET_META.title,
        description: TICKET_META.description,
        path: ticketPath(params.token),
        robots: TICKET_META.robots,
    })

export default function TicketPage({ params: { token } }: Route.ComponentProps) {
    return (
        <QueryProvider>
            <TicketScreen token={token} />
        </QueryProvider>
    )
}
