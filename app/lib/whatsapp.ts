import { WHATSAPP } from '~/data/contact'

export function whatsappUrl(message: string) {
    return `${WHATSAPP.linkBase}/${WHATSAPP.number}?text=${encodeURIComponent(message)}`
}

export function whatsappShareUrl(text: string) {
    return `${WHATSAPP.linkBase}/?text=${encodeURIComponent(text)}`
}
