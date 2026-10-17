import { ArrowDown, ArrowUp, Pencil, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { GALLERY_COPY } from '~/data/gallery/copy'
import { websiteAssetUrl } from '~/lib/website'
import type { GalleryPhoto } from '~/types/gallery'

const { actions } = GALLERY_COPY

export interface PhotoCardProps {
    photo: GalleryPhoto
    first: boolean
    last: boolean
    busy: boolean
    onMove: (offset: -1 | 1) => void
    onEdit: () => void
    onDelete: () => void
}

export function PhotoCard({ photo, first, last, busy, onMove, onEdit, onDelete }: PhotoCardProps) {
    const tools = [
        { label: actions.earlier, icon: ArrowUp, onClick: () => onMove(-1), disabled: first || busy },
        { label: actions.later, icon: ArrowDown, onClick: () => onMove(1), disabled: last || busy },
        { label: actions.edit, icon: Pencil, onClick: onEdit, disabled: false },
        { label: actions.delete, icon: Trash2, onClick: onDelete, disabled: false },
    ]

    return (
        <PopCard
            asChild
            className='flex flex-col overflow-hidden'>
            <figure>
                <img
                    src={websiteAssetUrl(photo.url)}
                    alt={photo.alt}
                    loading='lazy'
                    className='aspect-square w-full border-b-2 border-border object-cover'
                />
                <figcaption className='flex flex-1 flex-col gap-3 p-3'>
                    <Text
                        variant='small'
                        tone={photo.alt ? 'secondary' : 'muted'}
                        className='line-clamp-2 flex-1'>
                        {photo.alt || GALLERY_COPY.noAlt}
                    </Text>
                    <div className='grid grid-cols-4 gap-1.5'>
                        {tools.map(({ label, icon: Icon, onClick, disabled }) => (
                            <Button
                                key={label}
                                variant='secondary'
                                size='icon-sm'
                                className='w-full'
                                aria-label={label}
                                title={label}
                                disabled={disabled}
                                onClick={onClick}>
                                <Icon />
                            </Button>
                        ))}
                    </div>
                </figcaption>
            </figure>
        </PopCard>
    )
}
