import { useMutationState } from '@tanstack/react-query'
import { GALLERY_UPLOAD_KEY } from '~/data/gallery/copy'
import { isPhotoUpload, uploadStatus } from '~/lib/gallery'

export function useUploadQueue(eventId: string) {
    const uploads = useMutationState({
        filters: { mutationKey: GALLERY_UPLOAD_KEY },
        select: ({ mutationId, state }) => ({
            id: mutationId,
            status: uploadStatus(state.status, state.isPaused),
            variables: state.variables,
        }),
    }).flatMap(({ id, status, variables }) =>
        isPhotoUpload(variables) && variables.eventId === eventId ? [{ id, status, name: variables.file.name }] : [],
    )
    const active = uploads.some(({ status }) => status === 'waiting' || status === 'uploading')
    return active ? uploads : []
}
