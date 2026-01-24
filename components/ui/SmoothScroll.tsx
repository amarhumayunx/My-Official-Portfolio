"use client"

import { useEffect } from "react"
import { initSmoothScroll, handleHashNavigation } from "@/lib/smooth-scroll"

export function SmoothScroll() {
  useEffect(() => {
    // Initialize smooth scroll for all anchor links
    const cleanup = initSmoothScroll({
      offset: 80, // Navigation height
      duration: 800,
    })

    // Handle initial hash on page load
    if (typeof window !== "undefined" && window.location.hash) {
      handleHashNavigation(window.location.hash, { offset: 80 })
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

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      cleanup()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
