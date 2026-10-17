import type { LucideIcon } from 'lucide-react'
import type { PopTone } from '~/data/ui/pop-tones'
import type { EventFaq } from '~/types/events'

export type QuestionAnswer = EventFaq

export interface FaqGroup {
    id: string
    title: string
    emoji: string
    tone: PopTone
    items: QuestionAnswer[]
}

export interface LegalSection {
    heading: string
    paragraphs: string[]
    points?: string[]
}

export interface LegalDocument {
    eyebrow: string
    title: string
    lead: string
    updatedAt: string
    sections: LegalSection[]
}

export interface ContactDetails {
    label: string
    value: string
    body: string
    icon: LucideIcon
    tone: PopTone
}

export interface ContactChannel extends ContactDetails {
    href: string
    action: string
    external: boolean
}
