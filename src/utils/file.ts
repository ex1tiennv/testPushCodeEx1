import { FileType } from '@/constants/meeting'

export const getFileTypeByUrl = (url: string): FileType => {
    const lowercaseUrl = url.toLowerCase()
    if (lowercaseUrl.includes(FileType.EXCEL)) return FileType.EXCEL
    else if (lowercaseUrl.includes(FileType.PDF)) return FileType.PDF
    else if (lowercaseUrl.includes(FileType.WORD)) return FileType.WORD
    else return FileType.LINK
}
