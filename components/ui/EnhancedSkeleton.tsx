"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "circular" | "text" | "card" | "image"
  width?: string | number
  height?: string | number
  animate?: boolean
}

export function EnhancedSkeleton({
  className,
  variant = "default",
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseClasses = "bg-muted rounded-md"
  
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4",
    card: "rounded-lg",
    image: "rounded-lg aspect-video",
  }

  const style: React.CSSProperties = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "text" ? undefined : "1rem"),
  }

  if (!animate) {
    return (
      <div
        className={cn(baseClasses, variantClasses[variant], className)}
        style={style}
      />
    )
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Pre-built skeleton components
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      <EnhancedSkeleton variant="text" width="60%" />
      <EnhancedSkeleton variant="text" width="100%" />
      <EnhancedSkeleton variant="text" width="80%" />
      <div className="flex gap-2">
        <EnhancedSkeleton variant="circular" width={24} height={24} />
        <EnhancedSkeleton variant="circular" width={24} height={24} />
        <EnhancedSkeleton variant="circular" width={24} height={24} />
      </div>
    </div>
  )
}

export function ImageSkeleton({ className }: { className?: string }) {
  return <EnhancedSkeleton variant="image" className={className} />
}

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

export function AvatarSkeleton({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <EnhancedSkeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  )
}

export function ButtonSkeleton({ className }: { className?: string }) {
  return <EnhancedSkeleton width={120} height={40} className={cn("rounded-md", className)} />
}
