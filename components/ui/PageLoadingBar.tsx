'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { liquidSpringScroll } from '@/lib/liquid-animation'

export function PageLoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const handleStart = () => {
      setIsLoading(true)
      setProgress(10)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 25
          return prev
        })
      }, 250)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 400)
    }

    const handleBeforeUnload = () => handleStart()
    const handleLoad = () => handleComplete()

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('load', handleLoad)

    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isLoading ? progress / 100 : 0 }}
      transition={liquidSpringScroll}
      style={{ transformOrigin: 'left' }}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[9999] shadow-lg"
    />
  )
}
