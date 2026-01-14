"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  gradient: string
}

const colorSchemes: Record<string, ColorScheme> = {
  "/": {
    primary: "from-blue-600 to-cyan-600",
    secondary: "from-purple-600 to-pink-600",
    accent: "from-indigo-600 to-purple-600",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
  },
  "/projects": {
    primary: "from-green-600 to-emerald-600",
    secondary: "from-teal-600 to-cyan-600",
    accent: "from-emerald-600 to-green-600",
    gradient: "from-green-500 via-teal-500 to-cyan-500",
  },
  "/services": {
    primary: "from-orange-600 to-red-600",
    secondary: "from-amber-600 to-orange-600",
    accent: "from-red-600 to-pink-600",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  "/blog": {
    primary: "from-violet-600 to-purple-600",
    secondary: "from-purple-600 to-fuchsia-600",
    accent: "from-indigo-600 to-violet-600",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  "/contact": {
    primary: "from-pink-600 to-rose-600",
    secondary: "from-rose-600 to-red-600",
    accent: "from-pink-600 to-purple-600",
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
}

export function useContextAwareColors() {
  const pathname = usePathname()
  const basePath = pathname.split("/").slice(0, 2).join("/") || "/"
  return colorSchemes[basePath] || colorSchemes["/"]
}

interface ContextAwareGradientProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent" | "gradient"
}

export function ContextAwareGradient({
  children,
  className,
  variant = "primary",
}: ContextAwareGradientProps) {
  const colors = useContextAwareColors()
  const gradientClass = colors[variant]

  return (
    <div className={cn(`bg-gradient-to-r ${gradientClass}`, className)}>
      {children}
    </div>
  )
}
