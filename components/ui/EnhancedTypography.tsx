"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
  speed?: number
}

export function AnimatedGradientText({
  children,
  className,
  gradient = "from-blue-600 via-purple-600 to-pink-600",
  speed = 3,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn(
        `bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto]`,
        "text-gradient-animated",
        className
      )}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  )
}

interface TypographyScaleProps {
  children: React.ReactNode
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small"
  className?: string
  gradient?: boolean
}

const typographyVariants = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug tracking-tight",
  h4: "text-xl md:text-2xl lg:text-3xl font-semibold leading-snug",
  body: "text-base md:text-lg leading-relaxed",
  small: "text-sm md:text-base leading-normal",
}

export function TypographyScale({
  children,
  variant = "body",
  className,
  gradient = false,
}: TypographyScaleProps) {
  const baseClasses = typographyVariants[variant]

  if (gradient) {
    return (
      <AnimatedGradientText className={cn(baseClasses, className)}>
        {children}
      </AnimatedGradientText>
    )
  }

  return <div className={cn(baseClasses, className)}>{children}</div>
}

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
