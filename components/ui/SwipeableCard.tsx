"use client"

import * as React from "react"
import { useState } from "react"
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "./card"

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  threshold?: number
  className?: string
  disabled?: boolean
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  threshold = 100,
  className,
  disabled = false,
}: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-threshold, 0, threshold], [0, 1, 0])

  const handleDragStart = () => {
    if (!disabled) setIsDragging(true)
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false)
    
    if (disabled) {
      x.set(0)
      y.set(0)
      return
    }

    const { offset, velocity } = info

    // Swipe left
    if (offset.x < -threshold || velocity.x < -500) {
      x.set(-1000)
      onSwipeLeft?.()
      setTimeout(() => {
        x.set(0)
      }, 300)
    }
    // Swipe right
    else if (offset.x > threshold || velocity.x > 500) {
      x.set(1000)
      onSwipeRight?.()
      setTimeout(() => {
        x.set(0)
      }, 300)
    }
    // Swipe up
    else if (offset.y < -threshold || velocity.y < -500) {
      y.set(-1000)
      onSwipeUp?.()
      setTimeout(() => {
        y.set(0)
      }, 300)
    }
    // Snap back
    else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      drag={disabled ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ x, y, rotate, opacity }}
      whileDrag={{ scale: 1.05, zIndex: 10 }}
      className={cn("cursor-grab active:cursor-grabbing", className)}
    >
      <Card className={cn("h-full", isDragging && "shadow-2xl")}>
        {children}
      </Card>
    </motion.div>
  )
}

// Swipeable card stack for multiple cards
interface SwipeableCardStackProps {
  cards: React.ReactNode[]
  onCardSwiped?: (index: number) => void
  threshold?: number
  className?: string
}

export function SwipeableCardStack({
  cards,
  onCardSwiped,
  threshold = 100,
  className,
}: SwipeableCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSwipeLeft = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      onCardSwiped?.(currentIndex)
    }
  }

  return (
    <div className={cn("relative", className)}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ scale: 1 - index * 0.05, y: index * 10, opacity: index === 0 ? 1 : 0.7 }}
          animate={{
            scale: index === currentIndex ? 1 : 1 - Math.abs(index - currentIndex) * 0.05,
            y: (index - currentIndex) * 10,
            opacity: index === currentIndex ? 1 : Math.max(0.7 - Math.abs(index - currentIndex) * 0.2, 0.3),
            zIndex: cards.length - Math.abs(index - currentIndex),
          }}
          className={cn(
            "absolute inset-0",
            index === currentIndex ? "relative" : "pointer-events-none"
          )}
        >
          <SwipeableCard
            onSwipeLeft={handleSwipeLeft}
            threshold={threshold}
            disabled={index !== currentIndex}
          >
            {card}
          </SwipeableCard>
        </motion.div>
      ))}
    </div>
  )
}
