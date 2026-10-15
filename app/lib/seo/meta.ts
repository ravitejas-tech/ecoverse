import type { MetaDescriptor } from 'react-router'
import { BRAND_NAME } from '~/data/brand'
import { ROBOTS_DIRECTIVES, SITE, SOCIAL_IMAGE } from '~/data/seo/site'
import { absoluteUrl } from '~/lib/seo/url'

export interface PageMeta {
    title: string
    description: string
    path: string
}

export function buildPageMeta({ title, description, path }: PageMeta): MetaDescriptor[] {
    const url = absoluteUrl(path)
    const image = absoluteUrl(SOCIAL_IMAGE.path)

    return [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: ROBOTS_DIRECTIVES },
        { tagName: 'link', rel: 'canonical', href: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: BRAND_NAME },
        { property: 'og:locale', content: SITE.locale },
        { property: 'og:url', content: url },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:image:type', content: SOCIAL_IMAGE.type },
        { property: 'og:image:width', content: String(SOCIAL_IMAGE.width) },
        { property: 'og:image:height', content: String(SOCIAL_IMAGE.height) },
        { property: 'og:image:alt', content: SOCIAL_IMAGE.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:image:alt', content: SOCIAL_IMAGE.alt },
    ]
}
