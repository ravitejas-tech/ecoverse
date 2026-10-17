import { FilterChips } from '~/components/ui/filter-chips'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { EVENT_CATEGORIES } from '~/data/events/categories'
import { FILTER_LABELS, WHEN_OPTIONS } from '~/data/events/filters'
import { isEventCategory } from '~/lib/events'
import type { EventCategory, EventFilters as Filters } from '~/types/events'

export interface EventFiltersProps {
    filters: Filters
    cities: string[]
    categories: EventCategory[]
    onChange: (filters: Filters) => void
}

export function EventFilters({ filters, cities, categories, onChange }: EventFiltersProps) {
    return (
        <div className='mb-8 space-y-5 md:mb-12'>
            <SegmentedControl
                label={FILTER_LABELS.when}
                options={WHEN_OPTIONS}
                value={filters.when}
                onChange={(when) => onChange({ when, city: null, category: null })}
            />
            <div className='grid gap-4 lg:grid-cols-2'>
                {cities.length > 1 && (
                    <FilterChips
                        label={FILTER_LABELS.city}
                        allLabel={FILTER_LABELS.allCities}
                        options={cities.map((city) => ({ value: city, label: city }))}
                        value={filters.city}
                        onChange={(city) => onChange({ ...filters, city })}
                    />
                )}
                {categories.length > 1 && (
                    <FilterChips
                        label={FILTER_LABELS.category}
                        allLabel={FILTER_LABELS.allCategories}
                        options={categories.map((category) => ({
                            value: category,
                            label: EVENT_CATEGORIES[category].plural,
                        }))}
                        value={filters.category}
                        onChange={(category) =>
                            onChange({ ...filters, category: isEventCategory(category) ? category : null })
                        }
                    />
                )}
            </div>
        </div>
    )
}
