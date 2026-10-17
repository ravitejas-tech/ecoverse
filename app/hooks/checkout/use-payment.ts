import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateOrder, useRazorpayCheckout, useVerifyPayment } from '~/hooks/checkout/mutations'
import type { CreateOrderInput, CreateOrderResult, VerifyPaymentInput, VerifyPaymentResult } from '~/types/checkout'
import { ticketPath } from '~/data/navigation'

const isHoldActive = ({ holdExpiresAt }: CreateOrderResult['order']) =>
    holdExpiresAt === null || Date.parse(holdExpiresAt) > Date.now()

export function usePayment(eventTitle: string) {
    const navigate = useNavigate()
    const [testSheetOpen, setTestSheetOpen] = useState(false)
    const createOrder = useCreateOrder()
    const razorpay = useRazorpayCheckout()
    const verify = useVerifyPayment()

    const finish = ({ accessToken, status }: VerifyPaymentResult) =>
        navigate(ticketPath(accessToken, status === 'paid'))

    const confirm = (input: VerifyPaymentInput) => verify.mutate(input, { onSuccess: finish })

    const startPayment = ({ order, payment }: CreateOrderResult, { buyer }: CreateOrderInput) => {
        if (payment.provider === 'free') return navigate(ticketPath(order.accessToken, true))
        if (payment.provider === 'test') return setTestSheetOpen(true)
        razorpay.mutate(
            {
                payment,
                description: eventTitle,
                prefill: { name: buyer.name, email: buyer.email, contact: buyer.phone },
            },
            {
                onSuccess: (response) =>
                    response &&
                    confirm({
                        orderId: order.id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }),
            },
        )
    }

    const pay = (input: CreateOrderInput, onOrderError: (error: Error) => void) => {
        razorpay.reset()
        verify.reset()
        const current = createOrder.data
        if (current && isHoldActive(current.order) && JSON.stringify(createOrder.variables) === JSON.stringify(input)) {
            return startPayment(current, input)
        }
        createOrder.mutate(input, { onSuccess: (result) => startPayment(result, input), onError: onOrderError })
    }

    const order = createOrder.data?.order ?? null

    return {
        pay,
        order,
        release: createOrder.reset,
        busy: createOrder.isPending || razorpay.isPending || verify.isPending || verify.isSuccess,
        error: createOrder.error ?? razorpay.error ?? verify.error,
        testSheet: {
            open: testSheetOpen,
            paying: verify.isPending || verify.isSuccess,
            close: () => setTestSheetOpen(false),
            confirm: () => order && confirm({ orderId: order.id }),
        },
    }
}
