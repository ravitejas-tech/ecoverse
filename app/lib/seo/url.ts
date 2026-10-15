import { SITE } from '~/data/seo/site'

export function absoluteUrl(path: string) {
    return new URL(path, SITE.url).toString()
}
