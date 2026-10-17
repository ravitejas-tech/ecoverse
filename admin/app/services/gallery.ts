import { moveItem } from '~/lib/array'
import { removeEventImage, uploadEventImage } from '~/services/storage'
import { supabase } from '~/services/supabase'
import type { GalleryPhoto, PhotoMove, PhotoUpload } from '~/types/gallery'

export async function listGalleryPhotos(eventId: string) {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('event_id', eventId)
        .order('sort_order')
        .order('created_at')
    if (error) throw error
    return data
}

export async function uploadGalleryPhoto({ eventId, file, alt, sortOrder }: PhotoUpload) {
    const url = await uploadEventImage(eventId, file, 'gallery')
    const { error } = await supabase
        .from('gallery_photos')
        .insert({ event_id: eventId, url, alt, sort_order: sortOrder })
    if (error) {
        await removeEventImage(url)
        throw error
    }
}

export async function updatePhotoAlt({ id, alt }: Pick<GalleryPhoto, 'id' | 'alt'>) {
    const { error } = await supabase.from('gallery_photos').update({ alt: alt.trim() }).eq('id', id)
    if (error) throw error
}

export async function movePhoto({ photos, index, offset }: PhotoMove) {
    const ordered = moveItem(photos, index, index + offset)
    const results = await Promise.all(
        ordered
            .map((photo, sortOrder) => ({ photo, sortOrder }))
            .filter(({ photo, sortOrder }) => photo.sort_order !== sortOrder)
            .map(({ photo, sortOrder }) =>
                supabase.from('gallery_photos').update({ sort_order: sortOrder }).eq('id', photo.id),
            ),
    )
    const failed = results.find(({ error }) => error)
    if (failed?.error) throw failed.error
}

export async function deleteGalleryPhoto({ id, url }: Pick<GalleryPhoto, 'id' | 'url'>) {
    const { error } = await supabase.from('gallery_photos').delete().eq('id', id)
    if (error) throw error
    if (!url.startsWith('/')) await removeEventImage(url)
}
