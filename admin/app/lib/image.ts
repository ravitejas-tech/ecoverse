import { IMAGE_SIZES, WEBP_QUALITY } from '~/data/ui/media'
import type { ImageSize } from '~/types/media'

export async function resizeToWebp(file: File, size: ImageSize) {
    const { width, height, fit } = IMAGE_SIZES[size]
    const bitmap = await createImageBitmap(file)
    const scale =
        fit === 'cover'
            ? Math.max(width / bitmap.width, height / bitmap.height)
            : Math.min(1, width / bitmap.width, height / bitmap.height)
    const canvasWidth = fit === 'cover' ? width : Math.round(bitmap.width * scale)
    const canvasHeight = fit === 'cover' ? height : Math.round(bitmap.height * scale)
    const canvas = new OffscreenCanvas(canvasWidth, canvasHeight)
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas is not available')
    const drawWidth = bitmap.width * scale
    const drawHeight = bitmap.height * scale
    context.drawImage(bitmap, (canvasWidth - drawWidth) / 2, (canvasHeight - drawHeight) / 2, drawWidth, drawHeight)
    bitmap.close()
    return canvas.convertToBlob({ type: 'image/webp', quality: WEBP_QUALITY })
}
