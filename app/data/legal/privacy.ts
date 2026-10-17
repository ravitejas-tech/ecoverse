import { EMAIL } from '~/data/contact'
import { LEGAL_UPDATED_AT } from '~/data/legal/common'
import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'
import type { LegalDocument } from '~/types/content'

export const PRIVACY_PAGE: PageMeta = {
    title: 'Privacy Policy · Echoverse Hub',
    description:
        'What personal data Echoverse Hub collects when you book, why we use it, who we share it with and your rights under India’s DPDP Act, 2023.',
    path: PATHS.privacy,
}

export const PRIVACY: LegalDocument = {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    lead: 'What we collect, why we need it and how you stay in control of it.',
    updatedAt: LEGAL_UPDATED_AT,
    sections: [
        {
            heading: 'The short version',
            paragraphs: [
                'We collect only what we need to sell you a ticket, let you in and look after you at our events. We never sell your data. You can ask us to see, correct or delete it at any time.',
                'Echoverse Hub is the “Data Fiduciary” for the personal data described here, under India’s Digital Personal Data Protection Act, 2023 (DPDP Act).',
            ],
        },
        {
            heading: 'What we collect',
            paragraphs: ['When you book or contact us, we collect:'],
            points: [
                'Your name, phone number and email address.',
                'Answers to questions an event asks at checkout, such as your age, city or food preference.',
                'Your booking history: which events, which tickets and whether you checked in.',
                'Payment status and reference numbers from our payment partner. We never receive or store your full card or bank details.',
                'How you found us: the campaign link or website that sent you, and basic device and usage data.',
            ],
        },
        {
            heading: 'Why we use it',
            paragraphs: ['We use your data, with your consent or for these legitimate uses:'],
            points: [
                'To confirm your booking, send your tickets and let you in at the gate.',
                'To contact you about the event you booked, including changes, cancellations and refunds.',
                'To keep events safe, prevent fraud and meet our legal and tax obligations.',
                'To understand which events and campaigns work, using analytics.',
                'To send you news about future events, only if you opted in. You can opt out from any message.',
            ],
        },
        {
            heading: 'Consent',
            paragraphs: [
                'By booking, you agree to us using your data for that booking. Marketing messages are a separate choice that you make at checkout. You can withdraw any consent at any time by emailing us; this does not affect anything we did before you withdrew it.',
            ],
        },
        {
            heading: 'Who we share it with',
            paragraphs: [
                'We share data only with partners who help us run the service, under contracts that protect it:',
            ],
            points: [
                'Our payment partner, to take and refund payments.',
                'Our hosting, database and email providers, to run the website and send tickets.',
                'Venue staff on the day, limited to what is needed to check you in.',
                'Analytics and advertising tools, such as Google Analytics and Meta, only when they are switched on.',
                'Authorities, when the law requires it.',
            ],
        },
        {
            heading: 'How long we keep it',
            paragraphs: [
                'We keep booking records for as long as the law requires for tax and accounting, usually up to 8 years. Other data is deleted or anonymised once it is no longer needed for the purpose it was collected for.',
            ],
        },
        {
            heading: 'Your rights',
            paragraphs: ['Under the DPDP Act you have the right to:'],
            points: [
                'Get a summary of the personal data we hold about you and how we use it.',
                'Correct, complete or update your data.',
                'Have your data erased when it is no longer needed.',
                'Withdraw your consent.',
                'Have your complaints addressed, and nominate someone to exercise these rights on your behalf.',
            ],
        },
        {
            heading: 'How to make a privacy request',
            paragraphs: [
                `Email ${EMAIL.address} with the subject “Privacy request” and the email or phone number you booked with. We will confirm it is you and reply within 30 days. Our Grievance Officer can be reached at the same address.`,
                'If you are not satisfied with our answer, you may complain to the Data Protection Board of India.',
            ],
        },
        {
            heading: 'Cookies and analytics',
            paragraphs: [
                'We use small amounts of browser storage to remember your theme and where you came from, so we can tell which campaigns work. If analytics tools are switched on, they may set their own cookies. You can clear or block these in your browser settings.',
            ],
        },
    ],
}
