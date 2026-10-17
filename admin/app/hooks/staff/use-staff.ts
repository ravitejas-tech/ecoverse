import { useRouteLoaderData } from 'react-router'
import type { clientLoader } from '~/routes/layout'

export const STAFF_ROUTE_ID = 'routes/layout'

export function useStaff() {
    const data = useRouteLoaderData<typeof clientLoader>(STAFF_ROUTE_ID)
    if (!data) throw new Error('useStaff must be used inside the signed-in layout')
    return data.staff
}
