import { SEO_FILES } from '~/data/seo/routes'
import { ROBOTS_DISALLOW } from '~/data/seo/sitemap'
import { absoluteUrl } from '~/lib/seo/url'

export function buildRobots() {
    return `User-agent: *
Allow: /
${ROBOTS_DISALLOW.map((path) => `Disallow: ${path}`).join('\n')}

Sitemap: ${absoluteUrl(SEO_FILES.sitemap)}
`
}
