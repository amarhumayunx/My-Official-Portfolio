/**
 * Error Tracking Utility
 * Provides error tracking and monitoring capabilities
 */

interface ErrorInfo {
  message: string
  stack?: string
  url?: string
  userAgent?: string
  timestamp: number
  userId?: string
  context?: Record<string, unknown>
}

class ErrorTracker {
  private errors: ErrorInfo[] = []
  private maxErrors = 100 // Keep last 100 errors in memory

  /**
   * Track an error
   */
  trackError(error: Error | string | unknown, context?: Record<string, unknown>) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : String(error ?? "Unknown error")
    const stack = error instanceof Error ? error.stack : undefined
    const errorInfo: ErrorInfo = {
      message: message || "Unknown error",
      stack,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
      timestamp: Date.now(),
      context,
    }

    this.errors.push(errorInfo)

    // Keep only last N errors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift()
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error tracked:", message, context ?? errorInfo)
    }

    // In production, you would send to error tracking service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === "production") {
      this.sendToErrorService(errorInfo)
    }
  }

  /**
   * Send error to external error tracking service
   */
  private async sendToErrorService(errorInfo: ErrorInfo) {
    try {
      // Example: Send to your API endpoint
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorInfo),
      // })

      // Or integrate with Sentry:
      // Sentry.captureException(new Error(errorInfo.message), {
      //   extra: errorInfo.context,
      //   tags: { url: errorInfo.url },
      // })
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to send error to tracking service:", err)
      }
    }
  }

  /**
   * Get recent errors
   */
  getRecentErrors(limit = 10): ErrorInfo[] {
    return this.errors.slice(-limit).reverse()
  }

  /**
   * Clear all errors
   */
  clearErrors() {
    this.errors = []
  }
}

// Singleton instance
export const errorTracker = new ErrorTracker()

/**
 * React Error Boundary helper
 */
export function trackReactError(error: Error, errorInfo: { componentStack?: string }) {
  errorTracker.trackError(error, {
    componentStack: errorInfo.componentStack,
    type: "react-error-boundary",
  })
}

/**
 * Track API errors
 */
export function trackApiError(endpoint: string, error: Error | string, statusCode?: number) {
  errorTracker.trackError(error instanceof Error ? error : new Error(error), {
    endpoint,
    statusCode,
    type: "api-error",
  })
}

/**
 * Track form errors
 */
export function trackFormError(formName: string, error: Error | string, field?: string) {
  errorTracker.trackError(error instanceof Error ? error : new Error(error), {
    formName,
    field,
    type: "form-error",
  })
}
