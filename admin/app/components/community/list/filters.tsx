import { SearchInput } from '~/components/ui/search-input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Select } from '~/components/ui/select'
import { Text } from '~/components/ui/text'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { COMMUNITY_SEGMENTS, COMMUNITY_SORTS } from '~/data/community/filters'
import { parseCommunitySort, segmentHint } from '~/lib/community/members'
import type { CommunitySegment, CommunitySort } from '~/types/community'

const { list } = COMMUNITY_COPY

export interface CommunityFiltersProps {
    searchText: string
    onSearchText: (value: string) => void
    segment: CommunitySegment
    onSegment: (value: CommunitySegment) => void
    sort: CommunitySort
    onSort: (value: CommunitySort) => void
}

export function CommunityFilters({
    searchText,
    onSearchText,
    segment,
    onSegment,
    sort,
    onSort,
}: CommunityFiltersProps) {
    return (
        <div className='mb-6 space-y-3'>
            <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
                <SegmentedControl
                    label={list.segmentLabel}
                    options={COMMUNITY_SEGMENTS}
                    value={segment}
                    onChange={onSegment}
                />
                <div className='grid gap-3 md:grid-cols-2 xl:flex'>
                    <SearchInput
                        value={searchText}
                        onValueChange={onSearchText}
                        clearLabel={list.clearSearch}
                        aria-label={list.searchLabel}
                        placeholder={list.searchPlaceholder}
                        autoComplete='off'
                        className='xl:w-80'
                    />
                    <Select
                        aria-label={list.sortLabel}
                        value={sort}
                        onChange={(event) => onSort(parseCommunitySort(event.target.value))}
                        options={COMMUNITY_SORTS}
                        className='xl:w-60'
                    />
                </div>
            </div>
            <Text
                variant='small'
                tone='muted'
                aria-live='polite'>
                {segmentHint(segment)}
            </Text>
        </div>
    )
}
