"use client"

import { useState, useEffect } from "react"

interface ABTestVariant {
  weight: number
}

interface ABTestConfig {
  testName: string
  variants: Record<string, ABTestVariant>
}

interface ABTestData {
  variant: string
  views: number
  conversions: number
  conversionRate: number
  confidence: number
  isWinner: boolean
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
const getTestData = (testName: string): Record<string, ABTestData> => {
  if (typeof window === "undefined") return {}
  try {
    const data = localStorage.getItem(`abtest_${testName}`)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

const setTestData = (testName: string, data: Record<string, ABTestData>) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(`abtest_${testName}`, JSON.stringify(data))
  } catch {
    // Handle storage errors silently
  }
}

// Assign variant based on weights
const assignVariant = (variants: Record<string, ABTestVariant>): string => {
  const totalWeight = Object.values(variants).reduce((sum, variant) => sum + variant.weight, 0)
  const random = Math.random() * totalWeight

  let currentWeight = 0
  for (const [variantName, variant] of Object.entries(variants)) {
    currentWeight += variant.weight
    if (random <= currentWeight) {
      return variantName
    }
  }

  // Fallback to first variant
  return Object.keys(variants)[0] || "A"
}

// Calculate statistical confidence
const calculateConfidence = (controlData: ABTestData, variantData: ABTestData): number => {
  if (controlData.views < 30 || variantData.views < 30) return 0

  const p1 = controlData.conversions / controlData.views
  const p2 = variantData.conversions / variantData.views
  const n1 = controlData.views
  const n2 = variantData.views

  const pooledP = (controlData.conversions + variantData.conversions) / (n1 + n2)
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2))

  if (se === 0) return 0

  const z = Math.abs(p1 - p2) / se

  // Convert z-score to confidence percentage (simplified)
  if (z > 2.58) return 99
  if (z > 1.96) return 95
  if (z > 1.65) return 90
  if (z > 1.28) return 80
  return Math.round(z * 40) // Rough approximation for lower values
}

export function useABTest(config: ABTestConfig): string {
  const [variant, setVariant] = useState<string>("A")

  useEffect(() => {
    const cookieName = `abtest_${config.testName}`
    let assignedVariant = getCookie(cookieName)

    if (!assignedVariant || !config.variants[assignedVariant]) {
      assignedVariant = assignVariant(config.variants)
      setCookie(cookieName, assignedVariant)
    }

    setVariant(assignedVariant)

    // Track view
    const testData = getTestData(config.testName)
    if (!testData[assignedVariant]) {
      testData[assignedVariant] = {
        variant: assignedVariant,
        views: 0,
        conversions: 0,
        conversionRate: 0,
        confidence: 0,
        isWinner: false,
      }
    }

    testData[assignedVariant].views += 1
    testData[assignedVariant].conversionRate =
      testData[assignedVariant].views > 0
        ? (testData[assignedVariant].conversions / testData[assignedVariant].views) * 100
        : 0

    setTestData(config.testName, testData)

    // Track with Google Analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "ab_test_view", {
        test_name: config.testName,
        variant: assignedVariant,
      })
    }
  }, [config.testName, config.variants])

  return variant
}

export function trackABTestConversion(testName: string, eventType = "conversion") {
  if (typeof window === "undefined") return

  const cookieName = `abtest_${testName}`
  const variant = getCookie(cookieName)

  if (!variant) return

  const testData = getTestData(testName)
  if (!testData[variant]) return

  testData[variant].conversions += 1
  testData[variant].conversionRate =
    testData[variant].views > 0 ? (testData[variant].conversions / testData[variant].views) * 100 : 0

  // Calculate confidence if we have multiple variants
  const variants = Object.keys(testData)
  if (variants.length >= 2) {
    const sortedVariants = variants.sort((a, b) => testData[b].conversionRate - testData[a].conversionRate)
    const winner = sortedVariants[0]
    const runnerUp = sortedVariants[1]

    const confidence = calculateConfidence(testData[runnerUp], testData[winner])
    testData[winner].confidence = confidence
    testData[winner].isWinner = confidence >= 95
  }

  setTestData(testName, testData)

  // Track with Google Analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "ab_test_conversion", {
      test_name: testName,
      variant: variant,
      event_type: eventType,
    })
  }
}

export function getABTestData(testName: string): Record<string, ABTestData> {
  return getTestData(testName)
}

export function resetABTest(testName: string) {
  if (typeof window === "undefined") return

  // Clear cookie
  setCookie(`abtest_${testName}`, "", -1)

  // Clear localStorage
  localStorage.removeItem(`abtest_${testName}`)
}
