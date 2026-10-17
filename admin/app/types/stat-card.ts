import type { StatCardProps } from '~/components/ui/stat-card'
import type { PopTone } from '~/data/ui/pop-tones'

export interface StatCardConfig<Source> extends Pick<StatCardProps, 'label' | 'icon'> {
    key: string
    tone: PopTone
    value: (source: Source) => string
    hint?: (source: Source) => string
}
