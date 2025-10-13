"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const [fps, setFps] = useState(60)
  const [frameTime, setFrameTime] = useState(16.67)
  const [isLowFPS, setIsLowFPS] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      const elapsed = currentTime - lastTime

      if (elapsed >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / elapsed)
        const currentFrameTime = Number((elapsed / frameCount).toFixed(2))

        setFps(currentFPS)
        setFrameTime(currentFrameTime)
        setIsLowFPS(currentFPS < 55)

        frameCount = 0
        lastTime = currentTime
      }

      animationFrameId = requestAnimationFrame(measureFPS)
    }

    if (isVisible) {
      animationFrameId = requestAnimationFrame(measureFPS)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isVisible])

  const getFPSColor = useCallback((fps: number) => {
    if (fps >= 55) return "text-green-500"
    if (fps >= 45) return "text-yellow-500"
    return "text-red-500"
  }, [])

  const getFPSBadgeVariant = useCallback((fps: number) => {
    if (fps >= 55) return "default"
    if (fps >= 45) return "secondary"
    return "destructive"
  }, [])

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsVisible(!isVisible)}
            className="rounded-full shadow-lg backdrop-blur-sm bg-background/80 hover:bg-background"
            aria-label="Toggle performance monitor"
          >
            <Activity className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-20 right-4 z-50 bg-card/95 backdrop-blur-md rounded-xl shadow-2xl border border-border p-4 w-72"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Performance Monitor
              </h3>
              <Button size="icon" variant="ghost" onClick={() => setIsVisible(false)} className="h-6 w-6">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">FPS:</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    className={`text-2xl font-bold tabular-nums ${getFPSColor(fps)}`}
                    animate={isLowFPS ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isLowFPS ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    {fps}
                  </motion.span>
                  <Badge variant={getFPSBadgeVariant(fps)} className="text-xs">
                    {fps >= 55 ? "Smooth" : fps >= 45 ? "Fair" : "Low"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Frame Time:</span>
                <span className="text-sm font-mono tabular-nums">{frameTime}ms</span>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">≥55 FPS - Smooth</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-xs text-muted-foreground">45-54 FPS - Fair</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs text-muted-foreground">&lt;45 FPS - Low</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                <p className="mb-1">💡 Tips for 60 FPS:</p>
                <ul className="space-y-1 text-[10px]">
                  <li>• Use will-change sparingly</li>
                  <li>• Prefer transforms over position</li>
                  <li>• Enable hardware acceleration</li>
                  <li>• Reduce simultaneous animations</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
