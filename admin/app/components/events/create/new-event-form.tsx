import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { NewEventCover } from '~/components/events/create/new-event-cover'
import { NewEventWhen } from '~/components/events/create/new-event-when'
import { NewEventWhere } from '~/components/events/create/new-event-where'
import { Button } from '~/components/ui/button'
import { FormColumns } from '~/components/ui/form-columns'
import { Panel } from '~/components/ui/panel'
import { SelectField } from '~/components/ui/select-field'
import { TextField } from '~/components/ui/text-field'
import { NEW_EVENT_COPY } from '~/data/events/copy'
import { EVENT_FIELDS } from '~/data/events/form'
import { CATEGORY_OPTIONS } from '~/data/events/labels'
import { CREATED_PARAM, EVENT_PATHS } from '~/data/events/links'
import { useCreateEvent } from '~/hooks/events/mutations'
import { newEventDefaults } from '~/lib/events/create'
import { newEventSchema, type NewEventValues } from '~/schemas/event-create'

export function NewEventForm() {
    const navigate = useNavigate()
    const { mutate, isPending } = useCreateEvent()
    const form = useForm<NewEventValues>({ resolver: zodResolver(newEventSchema), defaultValues: newEventDefaults() })

    return (
        <FormProvider {...form}>
            <form
                noValidate
                className='space-y-6'
                onSubmit={form.handleSubmit((values) =>
                    mutate(values, {
                        onSuccess: ({ id }) => navigate(`${EVENT_PATHS.tickets(id)}?${CREATED_PARAM}=1`),
                    }),
                )}>
                <FormColumns
                    start={
                        <>
                            <Panel title={NEW_EVENT_COPY.sections.what}>
                                <TextField<NewEventValues>
                                    name='title'
                                    label={EVENT_FIELDS.title.label}
                                    placeholder={EVENT_FIELDS.title.placeholder}
                                    required
                                />
                                <SelectField<NewEventValues>
                                    name='category'
                                    label={EVENT_FIELDS.category.label}
                                    options={CATEGORY_OPTIONS}
                                />
                                <TextField<NewEventValues>
                                    name='summary'
                                    label={EVENT_FIELDS.summary.label}
                                    hint={EVENT_FIELDS.summary.hint}
                                    multiline
                                    rows={2}
                                    required
                                />
                            </Panel>
                            <NewEventWhen />
                        </>
                    }
                    end={
                        <>
                            <NewEventWhere />
                            <NewEventCover />
                        </>
                    }
                />
                <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                    <Button
                        asChild
                        variant='secondary'>
                        <Link to={EVENT_PATHS.list}>{NEW_EVENT_COPY.cancel}</Link>
                    </Button>
                    <Button
                        type='submit'
                        disabled={isPending}>
                        {isPending ? NEW_EVENT_COPY.submitting : NEW_EVENT_COPY.submit}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
