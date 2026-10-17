import { ACTIVITY_COPY as copy, FIELD_LABELS } from '~/data/activity/copy'
import { ROLE_LABELS } from '~/data/staff/roles'
import { formatRupees } from '~/lib/format'
import type { ActivityEntity, FieldChange } from '~/types/activity'
import { Constants } from '~/types/database'

const rupees = (value: unknown) => formatRupees(Number(value))
const role = (value: unknown) => {
    const known = Constants.public.Enums.staff_role.find((staffRole) => staffRole === value)
    return known ? ROLE_LABELS[known] : String(value)
}
const text = (value: unknown) => String(value)

const UPDATE_RULES: {
    entity: ActivityEntity
    field: string
    describe: (name: string, change: FieldChange) => string
}[] = [
    {
        entity: 'events',
        field: 'status',
        describe: (name, { to }) => (to === 'published' ? copy.published(name) : copy.unpublished(name)),
    },
    {
        entity: 'events',
        field: 'sales_paused',
        describe: (name, { to }) => (to ? copy.paused(name) : copy.resumed(name)),
    },
    {
        entity: 'ticket_types',
        field: 'price',
        describe: (name, { from, to }) => copy.price(name, rupees(from), rupees(to)),
    },
    {
        entity: 'ticket_types',
        field: 'quantity',
        describe: (name, { from, to }) => copy.quantity(name, text(from), text(to)),
    },
    {
        entity: 'ticket_types',
        field: 'sold_out',
        describe: (name, { to }) => (to ? copy.soldOut(name) : copy.reopened(name)),
    },
    {
        entity: 'ticket_types',
        field: 'visible',
        describe: (name, { to }) => (to ? copy.shown(name) : copy.hidden(name)),
    },
    {
        entity: 'promo_codes',
        field: 'active',
        describe: (name, { to }) => (to ? copy.promoOn(name) : copy.promoOff(name)),
    },
    { entity: 'staff', field: 'role', describe: (name, { from, to }) => copy.role(name, role(from), role(to)) },
    {
        entity: 'staff',
        field: 'active',
        describe: (name, { to }) => (to ? copy.reactivated(name) : copy.deactivated(name)),
    },
    { entity: 'orders', field: 'status', describe: (name) => copy.cancelled(name) },
]

const fieldLabel = (field: string) => FIELD_LABELS[field] ?? field.replaceAll('_', ' ')

export function describeUpdate(entity: ActivityEntity, name: string, changes: Record<string, FieldChange>) {
    const described = UPDATE_RULES.filter((rule) => rule.entity === entity && changes[rule.field]).map((rule) =>
        rule.describe(name, changes[rule.field] ?? { from: null, to: null }),
    )
    if (described.length > 0) return described.join(' and ')
    const fields = [...new Set(Object.keys(changes).map(fieldLabel))].join(copy.fieldSeparator)
    return copy.edited(copy.things[entity](name), fields)
}
