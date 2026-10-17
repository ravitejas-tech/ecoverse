import { useFormContext } from 'react-hook-form'
import { Checkbox } from '~/components/ui/checkbox'
import { DashedSection } from '~/components/ui/dashed-section'
import { FieldError } from '~/components/ui/field-error'
import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'
import { CONSENT_COPY } from '~/data/checkout/form'
import { CHECKOUT_IDS } from '~/data/checkout/ids'
import { PATHS } from '~/data/navigation'
import type { CheckoutFormInput } from '~/types/checkout'

export function ConsentFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<CheckoutFormInput>()
    const termsError = errors.termsAccepted?.message
    const { before, terms, between, refund } = CONSENT_COPY.terms

    return (
        <DashedSection className='space-y-4'>
            <div className='space-y-2'>
                <Checkbox
                    {...register('termsAccepted')}
                    aria-invalid={Boolean(termsError)}
                    aria-describedby={termsError ? CHECKOUT_IDS.termsError : undefined}>
                    <Text
                        as='span'
                        variant='small'>
                        {before}
                        <TextLink
                            to={PATHS.terms}
                            target='_blank'
                            rel='noopener'
                            aria-label={`${terms}${CONSENT_COPY.newTab}`}>
                            {terms}
                        </TextLink>
                        {between}
                        <TextLink
                            to={PATHS.refundPolicy}
                            target='_blank'
                            rel='noopener'
                            aria-label={`${refund}${CONSENT_COPY.newTab}`}>
                            {refund}
                        </TextLink>
                    </Text>
                </Checkbox>
                {termsError && <FieldError id={CHECKOUT_IDS.termsError}>{termsError}</FieldError>}
            </div>
            <Checkbox {...register('marketingConsent')}>
                <Text
                    as='span'
                    variant='small'
                    tone='secondary'>
                    {CONSENT_COPY.marketing}
                </Text>
            </Checkbox>
        </DashedSection>
    )
}
