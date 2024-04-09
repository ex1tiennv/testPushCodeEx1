import { MeetingFileTypeToFolderName } from '@/constants/meeting'

export const getShortNameFromUrl = (url: string) => {
    const splitUrl = url.split('/')

    if (
        splitUrl.some((text) =>
            Object.values(MeetingFileTypeToFolderName).includes(text),
        )
    ) {
        const shortName = url.split('/').at(-1)
        return decodeURI(shortName as string)
    }

    return decodeURI(url)
}
