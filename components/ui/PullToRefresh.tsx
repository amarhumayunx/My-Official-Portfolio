"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { ArrowDown, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: React.ReactNode
  threshold?: number
  disabled?: boolean
  className?: string
  pullText?: string
  releaseText?: string
  refreshingText?: string
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  disabled = false,
  className,
  pullText = "Pull to refresh",
  releaseText = "Release to refresh",
  refreshingText = "Refreshing...",
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, threshold], [0, 1])
  const scale = useTransform(y, [0, threshold], [0.8, 1])

  const handleDragEnd = async (_: any, info: PanInfo) => {
    if (disabled || isRefreshing) {
      y.set(0)
      return
    }

    if (info.offset.y > threshold && canRefresh) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        y.set(0)
      }
    } else {
      y.set(0)
    }
    setCanRefresh(false)
  }

  useEffect(() => {
    const unsubscribe = y.on("change", (latest) => {
      if (latest > threshold && !canRefresh) {
        setCanRefresh(true)
      } else if (latest <= threshold && canRefresh) {
        setCanRefresh(false)
      }
    })

    return () => unsubscribe()
  }, [y, threshold, canRefresh])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Pull Indicator */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center py-4 z-10"
      >
        {isRefreshing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex flex-col items-center gap-2"
          >
            <RefreshCw className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">{refreshingText}</span>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: canRefresh ? [0, -4, 0] : 0 }}
              transition={{ duration: 0.6, repeat: canRefresh ? Infinity : 0 }}
            >
              <ArrowDown className={cn("w-6 h-6", canRefresh ? "text-primary" : "text-muted-foreground")} />
            </motion.div>
            <span className={cn("text-sm", canRefresh ? "text-primary" : "text-muted-foreground")}>
              {canRefresh ? releaseText : pullText}
            </span>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: disabled ? 0 : threshold, bottom: 0 }}
        dragElastic={disabled ? 0 : 0.2}
        style={{ y }}
        onDragEnd={handleDragEnd}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
