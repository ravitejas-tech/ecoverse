import type { AnchorHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const anchorLinkVariants = cva('transition', {
    variants: {
        layout: {
            inline: 'rounded-full px-1 decoration-pop-pink decoration-wavy decoration-2 underline-offset-6 hover:underline',
            block: 'block rounded-2xl px-4 py-3 hover:bg-surface-muted',
        },
    },
    defaultVariants: { layout: 'inline' },
})

export interface AnchorLinkProps
    extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof anchorLinkVariants> {
    children: string
}

export function AnchorLink({ layout, children, className, ...props }: AnchorLinkProps) {
    return (
        <a
            className={cn(anchorLinkVariants({ layout }), className)}
            {...props}>
            <Text
                as='span'
                variant={layout === 'block' ? 'title' : 'label'}>
                {children}
            </Text>
        </a>
    )
}
