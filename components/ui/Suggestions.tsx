"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Link from "next/link"

interface Suggestion {
  id: string
  title: string
  description: string
  href: string
  category: "service" | "project" | "contact" | "blog"
  priority: "high" | "medium" | "low"
  badge?: string
}

interface SuggestionsProps {
  currentPage?: string
  maxSuggestions?: number
  showCategories?: boolean
  className?: string
}

const allSuggestions: Suggestion[] = [
  // Service Suggestions
  {
    id: "flutter-dev",
    title: "Flutter Development",
    description: "Cross-platform mobile apps with native performance",
    href: "/services/flutter-development",
    category: "service",
    priority: "high",
    badge: "Popular",
  },
  {
    id: "android-dev",
    title: "Android Development",
    description: "Native Android apps with Kotlin and modern architecture",
    href: "/services/android-development",
    category: "service",
    priority: "high",
  },
  {
    id: "firebase-integration",
    title: "Firebase Integration",
    description: "Complete backend solutions with real-time capabilities",
    href: "/services/firebase-integration",
    category: "service",
    priority: "medium",
  },
  {
    id: "ai-ml-integration",
    title: "AI & ML Integration",
    description: "Smart features with machine learning capabilities",
    href: "/services/ai-ml-integration",
    category: "service",
    priority: "medium",
    badge: "Advanced",
  },
  {
    id: "security-solutions",
    title: "Security Solutions",
    description: "Data protection and privacy-focused implementations",
    href: "/services/security-solutions",
    category: "service",
    priority: "medium",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description: "Ongoing app maintenance and technical support",
    href: "/services/maintenance-support",
    category: "service",
    priority: "low",
  },
  // Project Suggestions
  {
    id: "balancebite",
    title: "BalanceBite App",
    description: "AI-powered nutrition tracking with Flutter",
    href: "/projects/balancebite-mobile-app",
    category: "project",
    priority: "high",
    badge: "Featured",
  },
  {
    id: "safecrypt",
    title: "SafeCrypt App",
    description: "Secure password manager with AES encryption",
    href: "/projects/safecrypt-password-manager",
    category: "project",
    priority: "high",
  },
  {
    id: "surah-yaseen",
    title: "Surah Yaseen App",
    description: "Islamic app with beautiful UI and audio features",
    href: "/projects/surah-yaseen-app",
    category: "project",
    priority: "medium",
  },
  {
    id: "toolkit",
    title: "Toolkit App",
    description: "Multi-utility app with various tools and features",
    href: "/projects/toolkit-mobile-app",
    category: "project",
    priority: "medium",
  },
  // Contact Suggestions
  {
    id: "contact-form",
    title: "Get Free Consultation",
    description: "Discuss your project requirements with me",
    href: "/contact",
    category: "contact",
    priority: "high",
    badge: "Free",
  },
  {
    id: "portfolio-review",
    title: "View Full Portfolio",
    description: "Explore all my projects and case studies",
    href: "/projects",
    category: "project",
    priority: "medium",
  },
]

const categoryColors = {
  service: "from-blue-500 to-cyan-600",
  project: "from-purple-500 to-pink-600",
  contact: "from-green-500 to-emerald-600",
  blog: "from-orange-500 to-red-600",
}

const categoryLabels = {
  service: "Service",
  project: "Project",
  contact: "Contact",
  blog: "Blog",
}

export default function Suggestions({
  currentPage = "",
  maxSuggestions = 3,
  showCategories = false,
  className = "",
}: SuggestionsProps) {
  const [dismissedSuggestions, setDismissedSuggestions] = useLocalStorage<string[]>("dismissed-suggestions", [])
  const [isVisible, setIsVisible] = useState(false)
  const [timeOnPage, setTimeOnPage] = useState(0)

  // Filter suggestions based on current page and dismissed items
  const getRelevantSuggestions = (): Suggestion[] => {
    let filtered = allSuggestions.filter((suggestion) => !dismissedSuggestions.includes(suggestion.id))

    // Page-specific filtering
    if (currentPage.includes("/services")) {
      // On service pages, show related services and projects
      filtered = filtered.filter((s) => s.category === "service" || s.category === "project")
    } else if (currentPage.includes("/projects")) {
      // On project pages, show other projects and services
      filtered = filtered.filter((s) => s.category === "project" || s.category === "service")
    } else if (currentPage === "/") {
      // On homepage, show high priority items
      filtered = filtered.filter((s) => s.priority === "high")
    }

    // Sort by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

    return filtered.slice(0, maxSuggestions)
  }

  const suggestions = getRelevantSuggestions()

  // Show suggestions after user has been on page for a while
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1)
    }, 1000)

    // Show suggestions after 10 seconds
    if (timeOnPage >= 10 && suggestions.length > 0) {
      setIsVisible(true)
    }

    return () => clearInterval(timer)
  }, [timeOnPage, suggestions.length])

  const dismissSuggestion = (suggestionId: string) => {
    setDismissedSuggestions([...dismissedSuggestions, suggestionId])
  }

  const dismissAll = () => {
    setIsVisible(false)
  }

  if (!isVisible || suggestions.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed bottom-6 right-6 z-50 max-w-sm ${className}`}
      >
        <Card className="shadow-2xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-semibold">Suggestions for you</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={dismissAll} className="text-white hover:bg-white/20 p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {suggestion.title}
                        </h4>
                        {suggestion.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.badge}
                          </Badge>
                        )}
                        {showCategories && (
                          <Badge
                            variant="outline"
                            className={`text-xs bg-gradient-to-r ${categoryColors[suggestion.category]} text-white border-0`}
                          >
                            {categoryLabels[suggestion.category]}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{suggestion.description}</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild className="text-xs h-7 bg-transparent">
                          <Link href={suggestion.href} className="flex items-center gap-1">
                            View
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissSuggestion(suggestion.id)}
                          className="text-xs h-7 text-muted-foreground hover:text-foreground"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-muted/30 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Based on your activity</span>
                <Button variant="ghost" size="sm" onClick={dismissAll} className="text-xs h-6">
                  Hide all
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

// Named export for compatibility
export { Suggestions }
