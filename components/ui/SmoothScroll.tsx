"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scroll with easing
    const smoothScrollTo = (target: number, duration: number = 800) => {
      const start = window.pageYOffset
      const distance = target - start
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, start + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    // Handle anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement

      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const href = anchor.getAttribute("href")
        if (href === "#" || href === "#!") return

        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          const offset = 80 // Navigation height
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
          smoothScrollTo(targetPosition, 800)
        }
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-linked animations can go here
          ticking = false
        })
        ticking = true
      }
    }

    document.addEventListener("click", handleAnchorClick, { passive: false })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
