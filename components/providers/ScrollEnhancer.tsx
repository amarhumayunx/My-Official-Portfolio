"use client"

import { useEffect } from "react"

// Liquid-like easing for scroll progress (smooth deceleration at ends)
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

const THROTTLE_MS = 100

export function ScrollEnhancer() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-scroll-animate]")
    if (elements.length === 0) return

    let rafId: number | null = null
    let lastRun = 0

    const syncScrollAnimations = () => {
      const now = Date.now()
      if (now - lastRun < THROTTLE_MS) return
      lastRun = now

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
        )
        const eased = easeOutQuart(elProgress)
        el.setAttribute("data-scroll-progress", String(eased))
      })
    }

    const handleScroll = () => {
      if (rafId == null) {
        rafId = requestAnimationFrame(() => {
          syncScrollAnimations()
          rafId = null
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    syncScrollAnimations()

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return null
}
