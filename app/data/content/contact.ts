import { Camera, Mail, MessageCircle } from 'lucide-react'
import { EMAIL, INSTAGRAM, WHATSAPP } from '~/data/contact'
import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'
import type { ContactChannel, ContactDetails } from '~/types/content'

export const CONTACT_PAGE: PageMeta = {
    title: 'Contact Echoverse Hub · WhatsApp, Email & Instagram',
    description:
        'Questions about an Echoverse Hub event or your ticket? Message us on WhatsApp for the fastest reply, or reach us by email and Instagram.',
    path: PATHS.contact,
}

export const CONTACT_HEADING = {
    eyebrow: 'Say hi 👋',
    title: 'Talk to a real human',
    lead: 'WhatsApp is the fastest way to reach us. Email and Instagram work too.',
}

export const WHATSAPP_CHANNEL: ContactDetails = {
    label: 'WhatsApp',
    value: WHATSAPP.display,
    body: 'Questions about an event, your booking or a refund? Message us. We usually reply within an hour, 10 AM to 10 PM.',
    icon: MessageCircle,
    tone: 'lime',
}

export const CONTACT_CHANNELS: ContactChannel[] = [
    {
        label: 'Email',
        value: EMAIL.address,
        body: 'For partnerships, invoices and anything long. We reply within one working day.',
        icon: Mail,
        tone: 'yellow',
        href: EMAIL.href,
        action: 'Send an email',
        external: false,
    },
    {
        label: 'Instagram',
        value: INSTAGRAM.handle,
        body: 'New drops, photo dumps and DMs. We check them every day.',
        icon: Camera,
        tone: 'violet',
        href: INSTAGRAM.url,
        action: 'Open Instagram',
        external: true,
    },
]

export const CONTACT_SHORTCUTS = [
    {
        title: 'Lost your ticket?',
        caption: 'it’s in My Tickets',
        emoji: '🎟️',
        tone: 'lime',
        to: PATHS.myTickets,
    },
    {
        title: 'Quick question?',
        caption: 'the FAQs probably answer it',
        emoji: '🙋',
        tone: 'orange',
        to: PATHS.faqs,
    },
] as const
