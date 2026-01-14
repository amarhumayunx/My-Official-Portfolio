"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AnimatedCounter } from "./AnimatedCounter"
import { TrendingUp, Users, Award, Smile } from "lucide-react"

interface Stat {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  suffix?: string
}

const stats: Stat[] = [
  { label: "Projects Completed", value: 50, icon: Award, suffix: "+" },
  { label: "Happy Clients", value: 45, icon: Smile, suffix: "+" },
  { label: "Satisfaction Rate", value: 98, icon: TrendingUp, suffix: "%" },
  { label: "Years Experience", value: 3, icon: Users, suffix: "+" },
]

export function ClientStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 rounded-lg bg-muted/50"
          >
            <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl md:text-3xl font-bold mb-1">
              <AnimatedCounter value={stat.value} />
              {stat.suffix}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
