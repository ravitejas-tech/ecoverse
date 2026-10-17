import type { UTM_PARAMS } from '~/data/ui/attribution'

export type Attribution = Partial<Record<keyof typeof UTM_PARAMS | 'referrer', string>>
