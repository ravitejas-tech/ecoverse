import { ACTIVITY_COPY as copy } from '~/data/activity/copy'
import { describeUpdate } from '~/lib/activity-updates'
import { formatRupees } from '~/lib/format'
import { activityDetailsSchema, fieldChangesSchema } from '~/schemas/activity'
import type { ActivityEntity, ActivityEntry, ActivityItem } from '~/types/activity'

const ENTITIES: readonly ActivityEntity[] = ['events', 'ticket_types', 'promo_codes', 'staff', 'orders', 'tickets']

export const nameKey = (entity: string, id: string | null) => `${entity}:${id ?? ''}`

function asEntity(entity: string): ActivityEntity {
    return ENTITIES.find((known) => known === entity) ?? 'events'
}

export function describeActivity(entry: ActivityEntry, names: ReadonlyMap<string, string>) {
    const entity = asEntity(entry.entity)
    const details = activityDetailsSchema.parse(entry.changes)
    const name =
        names.get(nameKey(entry.entity, entry.entity_id)) ??
        details.name ??
        details.booking_code ??
        details.ticket ??
        copy.fallbackName
    const sentences: Record<string, () => string> = {
        insert: () => (entity === 'staff' ? copy.added(name) : copy.created(copy.things[entity](name))),
        delete: () => (entity === 'staff' ? copy.removed(name) : copy.deleted(copy.things[entity](name))),
        update: () => describeUpdate(entity, name, fieldChangesSchema.parse(entry.changes)),
        refund: () => copy.refunded(formatRupees(details.amount ?? 0), details.booking_code ?? name),
        complimentary: () => copy.complimentary(details.quantity ?? 1, details.ticket_type ?? '', details.email ?? ''),
        check_in_override: () => copy.override(details.ticket ?? name),
    }
    return sentences[entry.action]?.() ?? `${entry.action} ${name}`
}

export function toActivityItem(entry: ActivityEntry, names: ReadonlyMap<string, string>): ActivityItem {
    return {
        id: entry.id,
        actor: entry.actor_email ?? copy.system,
        sentence: describeActivity(entry, names),
        createdAt: entry.created_at,
    }
}
