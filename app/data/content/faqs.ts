import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'
import type { FaqGroup } from '~/types/content'

export const FAQS_PAGE: PageMeta = {
    title: 'FAQs · Booking, Tickets & Refunds · Echoverse Hub',
    description:
        'Answers about booking Echoverse Hub events: paying, QR tickets, entry, transfers, refunds and what to expect on the night.',
    path: PATHS.faqs,
}

export const FAQS_HEADING = {
    eyebrow: 'Help ✦',
    title: 'Questions? We’ve got answers.',
    lead: 'Everything about booking, tickets, refunds and the night itself. Still stuck? We reply on WhatsApp.',
}

export const FAQS_JUMP_LABEL = 'Jump to'

export const FAQS_HELP = {
    emoji: '💬',
    title: 'Still have a question?',
    body: 'Message us on WhatsApp. A real person from our crew will get back to you.',
    contact: 'Other ways to reach us',
} as const

export const FAQ_GROUPS: FaqGroup[] = [
    {
        id: 'booking',
        title: 'Booking & payment',
        emoji: '💳',
        tone: 'pink',
        items: [
            {
                question: 'Do I need an account to book?',
                answer: 'No. You only need your name, phone number and email. Your tickets are saved to My Tickets using that email, so you can always find them again.',
            },
            {
                question: 'How do I pay?',
                answer: 'With UPI, a debit or credit card, or net banking, through our secure payment partner Razorpay. We never see or store your card details.',
            },
            {
                question: 'My money was taken but I didn’t get a ticket. What now?',
                answer: 'Give it two minutes, then check your email (and the spam folder). Still nothing? Open My Tickets with the email you used. If it isn’t there, message us on WhatsApp with your payment reference and we’ll sort it out. If a booking fails, the money goes back to you automatically.',
            },
            {
                question: 'Can I use a promo code?',
                answer: 'Yes. Enter it at checkout before you pay and the discount shows up in your total. One code per booking.',
            },
            {
                question: 'Can I buy tickets at the door?',
                answer: 'Only if any are left, and usually at a higher price. Booking online is cheaper and guarantees your spot.',
            },
        ],
    },
    {
        id: 'tickets',
        title: 'Tickets & entry',
        emoji: '🎟️',
        tone: 'yellow',
        items: [
            {
                question: 'Where is my ticket?',
                answer: 'It arrives by email the moment your payment goes through, and it’s always in My Tickets. You can also send it to yourself on WhatsApp.',
            },
            {
                question: 'Do I need to print it?',
                answer: 'No. Show the QR code on your phone at the gate. A screenshot works too, just turn the brightness up.',
            },
            {
                question: 'I booked for my friends. How do they get in?',
                answer: 'Every person gets their own QR code in the same booking. Send each friend their QR, or arrive together and scan them one after another.',
            },
            {
                question: 'Can someone else use my ticket?',
                answer: 'Yes, if you can’t make it. Message us on WhatsApp before the event with your booking ID and your friend’s name, and we’ll move it over.',
            },
            {
                question: 'I lost my ticket. Help!',
                answer: 'Open My Tickets and log in with the email you booked with. We send you a one-time code, no password needed.',
            },
        ],
    },
    {
        id: 'refunds',
        title: 'Refunds',
        emoji: '↩️',
        tone: 'cyan',
        items: [
            {
                question: 'Can I get a refund?',
                answer: 'Each event shows its own refund policy on its page, and that one applies. Most events give a full refund up to 72 hours before the start. Read our refund policy for the details.',
            },
            {
                question: 'How long does a refund take?',
                answer: 'Refunds go back to the way you paid, usually within 5 to 7 working days after we approve them. UPI refunds are often faster.',
            },
            {
                question: 'What if an event is cancelled?',
                answer: 'You get a full refund, automatically. We’ll email you and message you as soon as we know.',
            },
            {
                question: 'What if an event moves to another date?',
                answer: 'Your ticket stays valid for the new date. If you can’t make it, ask for a refund within 7 days of us announcing the change.',
            },
        ],
    },
    {
        id: 'events',
        title: 'At the event',
        emoji: '🪩',
        tone: 'lime',
        items: [
            {
                question: 'I’m coming alone. Will it be awkward?',
                answer: 'Not at all. Most people come solo. Our hosts run icebreakers and make sure nobody stands alone for long.',
            },
            {
                question: 'Is there an age limit?',
                answer: 'Every event page shows it under “Good to know”. Carry a government photo ID, because it may be checked at the gate.',
            },
            {
                question: 'What should I wear?',
                answer: 'Each event page has a dress code. When in doubt: comfy shoes and whatever makes you feel good.',
            },
            {
                question: 'Can I partner with Echoverse or sponsor an event?',
                answer: 'We’d love to hear from you. Email us with a few lines about your idea.',
            },
        ],
    },
]
