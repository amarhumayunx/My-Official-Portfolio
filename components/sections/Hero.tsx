"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, MapPin, User, Code, Smartphone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/TypewriterEffect"
import { useRef } from "react"

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: contentScrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  })
  const contentY = useTransform(contentScrollYProgress, [0, 1], ["-5%", "5%"])

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  // Enhanced background blob animations
  const blob1X = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const blob2X = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const blob3X = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: blob3X, y: blob3Y }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-2xl"
        />
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto section-padding text-center" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)", // Subtle glow
              transition: { duration: 0.3 },
            }}
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 cursor-pointer relative"
            aria-hidden="true" // Decorative element
          >
            <motion.div
              className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden"
              animate={{ y: [0, -5, 0] }} // Subtle continuous vertical movement
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
            </motion.div>

            {/* Floating code icon */}
            <motion.div
              className="absolute -top-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
              animate={{
                y: [0, -5, 0, 5, 0], // More complex floating path
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Code className="w-4 h-4" />
            </motion.div>

            {/* Floating mobile icon */}
            <motion.div
              className="absolute -bottom-1 -left-1 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center"
              animate={{
                y: [0, 5, 0, -5, 0], // More complex floating path
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Smartphone className="w-4 h-4" />
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              whileHover={{
                scale: 1.01,
                textShadow: "0px 0px 8px rgba(59, 130, 246, 0.4)", // Subtle text shadow
                transition: { duration: 0.2 },
              }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold"
            >
              Muhammad <span className="gradient-text">Humayun Amar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground"
              aria-live="polite" // Announce changes to screen readers
              aria-atomic="true"
            >
              <TypewriterEffect
                words={["Flutter Developer", "Mobile App Developer", "Software Engineer", "Cross-Platform Expert"]}
                typeSpeed={80}
                deleteSpeed={40}
                delayBetweenWords={1500}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Passionate Flutter Developer with hands-on experience building high-performance, cross-platform apps using
            Flutter and Firebase. Focused on creating clean, user-friendly interfaces and scalable mobile solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Lahore, Pakistan</span>
            </motion.div>
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="mailto:amarhumayun@outlook.com"
                    className="flex items-center gap-2"
                    aria-label="Email Muhammad Humayun Amar"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Email
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/amarhumayunx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    aria-label="View GitHub profile"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://linkedin.com/in/amarhumayun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    aria-label="View LinkedIn profile"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="default" size="sm" asChild>
                  <a
                    href="https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9mNTJjMTI5ZjEzOWNkZjc0L0VZSndoMmN6RW9GTHBtakZSUmYtTlBvQmxlb1VjYzNCeU5VdkZPLW5XdG5pbnc%5FZT0zRXZIamM&cid=F52C129F139CDF74&id=F52C129F139CDF74%21s6787708212334b81a668c54517fe34fa&parId=F52C129F139CDF74%2162529&o=OneUp" // Replace this with your actual OneDrive link
                    download="Muhammad_Humayun_Amar_CV.pdf"
                    className="flex items-center gap-2"
                    aria-label="Download Muhammad Humayun Amar's CV"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="pt-8">
            <motion.div
              animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }} // More pronounced bounce and scale
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1, y: -20, transition: { duration: 0.3 } }} // Larger hover effect
            >
              <Button
                onClick={scrollToAbout}
                variant="ghost"
                className="hover:bg-transparent"
                size="lg"
                aria-label="Scroll to About section"
              >
                <ArrowDown className="w-6 h-6" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
