"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [
    { label: "Home", href: "/" },
    ...items,
  ]

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm", className)}>
      <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isFirst = index === 0

          return (
            <li
              key={item.href || item.label}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isFirst ? (
                <Link
                  href={item.href || "#"}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  {isLast ? (
                    <span className="text-foreground font-medium" itemProp="name">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.label}</span>
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
