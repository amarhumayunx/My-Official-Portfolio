"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number
  className?: string
  offset?: "start" | "center" | "end"
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
  offset = "start",
}: ParallaxLayerProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offset === "start" ? "start start" : offset === "end" ? "end end" : "start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div ref={ref} className={cn("relative", className)} style={{ y }}>
      {children}
    </motion.div>
  )
}

interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  layers?: number
}

export function ParallaxContainer({ children, className, layers = 3 }: ParallaxContainerProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {React.Children.map(children, (child, index) => (
        <ParallaxLayer key={index} speed={(index + 1) * 0.2}>
          {child}
        </ParallaxLayer>
      ))}
    </div>
  )
}
