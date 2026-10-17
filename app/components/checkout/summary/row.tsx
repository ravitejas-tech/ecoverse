import { Text } from '~/components/ui/text'

export interface SummaryRowProps {
    label: string
    value: string
    emphasis?: boolean
}

export function SummaryRow({ label, value, emphasis = false }: SummaryRowProps) {
    return (
        <div className='flex items-baseline justify-between gap-4'>
            <dt>
                <Text
                    as='span'
                    variant={emphasis ? 'label' : 'small'}
                    tone={emphasis ? 'primary' : 'secondary'}>
                    {label}
                </Text>
            </dt>
            <dd>
                <Text
                    as='span'
                    variant={emphasis ? 'price' : 'label'}>
                    {value}
                </Text>
            </dd>
        </div>
    )
}
