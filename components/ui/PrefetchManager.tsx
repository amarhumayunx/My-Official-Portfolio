"use client"

import { useEffect } from "react"
import { prefetchCriticalRoutes, setupHoverPrefetch } from "@/lib/prefetch"

export function PrefetchManager() {
  useEffect(() => {
    // Prefetch critical routes after initial load
    prefetchCriticalRoutes()
    // Setup hover prefetch for better UX
    setupHoverPrefetch()
  }, [])

  return null
}
