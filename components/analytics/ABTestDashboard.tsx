"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react"
import { getABTestData, resetABTest } from "@/hooks/useABTest"

interface ABTestData {
  variant: string
  views: number
  conversions: number
  conversionRate: number
  confidence: number
  isWinner: boolean
}

interface TestMetrics {
  testName: string
  data: Record<string, ABTestData>
  totalViews: number
  totalConversions: number
  overallConversionRate: number
  winner: string | null
  confidence: number
  status: "running" | "winner_declared" | "insufficient_data"
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ABTestDashboard() {
  const [testMetrics, setTestMetrics] = useState<TestMetrics[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const loadTestData = () => {
    const tests = ["consultation_hero", "consultation_cta", "consultation_form"]
    const metrics: TestMetrics[] = []

    tests.forEach((testName) => {
      const data = getABTestData(testName)
      const variants = Object.values(data)

      const totalViews = variants.reduce((sum, variant) => sum + variant.views, 0)
      const totalConversions = variants.reduce((sum, variant) => sum + variant.conversions, 0)
      const overallConversionRate = totalViews > 0 ? (totalConversions / totalViews) * 100 : 0

      // Determine winner
      let winner: string | null = null
      let confidence = 0
      let status: "running" | "winner_declared" | "insufficient_data" = "insufficient_data"

      if (variants.length >= 2 && totalViews >= 100) {
        const sortedVariants = variants.sort((a, b) => b.conversionRate - a.conversionRate)
        const topVariant = sortedVariants[0]

        if (topVariant.confidence >= 95) {
          winner = topVariant.variant
          confidence = topVariant.confidence
          status = "winner_declared"
        } else if (totalViews >= 30) {
          status = "running"
          confidence = topVariant.confidence
        }
      }

      metrics.push({
        testName,
        data,
        totalViews,
        totalConversions,
        overallConversionRate,
        winner,
        confidence,
        status,
      })
    })

    setTestMetrics(metrics)
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  useEffect(() => {
    loadTestData()

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadTestData, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(loadTestData, 500) // Small delay for UX
  }

  const handleReset = (testName: string) => {
    if (confirm(`Are you sure you want to reset the test "${testName}"? This will clear all data.`)) {
      resetABTest(testName)
      loadTestData()
    }
  }

  const exportData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      tests: testMetrics,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ab-test-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: TestMetrics["status"], confidence: number) => {
    switch (status) {
      case "winner_declared":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Winner ({confidence}% confidence)
          </Badge>
        )
      case "running":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Running ({confidence}% confidence)
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Insufficient Data
          </Badge>
        )
    }
  }

  const formatTestName = (testName: string) => {
    return testName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Loading test data...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">A/B Test Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring of consultation page variants</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleString()}</div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testMetrics.reduce((sum, test) => sum + test.totalViews, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testMetrics.reduce((sum, test) => sum + test.totalConversions, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  (testMetrics.reduce((sum, test) => sum + test.totalConversions, 0) /
                    Math.max(
                      testMetrics.reduce((sum, test) => sum + test.totalViews, 0),
                      1,
                    )) *
                  100
                ).toFixed(2)}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testMetrics.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Test Results */}
        {testMetrics.map((test, index) => (
          <motion.div
            key={test.testName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {formatTestName(test.testName)}
                      {getStatusBadge(test.status, test.confidence)}
                    </CardTitle>
                    <CardDescription>
                      {test.totalViews} views • {test.totalConversions} conversions •{" "}
                      {test.overallConversionRate.toFixed(2)}% rate
                      {test.winner && (
                        <span className="ml-2 text-green-600 font-medium">Winner: Variant {test.winner}</span>
                      )}
                    </CardDescription>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => handleReset(test.testName)}>
                    Reset Test
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Variant Performance Table */}
                  <div>
                    <h4 className="font-semibold mb-4">Variant Performance</h4>
                    <div className="space-y-3">
                      {Object.values(test.data).map((variant, idx) => (
                        <div
                          key={variant.variant}
                          className={`p-4 rounded-lg border ${
                            variant.isWinner ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-border"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Variant {variant.variant}</span>
                            {variant.isWinner && (
                              <Badge className="bg-green-500 text-white">
                                <Award className="w-3 h-3 mr-1" />
                                Winner
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Views</div>
                              <div className="font-semibold">{variant.views}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Conversions</div>
                              <div className="font-semibold">{variant.conversions}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Rate</div>
                              <div className="font-semibold flex items-center gap-1">
                                {variant.conversionRate.toFixed(2)}%
                                {variant.conversionRate > test.overallConversionRate ? (
                                  <TrendingUp className="w-3 h-3 text-green-500" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 text-red-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conversion Rate Chart */}
                  <div>
                    <h4 className="font-semibold mb-4">Conversion Rate Comparison</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={Object.values(test.data)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="variant" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, "Conversion Rate"]} />
                        <Bar dataKey="conversionRate" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Views vs Conversions Chart */}
                {Object.values(test.data).length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Views vs Conversions</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={Object.values(test.data)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="variant" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} name="Views" />
                        <Line
                          type="monotone"
                          dataKey="conversions"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          name="Conversions"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Summary Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Test Summary</CardTitle>
            <CardDescription>Overall performance across all running tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Status Distribution */}
              <div>
                <h4 className="font-semibold mb-4">Test Status Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Winner Declared",
                          value: testMetrics.filter((t) => t.status === "winner_declared").length,
                        },
                        {
                          name: "Running",
                          value: testMetrics.filter((t) => t.status === "running").length,
                        },
                        {
                          name: "Insufficient Data",
                          value: testMetrics.filter((t) => t.status === "insufficient_data").length,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {testMetrics.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="font-semibold mb-4">Key Insights</h4>
                <div className="space-y-4">
                  {testMetrics.map((test) => (
                    <div key={test.testName} className="flex justify-between items-center">
                      <span className="text-sm">{formatTestName(test.testName)}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{test.overallConversionRate.toFixed(2)}%</span>
                        {test.status === "winner_declared" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : test.status === "running" ? (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
