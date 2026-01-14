"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface ConfettiProps {
  trigger: boolean
  count?: number
  colors?: string[]
}

export function Confetti({ trigger, count = 50, colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"] }: ConfettiProps) {
  const [confetti, setConfetti] = React.useState<Array<{ id: number; x: number; color: string; delay: number }>>([])

  React.useEffect(() => {
    if (trigger) {
      const newConfetti = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      }))
      setConfetti(newConfetti)

      setTimeout(() => {
        setConfetti([])
      }, 3000)
    }
  }, [trigger, count, colors])

  return (
    <>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed w-2 h-2 rounded-sm pointer-events-none z-[9999]"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
          }}
          initial={{ y: -100, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  )
}
