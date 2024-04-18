export const getFirstCharacter = (value: string) => {
    return value.trim().slice(0, 1)
}

export const getFirstCharacterUpperCase = (value: string) => {
    return value?.trim().slice(0, 1).toUpperCase()
}
