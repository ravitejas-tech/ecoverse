import { StackedCell } from '~/components/ui/stacked-cell'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { formatDate } from '~/lib/format'

export function EventCell({ title, startsAt }: { title: string | null; startsAt: string | null }) {
    if (!title || !startsAt) return COMMUNITY_COPY.none

    return (
        <StackedCell
            main={title}
            sub={formatDate(startsAt)}
        />
    )
}
