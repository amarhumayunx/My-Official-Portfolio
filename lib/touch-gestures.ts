"use client"

import { RefObject } from "react"

export interface GestureHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onLongPress?: () => void
  onDoubleTap?: () => void
}

interface TouchState {
  startX: number
  startY: number
  startTime: number
  isLongPress: boolean
  longPressTimer?: NodeJS.Timeout
}

const SWIPE_THRESHOLD = 50
const SWIPE_VELOCITY_THRESHOLD = 0.3
const LONG_PRESS_DURATION = 500
const DOUBLE_TAP_DELAY = 300

export function useTouchGestures(
  ref: RefObject<HTMLElement>,
  handlers: GestureHandlers
) {
  let touchState: TouchState | null = null
  let lastTapTime = 0

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    touchState = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isLongPress: false,
    }

    // Long press detection
    if (handlers.onLongPress) {
      touchState.longPressTimer = setTimeout(() => {
        if (touchState) {
          touchState.isLongPress = true
          handlers.onLongPress?.()
        }
      }, LONG_PRESS_DURATION)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchState) return

    // Cancel long press if moved
    if (touchState.longPressTimer) {
      clearTimeout(touchState.longPressTimer)
      touchState.longPressTimer = undefined
    }

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchState.startX
    const deltaY = touch.clientY - touchState.startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Cancel long press if moved too much
    if (distance > 10) {
      touchState.isLongPress = false
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchState) return

    // Clear long press timer
    if (touchState.longPressTimer) {
      clearTimeout(touchState.longPressTimer)
    }

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchState.startX
    const deltaY = touch.clientY - touchState.startY
    const deltaTime = Date.now() - touchState.startTime
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const velocity = distance / deltaTime

    // Double tap detection
    const currentTime = Date.now()
    if (currentTime - lastTapTime < DOUBLE_TAP_DELAY && distance < 10) {
      handlers.onDoubleTap?.()
      lastTapTime = 0
    } else {
      lastTapTime = currentTime
    }

    // Swipe detection
    if (distance > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.()
        } else {
          handlers.onSwipeLeft?.()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.()
        } else {
          handlers.onSwipeUp?.()
        }
      }
    }

    touchState = null
  }

  const handleTouchCancel = () => {
    if (touchState?.longPressTimer) {
      clearTimeout(touchState.longPressTimer)
    }
    touchState = null
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
  }
}

// Pinch gesture handler
export function usePinchGesture(
  ref: RefObject<HTMLElement>,
  onPinch: (scale: number) => void
) {
  let initialDistance = 0

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      const scale = currentDistance / initialDistance
      onPinch(scale)
    }
  }

  const handleTouchEnd = () => {
    initialDistance = 0
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}
