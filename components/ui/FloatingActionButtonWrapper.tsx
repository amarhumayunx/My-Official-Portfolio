"use client"

import { useEffect, useState } from "react"
import { FloatingActionButton } from "@/components/ui/FloatingActionButton"

/**
 * Renders FAB only after mount to avoid hydration mismatch
 * (server never renders FAB; client renders after hydration)
 */
export function FloatingActionButtonWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <FloatingActionButton />
}
