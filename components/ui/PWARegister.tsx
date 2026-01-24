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
          // Try to register service worker from static public/sw.js file
          // This works better in preview environments than dynamic API routes
          const scriptUrl = "/sw.js"
          
          const registration = await navigator.serviceWorker.register(scriptUrl, {
            scope: "/",
          })

          setIsRegistered(true)
          console.log("Service Worker registered successfully")

          // Check for updates immediately and frequently
          const checkForUpdates = () => {
            registration.update().catch((err) => {
              console.log("Update check failed:", err)
            })
          }

          // Check for updates on page load
          checkForUpdates()

          // Check for updates every 1 minute (more frequent)
          const updateInterval = setInterval(checkForUpdates, 60 * 1000)

          // Check for updates when page becomes visible
          const handleVisibilityChange = () => {
            if (!document.hidden) {
              checkForUpdates()
            }
          }
          document.addEventListener("visibilitychange", handleVisibilityChange)

          // Check for updates on focus
          window.addEventListener("focus", checkForUpdates)

          // Cleanup on unmount
          return () => {
            clearInterval(updateInterval)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            window.removeEventListener("focus", checkForUpdates)
          }

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New service worker available, reload immediately
                  console.log("New service worker available. Reloading...")
                  window.location.reload()
                }
              })
            }
          })

          // Listen for controller change (when new service worker takes control)
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            window.location.reload()
          })
        } catch (error: any) {
          // Service worker registration is optional - gracefully handle failures
          // This is common in preview/development environments with CORS or routing restrictions
          console.warn("Service Worker registration not available:", error?.message)
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
