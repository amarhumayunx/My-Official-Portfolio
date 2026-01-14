"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/useLocalStorage"

const colorPresets = [
  { name: "Blue", value: "221.2 83.2% 53.3%", preview: "#3b82f6" },
  { name: "Purple", value: "262.1 83.3% 57.8%", preview: "#8b5cf6" },
  { name: "Pink", value: "330.4 81.2% 60.4%", preview: "#ec4899" },
  { name: "Green", value: "142.1 76.2% 36.3%", preview: "#10b981" },
  { name: "Orange", value: "24.6 95% 53.1%", preview: "#f97316" },
  { name: "Red", value: "0 84.2% 60.2%", preview: "#ef4444" },
  { name: "Cyan", value: "188.7 85.7% 53.3%", preview: "#06b6d4" },
  { name: "Indigo", value: "239.4 83.5% 66.7%", preview: "#6366f1" },
]

export function ThemeColorCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [customColor, setCustomColor] = useLocalStorage("themeColor", colorPresets[0].value)

  React.useEffect(() => {
    document.documentElement.style.setProperty("--primary", customColor)
  }, [customColor])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 rounded-full shadow-lg bg-background border border-border"
        aria-label="Customize theme color"
      >
        <Palette className="w-5 h-5" />
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
              className="fixed bottom-24 right-4 w-80 bg-background border border-border rounded-xl shadow-2xl z-50 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme Color
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {colorPresets.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => setCustomColor(preset.value)}
                    className={cn(
                      "w-full h-12 rounded-lg border-2 transition-all",
                      customColor === preset.value
                        ? "border-primary scale-110"
                        : "border-border hover:border-primary/50"
                    )}
                    style={{ backgroundColor: preset.preview }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Select ${preset.name} theme`}
                  />
                ))}
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Custom Color</label>
                <input
                  type="color"
                  value={`hsl(${customColor})`}
                  onChange={(e) => {
                    // Convert hex to HSL (simplified)
                    const hex = e.target.value.replace("#", "")
                    const r = parseInt(hex.substr(0, 2), 16) / 255
                    const g = parseInt(hex.substr(2, 2), 16) / 255
                    const b = parseInt(hex.substr(4, 2), 16) / 255
                    const max = Math.max(r, g, b)
                    const min = Math.min(r, g, b)
                    let h = 0
                    let s = 0
                    const l = (max + min) / 2

                    if (max !== min) {
                      const d = max - min
                      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                      switch (max) {
                        case r:
                          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
                          break
                        case g:
                          h = ((b - r) / d + 2) / 6
                          break
                        case b:
                          h = ((r - g) / d + 4) / 6
                          break
                      }
                    }

                    setCustomColor(`${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`)
                  }}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
