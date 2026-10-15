import { SITEMAP_PAGES } from '~/data/seo/routes'
import { absoluteUrl } from '~/lib/seo/url'

export function buildSitemap(images: string[], lastmod: string) {
    const urls = SITEMAP_PAGES.map(
        ({ path, changefreq, priority }) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${images.map((image) => `    <image:image><image:loc>${absoluteUrl(image)}</image:loc></image:image>`).join('\n')}
  </url>`,
    )

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`
}
