import { UPCOMING_EVENTS } from '~/data/landing/events'
import { SHOUTOUTS } from '~/data/landing/shoutouts'
import { buildSitemap } from '~/lib/seo/sitemap'

export function loader() {
    const images = [...UPCOMING_EVENTS, ...SHOUTOUTS].map(({ photo }) => photo.src)
    const lastmod = new Date().toISOString().slice(0, 10)
    return new Response(buildSitemap(images, lastmod), {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
}
