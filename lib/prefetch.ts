// Prefetch utilities for performance optimization

/**
 * Prefetch a page route
 */
export function prefetchRoute(href: string) {
  if (typeof window === "undefined") return

  // Use Next.js router prefetch if available
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = href
      document.head.appendChild(link)
    })
  }
}

/**
 * Prefetch multiple routes
 */
export function prefetchRoutes(routes: string[]) {
  routes.forEach((route) => prefetchRoute(route))
}

/**
 * Prefetch critical routes on page load
 */
export function prefetchCriticalRoutes() {
  if (typeof window === "undefined") return

  const criticalRoutes = [
    "/#projects",
    "/#blog",
    "/#contact",
    "/projects",
    "/blog",
    "/search",
  ]

  // Prefetch after a short delay to not block initial render
  setTimeout(() => {
    prefetchRoutes(criticalRoutes)
  }, 2000)
}

/**
 * Prefetch on hover for better UX
 */
export function setupHoverPrefetch() {
  if (typeof window === "undefined") return

  const links = document.querySelectorAll('a[href^="/"]')
  
  links.forEach((link) => {
    let prefetched = false
    
    link.addEventListener("mouseenter", () => {
      if (!prefetched) {
        const href = link.getAttribute("href")
        if (href) {
          prefetchRoute(href)
          prefetched = true
        }
      }
    }, { passive: true })
  })
}
