import { SHOUTOUTS } from '~/data/landing/shoutouts'
import { eventPath, PATHS, PUBLIC_PAGES } from '~/data/navigation'
import { EVENT_SITEMAP_SETTINGS, SITEMAP_SETTINGS, type SitemapSettings } from '~/data/seo/sitemap'
import { absoluteUrl } from '~/lib/seo/url'
import type { EventSummary } from '~/types/events'

interface SitemapEntry extends SitemapSettings {
    path: string
    lastmod: string
    images: string[]
}

function sitemapEntries(events: EventSummary[], today: string): SitemapEntry[] {
    const pages = PUBLIC_PAGES.map((path) => ({
        path,
        lastmod: today,
        ...SITEMAP_SETTINGS[path],
        images: path === PATHS.home ? SHOUTOUTS.map(({ photo }) => photo.src) : [],
    }))
    const eventPages = events.map(({ slug, updatedAt, status, photo }) => ({
        path: eventPath(slug),
        lastmod: updatedAt.slice(0, 10),
        ...EVENT_SITEMAP_SETTINGS[status === 'ended' ? 'past' : 'upcoming'],
        images: [photo.src],
    }))
    return [...pages, ...eventPages]
}

export function buildSitemap(events: EventSummary[], today: string) {
    const urls = sitemapEntries(events, today).map(({ path, lastmod, changefreq, priority, images }) =>
        [
            '  <url>',
            `    <loc>${absoluteUrl(path)}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${changefreq}</changefreq>`,
            `    <priority>${priority}</priority>`,
            ...images.map((image) => `    <image:image><image:loc>${absoluteUrl(image)}</image:loc></image:image>`),
            '  </url>',
        ].join('\n'),
    )

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`
}
