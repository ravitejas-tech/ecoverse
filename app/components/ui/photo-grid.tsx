import { cva, type VariantProps } from 'class-variance-authority'
import { FramedPhoto } from '~/components/ui/framed-photo'
import { POP_TONES } from '~/data/ui/pop-tones'
import type { Photo } from '~/types/media'

const photoGridVariants = cva('grid grid-cols-2 gap-3 sm:gap-4', {
    variants: { columns: { three: 'sm:grid-cols-3', four: 'sm:grid-cols-4' } },
    defaultVariants: { columns: 'three' },
})

export interface PhotoGridProps extends VariantProps<typeof photoGridVariants> {
    photos: Photo[]
    priority?: boolean
}

export function PhotoGrid({ photos, columns, priority = false }: PhotoGridProps) {
    return (
        <ul className={photoGridVariants({ columns })}>
            {photos.map((photo, index) => (
                <li key={photo.src}>
                    <FramedPhoto
                        photo={photo}
                        tone={POP_TONES[index % POP_TONES.length] ?? 'pink'}
                        shape='gallery'
                        priority={priority && index < 2}
                    />
                </li>
            ))}
        </ul>
    )
}
