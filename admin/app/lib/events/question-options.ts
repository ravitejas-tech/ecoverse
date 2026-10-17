import { PRESET_QUESTIONS } from '~/data/events/questions'
import type { EventQuestion } from '~/types/questions'

export function questionOptions({ kind, options }: EventQuestion) {
    return options?.length ? options : (PRESET_QUESTIONS.find((preset) => preset.kind === kind)?.options ?? [])
}

export function questionPlaceholder({ kind }: EventQuestion) {
    return PRESET_QUESTIONS.find((preset) => preset.kind === kind)?.placeholder
}
