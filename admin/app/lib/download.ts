export function downloadFile(filename: string, content: string, type: string) {
    const url = URL.createObjectURL(new Blob([content], { type }))
    const link = Object.assign(document.createElement('a'), { href: url, download: filename })
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}
