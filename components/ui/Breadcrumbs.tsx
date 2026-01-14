"use client"

import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname()

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items

    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

    let currentPath = ""
    paths.forEach((path) => {
      currentPath += `/${path}`
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm", className)}>
      <ol className="flex items-center gap-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 hover:text-primary transition-colors",
                    isLast && "text-muted-foreground"
                  )}
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  {isLast ? (
                    <span className="text-foreground font-medium">{item.label}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors text-muted-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
