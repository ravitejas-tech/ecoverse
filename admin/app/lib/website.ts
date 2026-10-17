import { WEBSITE_PATHS } from '~/data/events/links'

const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL

export function eventPublicUrl(slug: string) {
    return `${WEBSITE_URL}${WEBSITE_PATHS.events}/${slug}`
}

export function eventPreviewUrl({ slug, preview_token }: { slug: string; preview_token: string }) {
    return `${eventPublicUrl(slug)}?${WEBSITE_PATHS.previewParam}=${preview_token}`
}

export function websiteAssetUrl(url: string) {
    return url.startsWith('/') ? `${WEBSITE_URL}${url}` : url
}
