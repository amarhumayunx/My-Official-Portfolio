"use client"

import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Smartphone,
  Code,
  Database,
  Brain,
  Shield,
  Wrench,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { FluidTransition } from "@/components/ui/FluidTransition"

const services = [
  { name: "Flutter Development", href: "/services/flutter-development", icon: Smartphone },
  { name: "Android Development", href: "/services/android-development", icon: Code },
  { name: "Firebase Integration", href: "/services/firebase-integration", icon: Database },
  { name: "AI & ML Integration", href: "/services/ai-ml-integration", icon: Brain },
  { name: "Security Solutions", href: "/services/security-solutions", icon: Shield },
  { name: "Maintenance & Support", href: "/services/maintenance-support", icon: Wrench },
]

const quickLinks = [
  { name: "About Me", href: "/#about" },
  { name: "My Skills", href: "/#skills" },
  { name: "Portfolio", href: "/#projects" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Blog", href: "/#blog" },
  { name: "All Services", href: "/services" },
]

const projects = [
  { name: "BalanceBite App", href: "/projects/balancebite-mobile-app" },
  { name: "SafeCrypt Manager", href: "/projects/safecrypt-password-manager" },
  { name: "Surah Yaseen App", href: "/projects/surah-yaseen-app" },
  { name: "Toolkit Collection", href: "/projects/toolkit-mobile-app" },
  { name: "Love Connect", href: "/projects/love-connect" },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/50 via-muted/60 to-muted/80 border-t border-border/50 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto section-padding py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section - Enhanced */}
          <FluidTransition className="lg:col-span-1">
            <motion.div className="space-y-4" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-bold gradient-text">Muhammad Humayun Amar</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professional mobile app developer specializing in Flutter, Android, and modern backend solutions.
                Creating innovative digital experiences.
              </p>
              <div className="flex space-x-3 pt-2">
                <motion.a
                  href="https://github.com/amarhumayunx"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary/15 hover:bg-primary/30 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/amarhumayun"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary/15 hover:bg-primary/30 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:amarhumayun@outlook.com"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary/15 hover:bg-primary/30 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </FluidTransition>

          {/* Services Section - Enhanced */}
          <FluidTransition delay={0.1} className="lg:col-span-1">
            <motion.div className="space-y-4" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h4 className="font-semibold text-lg gradient-text">Services</h4>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={service.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <service.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {service.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-3 group"
                >
                  View all services
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </FluidTransition>

          {/* Quick Links - Enhanced */}
          <FluidTransition delay={0.2} className="lg:col-span-1">
            <motion.div className="space-y-4" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h4 className="font-semibold text-lg gradient-text">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FluidTransition>

          {/* Featured Projects - Enhanced */}
          <FluidTransition delay={0.3} className="lg:col-span-1">
            <motion.div className="space-y-4" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h5 className="font-semibold text-lg gradient-text">Featured Projects</h5>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={project.href}
                      className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                    >
                      {project.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FluidTransition>

          {/* Contact Section - Enhanced */}
          <FluidTransition delay={0.4} className="lg:col-span-1">
            <motion.div className="space-y-4" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h4 className="font-semibold text-lg gradient-text">Get In Touch</h4>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:amarhumayun@outlook.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors truncate"
                  >
                    amarhumayun@outlook.com
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Lahore, Pakistan</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform"
                  whileHover={{ x: 5 }}
                >
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">24/7 Available</span>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 group"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </FluidTransition>
        </div>

        {/* Bottom Section - Enhanced */}
        <FluidTransition delay={0.5} className="mt-12 pt-8 border-t border-border/50">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Muhammad Humayun Amar. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/70 text-center md:text-left">
                Built with Next.js, React, and Tailwind CSS
              </p>
            </div>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/sitemap.xml" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </motion.div>
        </FluidTransition>
      </div>
    </footer>
  )
}
