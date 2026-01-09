// Accessibility utilities and helpers

/**
 * Generate accessible button aria-label
 */
export const getAriaLabel = (action: string, target?: string): string => {
  if (target) {
    return `${action} ${target}`
  }
  return action
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Check if user prefers dark mode
 */
export const prefersDarkMode = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/**
 * Announce screen reader messages
 */
export const announceToScreenReader = (message: string, priority: "polite" | "assertive" = "polite") => {
  if (typeof window === "undefined") return

  const announcement = document.createElement("div")
  announcement.setAttribute("role", "status")
  announcement.setAttribute("aria-live", priority)
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Focus visible indicator for keyboard navigation
 */
export const addFocusVisibleStyle = (element: HTMLElement) => {
  element.addEventListener("focus", () => {
    if (!element.matches(":focus-visible")) return
    element.classList.add("focus-ring")
  })

  element.addEventListener("blur", () => {
    element.classList.remove("focus-ring")
  })
}

/**
 * ARIA live regions for dynamic content updates
 */
export const updateAriaLiveRegion = (regionId: string, message: string) => {
  const region = document.getElementById(regionId)
  if (region) {
    region.textContent = message
  }
}
