"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Code,
  FileText,
  Home,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  User,
  X,
  BarChart3,
  Images,
  Github,
  Zap,
  Mail,
  Search,
} from "lucide-react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Stats", href: "#stats", icon: BarChart3 },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Portfolio", href: "#portfolio", icon: Images },
  { name: "Services", href: "#services", icon: Zap },
  { name: "Testimonials", href: "#testimonials", icon: MessageCircle },
  { name: "Blog", href: "#blog", icon: FileText },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null)
  const observersRef = useRef<IntersectionObserver[]>([])

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isScrollingRef = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      isScrollingRef.current = true
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    observersRef.current.forEach((obs) => obs.disconnect())
    observersRef.current = []

    if (pathname !== "/") return

    const sectionIds = navItems.filter((i) => i.href.startsWith("#")).map((i) => i.href.replace("#", ""))

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && isScrollingRef.current) {
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current)
            }
            scrollTimeoutRef.current = setTimeout(() => {
              setActiveSection(id)
            }, 10)
          }
        },
        { threshold: 0.3, rootMargin: "-60px 0px -60% 0px" },
      )

      obs.observe(el)
      observersRef.current.push(obs)
    })

    return () => {
      observersRef.current.forEach((obs) => obs.disconnect())
      observersRef.current = []
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [pathname])

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/")) return pathname === href
      if (href.startsWith("#")) return pathname === "/" && activeSection === href.slice(1)
      return false
    },
    [pathname, activeSection],
  )

  const activeIndex = navItems.findIndex((i) => isActive(i.href))

  const measureActive = useCallback(() => {
    if (activeIndex < 0 || !containerRef.current) {
      setActiveRect(null)
      return
    }
    requestAnimationFrame(() => {
      const btn = itemRefs.current[activeIndex]
      if (!btn || !containerRef.current) {
        setActiveRect(null)
        return
      }
      const containerRect = containerRef.current.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      setActiveRect({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      })
    })
  }, [activeIndex])

  useEffect(() => {
    if (!mounted) return
    measureActive()
    const onResize = () => measureActive()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [mounted, activeIndex, measureActive])

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault()
      setIsOpen(false)

      if (href.startsWith("/")) {
        router.push(href)
        return
      }

      const id = href.slice(1)

      if (pathname !== "/") {
        router.push(`/${href}`)
        return
      }

      const element = document.getElementById(id)
      if (element) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        isScrollingRef.current = false
        setActiveSection(id)

        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        setTimeout(() => {
          isScrollingRef.current = true
        }, 500)
      }
    },
    [pathname, router],
  )

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="text-xl font-bold">MHA</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      style={{ willChange: "transform, opacity" }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3"
      aria-label="Primary"
    >
      <div
        className={[
          "max-w-7xl mx-auto border rounded-xl sm:rounded-2xl backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "bg-white/85 dark:bg-zinc-900/85 border-zinc-200/30 dark:border-zinc-800/30 shadow-md"
            : "bg-white/70 dark:bg-zinc-900/70 border-zinc-200/20 dark:border-zinc-800/20",
        ].join(" ")}
      >
        <div className="px-3 sm:px-4 md:px-5 lg:px-6">
          <div className="h-12 sm:h-14 flex items-center justify-between gap-2 lg:gap-4">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0 z-50"
              aria-label="Go to home"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-500 flex-shrink-0" />
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                MHA
              </span>
            </button>

            <div className="hidden lg:flex flex-1 justify-center px-2 min-w-0 max-w-5xl mx-auto">
              <div
                ref={containerRef}
                data-testid="nav-container"
                className="relative flex items-center gap-0.5 rounded-full border border-zinc-200/30 dark:border-zinc-800/30 bg-zinc-50/60 dark:bg-zinc-800/60 px-1.5 py-1 overflow-x-auto scrollbar-hide"
                style={{ maxWidth: "100%" }}
              >
                <AnimatePresence>
                  {activeRect && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        left: activeRect.left,
                        width: activeRect.width,
                      }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm z-10"
                      aria-hidden="true"
                      data-testid="active-pill"
                    />
                  )}
                </AnimatePresence>

                {navItems.map((item, idx) => {
                  const active = isActive(item.href)
                  const testId = item.href === "/" ? "home" : item.href.replace(/^\/|^#/, "")
                  return (
                    <button
                      key={item.name}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      onClick={(e) => handleNavClick(e, item.href)}
                      data-testid={`nav-btn-${testId}`}
                      className={[
                        "relative z-20 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0",
                        active
                          ? "text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white",
                        "flex items-center gap-1.5",
                      ].join(" ")}
                    >
                      {!active && (
                        <span
                          className="absolute inset-0 rounded-full bg-zinc-200/60 dark:bg-zinc-700/60 opacity-0 hover:opacity-100 transition-opacity z-0"
                          aria-hidden="true"
                        />
                      )}
                      <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="hidden 2xl:inline">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="hidden md:flex w-9 h-9 rounded-full border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100/60 dark:bg-zinc-800/60 p-0"
                aria-label="Search"
              >
                <Link href="/search">
                  <Search className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="hidden lg:inline-flex rounded-full px-3 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
              >
                <Link href="/consultation">Consultation</Link>
              </Button>

              <ThemeToggle />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden w-9 h-9 rounded-full border border-zinc-200/40 dark:border-zinc-800/40 p-0"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40"
            aria-hidden={!isOpen}
          >
            <button
              aria-label="Close navigation"
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="absolute right-3 sm:right-4 top-16 sm:top-[4.5rem] w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-xl sm:rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/95 dark:bg-zinc-900/95 shadow-xl overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="p-3 sm:p-4 border-b border-zinc-200/40 dark:border-zinc-800/40">
                <p className="text-xs sm:text-sm font-semibold">Navigation</p>
              </div>
              <div className="p-2">
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  const testId = item.href === "/" ? "home" : item.href.replace(/^\/|^#/, "")
                  return (
                    <button
                      key={item.name}
                      onClick={(e) => handleNavClick(e, item.href)}
                      data-testid={`nav-btn-${testId}-mobile`}
                      className={[
                        "w-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors",
                        active
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "p-1.5 sm:p-2 rounded-lg",
                          active ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      {item.name}
                    </button>
                  )
                })}

                <div className="pt-2 mt-2 border-t border-zinc-200/40 dark:border-zinc-800/40">
                  <Button
                    asChild
                    className="w-full rounded-lg sm:rounded-xl text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/consultation" onClick={() => setIsOpen(false)}>
                      Free Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
