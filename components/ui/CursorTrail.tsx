"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface CursorTrailProps {
  enabled?: boolean
  size?: number
  color?: string
}

export function CursorTrail({ enabled: propEnabled, size = 20, color = "rgba(59, 130, 246, 0.5)" }: CursorTrailProps) {
  const [enabled, setEnabled] = useLocalStorage("cursorTrail", propEnabled ?? false)
  const [trail, setTrail] = React.useState<Array<{ x: number; y: number; id: number }>>([])
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  React.useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]
        return newTrail.slice(-10) // Keep last 10 points
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [enabled, cursorX, cursorY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          translateX: -size / 2,
          translateY: -size / 2,
        }}
      />
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
          style={{
            x: point.x,
            y: point.y,
            width: size * (1 - index / trail.length) * 0.5,
            height: size * (1 - index / trail.length) * 0.5,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 1 - index / trail.length,
            translateX: -(size * (1 - index / trail.length) * 0.5) / 2,
            translateY: -(size * (1 - index / trail.length) * 0.5) / 2,
          }}
        />
      ))}
    </>
  )
}
