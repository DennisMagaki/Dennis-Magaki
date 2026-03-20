"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function UmamiTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track()
    }
  }, [pathname])

  return null
}