import type { ReactNode } from 'react'

export interface TableColumn<Row> {
    key: string
    header: string
    cell: (row: Row) => ReactNode
    align?: 'start' | 'end'
    hideOnPhone?: boolean
    wideOnPhone?: boolean
    nowrap?: boolean
}
