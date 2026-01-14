"use client"

import { useEffect } from "react"

// Easing function for smooth animations
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function ScrollEnhancer() {
  useEffect(() => {
    let ticking = false
    let rafId: number | null = null

    // Sync scroll-linked animations across elements with data-scroll-progress attribute
    const syncScrollAnimations = () => {
      const elements = document.querySelectorAll("[data-scroll-animate]")

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
        )

        const eased = easeInOutCubic(elProgress)
        el.setAttribute("data-scroll-progress", String(eased))
      })

      ticking = false
    }

    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(syncScrollAnimations)
        ticking = true
      }
    }

    // Throttled resize handler
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(syncScrollAnimations)
    }

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    // Initial sync on mount
    syncScrollAnimations()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return null
}
