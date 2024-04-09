export const formatNumber = (
    value: number | string,
    options?: { maximumFractionDigits: number },
) => {
    const maximumFractionDigits = options?.maximumFractionDigits ?? 3
    let valueNumber = value
    if (typeof value !== 'string') {
        valueNumber = Number(value)
    }
    const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits })
    return formater.format(valueNumber as number)
}
