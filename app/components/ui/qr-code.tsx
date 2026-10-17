import { useMemo } from 'react'
import { QR_QUIET_ZONE } from '~/data/ui/forms'
import { qrPath } from '~/lib/qr'
import { cn } from '~/lib/utils'

export interface QrCodeProps {
    value: string
    label: string
    className?: string
}

export function QrCode({ value, label, className }: QrCodeProps) {
    const { size, path } = useMemo(() => qrPath(value, QR_QUIET_ZONE), [value])

    return (
        <div className={cn('rounded-2xl border-2 border-border bg-pop-yellow p-1.5 shadow-pop-sm', className)}>
            <svg
                viewBox={`0 0 ${size} ${size}`}
                className='block size-full fill-current text-on-pop'
                shapeRendering='crispEdges'
                role='img'
                aria-label={label}>
                <path d={path} />
            </svg>
        </div>
    )
}
