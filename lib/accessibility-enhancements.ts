/**
 * Enhanced Accessibility Utilities
 * WCAG 2.1 AA compliance helpers
 */

/**
 * Check color contrast ratio
 */
export function checkContrastRatio(foreground: string, background: string): number {
  // Simplified contrast calculation
  // In production, use a proper library like 'color-contrast-checker'
  return 4.5 // Placeholder - should calculate actual ratio
}

/**
 * Generate accessible focus styles
 */
export function getFocusStyles(): string {
  return `
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2
    focus-visible:ring-offset-background
  `
}

/**
 * Ensure minimum touch target size (44x44px for mobile)
 */
export function ensureTouchTarget(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const minSize = 44

  if (rect.width < minSize || rect.height < minSize) {
    element.style.minWidth = `${minSize}px`
    element.style.minHeight = `${minSize}px`
  }
}

/**
 * Add skip link functionality
 */
export function addSkipLink(targetId: string, label: string = "Skip to main content") {
  if (typeof window === "undefined") return

  const skipLink = document.createElement("a")
  skipLink.href = `#${targetId}`
  skipLink.textContent = label
  skipLink.className = "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
  skipLink.setAttribute("aria-label", label)

  document.body.insertBefore(skipLink, document.body.firstChild)
}

/**
 * Manage focus trap for modals
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  container.addEventListener("keydown", handleTabKey)
  firstElement?.focus()

  return () => {
    container.removeEventListener("keydown", handleTabKey)
  }
}

/**
 * Announce page changes to screen readers
 */
export function announcePageChange(pageTitle: string) {
  if (typeof window === "undefined") return

  const announcement = document.createElement("div")
  announcement.setAttribute("role", "status")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = `Navigated to ${pageTitle}`

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Ensure all images have alt text
 */
export function validateImageAltTexts(): { missing: number; total: number } {
  if (typeof window === "undefined") return { missing: 0, total: 0 }

  const images = document.querySelectorAll("img")
  let missing = 0

  images.forEach((img) => {
    if (!img.getAttribute("alt") && !img.getAttribute("aria-label")) {
      missing++
    }
  })

  return { missing, total: images.length }
}

/**
 * Ensure proper heading hierarchy
 */
export function validateHeadingHierarchy(): { errors: string[] } {
  if (typeof window === "undefined") return { errors: [] }

  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
  const errors: string[] = []
  let previousLevel = 0

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    
    if (index === 0 && level !== 1) {
      errors.push("First heading should be h1")
    }
    
    if (level > previousLevel + 1) {
      errors.push(`Heading hierarchy skipped: ${heading.tagName} after h${previousLevel}`)
    }
    
    previousLevel = level
  })

  return { errors }
}

/**
 * Add keyboard navigation indicators
 */
export function addKeyboardNavigationIndicators() {
  if (typeof window === "undefined") return

  // Add visual indicator when navigating with keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })
}

/**
 * High contrast mode support
 */
export function enableHighContrastMode(enabled: boolean) {
  if (typeof window === "undefined") return

  if (enabled) {
    document.documentElement.classList.add("high-contrast")
    localStorage.setItem("high-contrast", "true")
  } else {
    document.documentElement.classList.remove("high-contrast")
    localStorage.removeItem("high-contrast")
  }
}

/**
 * Font size controls
 */
export function setFontSize(size: "small" | "medium" | "large" | "xlarge") {
  if (typeof window === "undefined") return

  const sizes = {
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
    xlarge: "1.25rem",
  }

  document.documentElement.style.fontSize = sizes[size]
  localStorage.setItem("font-size", size)
}

/**
 * Initialize accessibility enhancements
 */
export function initAccessibilityEnhancements() {
  if (typeof window === "undefined") return

  // Add keyboard navigation indicators
  addKeyboardNavigationIndicators()

  // Restore user preferences
  const highContrast = localStorage.getItem("high-contrast")
  if (highContrast === "true") {
    enableHighContrastMode(true)
  }

  const fontSize = localStorage.getItem("font-size") as "small" | "medium" | "large" | "xlarge" | null
  if (fontSize) {
    setFontSize(fontSize)
  }

  // Ensure skip link exists
  if (!document.querySelector('a[href="#main-content"]')) {
    addSkipLink("main-content")
  }
}
