import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import { usePromoCodes } from '~/hooks/promo-codes/queries'
import { promoErrorMessage } from '~/lib/promo-codes'
import { savePromoCode, setPromoCodeActive } from '~/services/promo-codes'

const { toasts } = PROMO_CODES_COPY

const showError = (error: Error) => toast.error(promoErrorMessage(error))

export const useSavePromoCode = createMutation({
    mutationFn: savePromoCode,
    onSuccess: (_data, { id }, _result, { client }) => {
        toast.success(id ? toasts.saved : toasts.created)
        return client.invalidateQueries({ queryKey: usePromoCodes.getKey() })
    },
    onError: showError,
})

export const useSetPromoCodeActive = createMutation({
    mutationFn: setPromoCodeActive,
    onSuccess: (_data, { code, active }, _result, { client }) => {
        toast.success(active ? toasts.turnedOn(code) : toasts.turnedOff(code))
        return client.invalidateQueries({ queryKey: usePromoCodes.getKey() })
    },
    onError: showError,
})
