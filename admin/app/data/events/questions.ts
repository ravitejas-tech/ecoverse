import type { PresetQuestion } from '~/types/questions'

export const QUESTION_KINDS = [
    'age',
    'gender',
    'city',
    'organisation',
    'emergency_contact',
    'tshirt_size',
    'food_preference',
    'custom',
] as const

export const PRESET_QUESTION_KINDS = [
    'age',
    'gender',
    'city',
    'organisation',
    'emergency_contact',
    'tshirt_size',
    'food_preference',
] as const

export const PRESET_QUESTIONS: readonly PresetQuestion[] = [
    { kind: 'age', name: 'Age', label: 'Your age', placeholder: '24' },
    { kind: 'gender', name: 'Gender', label: 'Gender', options: ['Woman', 'Man', 'Non-binary', 'Prefer not to say'] },
    { kind: 'city', name: 'City', label: 'Which city are you coming from?', placeholder: 'Koregaon Park' },
    { kind: 'organisation', name: 'College or company', label: 'College or company' },
    {
        kind: 'emergency_contact',
        name: 'Emergency contact',
        label: 'Emergency contact number',
        placeholder: '98765 43210',
    },
    { kind: 'tshirt_size', name: 'T-shirt size', label: 'T-shirt size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    {
        kind: 'food_preference',
        name: 'Food preference',
        label: 'Food preference',
        options: ['Veg', 'Non-veg', 'Vegan', 'Jain'],
    },
]

export const BUYER_BASICS = [
    { id: 'name', label: 'Full name', placeholder: 'Riya Sharma' },
    { id: 'phone', label: 'Phone', placeholder: '98765 43210' },
    { id: 'email', label: 'Email', placeholder: 'riya@example.com' },
] as const

export const CHOICE_SEPARATOR = /[,\n]/

export const CHOICE_JOINER = ', '

export const QUESTIONS_COPY = {
    presetsTitle: 'What to ask buyers',
    presetsLead: 'Name, phone and email are always asked. Turn on only what this event really needs.',
    askFor: (name: string) => `Ask for ${name.toLowerCase()}`,
    labelField: 'Question buyers see',
    required: 'Required',
    customTitle: 'Your own questions',
    customLead: 'Anything else you need to know, like dance experience or a song request.',
    customLabel: 'Question',
    customPlaceholder: 'Your dance level',
    choices: 'Choices',
    choicesHint: 'Optional. Separate with commas to make it a pick-one, like "Beginner, Intermediate, Pro".',
    addCustom: 'Add a question',
    noCustom: 'No extra questions yet.',
    previewTitle: 'What buyers see',
    previewLead: 'A preview of the details step at checkout.',
    chooseOne: 'Choose one',
    save: 'Save questions',
    errors: {
        label: 'Write the question',
        labelLong: 'Keep it under 120 characters',
    },
} as const

export const QUESTIONS_FORM_ID = 'event-questions-form'
