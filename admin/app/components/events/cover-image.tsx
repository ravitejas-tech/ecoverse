import { cva, type VariantProps } from 'class-variance-authority'
import { ImageOff } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { IMAGE_SIZES } from '~/data/ui/media'
import { websiteAssetUrl } from '~/lib/website'
import { cn } from '~/lib/utils'

const coverVariants = cva(
    'aspect-video shrink-0 overflow-hidden rounded-xl border-2 border-border bg-surface-muted object-cover',
    { variants: { size: { thumb: 'w-24 self-start sm:w-40', full: 'w-full' } }, defaultVariants: { size: 'full' } },
)

export interface CoverImageProps extends VariantProps<typeof coverVariants> {
    src: string | null
    alt: string
    emptyLabel: string
    className?: string
}

export function CoverImage({ src, alt, emptyLabel, size, className }: CoverImageProps) {
    if (!src)
        return (
            <div className={cn(coverVariants({ size }), 'grid place-items-center gap-1 p-2 text-center', className)}>
                <ImageOff
                    className='size-5 text-text-muted'
                    aria-hidden
                />
                <Text
                    as='span'
                    variant='small'
                    tone='muted'
                    className={size === 'thumb' ? 'sr-only' : undefined}>
                    {emptyLabel}
                </Text>
            </div>
        )
    return (
        <img
            src={websiteAssetUrl(src)}
            alt={alt}
            loading='lazy'
            width={IMAGE_SIZES.cover.width}
            height={IMAGE_SIZES.cover.height}
            className={cn(coverVariants({ size }), className)}
        />
    )
}
