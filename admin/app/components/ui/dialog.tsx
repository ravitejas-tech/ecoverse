import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { DIALOG_CLOSE_LABEL } from '~/data/ui/dialog'

export interface DialogProps {
    open: boolean
    onClose: () => void
    title: string
    description?: string
    children?: ReactNode
    footer?: ReactNode
}

export function Dialog({ open, onClose, title, description, children, footer }: DialogProps) {
    const ref = useRef<HTMLDialogElement>(null)
    const titleId = useId()

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onCancel={onClose}
            aria-labelledby={titleId}
            className='m-auto w-11/12 max-w-lg rounded-2xl border-2 border-border bg-surface p-0 text-text-primary shadow-pop motion-safe:animate-pop-in backdrop:bg-on-pop/60'>
            <div className='sticky top-0 z-10 flex items-start justify-between gap-4 border-b-2 border-border bg-surface px-5 py-4'>
                <div className='space-y-1'>
                    <Text
                        as='h2'
                        id={titleId}
                        variant='title'>
                        {title}
                    </Text>
                    {description && (
                        <Text
                            variant='small'
                            tone='secondary'>
                            {description}
                        </Text>
                    )}
                </div>
                <Button
                    variant='ghost'
                    size='icon-sm'
                    onClick={onClose}
                    aria-label={DIALOG_CLOSE_LABEL}>
                    <X />
                </Button>
            </div>
            {children && <div className='px-5 py-5'>{children}</div>}
            {footer && (
                <div className='sticky bottom-0 z-10 flex flex-col-reverse gap-3 border-t-2 border-border bg-surface px-5 py-4 sm:flex-row sm:justify-end'>
                    {footer}
                </div>
            )}
        </dialog>
    )
}
