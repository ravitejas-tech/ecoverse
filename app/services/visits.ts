import { readAttribution, visitorId } from '~/lib/attribution'
import { supabase } from '~/services/supabase'

export async function trackVisit(path: string, eventId?: string) {
    const { referrer, ...utm } = readAttribution()
    await supabase.rpc('track_visit', {
        p_path: path,
        p_visitor_id: visitorId(),
        p_event_id: eventId,
        p_utm: utm,
        p_referrer: referrer,
    })
}
