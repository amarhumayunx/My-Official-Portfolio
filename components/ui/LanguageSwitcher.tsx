"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLanguage, setLanguage, type Language } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
]

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCurrentLang(getLanguage())
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setCurrentLang(lang)
    setIsOpen(false)
    // Reload page to apply language changes
    window.location.reload()
  }

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 h-9 w-9 sm:w-auto sm:px-3 rounded-full border border-zinc-200/40 dark:border-zinc-800/40"
          aria-label="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="hidden sm:inline text-xs">{currentLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
              </div>
            </div>
            {currentLang === lang.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
