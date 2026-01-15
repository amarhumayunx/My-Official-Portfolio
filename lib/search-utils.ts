/**
 * Search utility functions
 */

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Highlight search terms in text
 */
export function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900/50 px-1 rounded">$1</mark>')
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Save search history to localStorage
 */
export function saveSearchHistory(term: string): void {
  if (typeof window === "undefined") return

  try {
    const history = getSearchHistory()
    const updatedHistory = [term, ...history.filter((item) => item !== term)].slice(0, 10)
    localStorage.setItem("blog-search-history", JSON.stringify(updatedHistory))
  } catch (error) {
    console.error("Failed to save search history:", error)
  }
}

/**
 * Get search history from localStorage
 */
export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return []

  try {
    const history = localStorage.getItem("blog-search-history")
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error("Failed to get search history:", error)
    return []
  }
}

/**
 * Clear search history
 */
export function clearSearchHistory(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem("blog-search-history")
  } catch (error) {
    console.error("Failed to clear search history:", error)
  }
}
