"use client"

import * as React from "react"

/**
 * 120 FPS optimized background:
 * - No blur (blur forces expensive paint/composite)
 * - CSS-only animations (transform/opacity = compositor only)
 * - Static gradient mesh (no background-position animation)
 * - Simplified patterns when used
 */
export function EnhancedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none [contain:strict]">
      {/* Static gradient mesh — no animation = no repaint during scroll */}
      <div className="absolute inset-0 gradient-mesh-static" aria-hidden="true" />

      {/* GPU-only blob animations — transform/opacity, NO blur */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-full bg-blob-float"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-500/12 via-cyan-500/12 to-teal-500/12 rounded-full bg-blob-float-delayed"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-rose-500/10 rounded-full bg-blob-rotate"
        aria-hidden="true"
      />

      {/* Static pattern overlay — no animation */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />
    </div>
  )
}
