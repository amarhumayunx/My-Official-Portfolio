"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Command, FileText, Briefcase, Code, User, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "project" | "blog" | "skill" | "page"
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "BalanceBite App",
    description: "AI-powered health and nutrition mobile app",
    type: "project",
    href: "/projects/balancebite-mobile-app",
    icon: Briefcase,
  },
  {
    id: "2",
    title: "Flutter Development",
    description: "Cross-platform mobile app development",
    type: "skill",
    href: "/#skills",
    icon: Code,
  },
  {
    id: "3",
    title: "About Me",
    description: "Learn more about my background and experience",
    type: "page",
    href: "/#about",
    icon: User,
  },
]

export function SearchModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredResults = React.useMemo(() => {
    if (!query.trim()) return []
    const lowerQuery = query.toLowerCase()
    return searchResults.filter(
      (result) =>
        result.title.toLowerCase().includes(lowerQuery) ||
        result.description.toLowerCase().includes(lowerQuery)
    )
  }, [query])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
      if (isOpen && filteredResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length)
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length)
        }
        if (e.key === "Enter" && filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex])

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false)
    router.push(result.href)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="hidden md:flex w-9 h-9 rounded-full border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100/60 dark:bg-zinc-800/60 p-0"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </Button>

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
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
            >
              <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-4 border-b border-border">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search projects, skills, blog posts..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setSelectedIndex(0)
                    }}
                    className="border-0 focus-visible:ring-0 text-base"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {query.trim() && (
                  <div className="max-h-96 overflow-y-auto">
                    {filteredResults.length > 0 ? (
                      <div className="p-2">
                        {filteredResults.map((result, index) => {
                          const Icon = result.icon
                          return (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <button
                                onClick={() => handleSelect(result)}
                                className={cn(
                                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                  selectedIndex === index
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted"
                                )}
                                onMouseEnter={() => setSelectedIndex(index)}
                              >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium">{result.title}</div>
                                  <div className="text-sm text-muted-foreground truncate">
                                    {result.description}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              </button>
                            </motion.div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <p>No results found for &quot;{query}&quot;</p>
                      </div>
                    )}
                  </div>
                )}

                {!query.trim() && (
                  <div className="p-8 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Command className="w-4 h-4" />
                      <span className="text-sm">Press Cmd+K or Ctrl+K to search</span>
                    </div>
                    <p className="text-sm">Search for projects, skills, blog posts, and more</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
