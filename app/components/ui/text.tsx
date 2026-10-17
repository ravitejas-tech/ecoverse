import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const textVariants = cva('', {
    variants: {
        variant: {
            inherit: '',
            body: 'text-base/7',
            small: 'text-sm/6',
            label: 'text-sm font-semibold',
            lead: 'text-base/7 sm:text-xl/9',
            sticker: 'font-display text-xs font-extrabold tracking-wider uppercase',
            meta: 'text-xs font-bold tracking-widest uppercase',
            title: 'font-display text-xl font-bold tracking-tight',
            subtitle: 'font-display text-lg/snug font-bold tracking-tight',
            shout: 'font-display text-xl font-extrabold tracking-tight uppercase',
            heading: 'font-display text-2xl font-extrabold tracking-tight sm:text-3xl',
            display:
                'font-display text-3xl/tight font-extrabold tracking-tight text-balance sm:text-5xl/tight lg:text-6xl/tight',
            hero: 'font-display text-4xl/none font-extrabold tracking-tighter sm:text-6xl/none xl:text-7xl/none',
            price: 'font-display text-2xl font-extrabold tabular-nums',
            marker: 'font-marker text-base sm:text-lg',
            'marker-lg': 'font-marker text-2xl sm:text-3xl',
            emoji: 'text-4xl/none',
            'emoji-xl': 'text-6xl/none sm:text-7xl/none',
        },
        tone: {
            inherit: '',
            primary: 'text-text-primary',
            secondary: 'text-text-secondary',
            muted: 'text-text-muted',
            accent: 'text-accent-text',
            'on-pop': 'text-on-pop',
        },
    },
})

export type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>
export type TextTone = NonNullable<VariantProps<typeof textVariants>['tone']>

const DEFAULT_TONES: Partial<Record<TextVariant, TextTone>> = {
    inherit: 'inherit',
    emoji: 'inherit',
    'emoji-xl': 'inherit',
    meta: 'muted',
}

type TextTag =
    'p' | 'span' | 'div' | 'li' | 'h1' | 'h2' | 'h3' | 'h4' | 'strong' | 'small' | 'blockquote' | 'figcaption'

export interface TextProps extends HTMLAttributes<HTMLElement> {
    as?: TextTag
    variant?: TextVariant
    tone?: TextTone
}

export function Text({ as: Tag = 'p', variant = 'body', tone, className, ...props }: TextProps) {
    return (
        <Tag
            className={cn(textVariants({ variant, tone: tone ?? DEFAULT_TONES[variant] ?? 'primary' }), className)}
            {...props}
        />
    )
}
