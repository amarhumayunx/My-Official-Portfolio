"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent } from "./card"

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

  // Respect reduced motion preference
  const [shouldAnimate, setShouldAnimate] = useState(true)
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setShouldAnimate(!mediaQuery.matches && animation !== "pulse")
      
      const handleChange = (e: MediaQueryListEvent) => {
        setShouldAnimate(!e.matches && animation !== "pulse")
      }
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [animation])

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        shouldAnimate ? animationClasses[animation] : "animate-pulse",
        className
      )}
      style={{ width, height }}
      initial={shouldAnimate ? { opacity: 0.6 } : { opacity: 0.5 }}
      animate={shouldAnimate ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.5 }}
      transition={shouldAnimate ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
      aria-label="Loading content"
      role="status"
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

// GitHub repo skeleton
export function GitHubRepoSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <EnhancedSkeleton variant="text" width="70%" height={20} />
            <EnhancedSkeleton variant="text" width="50%" height={16} />
          </div>
          <EnhancedSkeleton variant="circular" width={24} height={24} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <EnhancedSkeleton variant="text" width="100%" />
        <EnhancedSkeleton variant="text" width="85%" />
        <div className="flex items-center gap-4 pt-2">
          <EnhancedSkeleton variant="rectangular" width={60} height={20} />
          <EnhancedSkeleton variant="rectangular" width={60} height={20} />
          <EnhancedSkeleton variant="rectangular" width={60} height={20} />
        </div>
      </CardContent>
    </Card>
  )
}
