"use client"

import { useEffect, ReactNode } from "react"

interface KeyboardShortcutsProviderProps {
  children: ReactNode
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input, textarea, or contenteditable
      const target = event.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest("[contenteditable]")
      ) {
        return
      }

      // Keyboard shortcuts
      switch (event.key) {
        case "/":
          // Focus search (if exists)
          event.preventDefault()
          const searchInput = document.querySelector<HTMLInputElement>('input[type="search"], input[placeholder*="Search"]')
          if (searchInput) {
            searchInput.focus()
          }
          break

        case "Escape":
          // Close modals or clear focus
          const activeModal = document.querySelector('[role="dialog"]')
          if (activeModal) {
            const closeButton = activeModal.querySelector<HTMLButtonElement>('button[aria-label*="close" i], button[aria-label*="Close"]')
            if (closeButton) {
              closeButton.click()
            }
          }
          break

        case "k":
          // Cmd/Ctrl + K for command palette (if exists)
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault()
            // Could trigger a command palette here
            console.log("Command palette shortcut pressed")
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return <>{children}</>
}
