"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Keyboard } from "lucide-react"

interface Shortcut {
  keys: string[]
  description: string
  action: () => void
}

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const shortcuts: Shortcut[] = [
      {
        keys: ["Ctrl", "K"],
        description: "Focus search",
        action: () => {
          const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLInputElement
          searchInput?.focus()
        },
      },
      {
        keys: ["/"],
        description: "Open search",
        action: () => {
          window.location.href = "/search"
        },
      },
      {
        keys: ["Esc"],
        description: "Close modals/menus",
        action: () => {
          // Close any open modals or menus
          const modals = document.querySelectorAll('[role="dialog"]')
          modals.forEach((modal) => {
            const closeButton = modal.querySelector('button[aria-label*="close" i], button[aria-label*="Close" i]')
            ;(closeButton as HTMLButtonElement)?.click()
          })
        },
      },
      {
        keys: ["?"],
        description: "Show keyboard shortcuts",
        action: () => setShowHelp(true),
      },
    ]

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        shortcuts[0].action()
      }

      // / for search
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        shortcuts[1].action()
      }

      // Esc to close modals
      if (e.key === "Escape") {
        shortcuts[2].action()
      }

      // ? for help
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setShowHelp(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {children}
      <KeyboardShortcutsHelp open={showHelp} onOpenChange={setShowHelp} />
    </>
  )
}

function KeyboardShortcutsHelp({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const shortcuts = [
    { keys: ["Ctrl", "K"], description: "Focus search" },
    { keys: ["/"], description: "Open search page" },
    { keys: ["Esc"], description: "Close modals/menus" },
    { keys: ["?"], description: "Show keyboard shortcuts" },
    { keys: ["G", "H"], description: "Go to home" },
    { keys: ["G", "P"], description: "Go to projects" },
    { keys: ["G", "B"], description: "Go to blog" },
    { keys: ["G", "C"], description: "Go to contact" },
  ]

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    Keyboard Shortcuts
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex}>
                            <kbd className="px-2 py-1 text-xs font-semibold bg-background border border-border rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="mx-1 text-muted-foreground">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Esc</kbd> to close
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
