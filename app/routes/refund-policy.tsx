import { LegalPage } from '~/components/content/legal/legal-page'
import { REFUND_POLICY, REFUND_PAGE } from '~/data/legal/refund-policy'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/refund-policy'

export const meta: Route.MetaFunction = () => buildPageMeta(REFUND_PAGE)

export default function RefundPolicy() {
    return <LegalPage document={REFUND_POLICY} />
}
