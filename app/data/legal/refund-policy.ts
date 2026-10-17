import { LEGAL_UPDATED_AT } from '~/data/legal/common'
import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'
import type { LegalDocument } from '~/types/content'

export const REFUND_PAGE: PageMeta = {
    title: 'Refund & Cancellation Policy · Echoverse Hub',
    description:
        'How refunds work for Echoverse Hub tickets: each event’s own policy, cancelled or moved events, and how and when your money comes back.',
    path: PATHS.refundPolicy,
}

export const REFUND_POLICY: LegalDocument = {
    eyebrow: 'Legal',
    title: 'Refund & Cancellation Policy',
    lead: 'Plans change. Here is exactly what happens to your money when they do.',
    updatedAt: LEGAL_UPDATED_AT,
    sections: [
        {
            heading: 'Each event’s own policy comes first',
            paragraphs: [
                'Every event page has a “Terms & refunds” section. The refund policy shown there when you book is the one that applies to your tickets. If it says something different from this page, the event’s policy wins.',
            ],
        },
        {
            heading: 'Our general policy',
            paragraphs: ['When an event does not say otherwise:'],
            points: [
                'Full refund if you cancel 72 hours or more before the event starts.',
                '50% refund if you cancel between 72 and 24 hours before.',
                'No refund within 24 hours of the start, or if you do not turn up. You can still transfer your ticket to a friend by messaging us.',
                'Workshops may have earlier cut-offs because materials are prepared for you in advance.',
            ],
        },
        {
            heading: 'If we cancel or move an event',
            paragraphs: [
                'If we cancel an event, you get a full refund automatically, including any fees you paid. If we move it to another date, your ticket stays valid. If the new date does not work for you, ask for a full refund within 7 days of our announcement.',
            ],
        },
        {
            heading: 'How to ask for a refund',
            paragraphs: [
                'Message us on WhatsApp or email us with your booking ID. You will find it in your ticket email and in My Tickets. We confirm every request in writing.',
            ],
        },
        {
            heading: 'How you get your money back',
            paragraphs: [
                'Refunds go back to the original payment method: your UPI account, card or bank account. Once approved, they usually arrive within 5 to 7 working days, depending on your bank. Your tickets are cancelled as soon as the refund is issued, and their QR codes stop working.',
            ],
        },
        {
            heading: 'Failed or double payments',
            paragraphs: [
                'If money left your account but you did not get a booking ID, or you were charged twice, the extra amount is returned automatically, usually within 5 to 7 working days. If it has not arrived after that, contact us with the payment reference.',
            ],
        },
    ],
}
