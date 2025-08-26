"use client"

import { useState, useEffect, useCallback } from "react"

interface ABTestVariant {
  id: string
  name: string
  weight: number
}

interface ABTestConfig {
  testId: string
  variants: ABTestVariant[]
}

interface ABTestData {
  testId: string
  variant: string
  views: number
  conversions: number
  conversionRate: number
  startTime: number
}

interface ABTestResult {
  variant: string
  isVariant: (variantId: string) => boolean
  trackConversion: (eventType?: string) => void
  getTestData: () => ABTestData | null
}

// Statistical significance calculation
const calculateStatisticalSignificance = (
  controlViews: number,
  controlConversions: number,
  testViews: number,
  testConversions: number,
): { isSignificant: boolean; confidence: number; pValue: number } => {
  if (controlViews === 0 || testViews === 0) {
    return { isSignificant: false, confidence: 0, pValue: 1 }
  }

  const p1 = controlConversions / controlViews
  const p2 = testConversions / testViews
  const pooledP = (controlConversions + testConversions) / (controlViews + testViews)

  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlViews + 1 / testViews))

  if (se === 0) {
    return { isSignificant: false, confidence: 0, pValue: 1 }
  }

  const zScore = Math.abs(p1 - p2) / se

  // Approximate p-value calculation (two-tailed test)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))
  const confidence = (1 - pValue) * 100
  const isSignificant = pValue < 0.05 // 95% confidence level

  return { isSignificant, confidence, pValue }
}

// Normal cumulative distribution function approximation
const normalCDF = (x: number): number => {
  return 0.5 * (1 + erf(x / Math.sqrt(2)))
}

// Error function approximation
const erf = (x: number): number => {
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

// Cookie utilities
const setCookie = (name: string, value: string, days = 30) => {
  if (typeof window === "undefined") return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
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

// Local storage utilities
const getStorageKey = (testId: string) => `abtest_${testId}`

const getTestDataFromStorage = (testId: string): ABTestData | null => {
  if (typeof window === "undefined") return null

  try {
    const data = localStorage.getItem(getStorageKey(testId))
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

const saveTestDataToStorage = (data: ABTestData) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(getStorageKey(data.testId), JSON.stringify(data))
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

  return variants[0]?.id || ""
}

export const useABTest = (config: ABTestConfig): ABTestResult => {
  const [variant, setVariant] = useState<string>("")
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize variant selection
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) return

    const cookieKey = `abtest_variant_${config.testId}`
    let selectedVariant = getCookie(cookieKey)

    if (!selectedVariant) {
      selectedVariant = selectVariant(config.variants)
      setCookie(cookieKey, selectedVariant, 30)
    }

    setVariant(selectedVariant)
    setIsInitialized(true)

    // Track view
    const existingData = getTestDataFromStorage(config.testId)
    const updatedData: ABTestData = {
      testId: config.testId,
      variant: selectedVariant,
      views: (existingData?.views || 0) + 1,
      conversions: existingData?.conversions || 0,
      conversionRate: 0,
      startTime: existingData?.startTime || Date.now(),
    }

    updatedData.conversionRate = updatedData.views > 0 ? (updatedData.conversions / updatedData.views) * 100 : 0

    saveTestDataToStorage(updatedData)

    // Track with Google Analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "ab_test_view", {
        test_id: config.testId,
        variant: selectedVariant,
        event_category: "A/B Test",
        event_label: `${config.testId}_${selectedVariant}`,
      })
    }
  }, [config.testId, config.variants, isInitialized])

  const isVariant = useCallback(
    (variantId: string): boolean => {
      return variant === variantId
    },
    [variant],
  )

  const trackConversion = useCallback(
    (eventType = "conversion") => {
      if (!isInitialized || !variant) return

      const existingData = getTestDataFromStorage(config.testId)
      if (!existingData) return

      const updatedData: ABTestData = {
        ...existingData,
        conversions: existingData.conversions + 1,
        conversionRate: 0,
      }

      updatedData.conversionRate = updatedData.views > 0 ? (updatedData.conversions / updatedData.views) * 100 : 0

      saveTestDataToStorage(updatedData)

      // Track with Google Analytics if available
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "ab_test_conversion", {
          test_id: config.testId,
          variant: variant,
          event_type: eventType,
          event_category: "A/B Test",
          event_label: `${config.testId}_${variant}_${eventType}`,
          value: 1,
        })
      }
    },
    [config.testId, variant, isInitialized],
  )

  const getTestData = useCallback((): ABTestData | null => {
    return getTestDataFromStorage(config.testId)
  }, [config.testId])

  return {
    variant,
    isVariant,
    trackConversion,
    getTestData,
  }
}

// Utility function to track A/B test conversions (for backward compatibility)
export const trackABTestConversion = (testId: string, eventType = "conversion") => {
  if (typeof window === "undefined") return

  // Track with Google Analytics if available
  if ((window as any).gtag) {
    ;(window as any).gtag("event", "ab_test_conversion", {
      test_id: testId,
      event_type: eventType,
      event_category: "A/B Test",
      event_label: `${testId}_${eventType}`,
      value: 1,
    })
  }
}

// Export statistical functions for dashboard use
export { calculateStatisticalSignificance, getTestDataFromStorage, saveTestDataToStorage }
