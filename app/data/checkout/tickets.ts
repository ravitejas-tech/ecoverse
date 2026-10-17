export const TICKET_ROW_COPY = {
    add: (name: string) => `Add one ${name}`,
    remove: (name: string) => `Remove one ${name}`,
    quantity: (name: string) => `${name} tickets selected`,
    peopleCap: (max: number) => `Up to ${max} people per booking`,
} as const
