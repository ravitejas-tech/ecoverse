import { cva } from 'class-variance-authority'
import { PHOTO_SHAPES, type PhotoShape } from '~/data/ui/media'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { photoSrcSet } from '~/lib/media'
import type { Photo } from '~/types/media'

const framedPhotoVariants = cva('w-full border-border object-cover', {
    variants: {
        shape: {
            square: 'aspect-square rounded-2xl border-2',
            banner: 'h-48 border-b-2 sm:h-52',
            cover: 'aspect-video rounded-3xl border-2 shadow-pop lg:aspect-auto lg:h-96',
            gallery: 'aspect-square rounded-2xl border-2 shadow-pop-sm',
        },
        tone: POP_FILLS,
    },
})

export interface FramedPhotoProps {
    photo: Photo
    tone: PopTone
    shape: PhotoShape
    priority?: boolean
}

export function FramedPhoto({ photo: { src, alt, credit }, tone, shape, priority = false }: FramedPhotoProps) {
    const srcSet = photoSrcSet(src, shape)

    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={srcSet && PHOTO_SHAPES[shape].sizes}
            alt={alt}
            title={credit}
            width={PHOTO_SHAPES[shape].width}
            height={PHOTO_SHAPES[shape].height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding='async'
            className={framedPhotoVariants({ shape, tone })}
        />
    )
}
