import { LEGAL_UPDATED_AT } from '~/data/legal/common'
import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'
import type { LegalDocument } from '~/types/content'

export const TERMS_PAGE: PageMeta = {
    title: 'Terms & Conditions · Echoverse Hub',
    description:
        'The terms for booking and attending Echoverse Hub events: tickets, payments, entry, behaviour, changes to events and liability.',
    path: PATHS.terms,
}

export const TERMS: LegalDocument = {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    lead: 'The rules for booking and attending Echoverse Hub events, in plain words.',
    updatedAt: LEGAL_UPDATED_AT,
    sections: [
        {
            heading: 'Who we are',
            paragraphs: [
                'Echoverse Hub (“we”, “us”) organises and hosts its own events in India: dance nights, social mixers, workshops, trips and meetups. echoversehub.com is the official place to discover and book them.',
                'By booking a ticket or using this website you agree to these terms. If you do not agree, please do not book.',
            ],
        },
        {
            heading: 'Booking and payment',
            paragraphs: [
                'Prices are shown in Indian rupees and include applicable taxes unless the checkout says otherwise. Your booking is confirmed only after our payment partner confirms the payment and you receive a booking ID.',
                'Seats are held for a short time while you pay. If payment does not complete in that time, the seats are released and any amount debited is returned to you automatically.',
            ],
            points: [
                'You must give a correct name, phone number and email.',
                'Promo codes cannot be exchanged for cash and only one code applies per booking.',
                'We may cancel bookings made with fraudulent payment details or by automated tools.',
            ],
        },
        {
            heading: 'Tickets and entry',
            paragraphs: [
                'Each ticket has its own QR code that admits one person, once. Keep it private: whoever shows it first gets in. We may ask for a government photo ID that matches the booking, especially for age-restricted events.',
            ],
            points: [
                'Age limits, dress codes and entry times are listed on each event page and apply at the gate.',
                'Re-entry is not guaranteed and is at the venue’s discretion.',
                'Tickets may only be resold or transferred through us. Tickets bought from anyone else may be refused.',
            ],
        },
        {
            heading: 'Behaviour at events',
            paragraphs: [
                'We want everyone to feel safe and welcome. We and the venue may refuse entry or remove anyone who is unsafe, harasses others, is visibly intoxicated or breaks the law or venue rules, without a refund.',
            ],
        },
        {
            heading: 'Changes and cancellations',
            paragraphs: [
                'Sometimes things change: the line-up, the schedule or, rarely, the venue or date. We will tell you as early as we can by email or phone. If we cancel an event, you get a full refund. If we move it to another date, you may keep your ticket or ask for a refund as described in our refund policy.',
            ],
        },
        {
            heading: 'Photos and videos',
            paragraphs: [
                'We photograph and film our events and may use that content on our website and social media. If you would rather not appear, tell our crew at the event or email us afterwards and we will remove you from what we publish.',
            ],
        },
        {
            heading: 'Liability',
            paragraphs: [
                'You attend at your own risk and are responsible for your belongings. To the extent the law allows, our total liability for any booking is limited to the amount you paid for it. Nothing in these terms limits rights you have under the Consumer Protection Act, 2019.',
            ],
        },
        {
            heading: 'Governing law',
            paragraphs: [
                'These terms are governed by the laws of India, and the courts of Pune, Maharashtra have jurisdiction. We may update these terms; the version shown on the date you book applies to that booking.',
            ],
        },
    ],
}
