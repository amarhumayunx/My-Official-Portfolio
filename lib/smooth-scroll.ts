/**
 * Enhanced Smooth Scroll Utility
 * Provides world-class smooth scrolling with proper offset handling
 */

export interface ScrollOptions {
  offset?: number
  duration?: number
  easing?: (t: number) => number
  behavior?: ScrollBehavior
}

const DEFAULT_OFFSET = 80 // Navbar height
const DEFAULT_DURATION = 620 // ms — longer for liquid-smooth feel

// Liquid-like easing: smooth start and end (ease-out-quart style, feels like liquid deceleration)
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

/**
 * Smooth scroll to an element by ID
 */
export function scrollToSection(
  id: string,
  options: ScrollOptions = {}
): void {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element with id "${id}" not found`)
    return
  }

  const {
    offset = DEFAULT_OFFSET,
    duration = DEFAULT_DURATION,
    easing = easeOutQuart,
    behavior = "smooth",
  } = options

  const startPosition = window.pageYOffset || window.scrollY || 0
  const elementPosition = element.getBoundingClientRect().top + startPosition
  const targetPosition = elementPosition - offset
  const distance = targetPosition - startPosition

  if (behavior === "smooth" && duration > 0) {
    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easing(progress)

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        // Ensure we end exactly at the target position
        window.scrollTo(0, targetPosition)
      }
    }

    requestAnimationFrame(animateScroll)
  } else {
    window.scrollTo({
      top: targetPosition,
      behavior,
    })
  }
}

/**
 * Smooth scroll to top
 */
export function scrollToTop(options: ScrollOptions = {}): void {
  const { duration = DEFAULT_DURATION, easing = easeOutQuart } = options

  const startPosition = window.pageYOffset || window.scrollY || 0
  const distance = -startPosition

  if (duration > 0) {
    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easing(progress)

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        window.scrollTo(0, 0)
      }
    }

    requestAnimationFrame(animateScroll)
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

/**
 * Handle hash navigation with smooth scroll
 */
export function handleHashNavigation(hash: string, options: ScrollOptions = {}): void {
  if (!hash) return

  const id = hash.replace("#", "")
  
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    scrollToSection(id, options)
  }, 100)
}

/**
 * Initialize smooth scroll for all anchor links
 */
export function initSmoothScroll(options: ScrollOptions = {}): () => void {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement
    
    if (!anchor) return

    const href = anchor.getAttribute("href")
    if (!href || href === "#") return

    e.preventDefault()
    const id = href.replace("#", "")
    scrollToSection(id, options)
  }

  document.addEventListener("click", handleClick)

  // Handle initial hash on page load
  if (window.location.hash) {
    handleHashNavigation(window.location.hash, options)
  }

  // Handle hash changes
  const handleHashChange = () => {
    if (window.location.hash) {
      handleHashNavigation(window.location.hash, options)
    }
  }

  window.addEventListener("hashchange", handleHashChange)

  // Cleanup function
  return () => {
    document.removeEventListener("click", handleClick)
    window.removeEventListener("hashchange", handleHashChange)
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, threshold = 0.3): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= -windowHeight * threshold &&
    rect.left >= -windowWidth * threshold &&
    rect.bottom <= windowHeight * (1 + threshold) &&
    rect.right <= windowWidth * (1 + threshold)
  )
}

/**
 * Get current active section based on scroll position
 */
export function getActiveSection(sectionIds: string[], offset = DEFAULT_OFFSET): string | null {
  const scrollPosition = window.pageYOffset || window.scrollY || 0

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const section = document.getElementById(sectionIds[i])
    if (!section) continue

    const sectionTop = section.getBoundingClientRect().top + scrollPosition
    const adjustedTop = sectionTop - offset

    if (scrollPosition >= adjustedTop - 100) {
      return sectionIds[i]
    }
  }

  return sectionIds[0] || null
}
