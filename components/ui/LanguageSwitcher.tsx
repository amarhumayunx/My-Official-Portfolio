"use client"

import { useEffect } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { setLanguage } from "@/lib/i18n"

export function LanguageSwitcher() {
  useEffect(() => {
    // Ensure language is set to English in DOM
    setLanguage("en")
  }, [])

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 h-9 w-9 sm:w-auto sm:px-3 rounded-full border border-zinc-200/40 dark:border-zinc-800/40 cursor-default"
      aria-label="Language: English"
      disabled
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">🇬🇧</span>
      <span className="hidden sm:inline text-xs">English</span>
    </Button>
  )
}
