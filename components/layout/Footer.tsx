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
]

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <FluidTransition className="lg:col-span-1">
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-text">Muhammad Humayun Amar</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professional mobile app developer specializing in Flutter, Android, and modern backend solutions.
                Creating innovative digital experiences with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/amarhumayunx"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/amarhumayun"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:amarhumayun@outlook.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </FluidTransition>

          {/* Services Section */}
          <FluidTransition delay={0.1} className="lg:col-span-1">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Services</h4>
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
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <service.icon className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                        {service.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-2"
                >
                  View all services
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </FluidTransition>

          {/* Quick Links & Projects */}
          <FluidTransition delay={0.2} className="lg:col-span-1">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <h5 className="font-medium mb-2">Featured Projects</h5>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <Link
                      key={project.name}
                      href={project.href}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {project.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FluidTransition>

          {/* Contact Section */}
          <FluidTransition delay={0.3} className="lg:col-span-1">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <a
                    href="mailto:amarhumayun@outlook.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    amarhumayun@outlook.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Lahore, Pakistan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Available 24/7</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FluidTransition>
        </div>

        {/* Bottom Section */}
        <FluidTransition delay={0.4} className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Muhammad Humayun Amar. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </FluidTransition>
      </div>
    </footer>
  )
}
