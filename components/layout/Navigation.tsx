"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import {
  Menu,
  X,
  Moon,
  Sun,
  Home,
  User,
  Code,
  Briefcase,
  MessageCircle,
  FileText,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Testimonials", href: "#testimonials", icon: MessageCircle },
  { name: "Blog", href: "#blog", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Contact", href: "#contact", icon: MessageCircle },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isNavigating, setIsNavigating] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    setMounted(true)
    
    // Set initial window width and add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)

    // Only set up intersection observer on home page
    if (pathname === "/") {
      const sections = navItems.filter((item) => item.href.startsWith("#")).map((item) => item.href.replace("#", ""))

      const observers = sections.map((section) => {
        const element = document.getElementById(section)
        if (!element) return null

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isNavigating) {
              setActiveSection(section)
            }
          },
          { threshold: 0.3, rootMargin: "-20% 0px -80% 0px" }
        )

        observer.observe(element)
        return observer
      })

      return () => {
        observers.forEach((observer) => observer?.disconnect())
        window.removeEventListener('resize', handleResize)
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname, isNavigating])

  const handleNavClick = useCallback(
    (href: string) => {
      // Prevent double clicks
      if (isNavigating) return

      setIsOpen(false)
      setIsNavigating(true)

      if (href.startsWith("/")) {
        // Direct page navigation - navigate to the page
        router.push(href)
        // Reset navigation state after route change
        setTimeout(() => setIsNavigating(false), 500)
      } else if (href.startsWith("#")) {
        // Hash navigation
        const sectionId = href.replace("#", "")

        if (pathname !== "/") {
          // If not on home page, navigate to home first, then scroll
          router.push(`/${href}`) // Navigate to home with hash
          // Reset navigation state after route change
          setTimeout(() => setIsNavigating(false), 800)
        } else {
          // If on home page, scroll directly
          setActiveSection(sectionId) // Set active section immediately
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          // Reset navigation state after scroll
          setTimeout(() => setIsNavigating(false), 500)
        }
      }
    },
    [isNavigating, pathname, router],
  )

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/")) {
        // For page routes, check exact pathname match
        return pathname === href
      } else if (href.startsWith("#")) {
        // For hash links, check if we're on home page and section matches
        const sectionId = href.replace("#", "")
        return pathname === "/" && activeSection === sectionId
      }
      return false
    },
    [pathname, activeSection],
  )

  // Get desktop navigation items (all items)
  const desktopNavItems = navItems
  
  // Get active item index for proper positioning
  const activeItemIndex = desktopNavItems.findIndex((item) => isActive(item.href))
  const hasActiveItem = activeItemIndex !== -1

  // Calculate item width based on screen size and number of items
  const getItemWidth = () => {
    if (windowWidth >= 1280) return 'auto' // Let items size naturally on xl+ screens
    return 'auto' // Always auto-size items
  }

  const getActiveBackgroundStyle = () => {
    // Since we're using flex layout with gap, we need to calculate position differently
    // This will be handled by the layoutId animation in Framer Motion
    return {
      width: "auto",
      height: "36px",
    }
  }

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                MHA
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            animate={{
              borderRadius: scrolled ? "20px" : "24px",
              padding: scrolled ? "12px 20px" : "16px 24px",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative overflow-hidden backdrop-blur-xl border transition-all duration-500 ${
              scrolled
                ? "bg-white/90 dark:bg-gray-900/90 border-gray-200/30 dark:border-gray-700/30 shadow-xl shadow-black/5"
                : "bg-white/70 dark:bg-gray-900/70 border-gray-200/20 dark:border-gray-700/20 shadow-lg shadow-black/5"
            }`}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3" />

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-20 h-20 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-xl"
                animate={{
                  x: [0, 60, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{ top: "-10px", left: "20%" }}
              />
              <motion.div
                className="absolute w-16 h-16 bg-gradient-to-r from-pink-400/8 to-blue-400/8 rounded-full blur-xl"
                animate={{
                  x: [0, -40, 0],
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                style={{ top: "-8px", right: "25%" }}
              />
            </div>

            <div className="relative flex items-center justify-between">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => handleNavClick("/")}
              >
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative"
                >
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <motion.div
                    className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                  MHA
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center flex-1 px-4">
                <div className="relative flex items-center bg-gray-50/60 dark:bg-gray-800/60 rounded-full p-2 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 max-w-fit">
                  {/* Active Background */}
                  <AnimatePresence mode="wait">
                    {hasActiveItem && (
                      <motion.div
                        key={`active-${activeItemIndex}`}
                        className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg z-10"
                        style={getActiveBackgroundStyle()}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          duration: 0.3,
                        }}
                        layoutId="activeNavBackground"
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-1">
                    {desktopNavItems.map((item, index) => (
                      <motion.div
                        key={`${item.name}-${index}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.4 }}
                        className="relative flex-shrink-0"
                      >
                        <motion.button
                          onClick={() => handleNavClick(item.href)}
                          disabled={isNavigating}
                          className={`relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 group z-20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 whitespace-nowrap ${
                            isActive(item.href)
                              ? "text-white"
                              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                          }`}
                          whileHover={{ scale: isNavigating ? 1 : 1.05 }}
                          whileTap={{ scale: isNavigating ? 1 : 0.95 }}
                          title={item.name}
                        >
                          <div className="relative flex items-center gap-1.5 z-30">
                            <motion.div
                              animate={{ rotate: isActive(item.href) ? 360 : 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                            </motion.div>
                            <span className="hidden xl:inline text-xs font-medium">
                              {item.name}
                            </span>
                          </div>

                          {/* Hover Background */}
                          {!isActive(item.href) && (
                            <motion.div
                              className="absolute inset-0 bg-gray-200/60 dark:bg-gray-700/60 rounded-full opacity-0 group-hover:opacity-100 z-10"
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Controls */}
              <div className="flex items-center gap-3">
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="hidden md:block"
                >
                  <Button
                    asChild
                    size="sm"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <Link href="/consultation">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Consultation</span>
                    </Link>
                  </Button>
                </motion.div>

                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="relative w-10 h-10 rounded-full bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm transition-all duration-300 group overflow-hidden"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background:
                          theme === "dark"
                            ? "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)"
                            : "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ y: -20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 20, opacity: 0, rotate: 90 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="relative z-10 flex items-center justify-center"
                      >
                        {theme === "dark" ? (
                          <Sun className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <Moon className="w-4 h-4 text-blue-600" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-10 h-10 rounded-full bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm transition-all duration-300"
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </motion.div>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute right-4 top-20 w-72 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-2xl overflow-hidden"
            >
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/20">
                <h3 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Navigation
                </h3>
              </div>

              {/* Mobile Menu Items */}
              <div className="p-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={() => handleNavClick(item.href)}
                    disabled={isNavigating}
                    className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isActive(item.href) ? 360 : 0 }}
                      transition={{ duration: 0.4 }}
                      className={`p-2 rounded-lg ${
                        isActive(item.href)
                          ? "bg-white/20"
                          : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    {item.name}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-3"
                >
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/consultation" onClick={() => setIsOpen(false)}>
                      Free Consultation
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
