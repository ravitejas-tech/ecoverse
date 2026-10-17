export type ShareResult = 'shared' | 'copied' | 'failed'

export async function shareLink(data: { title: string; text: string; url: string }): Promise<ShareResult> {
    if (navigator.share) {
        try {
            await navigator.share(data)
            return 'shared'
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') return 'shared'
        }
    }
    try {
        await navigator.clipboard.writeText(data.url)
        return 'copied'
    } catch {
        return 'failed'
    }
}
