"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card"
  width?: string | number
  height?: string | number
  animation?: "pulse" | "wave" | "shimmer"
}

export function EnhancedSkeleton({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "shimmer",
  ...props
}: SkeletonProps) {
  const baseClasses = "bg-muted rounded"
  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full",
    rectangular: "rounded-md",
    card: "rounded-lg",
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "skeleton-wave",
    shimmer: "skeleton-enhanced",
  }

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{ width, height }}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    />
  )
}

// Card skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border border-border rounded-lg p-4 space-y-4", className)}>
      <EnhancedSkeleton variant="rectangular" height={200} className="w-full" />
      <div className="space-y-2">
        <EnhancedSkeleton variant="text" width="60%" />
        <EnhancedSkeleton variant="text" width="80%" />
        <EnhancedSkeleton variant="text" width="40%" />
      </div>
      <div className="flex gap-2">
        <EnhancedSkeleton variant="rectangular" width={80} height={24} />
        <EnhancedSkeleton variant="rectangular" width={80} height={24} />
      </div>
    </div>
  )
}

// Text skeleton
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <EnhancedSkeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  )
}

// Image skeleton - for image placeholders during loading
export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <EnhancedSkeleton
      variant="rectangular"
      className={cn("w-full h-full", className)}
      animation="shimmer"
    />
  )
}
