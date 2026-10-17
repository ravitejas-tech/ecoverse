const NEEDS_QUOTES = /[",\r\n]/
const FORMULA_START = /^[=@\t\r]|^[+-](?![\d\s]*$)/

function escapeCell(value: string) {
    const safe = FORMULA_START.test(value) ? `'${value}` : value
    return NEEDS_QUOTES.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe
}

export function toCsv(rows: readonly (readonly string[])[]) {
    return rows.map((row) => row.map(escapeCell).join(',')).join('\r\n')
}
