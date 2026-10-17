import { useEffect, useRef, type ReactNode } from 'react'

export interface SheetProps {
    open: boolean
    onClose: () => void
    labelledBy: string
    dismissible?: boolean
    children: ReactNode
}

export function Sheet({ open, onClose, labelledBy, dismissible = true, children }: SheetProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (open && !dialog?.open) dialog?.showModal()
        if (!open && dialog?.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={labelledBy}
            onClose={onClose}
            onCancel={(event) => !dismissible && event.preventDefault()}
            onClick={(event) => dismissible && event.target === event.currentTarget && onClose()}
            className='fixed inset-x-0 top-auto bottom-0 m-0 max-h-full w-full max-w-full overflow-y-auto rounded-t-3xl border-2 border-b-0 border-border bg-surface text-text-primary shadow-pop-lg backdrop:bg-bg/80 backdrop:backdrop-blur-sm sm:inset-0 sm:m-auto sm:h-fit sm:max-w-md sm:rounded-3xl sm:border-b-2'>
            {open && children}
        </dialog>
    )
}
