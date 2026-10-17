import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SEARCH_DEBOUNCE_MS } from '~/data/ui/search'
import { useDebouncedValue } from '~/hooks/use-debounced-value'
import { withParam } from '~/lib/search-params'

export function useListParams(searchKey: string) {
    const [params, setParams] = useSearchParams()
    const search = params.get(searchKey) ?? ''
    const [searchText, setSearchText] = useState(search)
    const debouncedSearch = useDebouncedValue(searchText.trim(), SEARCH_DEBOUNCE_MS)

    const setParam = useCallback(
        (key: string, value: string) => setParams((current) => withParam(current, key, value), { replace: true }),
        [setParams],
    )

    useEffect(() => {
        if (debouncedSearch !== search) setParam(searchKey, debouncedSearch)
    }, [debouncedSearch, search, searchKey, setParam])

    return { params, search, searchText, setSearchText, setParam }
}
