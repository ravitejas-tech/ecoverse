import { Download, Gift } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { SearchInput } from '~/components/ui/search-input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Text } from '~/components/ui/text'
import { ATTENDEE_FILTERS, ATTENDEES_COPY } from '~/data/attendees/copy'
import type { AttendeeFilter } from '~/types/attendees'

export interface AttendeeToolbarProps {
    summary: string
    search: string
    filter: AttendeeFilter
    onSearch: (search: string) => void
    onFilter: (filter: AttendeeFilter) => void
    onDownload?: () => void
    onGiveFree?: () => void
}

export function AttendeeToolbar({
    summary,
    search,
    filter,
    onSearch,
    onFilter,
    onDownload,
    onGiveFree,
}: AttendeeToolbarProps) {
    return (
        <div className='space-y-3'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <Text
                    variant='label'
                    role='status'>
                    {summary}
                </Text>
                <div className='grid gap-3 sm:flex sm:flex-wrap'>
                    {onGiveFree && (
                        <Button onClick={onGiveFree}>
                            <Gift />
                            {ATTENDEES_COPY.giveFree}
                        </Button>
                    )}
                    {onDownload && (
                        <Button
                            variant='secondary'
                            onClick={onDownload}>
                            <Download />
                            {ATTENDEES_COPY.download}
                        </Button>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <SegmentedControl
                    label={ATTENDEES_COPY.filterLabel}
                    options={ATTENDEE_FILTERS}
                    value={filter}
                    onChange={onFilter}
                />
                <SearchInput
                    value={search}
                    onValueChange={onSearch}
                    clearLabel={ATTENDEES_COPY.clearSearch}
                    aria-label={ATTENDEES_COPY.searchLabel}
                    placeholder={ATTENDEES_COPY.searchPlaceholder}
                    className='md:w-80'
                />
            </div>
        </div>
    )
}
