import { LegalPage } from '~/components/content/legal/legal-page'
import { TERMS, TERMS_PAGE } from '~/data/legal/terms'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/terms'

export const meta: Route.MetaFunction = () => buildPageMeta(TERMS_PAGE)

export default function Terms() {
    return <LegalPage document={TERMS} />
}
