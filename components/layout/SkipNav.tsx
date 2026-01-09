"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SkipNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  return (
    <motion.a
      href="#main-content"
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      onBlur={() => setIsVisible(false)}
      className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-br-lg"
    >
      Skip to main content
    </motion.a>
  )
}
