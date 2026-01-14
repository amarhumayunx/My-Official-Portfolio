"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

interface AnimatedChartProps {
  data: ChartData[]
  type?: "line" | "bar"
  dataKey?: string
  stroke?: string
  fill?: string
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
}

export function AnimatedChart({
  data,
  type = "line",
  dataKey = "value",
  stroke = "#3b82f6",
  fill = "#3b82f6",
  showGrid = true,
  showTooltip = true,
  showLegend = false,
}: AnimatedChartProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!isVisible) {
    return <div className="w-full h-64 bg-muted animate-pulse rounded" />
  }

  const ChartComponent = type === "line" ? LineChart : BarChart
  const DataComponent = type === "line" ? Line : Bar

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />}
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          )}
          {showLegend && <Legend />}
          <DataComponent
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            fill={fill}
            strokeWidth={2}
            animationDuration={1000}
            dot={{ r: 4 }}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </motion.div>
  )
}
