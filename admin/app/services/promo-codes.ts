import { supabase } from '~/services/supabase'
import type { PromoCodeSave, PromoCodeToggle } from '~/types/promo-codes'

export async function listPromoCodes() {
    const [codes, summaries] = await Promise.all([
        supabase.from('promo_codes').select('*, events(title)').order('created_at', { ascending: false }),
        supabase.rpc('promo_code_summaries'),
    ])
    if (codes.error) throw codes.error
    if (summaries.error) throw summaries.error
    const stats = new Map(summaries.data.map((summary) => [summary.promo_code_id, summary]))
    return codes.data.map((code) => ({ ...code, stats: stats.get(code.id) }))
}

export async function savePromoCode({ id, values }: PromoCodeSave) {
    const { error } = id
        ? await supabase.from('promo_codes').update(values).eq('id', id)
        : await supabase.from('promo_codes').insert(values)
    if (error) throw error
}

export async function setPromoCodeActive({ id, active }: PromoCodeToggle) {
    const { error } = await supabase.from('promo_codes').update({ active }).eq('id', id)
    if (error) throw error
}
