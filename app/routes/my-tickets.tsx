import { QueryProvider } from '~/components/ui/query-provider'
import { MyTicketsPage } from '~/components/account/page'
import { MY_TICKETS_META } from '~/data/account/my-tickets'
import { PATHS } from '~/data/navigation'
import { buildPageMeta } from '~/lib/seo/meta'

export const meta = () =>
    buildPageMeta({
        title: MY_TICKETS_META.title,
        description: MY_TICKETS_META.description,
        path: PATHS.myTickets,
        robots: MY_TICKETS_META.robots,
    })

export default function MyTickets() {
    return (
        <QueryProvider>
            <MyTicketsPage />
        </QueryProvider>
    )
}
