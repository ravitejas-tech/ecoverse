import { Text } from '~/components/ui/text'

export interface StackedCellProps {
    main: string
    sub?: string
    code?: boolean
}

export function StackedCell({ main, sub, code = false }: StackedCellProps) {
    return (
        <>
            <Text
                as='span'
                variant={code ? 'code' : 'inherit'}
                tone='inherit'
                className='block truncate'>
                {main}
            </Text>
            {sub && (
                <Text
                    as='span'
                    variant='small'
                    tone='muted'
                    className='block max-w-40 truncate'>
                    {sub}
                </Text>
            )}
        </>
    )
}
