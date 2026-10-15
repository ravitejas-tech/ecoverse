import { cva, type VariantProps } from 'class-variance-authority'
import { BRAND_NAME } from '~/data/brand'

const logoVariants = cva('block shrink-0', {
    variants: {
        size: {
            compact: 'bg-brand-logo h-10 w-37 sm:h-12 sm:w-44',
            full: 'bg-brand-logo-full h-20 w-63',
        },
    },
    defaultVariants: { size: 'compact' },
})

export type LogoProps = VariantProps<typeof logoVariants>

export function Logo({ size }: LogoProps) {
    return (
        <span
            role='img'
            aria-label={BRAND_NAME}
            className={logoVariants({ size })}
        />
    )
}
