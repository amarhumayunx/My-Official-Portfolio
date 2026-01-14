"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean
  ripple?: boolean
  gradient?: boolean
  iconAnimation?: boolean
}

export function EnhancedButton({
  children,
  className,
  loading = false,
  ripple = true,
  gradient = false,
  iconAnimation = false,
  disabled,
  onClick,
  ...props
}: EnhancedButtonProps) {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples((prev) => [...prev, { x, y, id }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, 600)
    }

    onClick?.(e)
  }

  return (
    <motion.div
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className="inline-block"
    >
      <Button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden",
          gradient && "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none"
              initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
              animate={{
                width: 200,
                height: 200,
                x: ripple.x - 100,
                y: ripple.y - 100,
                opacity: [1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        <span className={cn("flex items-center gap-2", loading && "opacity-70")}>
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-4 h-4" />
            </motion.div>
          )}
          <span className={cn(iconAnimation && "group-hover:scale-110 transition-transform")}>
            {children}
          </span>
        </span>
      </Button>
    </motion.div>
  )
}
