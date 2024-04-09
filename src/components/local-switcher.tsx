'use client'

import clsx from 'clsx'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { ChangeEvent, useTransition } from 'react'

const LocaleSwitcher = () => {
    const t = useTranslations('LocaleSwitcher')

    const [isPending, startTransition] = useTransition()
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale })
        })
    }

    return (
        <label
            className={clsx(
                'relative text-gray-400',
                isPending && 'transition-opacity [&:disabled]:opacity-30',
            )}
        >
            <p>{t('label')}</p>
            <select
                className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {['en', 'ja'].map((cur) => (
                    <option key={cur} value={cur}>
                        {t('locale', { locale: cur })}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default LocaleSwitcher
