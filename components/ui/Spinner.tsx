"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error"
  className?: string
  text?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
}

const variantClasses = {
  default: "text-foreground",
  primary: "text-primary",
  secondary: "text-muted-foreground",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
}

export function Spinner({ size = "md", variant = "default", className, text }: SpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn(sizeClasses[size], variantClasses[variant])} />
      </motion.div>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}

// Dots spinner variant
export function DotsSpinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dotSize = size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
  
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn("rounded-full bg-primary", dotSize)}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Pulse spinner variant
export function PulseSpinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const pulseSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"
  
  return (
    <motion.div
      className={cn("rounded-full bg-primary", pulseSize, className)}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// Ring spinner variant
export function RingSpinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const ringSize = size === "sm" ? 16 : size === "md" ? 24 : 32
  
  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="border-2 border-primary border-t-transparent rounded-full"
        style={{ width: ringSize, height: ringSize }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
