import { EVENT_MEDIA_BUCKET } from '~/data/ui/media'
import { resizeToWebp } from '~/lib/image'
import { supabase } from '~/services/supabase'
import type { ImageSize } from '~/types/media'

export async function uploadEventImage(eventId: string, file: File, size: ImageSize) {
    const blob = await resizeToWebp(file, size)
    const path = `events/${eventId}/${size}-${crypto.randomUUID()}.webp`
    const bucket = supabase.storage.from(EVENT_MEDIA_BUCKET)
    const { error } = await bucket.upload(path, blob, { contentType: 'image/webp', cacheControl: '31536000' })
    if (error) throw error
    return bucket.getPublicUrl(path).data.publicUrl
}

export async function removeEventImage(publicUrl: string) {
    const marker = `/${EVENT_MEDIA_BUCKET}/`
    const index = publicUrl.indexOf(marker)
    if (index === -1) return
    const { error } = await supabase.storage.from(EVENT_MEDIA_BUCKET).remove([publicUrl.slice(index + marker.length)])
    if (error) throw error
}
