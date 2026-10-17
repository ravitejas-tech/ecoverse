import { useOutletContext } from 'react-router'
import type { EventOutletContext } from '~/types/events'

export function useEventOutlet() {
    return useOutletContext<EventOutletContext>()
}
