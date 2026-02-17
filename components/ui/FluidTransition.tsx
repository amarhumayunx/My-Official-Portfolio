"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { liquidSpringSoft } from "@/lib/liquid-animation"

interface FluidTransitionProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FluidTransition({ children, delay = 0, className = "" }: FluidTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        ...liquidSpringSoft,
        delay,
      }}
      viewport={{ once: true, margin: "-80px", amount: 0 }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
