"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends CardProps {
  hoverEffect?: "lift" | "glow" | "scale" | "tilt" | "none"
  imageOverlay?: boolean
  showStats?: boolean
  stats?: { label: string; value: string | number }[]
  quickActions?: React.ReactNode
}

export function EnhancedCard({
  children,
  className,
  hoverEffect = "lift",
  imageOverlay = false,
  showStats = false,
  stats = [],
  quickActions,
  ...props
}: EnhancedCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const hoverVariants = {
    lift: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    },
    glow: {
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
    },
    scale: {
      scale: 1.02,
    },
    tilt: {
      rotateY: 5,
      rotateX: -5,
    },
    none: {},
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hoverEffect !== "none" ? hoverVariants[hoverEffect] : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          hoverEffect === "tilt" && "card-3d",
          className
        )}
        {...props}
      >
        {imageOverlay && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {showStats && stats.length > 0 && (
          <motion.div
            className="absolute top-4 right-4 z-20 flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs"
              >
                <span className="font-semibold">{stat.value}</span> {stat.label}
              </div>
            ))}
          </motion.div>
        )}

        {quickActions && (
          <motion.div
            className="absolute bottom-4 right-4 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            {quickActions}
          </motion.div>
        )}

        {children}
      </Card>
    </motion.div>
  )
}
