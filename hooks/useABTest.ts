"use client"

import { useState, useEffect } from "react"

export type ABTestVariant = "A" | "B"

interface ABTestConfig {
  testName: string
  variants: {
    A: { weight: number }
    B: { weight: number }
  }
  cookieExpiry?: number // days
}

export function useABTest(config: ABTestConfig): ABTestVariant {
  const [variant, setVariant] = useState<ABTestVariant>("A")

  useEffect(() => {
    const cookieName = `ab_test_${config.testName}`
    const existingVariant = getCookie(cookieName)

    if (existingVariant && (existingVariant === "A" || existingVariant === "B")) {
      setVariant(existingVariant as ABTestVariant)
    } else {
      // Assign variant based on weights
      const random = Math.random()
      const totalWeight = config.variants.A.weight + config.variants.B.weight
      const threshold = config.variants.A.weight / totalWeight

      const assignedVariant = random < threshold ? "A" : "B"
      setVariant(assignedVariant)

      // Store in cookie
      const expiry = config.cookieExpiry || 30
      setCookie(cookieName, assignedVariant, expiry)

      // Track assignment
      trackABTestAssignment(config.testName, assignedVariant)
    }
  }, [config])

  return variant
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

function trackABTestAssignment(testName: string, variant: ABTestVariant) {
  // Track assignment event
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "ab_test_assignment", {
      test_name: testName,
      variant: variant,
      event_category: "AB Testing",
    })
  }

  // Store in localStorage for analytics
  const assignments = JSON.parse(localStorage.getItem("ab_test_assignments") || "{}")
  assignments[testName] = {
    variant,
    timestamp: Date.now(),
  }
  localStorage.setItem("ab_test_assignments", JSON.stringify(assignments))
}

export function trackABTestConversion(testName: string, conversionType: string) {
  const assignments = JSON.parse(localStorage.getItem("ab_test_assignments") || "{}")
  const assignment = assignments[testName]

  if (assignment && typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "ab_test_conversion", {
      test_name: testName,
      variant: assignment.variant,
      conversion_type: conversionType,
      event_category: "AB Testing",
    })
  }
}
