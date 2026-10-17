import type { z } from 'zod'
import type { PRESET_QUESTION_KINDS, QUESTION_KINDS } from '~/data/events/questions'
import type { eventQuestionSchema, questionsFormSchema } from '~/schemas/event-questions'

export type QuestionKind = (typeof QUESTION_KINDS)[number]

export type PresetQuestionKind = (typeof PRESET_QUESTION_KINDS)[number]

export type EventQuestion = z.infer<typeof eventQuestionSchema>

export type QuestionsFormValues = z.infer<typeof questionsFormSchema>

export interface PresetQuestion {
    kind: PresetQuestionKind
    name: string
    label: string
    placeholder?: string
    options?: readonly string[]
}
