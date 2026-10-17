import { CHOICE_JOINER, CHOICE_SEPARATOR, PRESET_QUESTIONS } from '~/data/events/questions'
import { CUSTOM_QUESTION_PREFIX } from '~/data/events/limits'
import type { EventQuestion, QuestionsFormValues } from '~/types/questions'

export function splitChoices(text: string) {
    return [
        ...new Set(
            text
                .split(CHOICE_SEPARATOR)
                .map((choice) => choice.trim())
                .filter(Boolean),
        ),
    ]
}

export function newCustomQuestion(): QuestionsFormValues['custom'][number] {
    return {
        id: `${CUSTOM_QUESTION_PREFIX}${crypto.randomUUID().slice(0, 8)}`,
        label: '',
        required: false,
        choices: '',
    }
}

export function questionsToForm(questions: readonly EventQuestion[]): QuestionsFormValues {
    return {
        presets: PRESET_QUESTIONS.map(({ kind, label }) => {
            const saved = questions.find((question) => question.kind === kind)
            return { kind, enabled: Boolean(saved), label: saved?.label ?? label, required: saved?.required ?? false }
        }),
        custom: questions
            .filter(({ kind }) => kind === 'custom')
            .map(({ id, label, required, options }) => ({
                id,
                label,
                required,
                choices: (options ?? []).join(CHOICE_JOINER),
            })),
    }
}

export function formToQuestions({ presets, custom }: QuestionsFormValues): EventQuestion[] {
    const chosen = presets
        .filter(({ enabled }) => enabled)
        .map(({ kind, label, required }) => ({
            id: kind,
            kind,
            label: label || (PRESET_QUESTIONS.find((preset) => preset.kind === kind)?.label ?? kind),
            required,
        }))
    const own = custom.map(({ id, label, required, choices }) => {
        const options = splitChoices(choices)
        return { id, kind: 'custom' as const, label, required, ...(options.length > 0 && { options }) }
    })
    return [...chosen, ...own]
}
