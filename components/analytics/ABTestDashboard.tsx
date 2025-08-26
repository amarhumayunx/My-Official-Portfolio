"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, TrendingUp, Award, AlertTriangle, Download, Eye, Target } from "lucide-react"
import { getTestDataFromStorage, calculateStatisticalSignificance } from "@/hooks/useABTest"

interface TestData {
  testId: string
  variant: string
  views: number
  conversions: number
  conversionRate: number
  startTime: number
}

interface TestSummary {
  testId: string
  testName: string
  variants: {
    [key: string]: {
      name: string
      views: number
      conversions: number
      conversionRate: number
    }
  }
  winner?: string
  confidence?: number
  isSignificant?: boolean
  improvement?: number
}

const testConfigs = [
  {
    testId: "consultation-hero",
    testName: "Hero Section Test",
    variants: {
      "hero-a": "Professional Hero",
      "hero-b": "Urgency Hero",
    },
  },
  {
    testId: "consultation-cta",
    testName: "CTA Section Test",
    variants: {
      "cta-a": "Simple CTA",
      "cta-b": "High-Pressure CTA",
    },
  },
  {
    testId: "consultation-form",
    testName: "Form Section Test",
    variants: {
      "form-a": "Standard Form",
      "form-b": "Enhanced Form",
    },
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ABTestDashboard() {
  const [testSummaries, setTestSummaries] = useState<TestSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  const loadTestData = () => {
    setIsLoading(true)
    const summaries: TestSummary[] = []

    testConfigs.forEach((config) => {
      const summary: TestSummary = {
        testId: config.testId,
        testName: config.testName,
        variants: {},
      }

      // Load data for each variant
      Object.entries(config.variants).forEach(([variantId, variantName]) => {
        const data = getTestDataFromStorage(`${config.testId}_${variantId}`)
        summary.variants[variantId] = {
          name: variantName,
          views: data?.views || 0,
          conversions: data?.conversions || 0,
          conversionRate: data?.conversionRate || 0,
        }
      })

      // Calculate statistical significance and winner
      const variantIds = Object.keys(summary.variants)
      if (variantIds.length === 2) {
        const [variantA, variantB] = variantIds
        const dataA = summary.variants[variantA]
        const dataB = summary.variants[variantB]

        if (dataA.views > 0 && dataB.views > 0) {
          const significance = calculateStatisticalSignificance(
            dataA.views,
            dataA.conversions,
            dataB.views,
            dataB.conversions,
          )

          summary.confidence = significance.confidence
          summary.isSignificant = significance.isSignificant

          // Determine winner
          if (dataA.conversionRate > dataB.conversionRate) {
            summary.winner = variantA
            summary.improvement = ((dataA.conversionRate - dataB.conversionRate) / dataB.conversionRate) * 100
          } else if (dataB.conversionRate > dataA.conversionRate) {
            summary.winner = variantB
            summary.improvement = ((dataB.conversionRate - dataA.conversionRate) / dataA.conversionRate) * 100
          }
        }
      }

      summaries.push(summary)
    })

    setTestSummaries(summaries)
    setIsLoading(false)
    setLastUpdated(new Date())
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
    const exportData = {
      timestamp: new Date().toISOString(),
      tests: testSummaries,
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `ab-test-results-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getTotalViews = () => {
    return testSummaries.reduce((total, test) => {
      return total + Object.values(test.variants).reduce((sum, variant) => sum + variant.views, 0)
    }, 0)
  }

  const getTotalConversions = () => {
    return testSummaries.reduce((total, test) => {
      return total + Object.values(test.variants).reduce((sum, variant) => sum + variant.conversions, 0)
    }, 0)
  }

  const getOverallConversionRate = () => {
    const totalViews = getTotalViews()
    const totalConversions = getTotalConversions()
    return totalViews > 0 ? (totalConversions / totalViews) * 100 : 0
  }

  const getChartData = (test: TestSummary) => {
    return Object.entries(test.variants).map(([variantId, data]) => ({
      name: data.name,
      views: data.views,
      conversions: data.conversions,
      conversionRate: data.conversionRate,
      variantId,
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading A/B test data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">A/B Test Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring of consultation page variants</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? "bg-green-50 border-green-200" : ""}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              Auto Refresh {autoRefresh ? "ON" : "OFF"}
            </Button>
            <Button onClick={loadTestData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Now
            </Button>
            <Button onClick={exportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{getTotalViews().toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Conversions</p>
                    <p className="text-2xl font-bold">{getTotalConversions().toLocaleString()}</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Conversion Rate</p>
                    <p className="text-2xl font-bold">{getOverallConversionRate().toFixed(2)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-sm font-medium">{lastUpdated.toLocaleTimeString()}</p>
                  </div>
                  <RefreshCw className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Test Results */}
        <div className="space-y-8">
          {testSummaries.map((test, index) => (
            <motion.div
              key={test.testId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{test.testName}</CardTitle>
                      <CardDescription>Test ID: {test.testId}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.isSignificant && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Award className="w-3 h-3 mr-1" />
                          Significant
                        </Badge>
                      )}
                      {test.winner && <Badge variant="outline">Winner: {test.variants[test.winner]?.name}</Badge>}
                      {test.confidence && <Badge variant="secondary">{test.confidence.toFixed(1)}% Confidence</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Metrics Table */}
                    <div>
                      <h4 className="font-semibold mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        {Object.entries(test.variants).map(([variantId, data]) => (
                          <div
                            key={variantId}
                            className={`p-4 rounded-lg border ${
                              test.winner === variantId
                                ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                                : "bg-muted/30"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{data.name}</h5>
                              {test.winner === variantId && (
                                <Badge className="bg-green-600">
                                  <Award className="w-3 h-3 mr-1" />
                                  Winner
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Views</p>
                                <p className="font-semibold">{data.views.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Conversions</p>
                                <p className="font-semibold">{data.conversions.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Rate</p>
                                <p className="font-semibold">{data.conversionRate.toFixed(2)}%</p>
                              </div>
                            </div>
                            {test.winner === variantId && test.improvement && (
                              <div className="mt-2 text-sm text-green-600 font-medium">
                                <TrendingUp className="w-4 h-4 inline mr-1" />
                                {test.improvement.toFixed(1)}% improvement
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {test.confidence && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-800 dark:text-blue-200">Statistical Analysis</span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            {test.isSignificant
                              ? `Results are statistically significant with ${test.confidence.toFixed(1)}% confidence.`
                              : `Results are not yet statistically significant. Current confidence: ${test.confidence.toFixed(1)}%`}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Charts */}
                    <div>
                      <h4 className="font-semibold mb-4">Visual Comparison</h4>

                      {/* Conversion Rate Chart */}
                      <div className="mb-6">
                        <h5 className="text-sm font-medium mb-2">Conversion Rates</h5>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getChartData(test)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                              formatter={(value: any, name: string) => [`${value.toFixed(2)}%`, "Conversion Rate"]}
                            />
                            <Bar dataKey="conversionRate" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Views vs Conversions */}
                      <div>
                        <h5 className="text-sm font-medium mb-2">Views vs Conversions</h5>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getChartData(test)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="views" fill="#82ca9d" name="Views" />
                            <Bar dataKey="conversions" fill="#ffc658" name="Conversions" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Test Summary & Recommendations</CardTitle>
              <CardDescription>Based on current data and statistical analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testSummaries.map((test) => (
                  <div key={test.testId} className="border-l-4 border-l-primary pl-4">
                    <h4 className="font-semibold">{test.testName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {test.isSignificant && test.winner ? (
                        <>
                          <span className="text-green-600 font-medium">✅ Clear winner identified:</span>{" "}
                          {test.variants[test.winner]?.name} is performing {test.improvement?.toFixed(1)}% better with{" "}
                          {test.confidence?.toFixed(1)}% confidence.
                        </>
                      ) : test.winner ? (
                        <>
                          <span className="text-yellow-600 font-medium">⚠️ Potential winner:</span>{" "}
                          {test.variants[test.winner]?.name} is currently leading, but more data is needed for
                          statistical significance.
                        </>
                      ) : (
                        <>
                          <span className="text-blue-600 font-medium">📊 Test in progress:</span> Continue collecting
                          data to determine the winning variant.
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
