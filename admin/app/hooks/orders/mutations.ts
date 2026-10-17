import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { ORDERS_COPY } from '~/data/orders/copy'
import { useOrder, useOrders } from '~/hooks/orders/queries'
import { functionErrorMessage } from '~/lib/function-errors'
import { cancelOrder, refundOrder, resendTickets, updateOrderNotes } from '~/services/orders'
import type { QueryClient } from '@tanstack/react-query'

function refreshOrder(client: QueryClient, orderId: string) {
    void client.invalidateQueries({ queryKey: useOrder.getKey(orderId) })
    void client.invalidateQueries({ queryKey: useOrders.getKey() })
}

const showError = (error: Error) => toast.error(functionErrorMessage(error))

export const useUpdateOrderNotes = createMutation({
    mutationFn: updateOrderNotes,
    onSuccess: (_data, { orderId }, _result, { client }) => {
        toast.success(ORDERS_COPY.notes.saved)
        refreshOrder(client, orderId)
    },
    onError: showError,
})

export const useCancelOrder = createMutation({
    mutationFn: cancelOrder,
    onSuccess: (_data, { orderId }, _result, { client }) => {
        toast.success(ORDERS_COPY.cancel.done)
        refreshOrder(client, orderId)
    },
    onError: showError,
})

export const useRefundOrder = createMutation({
    mutationFn: refundOrder,
    onSuccess: (_data, { orderId }, _result, { client }) => {
        toast.success(ORDERS_COPY.refund.done)
        refreshOrder(client, orderId)
    },
    onError: showError,
})

export const useResendTickets = createMutation({
    mutationFn: resendTickets,
    onSuccess: () => toast.success(ORDERS_COPY.actions.resent),
    onError: showError,
})
