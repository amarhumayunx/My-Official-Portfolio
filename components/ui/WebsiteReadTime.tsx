"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "lucide-react"

const LOCAL_STORAGE_KEY = "websiteReadTime"

export function WebsiteReadTime() {
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateTimeRef = useRef(Date.now())

  // Function to format time from seconds to HH:MM:SS
  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (num: number) => num.toString().padStart(2, "0")

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }, [])

  // Load time from local storage on component mount
  useEffect(() => {
    const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedTime) {
      setTimeInSeconds(Number.parseInt(savedTime, 10))
    }
    lastUpdateTimeRef.current = Date.now()
  }, [])

  // Start/Stop timer based on visibility and component lifecycle
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
          return prevTime + elapsed
        })
      }, 1000) // Update every second
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
        lastUpdateTimeRef.current = Date.now() // Reset last update time to prevent jump
        startTimer()
      }
    }

    const handleBeforeUnload = () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, timeInSeconds.toString())
    }

    // Initial start
    startTimer()

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup on unmount
    return () => {
      stopTimer()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      localStorage.setItem(LOCAL_STORAGE_KEY, timeInSeconds.toString()) // Final save
    }
  }, [timeInSeconds]) // Dependency on timeInSeconds to ensure latest value is saved

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center gap-2 shadow-lg text-sm font-medium text-foreground"
        aria-live="off" // This is a continuous update, not critical for screen readers to announce every second
      >
        <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="tabular-nums">{formatTime(timeInSeconds)}</span>
        <span className="sr-only">Total time spent on website</span>
      </motion.div>
    </AnimatePresence>
  )
}
