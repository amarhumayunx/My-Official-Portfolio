"use client"

import * as React from "react"
import { Clock } from "lucide-react"

interface ReadingTimeProps {
  content: string
  wordsPerMinute?: number
  className?: string
}

export function ReadingTime({ content, wordsPerMinute = 200, className }: ReadingTimeProps) {
  const readingTime = React.useMemo(() => {
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }, [content, wordsPerMinute])

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Clock className="w-4 h-4" />
      <span>{readingTime} min read</span>
    </div>
  )
}
