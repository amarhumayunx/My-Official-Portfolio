"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "./LoadingSpinner"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a minimum loading time to ensure the animation is seen
    // and then hide the loading screen.
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Display loading screen for at least 1.5 seconds

    // Optional: You could also listen for the 'load' event on the window
    // to ensure all assets are loaded, but for a quick UX, a timeout is often sufficient.
    // const handleLoad = () => setIsLoading(false);
    // window.addEventListener('load', handleLoad);
    // return () => {
    //   clearTimeout(timer);
    //   window.removeEventListener('load', handleLoad);
    // };

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }} // Keep opaque during initial display
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Fade out after a slight delay
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <LoadingSpinner size="lg" />
            <p className="text-lg font-medium text-muted-foreground">Loading Portfolio...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
