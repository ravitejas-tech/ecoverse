import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { GALLERY_COPY, GALLERY_UPLOAD_KEY } from '~/data/gallery/copy'
import { useGalleryPhotos } from '~/hooks/gallery/queries'
import { deleteGalleryPhoto, movePhoto, updatePhotoAlt, uploadGalleryPhoto } from '~/services/gallery'
import type { QueryClient } from '@tanstack/react-query'

const refresh = (client: QueryClient, eventId: string) =>
    void client.invalidateQueries({ queryKey: useGalleryPhotos.getKey(eventId) })

const showError = () => toast.error(GALLERY_COPY.errors.generic)

export const useUploadGalleryPhoto = createMutation({
    mutationKey: GALLERY_UPLOAD_KEY,
    scope: { id: GALLERY_UPLOAD_KEY.join() },
    mutationFn: uploadGalleryPhoto,
    onSuccess: (_data, { eventId }, _result, { client }) => {
        toast.success(GALLERY_COPY.added, { id: GALLERY_UPLOAD_KEY.join() })
        refresh(client, eventId)
    },
    onError: (_error, { file }) => toast.error(GALLERY_COPY.uploadFailed(file.name)),
})

export const useUpdatePhotoAlt = createMutation({
    mutationFn: updatePhotoAlt,
    onSuccess: (_data, _variables, _result, { client }) => {
        toast.success(GALLERY_COPY.altDialog.saved)
        void client.invalidateQueries({ queryKey: useGalleryPhotos.getKey() })
    },
    onError: showError,
})

export const useMovePhoto = createMutation({
    mutationFn: movePhoto,
    onSuccess: (_data, { photos }, _result, { client }) => {
        toast.success(GALLERY_COPY.moved, { id: GALLERY_COPY.moved })
        if (photos[0]) refresh(client, photos[0].event_id)
    },
    onError: showError,
})

export const useDeleteGalleryPhoto = createMutation({
    mutationFn: deleteGalleryPhoto,
    onSuccess: (_data, _variables, _result, { client }) => {
        toast.success(GALLERY_COPY.deleteDialog.done)
        void client.invalidateQueries({ queryKey: useGalleryPhotos.getKey() })
    },
    onError: showError,
})
