'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId: number | null = null
    let lastProgress = -1
    const handleScroll = () => {
      if (rafId != null) return
      rafId = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const raw = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
        const progress = Math.round(raw)
        if (progress !== lastProgress) {
          lastProgress = progress
          setScrollProgress(raw)
        }
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 origin-left z-50"
      style={{ width: `${scrollProgress}%` }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
    />
  )
}
