"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Minimize2, Maximize2, X, RotateCcw, AlertTriangle } from "lucide-react"

const LOCAL_STORAGE_KEY = "websiteReadTime"
const TIMER_VISIBILITY_KEY = "timerVisibility"
const TIMER_POSITION_KEY = "timerPosition"
const TIMER_MINIMIZED_KEY = "timerMinimized"

// Define collision detection selectors for common page elements
const COLLISION_SELECTORS = [
  "nav", // Navigation elements
  '[role="navigation"]',
  ".navbar",
  ".nav",
  "header",
  "footer",
  ".back-to-top",
  ".scroll-to-top",
  ".floating-button",
  ".chat-widget",
  ".cookie-banner",
  ".notification",
  ".toast",
  ".modal",
  ".dropdown-menu",
  ".popover",
  ".tooltip",
  ".sidebar",
  ".menu-toggle",
  ".hamburger",
  ".mobile-menu",
  ".search-overlay",
  ".cart-drawer",
  ".newsletter-popup",
  ".social-share",
  ".floating-action",
  ".sticky-element",
  "[data-sticky]",
  "[data-fixed]",
  ".fixed",
  ".sticky",
]

interface CollisionInfo {
  hasCollision: boolean
  conflictingElements: string[]
  suggestedPosition?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
  adjustedOffset?: { top?: number; right?: number; bottom?: number; left?: number }
}

