import { useState } from 'react'
import { AltDialog } from '~/components/gallery/alt-dialog'
import { PhotoCard } from '~/components/gallery/photo-card'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { EmptyState } from '~/components/ui/empty-state'
import { GALLERY_COPY } from '~/data/gallery/copy'
import { useDeleteGalleryPhoto, useMovePhoto } from '~/hooks/gallery/mutations'
import type { GalleryPhoto } from '~/types/gallery'

const { deleteDialog } = GALLERY_COPY

export function PhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
    const [editing, setEditing] = useState<GalleryPhoto | null>(null)
    const [deleting, setDeleting] = useState<GalleryPhoto | null>(null)
    const move = useMovePhoto()
    const remove = useDeleteGalleryPhoto()

    if (photos.length === 0) return <EmptyState {...GALLERY_COPY.empty} />

    return (
        <>
            <ul className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4'>
                {photos.map((photo, index) => (
                    <li
                        key={photo.id}
                        className='flex'>
                        <PhotoCard
                            photo={photo}
                            first={index === 0}
                            last={index === photos.length - 1}
                            busy={move.isPending}
                            onMove={(offset) => move.mutate({ photos, index, offset })}
                            onEdit={() => setEditing(photo)}
                            onDelete={() => setDeleting(photo)}
                        />
                    </li>
                ))}
            </ul>
            <AltDialog
                photo={editing}
                onClose={() => setEditing(null)}
            />
            <ConfirmDialog
                open={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={() => deleting && remove.mutate(deleting, { onSuccess: () => setDeleting(null) })}
                title={deleteDialog.title}
                description={deleteDialog.description}
                confirmLabel={deleteDialog.confirm}
                danger
                pending={remove.isPending}
            />
        </>
    )
}
