import { buildSitemap } from '~/lib/seo/sitemap'
import { loadEventSummaries } from '~/services/event-catalog'

export async function loader() {
    const today = new Date().toISOString().slice(0, 10)
    return new Response(buildSitemap(await loadEventSummaries(), today), {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
}
