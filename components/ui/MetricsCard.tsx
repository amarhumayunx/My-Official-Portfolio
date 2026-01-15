"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Zap, Award, Target, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"

interface Metric {
  label: string
  value: number | string
  unit?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  description?: string
}

interface MetricsCardProps {
  metrics: Metric[]
  className?: string
}

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  performance: <Zap className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  chart: <BarChart3 className="w-5 h-5" />,
  trend: <TrendingUp className="w-5 h-5" />,
}

export function MetricsCard({ metrics, className }: MetricsCardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {metrics.map((metric, index) => {
        const icon = metric.icon || iconMap.chart
        const isNumeric = typeof metric.value === "number"

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-transparent border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                  <div className="text-primary">{icon}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    {isNumeric ? (
                      <AnimatedCounter
                        from={0}
                        to={metric.value as number}
                        duration={2}
                        className="text-3xl font-bold"
                      />
                    ) : (
                      <span className="text-3xl font-bold">{metric.value}</span>
                    )}
                    {metric.unit && (
                      <span className="text-lg text-muted-foreground">{metric.unit}</span>
                    )}
                    {metric.trend && (
                      <TrendingUp
                        className={cn(
                          "w-4 h-4",
                          metric.trend === "up" && "text-green-500",
                          metric.trend === "down" && "text-red-500 rotate-180",
                          metric.trend === "neutral" && "text-muted-foreground"
                        )}
                      />
                    )}
                  </div>
                  {metric.description && (
                    <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
