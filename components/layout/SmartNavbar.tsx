"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SmartNavbarProps {
  children: React.ReactNode
  hideDelay?: number
}

export function SmartNavbarWrapper({ children, hideDelay = 200 }: SmartNavbarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)

      // Reset timer
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Show navbar after user stops scrolling
        setIsVisible(true)
      }, hideDelay)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [lastScrollY, hideDelay])

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {children}
    </motion.div>
  )
}
