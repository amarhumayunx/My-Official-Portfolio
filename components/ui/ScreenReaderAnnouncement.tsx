"use client"

import * as React from "react"
import { ARIALiveRegion } from "./ARIALiveRegion"

interface ScreenReaderAnnouncementProps {
  message: string
  priority?: "polite" | "assertive"
}

export function ScreenReaderAnnouncement({ message, priority = "polite" }: ScreenReaderAnnouncementProps) {
  const [announcement, setAnnouncement] = React.useState("")

  React.useEffect(() => {
    if (message) {
      setAnnouncement(message)
      const timer = setTimeout(() => {
        setAnnouncement("")
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}
