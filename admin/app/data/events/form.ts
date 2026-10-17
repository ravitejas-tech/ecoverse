import type { ListItemField, PairListName } from '~/types/events'

export const EVENT_FORM_ERRORS = {
    title: 'Give the event a name (at least 3 characters)',
    titleLong: 'Keep the name under 80 characters',
    slug: 'Use lowercase letters, numbers and single dashes',
    summary: 'Add a short summary',
    summaryLong: 'Keep the summary under 300 characters',
    startsAt: 'Pick when it starts',
    endsAt: 'Pick when it ends',
    endsBeforeStart: 'It has to end after it starts',
    date: 'Pick a date',
    time: 'Pick a time',
    city: 'Add the city',
    cityCode: 'Use 3 capital letters, like PUN',
    region: 'Add the state',
    venue: 'Add the venue name',
    url: 'Paste a full link starting with https://',
    coverAlt: 'Describe the photo in a few words',
    tag: 'Keep the sticker under 30 characters',
} as const

export const EVENT_FIELDS = {
    title: { label: 'Event name', placeholder: 'Bollywood Dance Night' },
    slug: { label: 'Web address', hint: 'Lowercase words and dashes. Changing it breaks links you already shared.' },
    category: { label: 'Type of event' },
    tag: { label: 'Sticker', hint: 'Optional. A short label on the event card, like "Early bird 🐦".' },
    tone: { label: 'Card colour' },
    summary: { label: 'Short summary', hint: 'One or two lines for event cards and link previews.' },
    starts_at: { label: 'Starts', hint: 'India time' },
    ends_at: { label: 'Ends', hint: 'India time' },
    date: { label: 'Date' },
    start_time: { label: 'Starts at' },
    end_time: { label: 'Ends at', hint: 'Ending after midnight is fine.' },
    city: { label: 'City', placeholder: 'Pune' },
    city_code: { label: 'City code', hint: '3 letters used in booking IDs.' },
    region: { label: 'State', placeholder: 'Maharashtra' },
    venue_name: { label: 'Venue', placeholder: 'The Courtyard, Koregaon Park' },
    venue_address: { label: 'Venue address', placeholder: 'Lane 6, North Main Road, Pune 411001' },
    cover: { label: 'Cover photo', hint: 'A wide photo works best. JPG, PNG or WebP.' },
    cover_alt: { label: 'Describe the photo', hint: 'Read out to people using screen readers.' },
    cover_credit: { label: 'Photo credit', hint: 'Optional, like "Photo by Riya".' },
    cover_source: { label: 'Credit link', hint: 'Optional.' },
    description: { label: 'About this event', hint: 'What happens, who it is for, why it is fun.' },
    age_limit: { label: 'Age limit', placeholder: '18+ (ID checked at the gate)' },
    language: { label: 'Language', placeholder: 'Hindi & English' },
    dress_code: { label: 'Dress code', placeholder: 'Party casual, comfy shoes' },
    terms: { label: 'Terms' },
    refund_policy: { label: 'Refund policy' },
} as const

export const EVENT_SECTIONS = {
    basics: { title: 'Basics' },
    when: { title: 'When & where' },
    cover: { title: 'Cover photo' },
    about: { title: 'About' },
    highlights: {
        title: 'Highlights',
        item: 'Highlight',
        add: 'Add highlight',
        empty: 'No highlights yet.',
        placeholder: 'Hook-step crash course at 9 PM',
    },
    schedule: { title: 'Schedule', item: 'Schedule item', add: 'Add to schedule', empty: 'No schedule yet.' },
    hosts: { title: 'Hosts', item: 'Host', add: 'Add host', empty: 'No hosts yet.' },
    goodToKnow: { title: 'Good to know' },
    included: {
        title: "What's included",
        item: 'Item',
        add: 'Add item',
        empty: 'Nothing listed yet.',
        placeholder: 'Welcome mocktail',
    },
    notIncluded: {
        title: 'Not included',
        item: 'Item',
        add: 'Add item',
        empty: 'Nothing listed yet.',
        placeholder: 'Travel to the venue',
    },
    thingsToKnow: {
        title: 'Things to know',
        item: 'Item',
        add: 'Add item',
        empty: 'Nothing listed yet.',
        placeholder: 'Carry a photo ID',
    },
    faqs: { title: 'FAQs', item: 'FAQ', add: 'Add question', empty: 'No questions yet.' },
    policies: { title: 'Policies' },
} as const

export const EVENT_ITEM_FIELDS = {
    schedule: [
        { key: 'time', label: 'Time', placeholder: '8:00 PM' },
        { key: 'title', label: 'What happens', placeholder: 'Doors open' },
    ],
    hosts: [
        { key: 'name', label: 'Name', placeholder: 'DJ Riya' },
        { key: 'role', label: 'Role', placeholder: 'On the decks' },
    ],
    faqs: [
        { key: 'question', label: 'Question', placeholder: 'Can I come alone?' },
        { key: 'answer', label: 'Answer', placeholder: 'Yes! Most people do.', multiline: true },
    ],
} as const satisfies Record<PairListName, readonly ListItemField[]>

export const COVER_COPY = {
    upload: 'Upload photo',
    replace: 'Replace photo',
    uploading: 'Uploading…',
    remove: 'Remove photo',
    none: 'No cover photo yet.',
} as const

export const SAVE_BAR_COPY = {
    dirty: 'You have unsaved changes',
    clean: 'All changes saved',
    save: 'Save changes',
    saving: 'Saving…',
    discard: 'Discard',
    readOnly: 'You can view this event but not change it.',
} as const

export const EVENT_FORM_ID = 'event-details-form'

export const EMPTY_LIST_ITEMS = {
    schedule: { time: '', title: '' },
    hosts: { name: '', role: '' },
    faqs: { question: '', answer: '' },
} as const

export const itemLabel = (title: string, index: number) => `${title} ${index + 1}`

export const GOOD_TO_KNOW_FIELDS = ['age_limit', 'language', 'dress_code'] as const

export const GOOD_TO_KNOW_LISTS = [
    { name: 'included', copy: EVENT_SECTIONS.included },
    { name: 'not_included', copy: EVENT_SECTIONS.notIncluded },
    { name: 'things_to_know', copy: EVENT_SECTIONS.thingsToKnow },
] as const
