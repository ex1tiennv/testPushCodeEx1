export const capitalizeFirstLetter = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function truncateString({
    text,
    start = 4,
    end = 4,
    separator = '...',
}: {
    text: string
    start?: number
    end?: number
    separator?: string
}): string {
    if (!text) {
        return text
    }
    const textLength = text.length
    if (textLength <= start + end) {
        return text
    }
    const startText = text.substr(0, start)
    const endText = text.substr(textLength - end)
    return `${startText}${separator}${endText}`
}

export function convertSnakeCaseToTitleCase(value: string): string {
    if (!value) {
        return value
    }

    return value
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
