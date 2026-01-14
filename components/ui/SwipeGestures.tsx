"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface SwipeGesturesProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  className?: string
}

export function SwipeGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  className,
}: SwipeGesturesProps) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current) return

    const distanceX = touchStartX.current - touchEndX.current
    const distanceY = touchStartY.current - touchEndY.current
    const isLeftSwipe = distanceX > threshold
    const isRightSwipe = distanceX < -threshold
    const isUpSwipe = distanceY > threshold
    const isDownSwipe = distanceY < -threshold

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp()
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown()
    }

    // Reset
    touchStartX.current = null
    touchStartY.current = null
    touchEndX.current = null
    touchEndY.current = null
  }

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

// Hook for pull-to-refresh
export function usePullToRefresh(onRefresh: () => void | Promise<void>) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    let startY = 0
    let currentY = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && startY > 0) {
        currentY = e.touches[0].clientY
        const distance = currentY - startY

        if (distance > 0) {
          // Show pull indicator
          document.body.style.transform = `translateY(${Math.min(distance, 100)}px)`
        }
      }
    }

    const handleTouchEnd = async () => {
      if (window.scrollY === 0 && startY > 0 && currentY - startY > 100) {
        setIsRefreshing(true)
        document.body.style.transform = ""
        await onRefresh()
        setIsRefreshing(false)
      } else {
        document.body.style.transform = ""
      }

      startY = 0
      currentY = 0
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onRefresh])

  return isRefreshing
}
