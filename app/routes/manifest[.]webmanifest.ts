import { buildManifest } from '~/lib/seo/manifest'

export function loader() {
    return Response.json(buildManifest(), { headers: { 'Content-Type': 'application/manifest+json' } })
}
