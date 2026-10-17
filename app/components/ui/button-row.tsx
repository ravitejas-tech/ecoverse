import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonRowVariants = cva('grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap', {
    variants: { align: { start: '', center: 'sm:justify-center' } },
    defaultVariants: { align: 'start' },
})

export interface ButtonRowProps extends VariantProps<typeof buttonRowVariants> {
    children: ReactNode
    className?: string
}

export function ButtonRow({ align, children, className }: ButtonRowProps) {
    return <div className={cn(buttonRowVariants({ align }), className)}>{children}</div>
}
