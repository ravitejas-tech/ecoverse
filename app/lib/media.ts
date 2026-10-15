import { PHOTO_SHAPES, type PhotoShape } from '~/data/ui/media'

export function photoVariant(src: string, width: number) {
    return src.replace(/(\.\w+)$/, `-${width}$1`)
}

export function photoSrcSet(src: string, shape: PhotoShape) {
    const { width, smallerWidths } = PHOTO_SHAPES[shape]
    return [...smallerWidths.map((w) => `${photoVariant(src, w)} ${w}w`), `${src} ${width}w`].join(', ')
}
