'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function UmamiTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track()
    }
  }, [pathname])

  return null
}