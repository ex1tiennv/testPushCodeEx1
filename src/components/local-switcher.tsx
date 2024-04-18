'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { ChangeEvent, useTransition } from 'react'

const LocaleSwitcher = () => {
    const [isPending, startTransition] = useTransition()
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    function onSelectLocal(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocaleSelected = event.target.value
        startTransition(() => {
            router.replace(pathname, { locale: nextLocaleSelected })
        })
    }

    return (
        <label
            className={`
                relative text-sm text-white ${
                    isPending && 'transition-opacity [&:disabled]:opacity-30'
                }
            `}
        >
            <select
                className="inline-flex cursor-pointer bg-transparent pb-2  pl-2 pr-1 pt-2"
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectLocal}
            >
                {['en', 'ja'].map((cur) => (
                    <option key={cur} value={cur} className="text-black">
                        {cur.toUpperCase()}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default LocaleSwitcher
