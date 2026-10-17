import type { ReactNode } from 'react'

const COLUMN_CLASS = 'min-w-0 space-y-6'

export function FormColumns({ start, end }: { start: ReactNode; end: ReactNode }) {
    return (
        <div className='grid items-start gap-6 2xl:grid-cols-2'>
            <div className={COLUMN_CLASS}>{start}</div>
            <div className={COLUMN_CLASS}>{end}</div>
        </div>
    )
}
