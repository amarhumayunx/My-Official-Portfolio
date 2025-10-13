"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, Code, FileText, Home, Menu, MessageCircle, Moon, Sparkles, Sun, User, X } from "lucide-react"

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Testimonials", href: "#testimonials", icon: MessageCircle },
  { name: "Blog", href: "#blog", icon: FileText },
  { name: "Contact", href: "#contact", icon: MessageCircle },
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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" },
      )

      obs.observe(el)
      observersRef.current.push(obs)
    })

    return () => {
      observersRef.current.forEach((obs) => obs.disconnect())
      observersRef.current = []
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
    const btn = itemRefs.current[activeIndex]
    if (!btn) {
      setActiveRect(null)
      return
    }
    const containerRect = containerRef.current.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    setActiveRect({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
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
        setActiveSection(id)

        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
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
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3"
      aria-label="Primary"
    >
      <div
        className={[
          "max-w-7xl mx-auto border rounded-2xl backdrop-blur-xl transition-all",
          scrolled
            ? "bg-white/85 dark:bg-zinc-900/85 border-zinc-200/30 dark:border-zinc-800/30 shadow-md"
            : "bg-white/70 dark:bg-zinc-900/70 border-zinc-200/20 dark:border-zinc-800/20",
        ].join(" ")}
      >
        <div className="px-4 md:px-5">
          <div className="h-14 flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-2 group"
              aria-label="Go to home"
            >
              <Sparkles className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MHA
              </span>
            </button>

            <div className="hidden lg:flex flex-1 justify-center">
              <div
                ref={containerRef}
                data-testid="nav-container"
                className="relative flex items-center gap-1 rounded-full border border-zinc-200/30 dark:border-zinc-800/30 bg-zinc-50/60 dark:bg-zinc-800/60 px-2 py-1"
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
                        "relative z-20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                        active
                          ? "text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white",
                        "flex items-center gap-2",
                      ].join(" ")}
                    >
                      {!active && (
                        <span
                          className="absolute inset-0 rounded-full bg-zinc-200/60 dark:bg-zinc-700/60 opacity-0 hover:opacity-100 transition-opacity z-0"
                          aria-hidden="true"
                        />
                      )}
                      <item.icon className="w-4 h-4" />
                      <span className="hidden xl:inline">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                className="hidden md:inline-flex rounded-full px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/consultation">Consultation</Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-10 h-10 rounded-full border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100/60 dark:bg-zinc-800/60"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, y: -6 }}
                    animate={{ rotate: 0, opacity: 1, y: 0 }}
                    exit={{ rotate: 90, opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="inline-flex"
                    aria-hidden="true"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-blue-600" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-full border border-zinc-200/40 dark:border-zinc-800/40"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="absolute right-4 top-[4.5rem] w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/95 dark:bg-zinc-900/95 shadow-xl overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="p-4 border-b border-zinc-200/40 dark:border-zinc-800/40">
                <p className="text-sm font-semibold">Navigation</p>
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
                        "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                        active
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70",
                      ].join(" ")}
                    >
                      <span
                        className={["p-2 rounded-lg", active ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800"].join(
                          " ",
                        )}
                        aria-hidden="true"
                      >
                        <item.icon className="w-4 h-4" />
                      </span>
                      {item.name}
                    </button>
                  )
                })}

                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
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
