"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Target, RefreshCw, Download, Eye, CheckCircle, AlertTriangle, Trophy } from "lucide-react"

interface ABTestData {
  testName: string
  variants: {
    A: {
      views: number
      conversions: number
      conversionRate: number
    }
    B: {
      views: number
      conversions: number
      conversionRate: number
    }
  }
  winner?: "A" | "B" | null
  confidence: number
  improvement: number
  isSignificant: boolean
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function ABTestDashboard() {
  const [testData, setTestData] = useState<ABTestData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchTestData = () => {
    setIsLoading(true)

    // Simulate fetching data from localStorage and analytics
    const assignments = JSON.parse(localStorage.getItem("ab_test_assignments") || "{}")
    const conversions = JSON.parse(localStorage.getItem("ab_test_conversions") || "{}")

    const tests = ["consultation_hero", "consultation_cta", "consultation_form"]

    const data: ABTestData[] = tests.map((testName) => {
      // Count assignments for each variant
      const variantCounts = { A: 0, B: 0 }
      Object.values(assignments).forEach((assignment: any) => {
        if (assignment.testName === testName) {
          variantCounts[assignment.variant as "A" | "B"]++
        }
      })

      // Get conversion data
      const testConversions = conversions[testName] || { A: 0, B: 0 }

      const variantA = {
        views: variantCounts.A,
        conversions: testConversions.A,
        conversionRate: variantCounts.A > 0 ? (testConversions.A / variantCounts.A) * 100 : 0,
      }

      const variantB = {
        views: variantCounts.B,
        conversions: testConversions.B,
        conversionRate: variantCounts.B > 0 ? (testConversions.B / variantCounts.B) * 100 : 0,
      }

      // Calculate statistical significance (simplified)
      const totalSamples = variantA.views + variantB.views
      const isSignificant = totalSamples >= 100 // Minimum sample size

      // Determine winner
      let winner: "A" | "B" | null = null
      let improvement = 0

      if (isSignificant) {
        if (variantA.conversionRate > variantB.conversionRate) {
          winner = "A"
          improvement =
            variantB.conversionRate > 0
              ? ((variantA.conversionRate - variantB.conversionRate) / variantB.conversionRate) * 100
              : 0
        } else if (variantB.conversionRate > variantA.conversionRate) {
          winner = "B"
          improvement =
            variantA.conversionRate > 0
              ? ((variantB.conversionRate - variantA.conversionRate) / variantA.conversionRate) * 100
              : 0
        }
      }

      // Calculate confidence (simplified)
      const confidence = Math.min(95, (totalSamples / 100) * 95)

      return {
        testName,
        variants: { A: variantA, B: variantB },
        winner,
        confidence,
        improvement,
        isSignificant,
      }
    })

    setTestData(data)
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTestData()

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchTestData, 10000)
    return () => clearInterval(interval)
  }, [])

  const exportData = () => {
    const dataStr = JSON.stringify(testData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `ab-test-data-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getTestDisplayName = (testName: string) => {
    switch (testName) {
      case "consultation_hero":
        return "Hero Section"
      case "consultation_cta":
        return "CTA Section"
      case "consultation_form":
        return "Form Section"
      default:
        return testName
    }
  }

  const getTotalMetrics = () => {
    const totals = testData.reduce(
      (acc, test) => ({
        views: acc.views + test.variants.A.views + test.variants.B.views,
        conversions: acc.conversions + test.variants.A.conversions + test.variants.B.conversions,
      }),
      { views: 0, conversions: 0 },
    )

    return {
      ...totals,
      conversionRate: totals.views > 0 ? (totals.conversions / totals.views) * 100 : 0,
    }
  }

  const totalMetrics = getTotalMetrics()

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
            <p className="text-muted-foreground">Real-time performance monitoring for consultation page variants</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
            <Button onClick={fetchTestData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{totalMetrics.views.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Conversions</p>
                  <p className="text-2xl font-bold">{totalMetrics.conversions.toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Conversion Rate</p>
                  <p className="text-2xl font-bold">{totalMetrics.conversionRate.toFixed(2)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tests</p>
                  <p className="text-2xl font-bold">{testData.length}</p>
                </div>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {testData.map((test, index) => (
            <motion.div
              key={test.testName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getTestDisplayName(test.testName)}
                      {test.winner && (
                        <Badge variant="default" className="ml-2">
                          <Trophy className="w-3 h-3 mr-1" />
                          Winner: {test.winner}
                        </Badge>
                      )}
                    </CardTitle>

                    <div className="flex items-center gap-2">
                      {test.isSignificant ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Significant
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Need More Data
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    {/* Variant Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Variant A</h4>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{test.variants.A.conversionRate.toFixed(2)}%</p>
                          <p className="text-sm text-muted-foreground">
                            {test.variants.A.conversions} / {test.variants.A.views} conversions
                          </p>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Variant B</h4>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{test.variants.B.conversionRate.toFixed(2)}%</p>
                          <p className="text-sm text-muted-foreground">
                            {test.variants.B.conversions} / {test.variants.B.views} conversions
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              name: "Variant A",
                              conversionRate: test.variants.A.conversionRate,
                              views: test.variants.A.views,
                            },
                            {
                              name: "Variant B",
                              conversionRate: test.variants.B.conversionRate,
                              views: test.variants.B.views,
                            },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value: any, name: string) => [
                              name === "conversionRate" ? `${value.toFixed(2)}%` : value,
                              name === "conversionRate" ? "Conversion Rate" : "Views",
                            ]}
                          />
                          <Bar dataKey="conversionRate" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className="ml-2 font-semibold">{test.confidence.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Improvement:</span>
                        <span
                          className={`ml-2 font-semibold ${test.improvement > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {test.improvement > 0 ? "+" : ""}
                          {test.improvement.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Overall Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Test Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={testData.map((test) => ({
                    name: getTestDisplayName(test.testName),
                    "Variant A": test.variants.A.conversionRate,
                    "Variant B": test.variants.B.conversionRate,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `${value.toFixed(2)}%`} />
                  <Bar dataKey="Variant A" fill="#8884d8" />
                  <Bar dataKey="Variant B" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
