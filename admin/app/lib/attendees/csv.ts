import { ATTENDEES_FILE_SUFFIX } from '~/data/attendees/copy'
import { CSV_FILE } from '~/data/ui/files'
import { attendeeColumns } from '~/lib/attendees/rows'
import { toCsv } from '~/lib/csv'
import { downloadFile } from '~/lib/download'
import type { Attendee } from '~/types/attendees'
import type { EventQuestion } from '~/types/questions'

export function downloadAttendees(slug: string, attendees: readonly Attendee[], questions: readonly EventQuestion[]) {
    const columns = attendeeColumns(questions, true)
    const csv = toCsv([
        columns.map(({ header }) => header),
        ...attendees.map((attendee) => columns.map(({ cell }) => String(cell(attendee)))),
    ])
    downloadFile(`${slug}${ATTENDEES_FILE_SUFFIX}${CSV_FILE.extension}`, `${CSV_FILE.bom}${csv}`, CSV_FILE.type)
}
