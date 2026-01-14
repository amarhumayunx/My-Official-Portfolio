"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface DynamicGradientProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  intensity?: number
}

export function DynamicGradient({
  children,
  className,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
  intensity = 0.3,
}: DynamicGradientProps) {
  const { scrollYProgress } = useScroll()
  const hue = useTransform(scrollYProgress, [0, 1], [0, 360])
  const saturation = useTransform(scrollYProgress, [0, 1], [50, 100])
  const lightness = useTransform(scrollYProgress, [0, 1], [40, 60])

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        background: `linear-gradient(135deg, ${colors.join(", ")})`,
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.div>
  )
}

interface GradientMeshProps {
  className?: string
  colors?: string[]
  speed?: number
}

export function GradientMesh({ className, colors, speed = 20 }: GradientMeshProps) {
  const [position, setPosition] = React.useState({ x: 50, y: 50 })

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const defaultColors = colors || [
    "rgba(59, 130, 246, 0.1)",
    "rgba(139, 92, 246, 0.1)",
    "rgba(236, 72, 153, 0.1)",
    "rgba(16, 185, 129, 0.1)",
  ]

  return (
    <div
      className={cn("fixed inset-0 pointer-events-none -z-10", className)}
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${defaultColors[0]} 0%, transparent 50%),
                     radial-gradient(circle at ${100 - position.x}% ${100 - position.y}%, ${defaultColors[1]} 0%, transparent 50%),
                     radial-gradient(circle at ${position.y}% ${position.x}%, ${defaultColors[2]} 0%, transparent 50%)`,
        transition: `background ${speed}s ease-out`,
      }}
    />
  )
}
