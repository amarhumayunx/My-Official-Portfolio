"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function PrefetchManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Prefetch links on hover
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')

    const handleMouseEnter = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement
      const href = link.getAttribute("href")

      if (href && href.startsWith("/") && !href.startsWith("//")) {
        // Prefetch the page
        import("next/link").then(({ default: Link }) => {
          // Next.js will handle prefetching automatically
        })
      }
    }

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter, { once: true })
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter)
      })
    }
  }, [pathname])

  // Prefetch critical routes
  useEffect(() => {
    const criticalRoutes = ["/projects", "/blog", "/contact", "/services"]

    criticalRoutes.forEach((route) => {
      // Next.js router prefetch
      if (typeof window !== "undefined" && (window as any).next?.router) {
        try {
          ;(window as any).next.router.prefetch(route)
        } catch (error) {
          // Ignore prefetch errors
        }
      }
    })
  }, [])

  return null
}
