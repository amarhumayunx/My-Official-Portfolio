"use client"

import { motion, type Variants } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { liquidSpringHover, liquidEase } from "@/lib/liquid-animation"

// Micro-interaction variants - liquid smooth
export const microInteractionVariants: Variants = {
  tap: {
    scale: 0.95,
    transition: liquidSpringHover,
  },
  hover: {
    scale: 1.02,
    transition: liquidSpringHover,
  },
}

export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 1,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: { duration: 0.6, ease: liquidEase },
  },
}

interface MicroInteractionProps {
  children: ReactNode
  className?: string
  variant?: "scale" | "lift" | "glow" | "ripple"
  intensity?: "subtle" | "normal" | "strong"
}

export function MicroInteraction({
  children,
  className,
  variant = "scale",
  intensity = "normal",
}: MicroInteractionProps) {
  const intensityMap = {
    subtle: { scale: 1.01, y: -2 },
    normal: { scale: 1.02, y: -4 },
    strong: { scale: 1.05, y: -8 },
  }

  const variantMap = {
    scale: {
      whileHover: { scale: intensityMap[intensity].scale },
      whileTap: { scale: 0.95 },
    },
    lift: {
      whileHover: { y: intensityMap[intensity].y, scale: 1.02 },
      whileTap: { y: 0, scale: 0.98 },
    },
    glow: {
      whileHover: {
        scale: 1.02,
        boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)",
      },
      whileTap: { scale: 0.98 },
    },
    ripple: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.95 },
    },
  }

  return (
    <motion.div
      className={className}
      {...variantMap[variant]}
      transition={liquidSpringHover}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  )
}

// Ripple effect component
interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function RippleButton({ children, onClick, className }: RippleButtonProps) {
  return (
    <motion.button
      className={cn("relative overflow-hidden", className)}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: liquidSpringHover }}
      whileTap={{ scale: 0.98, transition: liquidSpringHover }}
    >
      {children}
      <motion.span
        className="absolute inset-0 bg-white/20 rounded-full"
        initial="initial"
        whileTap="animate"
        variants={rippleVariants}
        style={{
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
      />
    </motion.button>
  )
}

// Pulse effect
export function PulseEffect({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Shimmer effect
export function ShimmerEffect({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}

// Magnetic effect (follows cursor)
export function MagneticEffect({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover="hover"
      initial="initial"
      variants={{
        hover: {
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        },
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0, 0)"
      }}
    >
      {children}
    </motion.div>
  )
}
