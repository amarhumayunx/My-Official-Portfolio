"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useLocalStorage } from "@/hooks/useLocalStorage"

/** Throttle to ~120fps (8.33ms) to avoid excess re-renders while staying smooth */
const TRAIL_THROTTLE_MS = 9

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
  const lastTrailUpdate = React.useRef(0)
  const pending = React.useRef<{ x: number; y: number } | null>(null)
  const rafId = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (!enabled) return

    const flushTrail = () => {
      rafId.current = null
      const p = pending.current
      if (p) {
        pending.current = null
        setTrail((prev) => {
          const next = [...prev, { x: p.x, y: p.y, id: Date.now() }]
          return next.slice(-8) // Fewer points = fewer DOM nodes for 120 FPS
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const now = performance.now()
      if (now - lastTrailUpdate.current >= TRAIL_THROTTLE_MS) {
        lastTrailUpdate.current = now
        pending.current = { x: e.clientX, y: e.clientY }
        if (rafId.current == null) rafId.current = requestAnimationFrame(flushTrail)
      } else {
        pending.current = { x: e.clientX, y: e.clientY }
        if (rafId.current == null) rafId.current = requestAnimationFrame(flushTrail)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
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
