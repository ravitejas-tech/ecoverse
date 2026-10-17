import type { MetaDescriptor } from 'react-router'
import { BRAND_NAME } from '~/data/brand'
import { ROBOTS_DIRECTIVES, SITE, SOCIAL_IMAGE } from '~/data/seo/site'
import { absoluteUrl } from '~/lib/seo/url'

export interface SocialImage {
    path: string
    alt: string
    width?: number
    height?: number
    type?: string
}

export interface PageMeta {
    title: string
    description: string
    path: string
    image?: SocialImage
    robots?: string
}

export function buildPageMeta({
    title,
    description,
    path,
    image = SOCIAL_IMAGE,
    robots = ROBOTS_DIRECTIVES,
}: PageMeta): MetaDescriptor[] {
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image.path)
    const imageDetails = Object.entries({ type: image.type, width: image.width, height: image.height }).flatMap(
        ([field, value]) => (value === undefined ? [] : [{ property: `og:image:${field}`, content: String(value) }]),
    )

    return [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: robots },
        { tagName: 'link', rel: 'canonical', href: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: BRAND_NAME },
        { property: 'og:locale', content: SITE.locale },
        { property: 'og:url', content: url },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        ...imageDetails,
        { property: 'og:image:alt', content: image.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: image.alt },
    ]
}
