import { CopyPlus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button, type ButtonProps } from '~/components/ui/button'
import { EVENTS_COPY } from '~/data/events/copy'
import { EVENT_PATHS } from '~/data/events/links'
import { useDuplicateEvent } from '~/hooks/events/mutations'

export function DuplicateEventButton({
    eventId,
    size,
    className,
}: { eventId: string } & Pick<ButtonProps, 'size' | 'className'>) {
    const navigate = useNavigate()
    const { mutate, isPending } = useDuplicateEvent()

    return (
        <Button
            variant='secondary'
            size={size}
            className={className}
            disabled={isPending}
            onClick={() => mutate(eventId, { onSuccess: (copyId) => navigate(EVENT_PATHS.detail(copyId)) })}>
            <CopyPlus />
            {EVENTS_COPY.duplicate}
        </Button>
    )
}
