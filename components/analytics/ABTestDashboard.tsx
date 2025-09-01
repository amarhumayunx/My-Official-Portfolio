"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Trophy,
  RefreshCw,
  Download,
  Play,
  Pause,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"

// Mock A/B test data
const mockData = {
  hero: {
    name: "Hero Section Test",
    status: "running",
    participants: 2847,
    conversions: {
      variantA: { visitors: 1423, conversions: 156, rate: 10.96 },
      variantB: { visitors: 1424, conversions: 198, rate: 13.91 },
    },
    confidence: 94.2,
    winner: "B",
    uplift: 26.9,
  },
  cta: {
    name: "CTA Button Test",
    status: "completed",
    participants: 3521,
    conversions: {
      variantA: { visitors: 1761, conversions: 203, rate: 11.53 },
      variantB: { visitors: 1760, conversions: 179, rate: 10.17 },
    },
    confidence: 78.4,
    winner: "A",
    uplift: 13.4,
  },
  form: {
    name: "Form Layout Test",
    status: "running",
    participants: 1956,
    conversions: {
      variantA: { visitors: 978, conversions: 89, rate: 9.1 },
      variantB: { visitors: 978, conversions: 94, rate: 9.61 },
    },
    confidence: 67.8,
    winner: null,
    uplift: 5.6,
  },
}

const timeSeriesData = [
  { date: "Mon", variantA: 145, variantB: 132 },
  { date: "Tue", variantA: 178, variantB: 189 },
  { date: "Wed", variantA: 156, variantB: 201 },
  { date: "Thu", variantA: 167, variantB: 198 },
  { date: "Fri", variantA: 189, variantB: 234 },
  { date: "Sat", variantA: 134, variantB: 167 },
  { date: "Sun", variantA: 123, variantB: 145 },
]

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981"]

export function ABTestDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedTest, setSelectedTest] = useState("hero")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate data refresh
        console.log("Refreshing data...")
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const exportData = () => {
    const dataStr = JSON.stringify(mockData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "ab_test_results.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* 3D Rotating Activity Indicator */}
          <motion.div
            className="relative mb-8"
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Animated Loading Text */}
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading Analytics Dashboard
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Preparing your A/B test insights...
          </motion.p>

          {/* Progress Indicators */}
          <div className="flex gap-2 justify-center mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            A/B Testing Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor your experiments with real-time analytics and insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`transition-all duration-300 ${
              autoRefresh
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <motion.div
              animate={{ rotate: autoRefresh ? 360 : 0 }}
              transition={{ duration: 2, repeat: autoRefresh ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            >
              {autoRefresh ? <RefreshCw className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
            </motion.div>
            {autoRefresh ? "Auto-refresh" : "Paused"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={exportData}
            className="hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {[
          {
            title: "Active Tests",
            value: "3",
            change: "+1",
            icon: Play,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            title: "Total Participants",
            value: "8,324",
            change: "+12.5%",
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
          },
          {
            title: "Avg. Conversion Rate",
            value: "11.2%",
            change: "+2.3%",
            icon: Target,
            color: "text-pink-600",
            bgColor: "bg-pink-50 dark:bg-pink-900/20",
          },
          {
            title: "Significant Winners",
            value: "2",
            change: "94.2% conf.",
            icon: Trophy,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
          },
        ].map((metric, index) => (
          <motion.div key={metric.title} whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-800/50" />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{metric.value}</p>
                    <p className={`text-xs ${metric.color} mt-1`}>{metric.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Test Results Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {Object.entries(mockData).map(([key, test], index) => (
          <motion.div key={key} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{test.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {test.status === "running" ? (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">
                        <motion.div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                        Running
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>
                <CardDescription>{test.participants.toLocaleString()} participants</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  {/* Variant Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300">Variant A</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {test.conversions.variantA.rate}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {test.conversions.variantA.conversions}/{test.conversions.variantA.visitors}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300">Variant B</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {test.conversions.variantB.rate}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {test.conversions.variantB.conversions}/{test.conversions.variantB.visitors}
                      </div>
                    </div>
                  </div>

                  {/* Progress and Confidence */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Statistical Confidence</span>
                      <span className="font-medium">{test.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          test.confidence >= 95
                            ? "bg-green-500"
                            : test.confidence >= 80
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${test.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Winner Badge */}
                  {test.winner && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-300">
                          Variant {test.winner} is the winner!
                        </div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-400">
                          {test.uplift}% improvement over control
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Conversion Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Conversion Trends (Last 7 Days)
            </CardTitle>
            <CardDescription>Daily conversion comparison between variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="variantA"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    name="Variant A"
                  />
                  <Line
                    type="monotone"
                    dataKey="variantB"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    name="Variant B"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Traffic Distribution */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Traffic Distribution</CardTitle>
            <CardDescription>How visitors are split between variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Variant A", value: 47, color: "#3B82F6" },
                      { name: "Variant B", value: 53, color: "#8B5CF6" },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {[
                      { name: "Variant A", value: 47, color: "#3B82F6" },
                      { name: "Variant B", value: 53, color: "#8B5CF6" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Conversion Rate Comparison</CardTitle>
            <CardDescription>Side-by-side performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Hero Test", variantA: 10.96, variantB: 13.91 },
                    { name: "CTA Test", variantA: 11.53, variantB: 10.17 },
                    { name: "Form Test", variantA: 9.1, variantB: 9.61 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="variantA" fill="#3B82F6" name="Variant A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="variantB" fill="#8B5CF6" name="Variant B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
