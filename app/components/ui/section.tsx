import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Container } from '~/components/ui/container'
import { sectionTitleId } from '~/data/layout/landmarks'
import { cn } from '~/lib/utils'

const sectionVariants = cva('relative scroll-mt-20 overflow-x-clip py-16 md:py-24 lg:py-28', {
    variants: {
        surface: {
            plain: '',
            muted: 'border-y-2 border-border bg-surface-muted',
            dots: 'bg-party-dots',
        },
    },
    defaultVariants: { surface: 'plain' },
})

export interface SectionProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}

export function Section({ id, surface, className, children, ...props }: SectionProps) {
    return (
        <section
            id={id}
            aria-labelledby={id && sectionTitleId(id)}
            className={cn(sectionVariants({ surface }), className)}
            {...props}>
            <Container>{children}</Container>
        </section>
    )
}
