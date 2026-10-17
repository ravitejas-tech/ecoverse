import type { ReactNode } from 'react'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { CONFIRM_DEFAULTS } from '~/data/ui/dialog'

export interface ConfirmDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    confirmLabel: string
    danger?: boolean
    pending?: boolean
    children?: ReactNode
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel,
    danger = false,
    pending = false,
    children,
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title={title}
            description={description}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={onClose}>
                        {CONFIRM_DEFAULTS.cancel}
                    </Button>
                    <Button
                        variant={danger ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        disabled={pending}>
                        {confirmLabel}
                    </Button>
                </>
            }>
            {children}
        </Dialog>
    )
}
