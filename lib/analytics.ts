// Analytics utility for tracking user interactions and events

export interface AnalyticsEvent {
  name: string
  category: string
  label?: string
  value?: number
  timestamp?: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private isEnabled = typeof window !== "undefined"

  /**
   * Initialize analytics
   */
  init() {
    if (!this.isEnabled) return

    // Send pending events on page unload
    window.addEventListener("beforeunload", () => this.flushEvents())
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) return

    const enhancedEvent: AnalyticsEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
    }

    this.events.push(enhancedEvent)
    console.log("[Analytics] Event tracked:", enhancedEvent)

    // Send immediately for critical events
    if (event.category === "conversion" || event.category === "error") {
      this.flushEvents()
    }
  }

  /**
   * Track page view
   */
  trackPageView(page: string) {
    this.trackEvent({
      name: "page_view",
      category: "navigation",
      label: page,
    })
  }

  /**
   * Track button click
   */
  trackClick(buttonName: string, category = "engagement") {
    this.trackEvent({
      name: "click",
      category,
      label: buttonName,
    })
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName: string, success: boolean) {
    this.trackEvent({
      name: "form_submission",
      category: "conversion",
      label: formName,
      value: success ? 1 : 0,
    })
  }

  /**
   * Track error
   */
  trackError(error: string, context?: string) {
    this.trackEvent({
      name: "error",
      category: "error",
      label: context,
      value: 1,
    })
    console.error("[Analytics] Error tracked:", error, context)
  }

  /**
   * Track time spent on page
   */
  trackTimeOnPage(page: string, seconds: number) {
    this.trackEvent({
      name: "time_on_page",
      category: "engagement",
      label: page,
      value: seconds,
    })
  }

  /**
   * Flush all events (send to server)
   */
  flushEvents() {
    if (this.events.length === 0) return

    const payload = {
      events: this.events,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }

    // Send to your analytics endpoint
    // await fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) })

    console.log("[Analytics] Flushing events:", payload)
    this.events = []
  }

  /**
   * Get pending events
   */
  getPendingEvents(): AnalyticsEvent[] {
    return [...this.events]
  }
}

export const analytics = new Analytics()
