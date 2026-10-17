import type { ButtonHTMLAttributes, Ref } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-display font-bold whitespace-nowrap transition focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
                secondary: 'bg-surface text-text-primary hover:bg-surface-muted',
                sunny: 'bg-pop-yellow text-on-pop',
                ghost: 'text-text-primary hover:bg-surface-muted',
                danger: 'bg-pop-pink text-on-pop hover:bg-accent-hover',
            },
            size: {
                sm: 'h-10 px-4 text-sm',
                md: 'h-12 px-6 text-base',
                lg: 'h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg',
                icon: 'size-10',
                'icon-sm': 'size-8 [&_svg]:size-4',
            },
            chunky: {
                true: 'border-2 border-border shadow-pop-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md', chunky: true },
    },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
    ref?: Ref<HTMLButtonElement>
}

export function Button({ className, variant, size, chunky, asChild = false, ...props }: ButtonProps) {
    const Component = asChild ? Slot : 'button'
    return (
        <Component
            className={cn(buttonVariants({ variant, size, chunky: variant === 'ghost' ? false : chunky }), className)}
            {...props}
        />
    )
}
