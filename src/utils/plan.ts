/* eslint-disable */
export const getNumberLimitedPlan = (
    quantity: number,
    t: (value: string) => string,
): string => {
    return quantity === -1 ? t('UNLIMITED') : String(quantity)
}
