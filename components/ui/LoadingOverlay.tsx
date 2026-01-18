"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"
import { X } from "lucide-react"
import { Button } from "./button"

interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  onCancel?: () => void
  showCancel?: boolean
  variant?: "default" | "blur" | "solid"
  className?: string
}

export function LoadingOverlay({
  isLoading,
  text,
  onCancel,
  showCancel = false,
  variant = "blur",
  className,
}: LoadingOverlayProps) {
  const variantClasses = {
    default: "bg-background/80",
    blur: "bg-background/80 backdrop-blur-sm",
    solid: "bg-background",
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            variantClasses[variant],
            className
          )}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <Spinner size="lg" text={text} />
            {showCancel && onCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                className="mt-4"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Inline loading indicator
export function InlineLoader({ 
  text, 
  size = "md",
  className 
}: { 
  text?: string
  size?: "sm" | "md" | "lg"
  className?: string 
}) {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <Spinner size={size} text={text} />
    </div>
  )
}
