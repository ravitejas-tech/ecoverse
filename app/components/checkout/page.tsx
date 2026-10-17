import { FormProvider } from 'react-hook-form'
import { BuyerDetails } from '~/components/checkout/details/buyer-details'
import { CheckoutHeader } from '~/components/checkout/header'
import { PayBar } from '~/components/checkout/payment/pay-bar'
import { TestPaymentSheet } from '~/components/checkout/payment/test-sheet'
import { CheckoutStep } from '~/components/checkout/step'
import { SummaryPanel } from '~/components/checkout/summary/panel'
import { TicketPicker } from '~/components/checkout/tickets/picker'
import { Container } from '~/components/ui/container'
import { FORM_COPY } from '~/data/checkout/form'
import { CHECKOUT_IDS } from '~/data/checkout/ids'
import { CHECKOUT_STEPS } from '~/data/checkout/page'
import { useCheckout } from '~/hooks/checkout/use-checkout'
import type { TicketOption } from '~/types/checkout'
import type { EventWithTickets } from '~/types/events'

export interface CheckoutPageProps {
    event: EventWithTickets
    options: TicketOption[]
}

export function CheckoutPage({ event, options }: CheckoutPageProps) {
    const { questions, cart, form, promo, payment, submit, changeQuantity, total } = useCheckout(event, options)
    const holdExpiresAt = payment.order?.holdExpiresAt ?? null
    const empty = cart.lines.length === 0

    return (
        <Container className='pt-4 pb-0 sm:pt-8 lg:pb-20'>
            <CheckoutHeader event={event} />
            <div className='grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-8'>
                <div className='space-y-6 lg:col-span-2'>
                    <CheckoutStep
                        id={CHECKOUT_IDS.tickets}
                        {...CHECKOUT_STEPS.tickets}>
                        <TicketPicker
                            options={options}
                            people={cart.people}
                            quantityOf={cart.quantityOf}
                            canAdd={cart.canAdd}
                            onChange={changeQuantity}
                        />
                    </CheckoutStep>
                    <CheckoutStep
                        id={CHECKOUT_IDS.details}
                        {...CHECKOUT_STEPS.details}
                        lead={FORM_COPY.detailsLead}>
                        <FormProvider {...form}>
                            <form
                                id={CHECKOUT_IDS.form}
                                onSubmit={submit}
                                noValidate>
                                <BuyerDetails questions={questions} />
                            </form>
                        </FormProvider>
                    </CheckoutStep>
                </div>
                <CheckoutStep
                    id={CHECKOUT_IDS.summary}
                    {...CHECKOUT_STEPS.summary}
                    className='lg:sticky lg:top-24'>
                    <SummaryPanel
                        lines={cart.lines}
                        people={cart.people}
                        total={total}
                        promo={promo}
                        holdExpiresAt={holdExpiresAt}
                        busy={payment.busy}
                        error={payment.error}
                    />
                </CheckoutStep>
            </div>
            <PayBar
                total={total}
                empty={empty}
                busy={payment.busy}
                holdExpiresAt={holdExpiresAt}
            />
            <TestPaymentSheet
                open={payment.testSheet.open}
                total={payment.order?.total ?? total}
                paying={payment.testSheet.paying}
                onPay={payment.testSheet.confirm}
                onClose={payment.testSheet.close}
            />
        </Container>
    )
}
