"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: "top" | "bottom" | "left" | "right"
  delay?: number
  className?: string
}

export function Tooltip({ children, content, side = "top", delay = 200, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: side === "top" ? 10 : side === "bottom" ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 px-3 py-1.5 text-sm text-background bg-foreground rounded-lg shadow-lg whitespace-nowrap pointer-events-none",
              sideClasses[side],
              className
            )}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 bg-foreground rotate-45",
                side === "top" && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
                side === "bottom" && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
                side === "left" && "left-full top-1/2 -translate-y-1/2 -translate-x-1/2",
                side === "right" && "right-full top-1/2 -translate-y-1/2 translate-x-1/2"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
