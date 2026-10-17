import { RotateCw } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Spinner } from '~/components/ui/spinner'
import { LOAD_FAILED_COPY } from '~/data/tickets/page'

export interface LoadFailedProps {
    retrying: boolean
    onRetry: () => void
}

export function LoadFailed({ retrying, onRetry }: LoadFailedProps) {
    const { emoji, title, body, action } = LOAD_FAILED_COPY

    return (
        <EmptyState
            level='h1'
            emoji={emoji}
            tone='orange'
            title={title}
            body={body}
            action={
                <Button
                    type='button'
                    onClick={onRetry}
                    disabled={retrying}>
                    {retrying ? <Spinner /> : <RotateCw aria-hidden />}
                    {action}
                </Button>
            }
        />
    )
}
