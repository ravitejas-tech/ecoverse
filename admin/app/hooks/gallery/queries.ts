import { createQuery } from 'react-query-kit'
import { listGalleryPhotos } from '~/services/gallery'

export const useGalleryPhotos = createQuery({
    queryKey: ['gallery-photos'],
    fetcher: (eventId: string) => listGalleryPhotos(eventId),
})
