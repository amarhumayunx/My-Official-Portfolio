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
          // Try API route first (works better on Vercel with correct MIME type)
          // The rewrite rule maps /sw.js to /sw API route
          let registration
          try {
            registration = await navigator.serviceWorker.register("/sw.js", {
              scope: "/",
            })
          } catch (apiError) {
            // Fallback: try direct public file (if rewrite doesn't work)
            console.warn("API route failed, trying public file:", apiError)
            registration = await navigator.serviceWorker.register("/sw.js", {
              scope: "/",
            })
          }

          setIsRegistered(true)
          console.log("Service Worker registered successfully")

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
        } catch (error: any) {
          console.error("Service Worker registration failed:", error)
          // Log more details for debugging
          if (error.message) {
            console.error("Error message:", error.message)
          }
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
