import type { QuestionInputConfig } from '~/types/checkout'

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

export type QuestionKind = (typeof QUESTION_KINDS)[number]

export const GENDER_OPTIONS = ['Woman', 'Man', 'Non-binary', 'Prefer not to say'] as const

export const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export const FOOD_PREFERENCES = ['Veg', 'Non-veg', 'Vegan', 'Jain'] as const

export const QUESTION_INPUTS: Record<QuestionKind, QuestionInputConfig> = {
    age: {
        control: 'text',
        type: 'text',
        inputMode: 'numeric',
        pattern: '[0-9]*',
        autoComplete: 'off',
        placeholder: '24',
    },
    gender: { control: 'select', autoComplete: 'sex', options: GENDER_OPTIONS },
    city: {
        control: 'text',
        type: 'text',
        inputMode: 'text',
        autoComplete: 'address-level2',
        placeholder: 'Koregaon Park',
    },
    organisation: { control: 'text', type: 'text', inputMode: 'text', autoComplete: 'organization' },
    emergency_contact: {
        control: 'text',
        type: 'tel',
        inputMode: 'tel',
        autoComplete: 'off',
        placeholder: '98765 43210',
    },
    tshirt_size: { control: 'select', autoComplete: 'off', options: TSHIRT_SIZES },
    food_preference: { control: 'select', autoComplete: 'off', options: FOOD_PREFERENCES },
    custom: { control: 'text', type: 'text', inputMode: 'text', autoComplete: 'off' },
}
