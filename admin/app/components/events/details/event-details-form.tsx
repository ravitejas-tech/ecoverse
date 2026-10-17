import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { AboutSection } from '~/components/events/details/about-section'
import { BasicsSection } from '~/components/events/details/basics-section'
import { CoverSection } from '~/components/events/details/cover-section'
import { GoodToKnowSection } from '~/components/events/details/good-to-know-section'
import { PairListSection } from '~/components/events/details/pair-list-section'
import { PoliciesSection } from '~/components/events/details/policies-section'
import { WhenWhereSection } from '~/components/events/details/when-where-section'
import { FormColumns } from '~/components/ui/form-columns'
import { Notice } from '~/components/ui/notice'
import { SaveBar } from '~/components/ui/save-bar'
import { UnsavedChangesGuard } from '~/components/ui/unsaved-changes-guard'
import { EVENT_FORM_ID, EVENT_ITEM_FIELDS, EVENT_SECTIONS, SAVE_BAR_COPY } from '~/data/events/form'
import { useUpdateEvent } from '~/hooks/events/mutations'
import { useCan } from '~/hooks/staff/use-can'
import { eventToForm, formToEventUpdate } from '~/lib/events/form'
import { eventFormSchema, type EventFormValues } from '~/schemas/event'
import type { EventRow } from '~/types/events'

export function EventDetailsForm({ event }: { event: EventRow }) {
    const canEdit = useCan('editEvents')
    const readOnly = !canEdit
    const { mutate, isPending } = useUpdateEvent()
    const form = useForm<EventFormValues>({ resolver: zodResolver(eventFormSchema), defaultValues: eventToForm(event) })
    const { isDirty } = form.formState

    return (
        <FormProvider {...form}>
            <form
                id={EVENT_FORM_ID}
                noValidate
                onSubmit={form.handleSubmit((values) =>
                    mutate(
                        { id: event.id, patch: formToEventUpdate(values), notice: 'saved' },
                        { onSuccess: (saved) => form.reset(eventToForm(saved)) },
                    ),
                )}>
                <fieldset
                    disabled={readOnly}
                    className='min-w-0 space-y-6'>
                    {readOnly && <Notice tone='cyan'>{SAVE_BAR_COPY.readOnly}</Notice>}
                    <FormColumns
                        start={
                            <>
                                <BasicsSection />
                                <WhenWhereSection readOnly={readOnly} />
                                <CoverSection
                                    eventId={event.id}
                                    readOnly={readOnly}
                                />
                                <AboutSection readOnly={readOnly} />
                            </>
                        }
                        end={
                            <>
                                <PairListSection
                                    name='schedule'
                                    fields={EVENT_ITEM_FIELDS.schedule}
                                    copy={EVENT_SECTIONS.schedule}
                                    readOnly={readOnly}
                                />
                                <PairListSection
                                    name='hosts'
                                    fields={EVENT_ITEM_FIELDS.hosts}
                                    copy={EVENT_SECTIONS.hosts}
                                    readOnly={readOnly}
                                />
                                <GoodToKnowSection readOnly={readOnly} />
                                <PairListSection
                                    name='faqs'
                                    fields={EVENT_ITEM_FIELDS.faqs}
                                    copy={EVENT_SECTIONS.faqs}
                                    stacked
                                    readOnly={readOnly}
                                />
                                <PoliciesSection />
                            </>
                        }
                    />
                </fieldset>
            </form>
            {canEdit && (
                <SaveBar
                    formId={EVENT_FORM_ID}
                    dirty={isDirty}
                    pending={isPending}
                    onDiscard={() => form.reset()}
                    copy={SAVE_BAR_COPY}
                />
            )}
            <UnsavedChangesGuard dirty={isDirty && !isPending} />
        </FormProvider>
    )
}
