import { SLUG_MAX_LENGTH } from '~/data/events/limits'

export function slugify(...parts: string[]) {
    return parts
        .join(' ')
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, SLUG_MAX_LENGTH)
        .replace(/^-+|-+$/g, '')
}
