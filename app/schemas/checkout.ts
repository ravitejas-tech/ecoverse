import { z } from 'zod'
import { FORM_ERRORS } from '~/data/checkout/form'
import { AGE_RANGE, ANSWER_MAX_LENGTH, MOBILE_PATTERN, NAME_LENGTH, PHONE_COUNTRY_CODE } from '~/data/checkout/limits'
import type { QuestionKind } from '~/data/checkout/questions'
import { isSelectQuestion } from '~/lib/checkout/questions'
import { localMobileDigits } from '~/lib/phone'
import type { EventQuestion } from '~/types/checkout'

const isMobile = (value: string) => MOBILE_PATTERN.test(localMobileDigits(value))

const isAge = (value: string) =>
    /^\d{1,3}$/.test(value) && Number(value) >= AGE_RANGE.min && Number(value) <= AGE_RANGE.max

const ANSWER_CHECKS: Partial<Record<QuestionKind, { test: (value: string) => boolean; message: string }>> = {
    age: { test: isAge, message: FORM_ERRORS.age },
    emergency_contact: { test: isMobile, message: FORM_ERRORS.contactPhone },
}

function answerSchema(question: EventQuestion) {
    const check = ANSWER_CHECKS[question.kind]
    return z
        .string()
        .trim()
        .max(ANSWER_MAX_LENGTH, FORM_ERRORS.tooLong)
        .refine(
            (value) => !question.required || value.length > 0,
            isSelectQuestion(question) ? FORM_ERRORS.choice : FORM_ERRORS.answer,
        )
        .refine((value) => value.length === 0 || !check || check.test(value), check?.message)
}

export function buildCheckoutSchema(questions: EventQuestion[]) {
    return z.object({
        name: z.string().trim().min(NAME_LENGTH.min, FORM_ERRORS.name).max(NAME_LENGTH.max, FORM_ERRORS.tooLong),
        phone: z
            .string()
            .trim()
            .refine(isMobile, FORM_ERRORS.phone)
            .transform((value) => `${PHONE_COUNTRY_CODE}${localMobileDigits(value)}`),
        email: z.string().trim().toLowerCase().pipe(z.email(FORM_ERRORS.email)),
        answers: z.object(Object.fromEntries(questions.map((question) => [question.id, answerSchema(question)]))),
        termsAccepted: z.boolean().refine((value) => value, FORM_ERRORS.terms),
        marketingConsent: z.boolean(),
    })
}
