import { z } from 'zod'
import { QUESTION_KINDS } from '~/data/checkout/questions'

export const eventQuestionSchema = z.object({
    id: z.string().min(1),
    kind: z.enum(QUESTION_KINDS),
    label: z.string().min(1),
    required: z.boolean().default(false),
    options: z.array(z.string().min(1)).optional(),
})

export const eventQuestionsSchema = z.array(eventQuestionSchema)
