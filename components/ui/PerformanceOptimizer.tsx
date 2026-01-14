"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { prefetchRoute } from "@/lib/prefetch"

/**
 * Component to optimize performance with prefetching and resource hints
 */
export function PerformanceOptimizer() {
  const pathname = usePathname()

  useEffect(() => {
    // Prefetch likely next pages based on current route
    if (pathname === "/") {
      // Prefetch main sections
      setTimeout(() => {
        prefetchRoute("/projects")
        prefetchRoute("/blog")
        prefetchRoute("/search")
      }, 3000)
    }

    // Add resource hints for critical assets
    const addResourceHint = (rel: string, href: string, as?: string) => {
      const link = document.createElement("link")
      link.rel = rel
      link.href = href
      if (as) link.setAttribute("as", as)
      if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        document.head.appendChild(link)
      }
    }

    // Preconnect to external domains
    addResourceHint("preconnect", "https://fonts.googleapis.com")
    addResourceHint("preconnect", "https://fonts.gstatic.com", "crossorigin")
    addResourceHint("dns-prefetch", "https://api.github.com")

    // Preload critical fonts
    const fontLink = document.createElement("link")
    fontLink.rel = "preload"
    fontLink.href = "/fonts/inter.woff2"
    fontLink.setAttribute("as", "font")
    fontLink.setAttribute("type", "font/woff2")
    fontLink.setAttribute("crossorigin", "anonymous")
    if (!document.querySelector('link[rel="preload"][href="/fonts/inter.woff2"]')) {
      document.head.appendChild(fontLink)
    }
  }, [pathname])

  return null
}
