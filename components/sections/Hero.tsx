"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, MapPin, User, Code, Smartphone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/TypewriterEffect"
import { ResumeDownload } from "@/components/ui/ResumeDownload"
import { MicroInteraction } from "@/components/ui/MicroInteractions"
import { useRef } from "react"
import { liquidSpring, liquidSpringHover, liquidEase } from "@/lib/liquid-animation"
import { scrollToSection } from "@/lib/smooth-scroll"

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: contentScrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  })
  const contentY = useTransform(contentScrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["-5%", "-2%", "0%", "2%", "5%"])

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.85, 0.4, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 0.95, 0.88, 0.8])

  const scrollToAbout = () => scrollToSection("about", { duration: 620 })

  // When reduced motion: skip scroll-linked effects to improve performance
  const sectionStyle = reduceMotion ? undefined : { opacity, scale }
  const contentStyle = reduceMotion ? undefined : { y: contentY }

  return (
    <motion.section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={sectionStyle}
    >
      {/* Background removed - using global fixed background */}

      <div ref={contentRef} className="max-w-7xl mx-auto w-full section-padding text-center" style={contentStyle}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={liquidSpring}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, ...liquidSpring }}
            whileHover={{
              scale: 1.08,
              rotate: 4,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)",
              transition: liquidSpringHover,
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 cursor-pointer relative"
            aria-hidden="true"
          >
            <motion.div
              className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: liquidEase }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </motion.div>

            {/* Floating code icon */}
            <motion.div
              className="absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
              animate={{
                y: [0, -5, 0, 5, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: liquidEase }}
            >
              <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>

            {/* Floating mobile icon */}
            <motion.div
              className="absolute -bottom-1 -left-1 w-7 h-7 sm:w-8 sm:h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center"
              animate={{
                y: [0, 5, 0, -5, 0],
                rotate: [0, -15, 15, 0],
              }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: liquidEase, delay: 0.25 }}
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
          </motion.div>

          <div className="space-y-3 sm:space-y-4 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, ...liquidSpring }}
              whileHover={{
                scale: 1.01,
                textShadow: "0px 0px 8px rgba(59, 130, 246, 0.4)",
                transition: liquidSpringHover,
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
            >
              Muhammad <span className="gradient-text block sm:inline">Humayun Amar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, ...liquidSpring }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground min-h-[32px] sm:min-h-[40px]"
              aria-live="polite"
              aria-atomic="true"
            >
              <TypewriterEffect
                words={[
                  "Full Stack Flutter Developer",
                  "Mobile App Developer",
                  "Software Engineer",
                  "Software Developer",
                ]}
                typeSpeed={80}
                deleteSpeed={40}
                delayBetweenWords={1500}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, ...liquidSpring }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
          >
            Passionate Flutter Developer with hands-on experience building high-performance, cross-platform apps using
            Flutter and Firebase. Focused on creating clean, user-friendly interfaces and scalable mobile solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, ...liquidSpring }}
            className="flex flex-col items-center gap-4 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
            >
              <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>Lahore, Pakistan</span>
            </motion.div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <MicroInteraction variant="scale" intensity="normal">
                <Button variant="outline" size="sm" asChild className="hover-glow">
                  <a
                    href="mailto:amarhumayun@outlook.com"
                    className="flex items-center gap-2 text-sm"
                    aria-label="Email Muhammad Humayun Amar"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                </Button>
              </MicroInteraction>
              <MicroInteraction variant="scale" intensity="normal">
                <Button variant="outline" size="sm" asChild className="hover-glow">
                  <a
                    href="https://github.com/amarhumayunx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm"
                    aria-label="View GitHub profile"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                </Button>
              </MicroInteraction>
              <MicroInteraction variant="scale" intensity="normal">
                <Button variant="outline" size="sm" asChild className="hover-glow">
                  <a
                    href="https://linkedin.com/in/amarhumayun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm"
                    aria-label="View LinkedIn profile"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                </Button>
              </MicroInteraction>
              <MicroInteraction variant="lift" intensity="normal">
                <ResumeDownload variant="default" size="sm" />
              </MicroInteraction>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, ...liquidSpring }}
            className="pt-6 sm:pt-8"
          >
            <motion.div
              animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: liquidEase }}
              whileHover={{ scale: 1.1, y: -20, transition: liquidSpringHover }}
            >
              <Button
                onClick={scrollToAbout}
                variant="ghost"
                className="hover:bg-transparent"
                size="lg"
                aria-label="Scroll to About section"
              >
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
