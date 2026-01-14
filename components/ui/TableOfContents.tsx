"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (items.length === 0) return null

  return (
    <nav className={cn("sticky top-20", className)}>
      <h3 className="font-semibold mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <motion.button
              onClick={() => handleClick(item.id)}
              className={cn(
                "text-left text-sm transition-colors hover:text-primary",
                activeId === item.id ? "text-primary font-medium" : "text-muted-foreground",
                item.level === 1 && "pl-0",
                item.level === 2 && "pl-4",
                item.level === 3 && "pl-8"
              )}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {item.title}
            </motion.button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
