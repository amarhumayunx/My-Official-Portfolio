"use client"

import { motion } from "framer-motion"
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  ExternalLink,
  Smartphone,
  Code,
  Database,
  Shield,
  Zap,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { FluidTransition } from "@/components/ui/FluidTransition"

const services = [
  {
    name: "Flutter Development",
    href: "/services/flutter-development",
    icon: Smartphone,
    description: "Cross-platform mobile apps",
  },
  {
    name: "Android Development",
    href: "/services/android-development",
    icon: Code,
    description: "Native Android applications",
  },
  {
    name: "Firebase Integration",
    href: "/services/firebase-integration",
    icon: Database,
    description: "Backend & real-time features",
  },
  {
    name: "Security Solutions",
    href: "/services/security-solutions",
    icon: Shield,
    description: "Data protection & encryption",
  },
  {
    name: "AI/ML Integration",
    href: "/services/ai-ml-integration",
    icon: Zap,
    description: "Smart app features",
  },
  {
    name: "Maintenance & Support",
    href: "/services/maintenance-support",
    icon: Palette,
    description: "Ongoing app support",
  },
]

const quickLinks = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const projects = [
  { name: "BalanceBite App", href: "/projects/balancebite-mobile-app" },
  { name: "SafeCrypt Manager", href: "/projects/safecrypt-password-manager" },
  { name: "Surah Yaseen App", href: "/projects/surah-yaseen-app" },
  { name: "Toolkit Collection", href: "/projects/toolkit-mobile-app" },
]

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "humayunamar321@gmail.com",
    href: "mailto:humayunamar321@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
]

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/humayunamar",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/humayunamar",
    icon: Linkedin,
  },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand & Description */}
            <FluidTransition className="lg:col-span-1">
              <div className="space-y-4">
                <Link href="/" className="inline-block">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Muhammad Humayun Amar
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Professional mobile app developer specializing in Flutter, Android, and modern backend solutions.
                  Creating innovative digital experiences with cutting-edge technology.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </FluidTransition>

            {/* Services */}
            <FluidTransition delay={0.1} className="lg:col-span-1">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Services</h4>
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
                        className="group flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <service.icon className="w-3 h-3 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                            {service.name}
                          </div>
                          <div className="text-xs text-muted-foreground leading-relaxed">{service.description}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  <div className="pt-2">
                    <Link
                      href="/services"
                      className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 group"
                    >
                      View all services
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </FluidTransition>

            {/* Quick Links & Projects */}
            <FluidTransition delay={0.2} className="lg:col-span-1">
              <div className="space-y-6">
                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Quick Links</h4>
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
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Featured Projects</h4>
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
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {project.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FluidTransition>

            {/* Contact Info */}
            <FluidTransition delay={0.3} className="lg:col-span-1">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Get In Touch</h4>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <contact.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-1">{contact.label}</div>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors break-all"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <div className="text-sm font-medium text-foreground">{contact.value}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Start Your Project
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </FluidTransition>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Muhammad Humayun Amar. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
