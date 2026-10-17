import { Map as MapIcon, MapPin } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { VENUE_PICKER_COPY as copy } from '~/data/events/venue'
import { cn } from '~/lib/utils'
import type { VenueSuggestion } from '~/types/venue'

export interface VenueSuggestionsProps {
    id: string
    optionId: (index: number) => string
    suggestions: VenueSuggestion[]
    active: number
    searching: boolean
    failed: boolean
    onChoose: (suggestion: VenueSuggestion) => void
}

export function VenueSuggestions({
    id,
    optionId,
    suggestions,
    active,
    searching,
    failed,
    onChoose,
}: VenueSuggestionsProps) {
    const empty = suggestions.length === 0

    return (
        <ul
            id={id}
            role='listbox'
            aria-label={copy.suggestions}
            aria-busy={searching}
            className='absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-pop-sm'>
            {suggestions.map((suggestion, index) => {
                const Icon = suggestion.exact ? MapPin : MapIcon
                return (
                    <li
                        key={suggestion.id}
                        id={optionId(index)}
                        role='option'
                        aria-selected={index === active}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => onChoose(suggestion)}
                        className={cn(
                            'flex cursor-pointer items-start gap-3 border-b-2 border-border px-4 py-3 last:border-b-0 hover:bg-surface-muted',
                            index === active && 'bg-surface-muted',
                        )}>
                        <Icon
                            className={cn(
                                'mt-0.5 size-5 shrink-0',
                                suggestion.exact ? 'text-accent-text' : 'text-text-muted',
                            )}
                            aria-hidden
                        />
                        <span className='min-w-0'>
                            <Text
                                as='span'
                                variant='label'
                                className='block truncate'>
                                {suggestion.name}
                            </Text>
                            <Text
                                as='span'
                                variant='small'
                                tone='muted'
                                className='block truncate'>
                                {suggestion.area}
                            </Text>
                        </span>
                    </li>
                )
            })}
            {empty && (
                <li
                    role='presentation'
                    className='px-4 py-3'>
                    <Text
                        variant='small'
                        tone='muted'>
                        {failed ? copy.searchFailed : searching ? copy.searching : copy.noResults}
                    </Text>
                </li>
            )}
        </ul>
    )
}
