import { ImagePlus } from 'lucide-react'
import { FileButton } from '~/components/ui/file-button'
import { GALLERY_COPY, PHOTO_ACCEPT } from '~/data/gallery/copy'
import { useUploadGalleryPhoto } from '~/hooks/gallery/mutations'

export interface UploadButtonProps {
    eventId: string
    eventTitle: string
    nextSortOrder: number
}

export function UploadButton({ eventId, eventTitle, nextSortOrder }: UploadButtonProps) {
    const { mutate } = useUploadGalleryPhoto()

    return (
        <FileButton
            size='lg'
            accept={PHOTO_ACCEPT}
            onFiles={(files) =>
                files.forEach((file, index) =>
                    mutate({
                        eventId,
                        file,
                        alt: GALLERY_COPY.defaultAlt(eventTitle),
                        sortOrder: nextSortOrder + index,
                    }),
                )
            }>
            <ImagePlus />
            {GALLERY_COPY.upload}
        </FileButton>
    )
}
