"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function EnhancedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Enhanced Mesh Gradient Background */}
      <div className="absolute inset-0 gradient-mesh-enhanced" />
      
      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/15 via-fuchsia-500/15 to-rose-500/15 rounded-full blur-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 geometric-pattern text-foreground opacity-[0.03] dark:opacity-[0.05]" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 grid-pattern text-foreground opacity-[0.02] dark:opacity-[0.03]" />
      
      {/* Additional subtle patterns */}
      <div className="absolute inset-0 dot-pattern text-foreground opacity-[0.015] dark:opacity-[0.02]" />
    </div>
  )
}
