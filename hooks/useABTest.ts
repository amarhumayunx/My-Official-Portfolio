"use client"

import { useState, useEffect, useCallback } from "react"

export interface ABTestVariant {
  id: string
  name: string
  weight: number
}

export interface ABTestConfig {
  testId: string
  variants: ABTestVariant[]
  cookieName?: string
}

export interface ABTestData {
  testId: string
  variant: string
  views: number
  conversions: number
  conversionRate: number
  lastUpdated: Date
}

export interface ABTestResult {
  variant: string
  trackView: () => void
  trackConversion: (eventType?: string) => void
  isLoading: boolean
}

// Cookie utilities
const setCookie = (name: string, value: string, days = 30) => {
  if (typeof window === "undefined") return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Local storage utilities for test data
const getTestData = (testId: string): ABTestData | null => {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(`abtest_${testId}`)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

const saveTestData = (data: ABTestData) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(`abtest_${data.testId}`, JSON.stringify(data))
  } catch {
    // Handle storage errors silently
  }
}

// Weighted random selection
const selectVariant = (variants: ABTestVariant[]): string => {
  const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0)
  let random = Math.random() * totalWeight

  for (const variant of variants) {
    random -= variant.weight
    if (random <= 0) {
      return variant.id
    }
  }

  return variants[0].id // Fallback
}

export const useABTest = (config: ABTestConfig): ABTestResult => {
  const [variant, setVariant] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const cookieName = config.cookieName || `abtest_${config.testId}`

  useEffect(() => {
    // Get existing variant from cookie or assign new one
    let assignedVariant = getCookie(cookieName)

    if (!assignedVariant) {
      assignedVariant = selectVariant(config.variants)
      setCookie(cookieName, assignedVariant)
    }

    setVariant(assignedVariant)
    setIsLoading(false)
  }, [config.testId, config.variants, cookieName])

  const trackView = useCallback(() => {
    if (!variant) return

    const existingData = getTestData(config.testId) || {
      testId: config.testId,
      variant,
      views: 0,
      conversions: 0,
      conversionRate: 0,
      lastUpdated: new Date(),
    }

    const updatedData: ABTestData = {
      ...existingData,
      views: existingData.views + 1,
      lastUpdated: new Date(),
    }

    updatedData.conversionRate = updatedData.views > 0 ? (updatedData.conversions / updatedData.views) * 100 : 0

    saveTestData(updatedData)

    // Track with Google Analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "ab_test_view", {
        test_id: config.testId,
        variant: variant,
        event_category: "AB Test",
      })
    }
  }, [variant, config.testId])

  const trackConversion = useCallback(
    (eventType = "conversion") => {
      if (!variant) return

      const existingData = getTestData(config.testId) || {
        testId: config.testId,
        variant,
        views: 0,
        conversions: 0,
        conversionRate: 0,
        lastUpdated: new Date(),
      }

      const updatedData: ABTestData = {
        ...existingData,
        conversions: existingData.conversions + 1,
        lastUpdated: new Date(),
      }

      updatedData.conversionRate = updatedData.views > 0 ? (updatedData.conversions / updatedData.views) * 100 : 0

      saveTestData(updatedData)

      // Track with Google Analytics if available
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "ab_test_conversion", {
          test_id: config.testId,
          variant: variant,
          event_type: eventType,
          event_category: "AB Test",
        })
      }
    },
    [variant, config.testId],
  )

  return {
    variant,
    trackView,
    trackConversion,
    isLoading,
  }
}

// Utility function for getting all test data
export const getAllTestData = (): ABTestData[] => {
  if (typeof window === "undefined") return []

  const testData: ABTestData[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith("abtest_")) {
      try {
        const data = localStorage.getItem(key)
        if (data) {
          testData.push(JSON.parse(data))
        }
      } catch {
        // Skip invalid data
      }
    }
  }

  return testData
}

// Statistical significance calculation
export const calculateStatisticalSignificance = (
  controlViews: number,
  controlConversions: number,
  testViews: number,
  testConversions: number,
): { isSignificant: boolean; confidence: number } => {
  if (controlViews === 0 || testViews === 0) {
    return { isSignificant: false, confidence: 0 }
  }

  const controlRate = controlConversions / controlViews
  const testRate = testConversions / testViews

  const pooledRate = (controlConversions + testConversions) / (controlViews + testViews)
  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlViews + 1 / testViews))

  if (standardError === 0) {
    return { isSignificant: false, confidence: 0 }
  }

  const zScore = Math.abs(testRate - controlRate) / standardError

  // Approximate confidence calculation
  const confidence = Math.min(99.9, Math.max(0, (1 - 2 * (1 - normalCDF(Math.abs(zScore)))) * 100))

  return {
    isSignificant: confidence >= 95,
    confidence: Math.round(confidence * 10) / 10,
  }
}

// Normal CDF approximation
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)))
}

// Error function approximation
function erf(x: number): number {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x >= 0 ? 1 : -1
  x = Math.abs(x)

  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return sign * y
}

// Export the trackABTestConversion function
export const trackABTestConversion = (testId: string, eventType = "conversion") => {
  // This is a standalone function that can be called from anywhere
  const existingData = getTestData(testId)
  if (!existingData) return

  const updatedData: ABTestData = {
    ...existingData,
    conversions: existingData.conversions + 1,
    lastUpdated: new Date(),
  }

  updatedData.conversionRate = updatedData.views > 0 ? (updatedData.conversions / updatedData.views) * 100 : 0

  saveTestData(updatedData)

  // Track with Google Analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "ab_test_conversion", {
      test_id: testId,
      variant: existingData.variant,
      event_type: eventType,
      event_category: "AB Test",
    })
  }
}
