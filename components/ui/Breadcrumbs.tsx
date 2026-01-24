"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps = {}) {
  const pathname = usePathname()

  // Don't show breadcrumbs on home page if no items provided
  if (!items && pathname === "/") return null

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items

    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

    let currentPath = ""
    paths.forEach((path) => {
      currentPath += `/${path}`
      
      // Format label (capitalize and replace hyphens)
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      breadcrumbs.push({
        label,
        href: currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-muted-foreground mb-6 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li
              key={crumb.href}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index === 0 ? (
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                  <meta itemProp="name" content={crumb.label} />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
                  {isLast ? (
                    <span
                      className={cn(
                        "font-medium text-foreground",
                        "cursor-default"
                      )}
                      itemProp="name"
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  )}
                </>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
