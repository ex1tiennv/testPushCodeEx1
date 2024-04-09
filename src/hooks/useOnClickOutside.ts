import { RefObject, useEffect } from 'react'
/* eslint-disable */
type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
    useEffect(() => {
        const f = (event: MouseEvent) => {
            const el = ref?.current

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return
            }

            handler(event)
        }

        window.addEventListener(mouseEvent, f)

        return () => {
            window.removeEventListener(mouseEvent, f)
        }
    })
}
