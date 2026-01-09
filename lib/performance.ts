// Performance monitoring and optimization utilities

/**
 * Web Vitals monitoring
 */
export const trackWebVitals = () => {
  if (typeof window === "undefined") return

  // Track Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log("[Performance] LCP:", lastEntry.renderTime || lastEntry.loadTime)
  })

  observer.observe({ entryTypes: ["largest-contentful-paint"] })

  // Track Cumulative Layout Shift (CLS)
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value
        console.log("[Performance] CLS:", clsValue)
      }
    }
  })

  clsObserver.observe({ entryTypes: ["layout-shift"] })

  // Track First Input Delay (FID) / Interaction to Next Paint (INP)
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log("[Performance] FID/INP:", entry.processingDuration)
    }
  })

  fidObserver.observe({ entryTypes: ["first-input", "event"] })
}

/**
 * Measure component render time
 */
export const measureComponentRender = (componentName: string, renderTime: number) => {
  console.log(`[Performance] ${componentName} render time: ${renderTime}ms`)

  if (renderTime > 1000) {
    console.warn(`[Performance] ${componentName} took ${renderTime}ms - consider optimization`)
  }
}

/**
 * Debounce function for performance-critical operations
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for scroll/resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Prefetch data for better perceived performance
 */
export const prefetchData = async (url: string) => {
  if (typeof window === "undefined") return

  try {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = url
    document.head.appendChild(link)
  } catch (error) {
    console.error("[Performance] Prefetch error:", error)
  }
}

/**
 * Request idle callback with fallback
 */
export const requestIdleCallback = (callback: () => void, options?: IdleRequestOptions) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, options)
  } else {
    setTimeout(callback, 1)
  }
}
