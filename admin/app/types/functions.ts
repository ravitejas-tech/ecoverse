import type { FUNCTION_ERROR_CODES } from '~/data/ui/function-errors'

export type FunctionErrorCode = (typeof FUNCTION_ERROR_CODES)[number]
