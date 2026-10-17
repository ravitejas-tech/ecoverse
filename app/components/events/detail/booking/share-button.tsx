import { Share2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { BOOKING_COPY } from '~/data/events/page'
import { eventPath } from '~/data/navigation'
import { formatEventDay } from '~/lib/format'
import { shareLink } from '~/lib/share'
import type { EventSummary } from '~/types/events'

export interface ShareButtonProps {
    event: EventSummary
}

export function ShareButton({ event: { slug, title, startsAt } }: ShareButtonProps) {
    const share = async () => {
        const result = await shareLink({
            title,
            text: BOOKING_COPY.shareText(title, formatEventDay(startsAt)),
            url: `${location.origin}${eventPath(slug)}`,
        })
        if (result === 'shared') return
        const { toast } = await import('react-hot-toast')
        if (result === 'copied') toast.success(BOOKING_COPY.copied)
        if (result === 'failed') toast.error(BOOKING_COPY.copyFailed)
    }

    return (
        <Button
            type='button'
            variant='secondary'
            onClick={() => void share()}>
            <Share2 aria-hidden />
            {BOOKING_COPY.share}
        </Button>
    )
}
