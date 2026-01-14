"use client"

import { useEffect, useState } from "react"

export function PWARegister() {
  const [isSupported, setIsSupported] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      setIsSupported(true)

      // Register service worker
      const registerServiceWorker = async () => {
        try {
          // Use the API route which serves with correct MIME type
          const swPath = "/sw"
          const registration = await navigator.serviceWorker.register(swPath, {
            scope: "/",
          })

          setIsRegistered(true)

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New service worker available, notify user
                  console.log("New service worker available. Refresh to update.")
                }
              })
            }
          })

          // Listen for controller change (when new service worker takes control)
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            window.location.reload()
          })
        } catch (error) {
          console.error("Service Worker registration failed:", error)
          setIsRegistered(false)
        }
      }

      // Register when page loads
      if (document.readyState === "complete") {
        registerServiceWorker()
      } else {
        window.addEventListener("load", registerServiceWorker)
      }

      // Handle online/offline events
      const handleOnline = () => {
        console.log("App is online")
      }

      const handleOffline = () => {
        console.log("App is offline")
      }

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  // Prompt user to install PWA
  useEffect(() => {
    if (typeof window === "undefined" || !isSupported) return

    let deferredPrompt: any = null

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      deferredPrompt = e
      // Optionally, show your own install UI
      console.log("PWA install prompt available")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [isSupported])

  // This component doesn't render anything visible
  // It just handles service worker registration in the background
  return null
}
