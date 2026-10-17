import { z } from 'zod'
import { PRESET_QUESTION_KINDS, QUESTION_KINDS, QUESTIONS_COPY } from '~/data/events/questions'

export const eventQuestionSchema = z.object({
    id: z.string().min(1),
    kind: z.enum(QUESTION_KINDS),
    label: z.string().min(1),
    required: z.boolean().default(false),
    options: z.array(z.string().min(1)).optional(),
})

export const eventQuestionsSchema = z.array(eventQuestionSchema).catch([])

export const questionsFormSchema = z.object({
    presets: z.array(
        z.object({
            kind: z.enum(PRESET_QUESTION_KINDS),
            enabled: z.boolean(),
            label: z.string().trim().max(120, QUESTIONS_COPY.errors.labelLong),
            required: z.boolean(),
        }),
    ),
    custom: z.array(
        z.object({
            id: z.string(),
            label: z.string().trim().min(1, QUESTIONS_COPY.errors.label).max(120, QUESTIONS_COPY.errors.labelLong),
            required: z.boolean(),
            choices: z.string(),
        }),
    ),
})
