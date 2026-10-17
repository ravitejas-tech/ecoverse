import { LegalPage } from '~/components/content/legal/legal-page'
import { PRIVACY, PRIVACY_PAGE } from '~/data/legal/privacy'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/privacy'

export const meta: Route.MetaFunction = () => buildPageMeta(PRIVACY_PAGE)

export default function Privacy() {
    return <LegalPage document={PRIVACY} />
}
