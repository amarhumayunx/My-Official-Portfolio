"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preconnect to external domains (no font preload without a real href to avoid invalid request)
      const domains = [
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://www.googletagmanager.com",
      ]

      domains.forEach((domain) => {
        const link = document.createElement("link")
        link.rel = "preconnect"
        link.href = domain
        link.crossOrigin = "anonymous"
        document.head.appendChild(link)
      })
    }

    // Optimize images loading
    const optimizeImages = () => {
      if ("loading" in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]')
        images.forEach((img) => {
          if (!img.complete) {
            img.loading = "lazy"
          }
        })
      }
    }

    // Initialize optimizations
    preloadResources()
    optimizeImages()
  }, [])

  return null
}
