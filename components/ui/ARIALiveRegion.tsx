"use client"

import { useEffect, useState } from "react"

export function ARIALiveRegion() {
  const [announcements, setAnnouncements] = useState<string[]>([])

  useEffect(() => {
    // Listen for custom announcement events
    const handleAnnouncement = (event: CustomEvent<string>) => {
      const message = event.detail
      setAnnouncements((prev) => [...prev, message])

      // Remove announcement after it's been read
      setTimeout(() => {
        setAnnouncements((prev) => prev.filter((msg) => msg !== message))
      }, 1000)
    }

    window.addEventListener("announce" as any, handleAnnouncement as EventListener)

    return () => {
      window.removeEventListener("announce" as any, handleAnnouncement as EventListener)
    }
  }, [])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcements.map((announcement, index) => (
        <div key={index}>{announcement}</div>
      ))}
    </div>
  )
}

// Helper function to announce messages
export function announce(message: string) {
  const event = new CustomEvent("announce", { detail: message })
  window.dispatchEvent(event)
}
