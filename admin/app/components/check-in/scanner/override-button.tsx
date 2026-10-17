import { useState } from 'react'
import { DoorOpen } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { CHECK_IN_COPY } from '~/data/check-in/copy'

const { result } = CHECK_IN_COPY

export function OverrideButton({ onConfirm, pending }: { onConfirm: () => void; pending: boolean }) {
    const [open, setOpen] = useState(false)

    return (
        <div onClick={(event) => event.stopPropagation()}>
            <Button
                variant='danger'
                size='lg'
                className='w-full'
                onClick={() => setOpen(true)}>
                <DoorOpen />
                {result.override}
            </Button>
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {
                    setOpen(false)
                    onConfirm()
                }}
                title={result.overrideTitle}
                description={result.overrideBody}
                confirmLabel={result.overrideConfirm}
                pending={pending}
            />
        </div>
    )
}
