import { SCHEMA_CONTEXT, SCHEMA_IDS } from '~/data/seo/schema'
import { absoluteUrl } from '~/lib/seo/url'
import type { PageMeta } from '~/lib/seo/meta'
import type { EventFaq } from '~/types/events'

export function buildFaqSchema({ path }: PageMeta, faqs: EventFaq[]) {
    return {
        '@context': SCHEMA_CONTEXT,
        '@type': 'FAQPage',
        '@id': `${absoluteUrl(path)}${SCHEMA_IDS.faq}`,
        url: absoluteUrl(path),
        mainEntity: faqs.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
    }
}
