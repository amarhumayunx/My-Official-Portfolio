"use client"

import { useEffect } from "react"

export function FocusVisibleEnhancer() {
  useEffect(() => {
    // Add focus-visible polyfill behavior
    // This ensures keyboard navigation shows visible focus indicators
    const handleMouseDown = () => {
      document.body.classList.add("using-mouse")
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Tab, Arrow keys, Enter, Space
      if (
        event.key === "Tab" ||
        event.key.startsWith("Arrow") ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        document.body.classList.remove("using-mouse")
      }
    }

    const handleMouseMove = () => {
      // Small delay to distinguish mouse from keyboard
      if (document.body.classList.contains("using-mouse")) {
        return
      }
    }

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return null
}
