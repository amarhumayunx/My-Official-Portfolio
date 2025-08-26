"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { RefreshCw, Download, TrendingUp, Users, MousePointer, Award } from "lucide-react"
import { getAllTestData, calculateStatisticalSignificance, type ABTestData } from "@/hooks/useABTest"

interface TestPerformance {
  testId: string
  testName: string
  variants: {
    [key: string]: ABTestData & {
      variantName: string
    }
  }
  winner?: string
  confidence?: number
  isSignificant?: boolean
  improvement?: number
}

export const ABTestDashboard: React.FC = () => {
  const [testData, setTestData] = useState<TestPerformance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const loadTestData = () => {
    setIsLoading(true)

    try {
      const rawData = getAllTestData()

      // Group data by test ID
      const groupedData: { [key: string]: ABTestData[] } = {}
      rawData.forEach((data) => {
        if (!groupedData[data.testId]) {
          groupedData[data.testId] = []
        }
        groupedData[data.testId].push(data)
      })

      // Process each test
      const processedTests: TestPerformance[] = Object.entries(groupedData).map(([testId, variants]) => {
        const testNames: { [key: string]: string } = {
          consultation_hero_test: "Hero Section Test",
          consultation_cta_test: "CTA Section Test",
          consultation_form_test: "Form Section Test",
        }

        const variantNames: { [key: string]: string } = {
          hero_a: "Professional Hero",
          hero_b: "Urgency Hero",
          cta_a: "Simple CTA",
          cta_b: "High-pressure CTA",
          form_a: "Standard Form",
          form_b: "Enhanced Form",
        }

        const processedVariants: { [key: string]: ABTestData & { variantName: string } } = {}
        variants.forEach((variant) => {
          processedVariants[variant.variant] = {
            ...variant,
            variantName: variantNames[variant.variant] || variant.variant,
          }
        })

        // Calculate winner and statistical significance
        const variantKeys = Object.keys(processedVariants)
        let winner: string | undefined
        let confidence: number | undefined
        let isSignificant = false
        let improvement: number | undefined

        if (variantKeys.length === 2) {
          const [variantA, variantB] = variantKeys
          const dataA = processedVariants[variantA]
          const dataB = processedVariants[variantB]

          const significance = calculateStatisticalSignificance(
            dataA.views,
            dataA.conversions,
            dataB.views,
            dataB.conversions,
          )

          confidence = significance.confidence
          isSignificant = significance.isSignificant

          if (dataA.conversionRate > dataB.conversionRate) {
            winner = variantA
            improvement =
              dataA.conversionRate > 0
                ? ((dataA.conversionRate - dataB.conversionRate) / dataB.conversionRate) * 100
                : 0
          } else if (dataB.conversionRate > dataA.conversionRate) {
            winner = variantB
            improvement =
              dataB.conversionRate > 0
                ? ((dataB.conversionRate - dataA.conversionRate) / dataA.conversionRate) * 100
                : 0
          }
        }

        return {
          testId,
          testName: testNames[testId] || testId,
          variants: processedVariants,
          winner,
          confidence,
          isSignificant,
          improvement,
        }
      })

      setTestData(processedTests)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error loading test data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTestData()
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(loadTestData, 10000) // Refresh every 10 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const exportData = () => {
    const dataStr = JSON.stringify(testData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `ab-test-data-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getTotalViews = () => {
    return testData.reduce((total, test) => {
      return total + Object.values(test.variants).reduce((testTotal, variant) => testTotal + variant.views, 0)
    }, 0)
  }

  const getTotalConversions = () => {
    return testData.reduce((total, test) => {
      return total + Object.values(test.variants).reduce((testTotal, variant) => testTotal + variant.conversions, 0)
    }, 0)
  }

  const getOverallConversionRate = () => {
    const totalViews = getTotalViews()
    const totalConversions = getTotalConversions()
    return totalViews > 0 ? (totalConversions / totalViews) * 100 : 0
  }

  const getChartData = (test: TestPerformance) => {
    return Object.entries(test.variants).map(([variantId, data]) => ({
      name: data.variantName,
      views: data.views,
      conversions: data.conversions,
      conversionRate: data.conversionRate,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">A/B Test Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time performance monitoring for consultation page tests
              </p>
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoRefresh
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Auto-refresh: {autoRefresh ? "ON" : "OFF"}
              </button>

              <button
                onClick={loadTestData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>

              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalViews().toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <MousePointer className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Conversions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getTotalConversions().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall Conv. Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getOverallConversionRate().toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Tests</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{testData.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-8">
            {testData.map((test) => (
              <motion.div
                key={test.testId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{test.testName}</h2>
                    {test.winner && (
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          Winner: {test.variants[test.winner]?.variantName}
                        </span>
                        {test.improvement && (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            (+{test.improvement.toFixed(1)}% improvement)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {test.confidence && (
                    <div className="mt-4 lg:mt-0">
                      <div
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          test.isSignificant
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {test.confidence.toFixed(1)}% Confidence
                        {test.isSignificant ? " (Significant)" : " (Not Significant)"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Variant Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {Object.entries(test.variants).map(([variantId, data]) => (
                    <div
                      key={variantId}
                      className={`p-4 rounded-lg border-2 ${
                        test.winner === variantId
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {data.variantName}
                        {test.winner === variantId && (
                          <span className="ml-2 text-green-600 dark:text-green-400">👑</span>
                        )}
                      </h3>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {data.views.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                        </div>

                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {data.conversions.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Conversions</p>
                        </div>

                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {data.conversionRate.toFixed(2)}%
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Conv. Rate</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData(test)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#3B82F6" name="Views" />
                      <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated.toLocaleString()}
            {autoRefresh && " • Auto-refreshing every 10 seconds"}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
