"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope)
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error)
        })

      // Handle install prompt
      let deferredPrompt: any
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault()
        deferredPrompt = e
        // You can show a custom install button here
      })

      // Handle app installed
      window.addEventListener("appinstalled", () => {
        console.log("PWA installed")
        deferredPrompt = null
      })
    }
  }, [])

  return null
}
