import type { Tables } from '~/types/database'

export type GalleryPhoto = Tables<'gallery_photos'>

export interface PhotoUpload {
    eventId: string
    file: File
    alt: string
    sortOrder: number
}

export interface PhotoMove {
    photos: readonly GalleryPhoto[]
    index: number
    offset: -1 | 1
}

export type UploadStatus = 'waiting' | 'uploading' | 'done' | 'failed'
