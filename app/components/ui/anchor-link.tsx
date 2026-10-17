import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const anchorLinkVariants = cva(
    'decoration-pop-pink decoration-wavy decoration-2 underline-offset-6 transition focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none',
    {
        variants: {
            layout: {
                inline: 'rounded-full px-1 hover:underline',
                list: 'inline-flex min-h-10 items-center gap-2 rounded-full px-1 hover:underline [&_svg]:size-4 [&_svg]:shrink-0',
                block: 'block rounded-2xl px-4 py-3 hover:bg-surface-muted',
                heading: 'rounded-lg hover:underline',
            },
        },
        defaultVariants: { layout: 'inline' },
    },
)

export interface AnchorLinkProps extends Omit<LinkProps, 'children'>, VariantProps<typeof anchorLinkVariants> {
    children: string
    icon?: ReactNode
}

export function AnchorLink({ layout, children, icon, className, ...props }: AnchorLinkProps) {
    return (
        <Link
            className={cn(anchorLinkVariants({ layout }), className)}
            {...props}>
            {icon}
            <Text
                as='span'
                variant={layout === 'block' ? 'title' : layout === 'heading' ? 'inherit' : 'label'}>
                {children}
            </Text>
        </Link>
    )
}
