"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Type, Contrast, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [fontSize, setFontSize] = useLocalStorage<"small" | "medium" | "large">("fontSize", "medium")
  const [highContrast, setHighContrast] = useLocalStorage("highContrast", false)
  const [reducedMotion, setReducedMotion] = useLocalStorage("reducedMotion", false)

  React.useEffect(() => {
    document.documentElement.setAttribute("data-font-size", fontSize)
    return () => {
      document.documentElement.removeAttribute("data-font-size")
    }
  }, [fontSize])

  React.useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  React.useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }, [reducedMotion])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg bg-background border border-border"
        aria-label="Accessibility controls"
      >
        <Settings className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-20 right-4 w-80 bg-background border border-border rounded-xl shadow-2xl z-50 p-4"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Accessibility Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Font Size
                  </label>
                  <div className="flex gap-2">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <Button
                        key={size}
                        variant={fontSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFontSize(size)}
                        className="flex-1 capitalize"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Contrast className="w-4 h-4" />
                    High Contrast
                  </label>
                  <Button
                    variant={highContrast ? "default" : "outline"}
                    size="sm"
                    onClick={() => setHighContrast(!highContrast)}
                    className="w-full"
                  >
                    {highContrast ? (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Enabled
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Disabled
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2">Reduce Motion</label>
                  <Button
                    variant={reducedMotion ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className="w-full"
                  >
                    {reducedMotion ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
