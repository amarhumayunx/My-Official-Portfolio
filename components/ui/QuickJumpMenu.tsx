"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Home, User, BarChart3, Code, Briefcase, Images, Zap, MessageCircle, FileText, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface JumpItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
}

const jumpItems: JumpItem[] = [
  { id: "home", label: "Home", href: "/#home", icon: Home, shortcut: "H" },
  { id: "about", label: "About", href: "/#about", icon: User, shortcut: "A" },
  { id: "stats", label: "Stats", href: "/#stats", icon: BarChart3, shortcut: "S" },
  { id: "skills", label: "Skills", href: "/#skills", icon: Code, shortcut: "K" },
  { id: "projects", label: "Projects", href: "/#projects", icon: Briefcase, shortcut: "P" },
  { id: "portfolio", label: "Portfolio", href: "/#portfolio", icon: Images, shortcut: "F" },
  { id: "services", label: "Services", href: "/#services", icon: Zap, shortcut: "V" },
  { id: "testimonials", label: "Testimonials", href: "/#testimonials", icon: MessageCircle, shortcut: "T" },
  { id: "blog", label: "Blog", href: "/#blog", icon: FileText, shortcut: "B" },
  { id: "contact", label: "Contact", href: "/#contact", icon: Mail, shortcut: "C" },
]

export function QuickJumpMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % jumpItems.length)
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + jumpItems.length) % jumpItems.length)
        }
        if (e.key === "Enter" && jumpItems[selectedIndex]) {
          handleSelect(jumpItems[selectedIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex])

  const handleSelect = (item: JumpItem) => {
    setIsOpen(false)
    router.push(item.href)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-md mx-4 z-50"
          >
            <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-2">
                <Command className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Quick Jump</span>
              </div>
              <div className="p-2 max-h-96 overflow-y-auto">
                {jumpItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                        selectedIndex === index ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.label}</div>
                      </div>
                      {item.shortcut && (
                        <kbd className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted rounded border border-border">
                          {item.shortcut}
                        </kbd>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
