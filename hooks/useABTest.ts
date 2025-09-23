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
  isReady: boolean
}

// Cookie utilities
const setCookie = (name: string, value: string, days = 30) => {
  if (typeof window === "undefined") return
  try {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  } catch (error) {
    console.warn("Failed to set cookie:", error)
  }
}

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null
  try {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  } catch (error) {
    console.warn("Failed to get cookie:", error)
    return null
  }
}

// Local storage utilities for test data
let saveTimeout: NodeJS.Timeout | null = null

const getTestData = (testId: string): ABTestData | null => {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(`abtest_${testId}`)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.warn("Failed to get test data:", error)
    return null
  }
}

const saveTestData = (data: ABTestData) => {
  if (typeof window === "undefined") return

  // Debounce saves to prevent excessive localStorage writes
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }

  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(`abtest_${data.testId}`, JSON.stringify(data))
    } catch (error) {
      console.warn("Failed to save test data:", error)
    }
  }, 100)
}

// Weighted random selection
const selectVariant = (variants: ABTestVariant[]): string => {
  if (variants.length === 0) return ""
  if (variants.length === 1) return variants[0].id

  const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0)
  if (totalWeight === 0) return variants[0].id

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
  const [isReady, setIsReady] = useState(false)

  const cookieName = config.cookieName || `abtest_${config.testId}`

  useEffect(() => {
    // Get existing variant from cookie or assign new one
    const initializeTest = async () => {
      try {
        // Small delay to prevent flash of loading state
        await new Promise((resolve) => setTimeout(resolve, 50))

        let assignedVariant = getCookie(cookieName)

        if (!assignedVariant || !config.variants.find((v) => v.id === assignedVariant)) {
          assignedVariant = selectVariant(config.variants)
          setCookie(cookieName, assignedVariant)
        }

        setVariant(assignedVariant)

        // Another small delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 100))

        setIsReady(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to initialize A/B test:", error)
        // Fallback to first variant
        const fallbackVariant = config.variants[0]?.id || ""
        setVariant(fallbackVariant)
        setIsReady(true)
        setIsLoading(false)
      }
    }

    initializeTest()
  }, [config.testId, config.variants, cookieName])

  const trackView = useCallback(() => {
    if (!variant || !isReady) return

    try {
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
        requestAnimationFrame(() => {
          ;(window as any).gtag("event", "ab_test_view", {
            test_id: config.testId,
            variant: variant,
            event_category: "AB Test",
            custom_parameter_1: "smooth_tracking",
          })
        })
      }
    } catch (error) {
      console.warn("Failed to track view:", error)
    }
  }, [variant, config.testId, isReady])

  const trackConversion = useCallback(
    (eventType = "conversion") => {
      if (!variant || !isReady) return

      try {
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
          requestAnimationFrame(() => {
            ;(window as any).gtag("event", "ab_test_conversion", {
              test_id: config.testId,
              variant: variant,
              event_type: eventType,
              event_category: "AB Test",
              value: 1,
              custom_parameter_1: "smooth_tracking",
            })
          })
        }
      } catch (error) {
        console.warn("Failed to track conversion:", error)
      }
    },
    [variant, config.testId, isReady],
  )

  return {
    variant,
    trackView,
    trackConversion,
    isLoading,
    isReady,
  }
}

// Utility function for getting all test data
export const getAllTestData = (): ABTestData[] => {
  if (typeof window === "undefined") return []

  const testData: ABTestData[] = []

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("abtest_")) {
        try {
          const data = localStorage.getItem(key)
          if (data) {
            const parsedData = JSON.parse(data)
            // Validate data structure
            if (parsedData.testId && parsedData.variant !== undefined) {
              testData.push(parsedData)
            }
          }
        } catch (error) {
          console.warn(`Failed to parse test data for key ${key}:`, error)
        }
      }
    }
  } catch (error) {
    console.warn("Failed to get all test data:", error)
  }

  return testData
}

// Statistical significance calculation
export const calculateStatisticalSignificance = (
  controlViews: number,
  controlConversions: number,
  testViews: number,
  testConversions: number,
): { isSignificant: boolean; confidence: number; pValue: number } => {
  if (controlViews === 0 || testViews === 0) {
    return { isSignificant: false, confidence: 0, pValue: 1 }
  }

  const controlRate = controlConversions / controlViews
  const testRate = testConversions / testViews

  const pooledRate = (controlConversions + testConversions) / (controlViews + testViews)
  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlViews + 1 / testViews))

  if (standardError === 0) {
    return { isSignificant: false, confidence: 0, pValue: 1 }
  }

  const zScore = Math.abs(testRate - controlRate) / standardError
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))
  const confidence = Math.min(99.9, Math.max(0, (1 - pValue) * 100))

  return {
    isSignificant: confidence >= 95,
    confidence: Math.round(confidence * 10) / 10,
    pValue: Math.round(pValue * 10000) / 10000,
  }
}

// Normal CDF approximation
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)))
}

// Error function approximation
function erf(x: number): number {
  // Abramowitz and Stegun formula 7.1.26 approximation
  // https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  const absX = Math.abs(x)

  const t = 1 / (1 + p * absX)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX)

  return sign * y
}

// Export the trackABTestConversion function
export const trackABTestConversion = (testId: string, eventType = "conversion") => {
  if (typeof window === "undefined") return

  try {
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
    if ((window as any).gtag) {
      requestAnimationFrame(() => {
        ;(window as any).gtag("event", "ab_test_conversion", {
          test_id: testId,
          variant: existingData.variant,
          event_type: eventType,
          event_category: "AB Test",
          custom_parameter_1: "standalone_tracking",
        })
      })
    }
  } catch (error) {
    console.warn("Failed to track standalone conversion:", error)
  }
}
