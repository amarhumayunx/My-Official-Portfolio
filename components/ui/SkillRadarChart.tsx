"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface SkillData {
  skill: string
  value: number
  fullMark: number
}

interface SkillRadarChartProps {
  data: SkillData[]
  colors?: {
    fill: string
    stroke: string
  }
}

export function SkillRadarChart({ data, colors = { fill: "#3b82f6", stroke: "#2563eb" } }: SkillRadarChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-96"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke={colors.stroke}
            fill={colors.fill}
            fillOpacity={0.6}
            animationDuration={1000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
