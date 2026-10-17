import { useId, useState, type KeyboardEvent } from 'react'
import { VenueSuggestions } from '~/components/events/venue/venue-suggestions'
import { Field } from '~/components/ui/field'
import { SearchInput } from '~/components/ui/search-input'
import { PLACE_SEARCH, VENUE_PICKER_COPY as copy } from '~/data/events/venue'
import { SEARCH_DEBOUNCE_MS } from '~/data/ui/search'
import { useDebouncedValue } from '~/hooks/use-debounced-value'
import { useVenueSuggestions } from '~/hooks/venue/queries'
import type { VenuePoint, VenueSuggestion } from '~/types/venue'

export interface VenueSearchProps {
    disabled: boolean
    near: VenuePoint
    onPick: (suggestion: VenueSuggestion) => void
}

export function VenueSearch({ disabled, near, onPick }: VenueSearchProps) {
    const id = useId()
    const listId = `${id}-list`
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(0)
    const query = useDebouncedValue(text.trim(), SEARCH_DEBOUNCE_MS)
    const searchable = query.length >= PLACE_SEARCH.minLength
    const {
        data: suggestions = [],
        isFetching,
        isError,
    } = useVenueSuggestions({ variables: { text: query, near }, enabled: searchable })
    const expanded = open && searchable && !disabled
    const optionId = (index: number) => `${listId}-${index}`

    const choose = (suggestion: VenueSuggestion | undefined) => {
        if (!suggestion) return
        onPick(suggestion)
        setText('')
        setOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (expanded) choose(suggestions[active])
        } else if (event.key === 'Escape') {
            setOpen(false)
        } else if (expanded && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault()
            const step = event.key === 'ArrowDown' ? 1 : -1
            setActive((current) => (current + step + suggestions.length) % Math.max(suggestions.length, 1))
        }
    }

    return (
        <Field
            label={copy.label}
            htmlFor={id}
            hint={copy.hint}>
            <div className='relative'>
                <SearchInput
                    id={id}
                    role='combobox'
                    aria-expanded={expanded}
                    aria-controls={listId}
                    aria-autocomplete='list'
                    aria-activedescendant={expanded && suggestions[active] ? optionId(active) : undefined}
                    value={text}
                    onValueChange={(value) => {
                        setText(value)
                        setOpen(true)
                        setActive(0)
                    }}
                    onKeyDown={onKeyDown}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    disabled={disabled}
                    clearLabel={copy.clear}
                    placeholder={copy.placeholder}
                    autoComplete='off'
                />
                {expanded && (
                    <VenueSuggestions
                        id={listId}
                        optionId={optionId}
                        suggestions={suggestions}
                        active={active}
                        searching={isFetching}
                        failed={isError}
                        onChoose={choose}
                    />
                )}
            </div>
        </Field>
    )
}
