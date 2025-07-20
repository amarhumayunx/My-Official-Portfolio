"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FluidTransitionProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FluidTransition({ children, delay = 0, duration = 0.6, className = "" }: FluidTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
