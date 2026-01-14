"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({ placeholder = "Search...", onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (onSearch) {
        onSearch(searchQuery)
      } else {
        // Default behavior: navigate to search results
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    },
    [onSearch, router],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
            isFocused ? "text-primary" : "text-muted-foreground"
          }`}
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 w-full"
          aria-label="Search"
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleClear}
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {query && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground text-center">
          Press Enter to search • <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">K</kbd> to focus
        </div>
      )}
    </form>
  )
}
