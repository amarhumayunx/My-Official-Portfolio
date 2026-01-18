"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WifiOff, Wifi, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface OfflineIndicatorProps {
  className?: string
  position?: "top" | "bottom"
}

export function OfflineIndicator({ className, position = "top" }: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setWasOffline(true)
      // Reset after showing success message
      setTimeout(() => setWasOffline(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <AnimatePresence>
      {(!isOnline || wasOffline) && (
        <motion.div
          initial={{ y: position === "top" ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === "top" ? -100 : 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium",
            position === "top" ? "top-4" : "bottom-4",
            !isOnline
              ? "bg-red-500 text-white"
              : wasOffline
                ? "bg-green-500 text-white"
                : "",
            className
          )}
        >
          {!isOnline ? (
            <>
              <WifiOff className="w-4 h-4" />
              <span>You're offline. Some features may be limited.</span>
            </>
          ) : wasOffline ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>You're back online!</span>
            </>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Offline action queue hook
export function useOfflineQueue<T>() {
  const [queue, setQueue] = useState<T[]>([])
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const addToQueue = (action: T) => {
    setQueue((prev) => [...prev, action])
  }

  const processQueue = async (processor: (action: T) => Promise<void>) => {
    if (!isOnline || queue.length === 0) return

    const actions = [...queue]
    setQueue([])

    for (const action of actions) {
      try {
        await processor(action)
      } catch (error) {
        console.error("Failed to process queued action:", error)
        // Re-add failed action to queue
        setQueue((prev) => [action, ...prev])
      }
    }
  }

  return {
    queue,
    isOnline,
    addToQueue,
    processQueue,
    queueLength: queue.length,
  }
}
