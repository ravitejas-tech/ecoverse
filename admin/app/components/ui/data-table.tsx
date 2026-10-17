import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import type { TableColumn } from '~/types/table'

export interface DataTableProps<Row> {
    columns: TableColumn<Row>[]
    rows: Row[]
    rowKey: (row: Row) => string
    rowHref?: (row: Row) => string
    caption: string
    empty?: ReactNode
}

export function DataTable<Row>({ columns, rows, rowKey, rowHref, caption, empty }: DataTableProps<Row>) {
    if (rows.length === 0 && empty) return empty

    return (
        <>
            <ul
                aria-label={caption}
                className='space-y-3 sm:hidden'>
                {rows.map((row) => {
                    const body = (
                        <dl className='grid grid-cols-2 gap-x-4 gap-y-2'>
                            {columns
                                .filter(({ hideOnPhone }) => !hideOnPhone)
                                .map(({ key, header, cell, wideOnPhone }) => (
                                    <div
                                        key={key}
                                        className={cn('min-w-0', wideOnPhone && 'col-span-2')}>
                                        <Text
                                            as='dt'
                                            variant='meta'>
                                            {header}
                                        </Text>
                                        <Text
                                            as='dd'
                                            variant='small'
                                            className='truncate'>
                                            {cell(row)}
                                        </Text>
                                    </div>
                                ))}
                        </dl>
                    )
                    return (
                        <li key={rowKey(row)}>
                            <PopCard
                                asChild={Boolean(rowHref)}
                                interactive={Boolean(rowHref)}
                                className='block p-4'>
                                {rowHref ? <Link to={rowHref(row)}>{body}</Link> : <div>{body}</div>}
                            </PopCard>
                        </li>
                    )
                })}
            </ul>
            <PopCard className='hidden overflow-x-auto sm:block'>
                <table className='w-full border-collapse'>
                    <caption className='sr-only'>{caption}</caption>
                    <thead>
                        <tr className='border-b-2 border-border bg-surface-muted'>
                            {columns.map(({ key, header, align, nowrap }) => (
                                <Text
                                    key={key}
                                    as='th'
                                    variant='meta'
                                    className={cn(
                                        'px-4 py-3 text-left',
                                        align === 'end' && 'text-right',
                                        nowrap && 'whitespace-nowrap',
                                    )}>
                                    {header}
                                </Text>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={rowKey(row)}
                                className='border-b-2 border-border last:border-b-0 hover:bg-surface-muted'>
                                {columns.map(({ key, cell, align, nowrap }, index) => (
                                    <Text
                                        key={key}
                                        as='td'
                                        variant='small'
                                        className={cn(
                                            'px-4 py-3 align-middle',
                                            align === 'end' && 'text-right',
                                            nowrap && 'whitespace-nowrap',
                                        )}>
                                        {rowHref && index === 0 ? (
                                            <Link
                                                to={rowHref(row)}
                                                className='font-semibold underline-offset-4 hover:underline'>
                                                {cell(row)}
                                            </Link>
                                        ) : (
                                            cell(row)
                                        )}
                                    </Text>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </PopCard>
        </>
    )
}