export function WebsiteReadTime() {
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [position, setPosition] = useState<"top-right" | "bottom-right" | "top-left" | "bottom-left">("top-right")
  const [showControls, setShowControls] = useState(false)
  const [collisionInfo, setCollisionInfo] = useState<CollisionInfo>({ hasCollision: false, conflictingElements: [] })
  const [dynamicOffset, setDynamicOffset] = useState({ top: 0, right: 0, bottom: 0, left: 0 })

  const timerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateTimeRef = useRef(Date.now())
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const collisionCheckRef = useRef<NodeJS.Timeout | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  // Enhanced time formatting with progressive disclosure
  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (num: number) => num.toString().padStart(2, "0")

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    } else if (minutes > 0) {
      return `${pad(minutes)}:${pad(seconds)}`
    } else {
      return `0:${pad(seconds)}`
    }
  }, [])

  // Get human-readable time for accessibility
  const getReadableTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const parts = []
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`)
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`)
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`)

    return parts.join(", ")
  }, [])

  // Dynamic collision detection function
  const detectCollisions = useCallback((): CollisionInfo => {
    if (!timerRef.current || typeof window === "undefined") {
      return { hasCollision: false, conflictingElements: [] }
    }

    const timerRect = timerRef.current.getBoundingClientRect()
    const conflictingElements: string[] = []
    let hasCollision = false

    // Check for collisions with predefined selectors
    COLLISION_SELECTORS.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector)
        elements.forEach((element) => {
          if (element === timerRef.current) return // Skip self

          const elementRect = element.getBoundingClientRect()

          // Check if rectangles overlap
          const isOverlapping = !(
            timerRect.right < elementRect.left ||
            timerRect.left > elementRect.right ||
            timerRect.bottom < elementRect.top ||
            timerRect.top > elementRect.bottom
          )

          if (isOverlapping) {
            hasCollision = true
            conflictingElements.push(selector)
          }
        })
      } catch (error) {
        // Ignore invalid selectors
        console.debug(`Invalid selector: ${selector}`)
      }
    })

    // Additional checks for viewport boundaries
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const margin = 16 // Minimum margin from viewport edges

    if (timerRect.right > viewportWidth - margin) {
      hasCollision = true
      conflictingElements.push("viewport-right")
    }
    if (timerRect.left < margin) {
      hasCollision = true
      conflictingElements.push("viewport-left")
    }
    if (timerRect.top < margin) {
      hasCollision = true
      conflictingElements.push("viewport-top")
    }
    if (timerRect.bottom > viewportHeight - margin) {
      hasCollision = true
      conflictingElements.push("viewport-bottom")
    }

    return { hasCollision, conflictingElements }
  }, [])

  // Calculate safe position with dynamic offsets
  const calculateSafePosition = useCallback(
    (targetPosition: typeof position): CollisionInfo => {
      if (typeof window === "undefined") {
        return { hasCollision: false, conflictingElements: [] }
      }

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const timerWidth = isMinimized ? 60 : 200 // Estimated timer width
      const timerHeight = isMinimized ? 40 : 60 // Estimated timer height
      const basePadding = 16

      const adjustedOffset = { top: 0, right: 0, bottom: 0, left: 0 }
      const conflictingElements: string[] = []

      // Check navigation height for top positions
      if (targetPosition.includes("top")) {
        const navElements = document.querySelectorAll('nav, header, [role="navigation"]')
        let maxNavHeight = 80 // Default nav height

        navElements.forEach((nav) => {
          const navRect = nav.getBoundingClientRect()
          if (navRect.height > 0) {
            maxNavHeight = Math.max(maxNavHeight, navRect.bottom + basePadding)
          }
        })

        adjustedOffset.top = maxNavHeight
      }

      // Check footer height for bottom positions
      if (targetPosition.includes("bottom")) {
        const footerElements = document.querySelectorAll("footer")
        const backToTopElements = document.querySelectorAll(".back-to-top, .scroll-to-top, [data-back-to-top]")
        let maxBottomOffset = basePadding

        footerElements.forEach((footer) => {
          const footerRect = footer.getBoundingClientRect()
          if (footerRect.height > 0) {
            const footerFromBottom = viewportHeight - footerRect.top
            maxBottomOffset = Math.max(maxBottomOffset, footerFromBottom + basePadding)
          }
        })

        backToTopElements.forEach((btn) => {
          const btnRect = btn.getBoundingClientRect()
          if (btnRect.height > 0) {
            const btnFromBottom = viewportHeight - btnRect.top
            maxBottomOffset = Math.max(maxBottomOffset, btnFromBottom + btnRect.height + basePadding)
          }
        })

        adjustedOffset.bottom = maxBottomOffset
      }

      // Check sidebar elements for left positions
      if (targetPosition.includes("left")) {
        const sidebarElements = document.querySelectorAll(".sidebar, .side-nav, [data-sidebar]")
        let maxLeftOffset = basePadding

        sidebarElements.forEach((sidebar) => {
          const sidebarRect = sidebar.getBoundingClientRect()
          if (sidebarRect.width > 0 && sidebarRect.left < 200) {
            // Only consider left-side sidebars
            maxLeftOffset = Math.max(maxLeftOffset, sidebarRect.right + basePadding)
          }
        })

        adjustedOffset.left = maxLeftOffset
      }

      // Check for right-side elements
      if (targetPosition.includes("right")) {
        const rightElements = document.querySelectorAll(".chat-widget, .floating-action, [data-floating-right]")
        let maxRightOffset = basePadding

        rightElements.forEach((element) => {
          const elementRect = element.getBoundingClientRect()
          if (elementRect.width > 0 && elementRect.right > viewportWidth - 200) {
            const elementFromRight = viewportWidth - elementRect.left
            maxRightOffset = Math.max(maxRightOffset, elementFromRight + basePadding)
          }
        })

        adjustedOffset.right = maxRightOffset
      }

      // Suggest alternative position if current one has too many conflicts
      let suggestedPosition: typeof position | undefined
      const positionPriority: (typeof position)[] = ["top-right", "bottom-right", "bottom-left", "top-left"]

      if (conflictingElements.length > 2) {
        suggestedPosition = positionPriority.find((pos) => pos !== targetPosition) || targetPosition
      }

      return {
        hasCollision: conflictingElements.length > 0,
        conflictingElements,
        suggestedPosition,
        adjustedOffset,
      }
    },
    [isMinimized],
  )

  // Perform collision detection and update position
  const performCollisionCheck = useCallback(() => {
    if (!isVisible || !timerRef.current) return

    const collisionResult = calculateSafePosition(position)
    setCollisionInfo(collisionResult)

    if (collisionResult.adjustedOffset) {
      setDynamicOffset(collisionResult.adjustedOffset)
    }

    // Auto-adjust position if there are severe conflicts
    if (
      collisionResult.hasCollision &&
      collisionResult.suggestedPosition &&
      collisionResult.conflictingElements.length > 3
    ) {
      console.log(`Timer auto-adjusting position due to conflicts: ${collisionResult.conflictingElements.join(", ")}`)
      setPosition(collisionResult.suggestedPosition)
      localStorage.setItem(TIMER_POSITION_KEY, collisionResult.suggestedPosition)
    }
  }, [position, isVisible, calculateSafePosition])

  // Load saved preferences on mount
  useEffect(() => {
    const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedVisibility = localStorage.getItem(TIMER_VISIBILITY_KEY)
    const savedPosition = localStorage.getItem(TIMER_POSITION_KEY)
    const savedMinimized = localStorage.getItem(TIMER_MINIMIZED_KEY)

    if (savedTime) {
      setTimeInSeconds(Number.parseInt(savedTime, 10))
    }
    if (savedVisibility !== null) {
      setIsVisible(JSON.parse(savedVisibility))
    }
    if (savedPosition) {
      setPosition(savedPosition as typeof position)
    }
    if (savedMinimized !== null) {
      setIsMinimized(JSON.parse(savedMinimized))
    }

    lastUpdateTimeRef.current = Date.now()
  }, [])

  // Set up collision detection with ResizeObserver and event listeners
  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return

    // Initial collision check
    const initialCheck = () => {
      setTimeout(performCollisionCheck, 100) // Small delay to ensure DOM is ready
    }

    // Set up periodic collision checks
    const startCollisionChecking = () => {
      if (collisionCheckRef.current) {
        clearInterval(collisionCheckRef.current)
      }

      collisionCheckRef.current = setInterval(performCollisionCheck, 2000) // Check every 2 seconds
    }

    // Set up ResizeObserver for layout changes
    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(() => {
        performCollisionCheck()
      })

      // Observe the document body for layout changes
      resizeObserverRef.current.observe(document.body)
    }

    // Event listeners for dynamic content changes
    const handleDOMChanges = () => {
      setTimeout(performCollisionCheck, 100)
    }

    const handleScroll = () => {
      performCollisionCheck()
    }

    const handleResize = () => {
      setTimeout(performCollisionCheck, 100)
    }

    // Set up event listeners
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("DOMNodeInserted", handleDOMChanges, { passive: true })
    document.addEventListener("DOMNodeRemoved", handleDOMChanges, { passive: true })

    initialCheck()
    startCollisionChecking()

    return () => {
      if (collisionCheckRef.current) {
        clearInterval(collisionCheckRef.current)
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }

      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("DOMNodeInserted", handleDOMChanges)
      document.removeEventListener("DOMNodeRemoved", handleDOMChanges)
    }
  }, [isVisible, position, isMinimized, performCollisionCheck])

  // Smart auto-minimize based on user inactivity
  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      inactivityTimerRef.current = setTimeout(() => {
        if (!isMinimized) {
          setIsMinimized(true)
          localStorage.setItem(TIMER_MINIMIZED_KEY, JSON.stringify(true))
        }
      }, 300000) // Auto-minimize after 5 minutes of inactivity
    }

    const handleUserActivity = () => {
      resetInactivityTimer()
    }

    const events = ["mousemove", "keypress", "scroll", "click", "touchstart"]
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity, { passive: true })
    })

    resetInactivityTimer()

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity)
      })
    }
  }, [isMinimized])

  // Enhanced timer logic with better performance
  useEffect(() => {
    const startTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      intervalRef.current = setInterval(() => {
        setTimeInSeconds((prevTime) => {
          const now = Date.now()
          const elapsed = Math.floor((now - lastUpdateTimeRef.current) / 1000)
          lastUpdateTimeRef.current = now
          const newTime = prevTime + elapsed

          if (newTime % 30 === 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, newTime.toString())
          }

          return newTime
        })
      }, 1000)
    }

    const stopTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer()
        localStorage.setItem(LOCAL_STORAGE_KEY, timeInSeconds.toString())
      } else {
        lastUpdateTimeRef.current = Date.now()
        if (isVisible) {
          startTimer()
        }
      }
    }

    const handleBeforeUnload = () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, timeInSeconds.toString())
      localStorage.setItem(TIMER_VISIBILITY_KEY, JSON.stringify(isVisible))
      localStorage.setItem(TIMER_POSITION_KEY, position)
      localStorage.setItem(TIMER_MINIMIZED_KEY, JSON.stringify(isMinimized))
    }

    if (isVisible) {
      startTimer()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      stopTimer()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      localStorage.setItem(LOCAL_STORAGE_KEY, timeInSeconds.toString())
    }
  }, [timeInSeconds, isVisible, position, isMinimized])

  // Control handlers
  const toggleMinimize = useCallback(() => {
    const newMinimized = !isMinimized
    setIsMinimized(newMinimized)
    localStorage.setItem(TIMER_MINIMIZED_KEY, JSON.stringify(newMinimized))
    // Trigger collision check after state change
    setTimeout(performCollisionCheck, 100)
  }, [isMinimized, performCollisionCheck])

  const toggleVisibility = useCallback(() => {
    setIsVisible(false)
    localStorage.setItem(TIMER_VISIBILITY_KEY, JSON.stringify(false))
  }, [])

  const resetTimer = useCallback(() => {
    setTimeInSeconds(0)
    localStorage.setItem(LOCAL_STORAGE_KEY, "0")
    lastUpdateTimeRef.current = Date.now()
  }, [])

  const cyclePosition = useCallback(() => {
    const positions: (typeof position)[] = ["top-right", "bottom-right", "bottom-left", "top-left"]
    const currentIndex = positions.indexOf(position)
    const nextPosition = positions[(currentIndex + 1) % positions.length]
    setPosition(nextPosition)
    localStorage.setItem(TIMER_POSITION_KEY, nextPosition)
    // Trigger collision check after position change
    setTimeout(performCollisionCheck, 100)
  }, [position, performCollisionCheck])

  // Dynamic position classes with collision-aware offsets
  const getPositionClasses = useCallback(() => {
    const baseClasses = "fixed z-50 transition-all duration-300"
    const { top, right, bottom, left } = dynamicOffset

    const positions = {
      "top-right": `${baseClasses}`,
      "bottom-right": `${baseClasses}`,
      "top-left": `${baseClasses}`,
      "bottom-left": `${baseClasses}`,
    }
    return positions[position]
  }, [position, dynamicOffset])

  // Get dynamic inline styles for precise positioning
  const getPositionStyles = useCallback((): React.CSSProperties => {
    const { top, right, bottom, left } = dynamicOffset
    const basePadding = 16

    const styles: React.CSSProperties = {}

    switch (position) {
      case "top-right":
        styles.top = Math.max(top, 80) + basePadding
        styles.right = Math.max(right, basePadding)
        break
      case "bottom-right":
        styles.bottom = Math.max(bottom, basePadding)
        styles.right = Math.max(right, basePadding)
        break
      case "top-left":
        styles.top = Math.max(top, 80) + basePadding
        styles.left = Math.max(left, basePadding)
        break
      case "bottom-left":
        styles.bottom = Math.max(bottom, basePadding)
        styles.left = Math.max(left, basePadding)
        break
    }

    return styles
  }, [position, dynamicOffset])

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 left-4 z-50 w-3 h-3 bg-primary/20 rounded-full hover:bg-primary/40 transition-colors duration-200 sm:bottom-8 sm:left-6"
        onClick={() => {
          setIsVisible(true)
          localStorage.setItem(TIMER_VISIBILITY_KEY, JSON.stringify(true))
        }}
        aria-label="Show reading timer"
        title="Show reading timer"
      />
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={timerRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={`
          ${getPositionClasses()}
          bg-background/95 backdrop-blur-lg 
          border border-primary/20 
          rounded-full 
          shadow-2xl shadow-primary/10
          hover:shadow-3xl hover:shadow-primary/20
          group
          ${isMinimized ? "hover:scale-105" : "hover:scale-102"}
          max-w-[calc(100vw-2rem)]
          ${collisionInfo.hasCollision ? "ring-2 ring-yellow-400/50" : ""}
        `}
        style={getPositionStyles()}
        whileHover={{ scale: isMinimized ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Reading timer: ${getReadableTime(timeInSeconds)}${collisionInfo.hasCollision ? ". Position adjusted to avoid overlaps." : ""}`}
      >
        {/* Collision Warning Indicator */}
        <AnimatePresence>
          {collisionInfo.hasCollision && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -left-2 w-5 h-5 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center text-xs"
              title={`Collision detected with: ${collisionInfo.conflictingElements.join(", ")}`}
            >
              <AlertTriangle className="w-3 h-3" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Timer Content */}
        <div
          className={`
            flex items-center gap-2 
            ${isMinimized ? "px-3 py-2" : "px-4 py-2.5 sm:px-6 sm:py-3"}
            transition-all duration-300
          `}
        >
          {/* Animated Clock Icon */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Clock
              className={`
                text-primary 
                ${isMinimized ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5"}
                transition-all duration-300
                drop-shadow-sm
              `}
              aria-hidden="true"
            />
          </motion.div>

          {/* Time Display with Enhanced Typography */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.span
                className={`
                  tabular-nums font-mono font-semibold
                  text-foreground
                  text-sm sm:text-base lg:text-lg
                  transition-all duration-300
                  tracking-wide
                  drop-shadow-sm
                `}
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {formatTime(timeInSeconds)}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Enhanced Active Indicator */}
          <motion.div
            className="relative flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.span
              className={`
                absolute inline-flex rounded-full bg-primary
                ${isMinimized ? "h-1.5 w-1.5" : "h-2 w-2"}
              `}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span
              className={`
                relative inline-flex rounded-full bg-primary
                ${isMinimized ? "h-1.5 w-1.5" : "h-2 w-2"}
                shadow-sm shadow-primary/50
              `}
            />
          </motion.div>

          {/* Enhanced Control Buttons */}
          <AnimatePresence>
            {(showControls || isMinimized) && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 ml-1"
              >
                {/* Minimize/Maximize Button */}
                <motion.button
                  onClick={toggleMinimize}
                  className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-200 group/btn"
                  aria-label={isMinimized ? "Expand timer" : "Minimize timer"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3 h-3 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                  ) : (
                    <Minimize2 className="w-3 h-3 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                  )}
                </motion.button>

                {/* Position Cycle Button */}
                {!isMinimized && (
                  <motion.button
                    onClick={cyclePosition}
                    className="p-1.5 rounded-full hover:bg-primary/10 transition-all duration-200 group/btn"
                    aria-label="Change timer position"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCcw className="w-3 h-3 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                  </motion.button>
                )}

                {/* Hide Button */}
                <motion.button
                  onClick={toggleVisibility}
                  className="p-1.5 rounded-full hover:bg-destructive/10 transition-all duration-200 group/btn"
                  aria-label="Hide timer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Tooltip for Minimized State */}
        <AnimatePresence>
          {isMinimized && showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`
                absolute mb-2 px-3 py-2 
                bg-popover/95 backdrop-blur-sm text-popover-foreground 
                text-xs font-medium rounded-lg shadow-lg 
                whitespace-nowrap border border-border/50
                ${position.includes("bottom") ? "bottom-full" : "top-full mt-2"}
                ${position.includes("right") ? "right-0" : "left-0"}
              `}
            >
              <div className="flex flex-col gap-1">
                <div>Reading time: {formatTime(timeInSeconds)}</div>
                <div className="text-xs text-muted-foreground">{getReadableTime(timeInSeconds)}</div>
                {collisionInfo.hasCollision && (
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">⚠️ Position adjusted for conflicts</div>
                )}
              </div>
              {/* Tooltip Arrow */}
              <div
                className={`
                  absolute w-2 h-2 bg-popover/95 border-l border-t border-border/50 rotate-45
                  ${position.includes("bottom") ? "top-full -mt-1" : "bottom-full -mb-1"}
                  ${position.includes("right") ? "right-4" : "left-4"}
                `}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen Reader Only Content */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Total time spent on website: {getReadableTime(timeInSeconds)}
          {collisionInfo.hasCollision &&
            `. Timer position automatically adjusted to avoid overlapping with ${collisionInfo.conflictingElements.join(", ")}`}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
