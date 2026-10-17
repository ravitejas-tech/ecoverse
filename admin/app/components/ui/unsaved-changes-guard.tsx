import { useEffect } from 'react'
import { useBlocker } from 'react-router'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { UNSAVED_COPY } from '~/data/ui/unsaved'

export function UnsavedChangesGuard({ dirty }: { dirty: boolean }) {
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) => dirty && currentLocation.pathname !== nextLocation.pathname,
    )

    useEffect(() => {
        if (!dirty) return
        const warn = (event: BeforeUnloadEvent) => event.preventDefault()
        addEventListener('beforeunload', warn)
        return () => removeEventListener('beforeunload', warn)
    }, [dirty])

    return (
        <ConfirmDialog
            open={blocker.state === 'blocked'}
            onClose={() => blocker.reset?.()}
            onConfirm={() => blocker.proceed?.()}
            title={UNSAVED_COPY.title}
            description={UNSAVED_COPY.description}
            confirmLabel={UNSAVED_COPY.confirm}
            danger
        />
    )
}
