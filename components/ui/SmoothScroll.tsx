"use client"

import { useEffect } from "react"
import { initSmoothScroll, handleHashNavigation } from "@/lib/smooth-scroll"

export function SmoothScroll() {
  useEffect(() => {
    const cleanup = initSmoothScroll({
      offset: 80,
      duration: 480, /* Shorter = snappier, less RAF overhead */
    })

    if (typeof window !== "undefined" && window.location.hash) {
      handleHashNavigation(window.location.hash, { offset: 80 })
    }

    return cleanup
  }, [])

  return null
}
