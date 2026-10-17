import { z } from 'zod'
import { ALT_MAX_LENGTH, GALLERY_COPY } from '~/data/gallery/copy'

export const altSchema = z.object({
    alt: z.string().trim().min(3, GALLERY_COPY.altDialog.error).max(ALT_MAX_LENGTH),
})

export type AltValues = z.infer<typeof altSchema>
