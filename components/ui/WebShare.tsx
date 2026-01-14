"use client"

import { useState, useEffect } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebShareProps {
  title: string
  text?: string
  url?: string
  className?: string
}

export function WebShare({ title, text, url, className }: WebShareProps) {
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    // Check if Web Share API is supported
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanShare(true)
    }
  }, [])

  const handleShare = async () => {
    if (!canShare) return

    try {
      await navigator.share({
        title,
        text: text || title,
        url: url || window.location.href,
      })
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error)
      }
    }
  }

  if (!canShare) {
    return null
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className={className}
      aria-label="Share this page"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  )
}
