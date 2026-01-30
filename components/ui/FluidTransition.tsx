"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FluidTransitionProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

/* Liquid smooth spring: soft, fluid motion for all section animations */
const liquidSpring = { type: "spring" as const, stiffness: 100, damping: 24 }

export function FluidTransition({ children, delay = 0, duration = 0.6, className = "" }: FluidTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        ...liquidSpring,
        delay,
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
