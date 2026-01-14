// Enhanced error tracking utility

interface ErrorContext {
  url?: string
  userAgent?: string
  timestamp?: number
  userId?: string
  [key: string]: unknown
}

class ErrorTracker {
  private errors: Array<{ error: Error; context: ErrorContext }> = []
  private maxErrors = 50

  /**
   * Initialize error tracking
   */
  init() {
    if (typeof window === "undefined") return

    // Track unhandled errors
    window.addEventListener("error", (event) => {
      this.trackError(
        new Error(event.message),
        {
          url: window.location.href,
          userAgent: navigator.userAgent,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      )
    })

    // Track unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.trackError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        {
          url: window.location.href,
          userAgent: navigator.userAgent,
          type: "unhandledrejection",
        },
      )
    })
  }

  /**
   * Track an error
   */
  trackError(error: Error, context: ErrorContext = {}) {
    const errorData = {
      error,
      context: {
        ...context,
        url: context.url || (typeof window !== "undefined" ? window.location.href : ""),
        userAgent: context.userAgent || (typeof navigator !== "undefined" ? navigator.userAgent : ""),
        timestamp: context.timestamp || Date.now(),
      },
    }

    this.errors.push(errorData)

    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift()
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorTracker]", error, context)
    }

    // Send to error tracking service (e.g., Sentry)
    this.sendToService(errorData)
  }

  /**
   * Send error to external service
   */
  private async sendToService(errorData: { error: Error; context: ErrorContext }) {
    // Only send in production
    if (process.env.NODE_ENV !== "production") return

    try {
      // Example: Send to your error tracking API
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData),
      // })

      // For now, just log (you can integrate Sentry here)
      console.error("[ErrorTracker] Error logged:", errorData)
    } catch (err) {
      console.error("[ErrorTracker] Failed to send error:", err)
    }
  }

  /**
   * Get all tracked errors
   */
  getErrors() {
    return [...this.errors]
  }

  /**
   * Clear all errors
   */
  clearErrors() {
    this.errors = []
  }
}

export const errorTracker = new ErrorTracker()

// Initialize on import
if (typeof window !== "undefined") {
  errorTracker.init()
}
