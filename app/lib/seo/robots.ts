import { SEO_FILES } from '~/data/seo/routes'
import { absoluteUrl } from '~/lib/seo/url'

export function buildRobots() {
    return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl(SEO_FILES.sitemap)}
`
}
