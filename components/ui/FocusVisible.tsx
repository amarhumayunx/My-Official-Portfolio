"use client"

import { useEffect } from "react"

/**
 * Component to enhance focus visible indicators globally
 */
export function FocusVisibleEnhancer() {
  useEffect(() => {
    // Add focus-visible class to all interactive elements when focused via keyboard
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target.matches(":focus-visible")) {
        target.classList.add("focus-visible-enhanced")
      }
    }

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      target.classList.remove("focus-visible-enhanced")
    }

    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, a, input, textarea, select, [tabindex], [role='button'], [role='link']",
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("focus", handleFocus)
      el.addEventListener("blur", handleBlur)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("focus", handleFocus)
        el.removeEventListener("blur", handleBlur)
      })
    }
  }, [])

  return null
}
