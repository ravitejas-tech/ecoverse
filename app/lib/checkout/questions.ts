import { QUESTION_INPUTS } from '~/data/checkout/questions'
import { eventQuestionsSchema } from '~/schemas/event-questions'
import type { Json } from '~/types/database'
import type { EventQuestion } from '~/types/checkout'

export function parseEventQuestions(value: Json) {
    const parsed = eventQuestionsSchema.safeParse(value)
    return parsed.success ? parsed.data : []
}

export function questionOptions({ kind, options }: EventQuestion) {
    return options?.length ? options : (QUESTION_INPUTS[kind].options ?? [])
}

export function isSelectQuestion(question: EventQuestion) {
    return questionOptions(question).length > 0
}
