import { useEffect, useRef } from 'react'

const useEventListener = (
  type: keyof DocumentEventMap,
  callback: EventListenerOrEventListenerObject
): void => {
  const refCallback = useRef<EventListenerOrEventListenerObject>(callback)
  useEffect(() => {
    refCallback.current = callback
    document.addEventListener(type, refCallback.current)
    return () => {
      document.removeEventListener(type, refCallback.current)
    }
  }, [type, callback])
}

export default useEventListener
