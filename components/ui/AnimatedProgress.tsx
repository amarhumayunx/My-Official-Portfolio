"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  className?: string
  duration?: number
  delay?: number
  showValue?: boolean
  valueClassName?: string
}

// Easing function for smooth animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3)
}

export function AnimatedProgress({
  value,
  className,
  duration = 1.5,
  delay = 0,
  showValue = false,
  valueClassName,
}: AnimatedProgressProps) {
  const [progress, setProgress] = useState(0)
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true

          // Delay before starting animation
          setTimeout(() => {
            const startTime = Date.now()
            const animate = () => {
              const elapsed = Date.now() - startTime
              const progressValue = Math.min(elapsed / (duration * 1000), 1)
              const easedProgress = easeOutCubic(progressValue)
              const currentValue = Math.floor(value * easedProgress)

              setProgress(value * easedProgress)
              setDisplayValue(currentValue)

              if (progressValue < 1) {
                requestAnimationFrame(animate)
              } else {
                setProgress(value)
                setDisplayValue(value)
              }
            }

            requestAnimationFrame(animate)
          }, delay * 1000)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [value, duration, delay])

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <Progress value={progress} className="h-1.5 sm:h-2 bg-muted/50 shadow-inner" />
      {showValue && (
        <motion.span
          className={cn("text-xs sm:text-sm font-semibold text-primary tabular-nums", valueClassName)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          {displayValue}%
        </motion.span>
      )}
    </div>
  )
}
