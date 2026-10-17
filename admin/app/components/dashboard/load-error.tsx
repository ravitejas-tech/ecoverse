import { Button } from '~/components/ui/button'
import { Notice } from '~/components/ui/notice'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'

const { loadError } = DASHBOARD_COPY

export function LoadError({ onRetry }: { onRetry: () => void }) {
    return (
        <Notice
            tone='pink'
            title={loadError.title}
            action={
                <Button
                    variant='secondary'
                    size='sm'
                    onClick={onRetry}>
                    {loadError.retry}
                </Button>
            }>
            {loadError.body}
        </Notice>
    )
}
