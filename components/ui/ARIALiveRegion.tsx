"use client"

import { useEffect } from "react"

/**
 * ARIA Live Region component for screen reader announcements
 */
export function ARIALiveRegion() {
  useEffect(() => {
    // Create polite live region
    const politeRegion = document.createElement("div")
    politeRegion.id = "aria-live-polite"
    politeRegion.setAttribute("role", "status")
    politeRegion.setAttribute("aria-live", "polite")
    politeRegion.setAttribute("aria-atomic", "true")
    politeRegion.className = "sr-only"
    document.body.appendChild(politeRegion)

    // Create assertive live region
    const assertiveRegion = document.createElement("div")
    assertiveRegion.id = "aria-live-assertive"
    assertiveRegion.setAttribute("role", "alert")
    assertiveRegion.setAttribute("aria-live", "assertive")
    assertiveRegion.setAttribute("aria-atomic", "true")
    assertiveRegion.className = "sr-only"
    document.body.appendChild(assertiveRegion)

    return () => {
      document.body.removeChild(politeRegion)
      document.body.removeChild(assertiveRegion)
    }
  }, [])

  return null
}

/**
 * Announce message to screen readers
 */
export function announce(message: string, priority: "polite" | "assertive" = "polite") {
  const regionId = priority === "assertive" ? "aria-live-assertive" : "aria-live-polite"
  const region = document.getElementById(regionId)
  
  if (region) {
    region.textContent = message
    // Clear after announcement
    setTimeout(() => {
      region.textContent = ""
    }, 1000)
  }
}
