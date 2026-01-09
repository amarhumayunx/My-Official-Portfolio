"use client"

import { useEffect } from "react"
import { analytics } from "@/lib/analytics"

export function useAnalytics() {
  useEffect(() => {
    analytics.init()
  }, [])

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackClick: analytics.trackClick.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackTimeOnPage: analytics.trackTimeOnPage.bind(analytics),
  }
}
