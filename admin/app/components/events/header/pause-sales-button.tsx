import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { EVENT_HEADER_COPY } from '~/data/events/copy'
import { useUpdateEvent } from '~/hooks/events/mutations'
import type { EventRow } from '~/types/events'

const { pauseConfirm } = EVENT_HEADER_COPY

export function PauseSalesButton({ event }: { event: EventRow }) {
    const [confirming, setConfirming] = useState(false)
    const { mutate, isPending } = useUpdateEvent()

    if (event.sales_paused)
        return (
            <Button
                variant='secondary'
                disabled={isPending}
                onClick={() => mutate({ id: event.id, patch: { sales_paused: false }, notice: 'resumed' })}>
                <Play />
                {EVENT_HEADER_COPY.resume}
            </Button>
        )

    return (
        <>
            <Button
                variant='secondary'
                disabled={isPending}
                onClick={() => setConfirming(true)}>
                <Pause />
                {EVENT_HEADER_COPY.pause}
            </Button>
            <ConfirmDialog
                open={confirming}
                onClose={() => setConfirming(false)}
                {...pauseConfirm}
                confirmLabel={pauseConfirm.confirm}
                pending={isPending}
                onConfirm={() =>
                    mutate(
                        { id: event.id, patch: { sales_paused: true }, notice: 'paused' },
                        { onSuccess: () => setConfirming(false) },
                    )
                }
            />
        </>
    )
}
