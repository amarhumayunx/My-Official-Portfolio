"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { liquidSpringSoft } from "@/lib/liquid-animation"

type ComponentModule = { default: React.ComponentType<Record<string, unknown>> }

interface LazySectionProps {
  /** Dynamic import of the section component - loads only when in view */
  loader: () => Promise<ComponentModule>
  /** Min height of placeholder to avoid layout shift (e.g. "400px", "50vh") */
  minHeight?: string
  /** Root margin for Intersection Observer - load a bit before visible (e.g. "200px") */
  rootMargin?: string
  /** Optional class for the wrapper */
  className?: string
  /** Threshold 0–1; fraction of section visible to trigger load */
  threshold?: number
}

const defaultMinHeight = "min-h-[60vh]"

export function LazySection({
  loader,
  minHeight = defaultMinHeight,
  rootMargin = "400px",
  threshold = 0.01,
  className,
}: LazySectionProps) {
  const [Component, setComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const loadComponent = useCallback(() => {
    if (isLoaded) return
    setIsLoaded(true)
    loader()
      .then((mod) => setComponent(() => mod.default))
      .catch(() => setIsLoaded(false))
  }, [loader, isLoaded])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadComponent()
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, loadComponent])

  return (
    <div ref={wrapperRef} className={cn("w-full", className)} data-content-visibility>
      {!Component ? (
        <div className={cn(minHeight, "w-full")} aria-hidden="true" />
      ) : (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.01 } : liquidSpringSoft}
          className="w-full"
        >
          <Component />
        </motion.div>
      )}
    </div>
  )
}
