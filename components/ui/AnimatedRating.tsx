"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function AnimatedRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
}: AnimatedRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < Math.floor(rating)
        const isHalfFilled = index === Math.floor(rating) && rating % 1 >= 0.5

        return (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled || isHalfFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted-foreground"
              )}
            />
          </motion.div>
        )
      })}
      {showValue && (
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
